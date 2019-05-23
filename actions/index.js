import uuid from 'uuid';
import firebase from 'firebase'
import db from '../config/firebase'
import { Permissions, ImageManipulator, Notifications } from 'expo';
const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send'

export const uploadPhoto = (uri) => {
    return async (dispatch) => {
        try {
            const resize = await ImageManipulator.manipulateAsync(uri, [], { format: 'jpg', compress: 0.1 });
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.onload = () => resolve(xhr.response)
                xhr.responseType = 'blob'
                xhr.open('GET', resize.uri, true)
                xhr.send(null)
            });
            const uploadTask = await firebase.storage().ref().child(uuid.v4()).put(blob)
            const downloadURL = await uploadTask.ref.getDownloadURL()
            return downloadURL
        } catch (e) {
            console.error(e)
        }
    }
}


export const allowNotifications = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().user
        try {
            if (uid) {
                const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
                if (permission.status === 'granted') {
                    const token = await Notifications.getExpoPushTokenAsync()
                    dispatch({ type: 'GET_TOKEN', payload: token })
                    db.collection('users').doc(uid).update({ token: token })
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
}


export const sendNotification = (uid, text, data) => {
    return async (dispatch, getState) => {
        const { fullname } = getState().user
        try {
            const user = await db.collection('users').doc(uid).get()
            if (user.data().token) {
                fetch(PUSH_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: user.data().token,
                        sound: "default",
                        title: fullname,
                        body: text,
                        data: data
                    })
                })
            }
        } catch (e) {
            console.error(e)
        }
    }
}

export const notifyAll = (message) => {
    return async (dispatch, getState) => {
        try {
            const users = await db.collection('users').get();
            let data = []
            users.forEach((user) => {
                if(user.data().token){
                    data.push({
                        to: user.data().token,
                        sound: "default",
                        title: user.fullname,
                        body: message
                    })
                }
               
            })
            fetch(PUSH_ENDPOINT, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

        } catch (e) {
            console.error(e)
        }
    }
}


