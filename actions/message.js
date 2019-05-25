import db from '../config/firebase';
import { orderBy } from 'lodash'
import {allowNotifications, sendNotification} from './index'


export const addMessage = (id, text) => {
  return (dispatch, getState) => {
    const { uid, photo, fullname } = getState().user
    try {
      const message = {
        members: [id, uid].sort(),
        message: text,
        photo: photo,
        fullname: fullname,
        uid: uid,
        date: new Date().getTime(),
      }
      db.collection('messages').doc().set(message)
      dispatch(sendNotification(id, 'Sent you a Message', {Route: 'Message',  SenderId: uid, RecieverId: id}))
      dispatch(getMessages())
    } catch(e) {
      console.error(e)
    }
  }
}

export const getMessages = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().user
    let messages = []
    try {
      const query = await db.collection('messages').where('members', 'array-contains', uid).get()
      query.forEach((response) => {
        let message = response.data()
        messages.push(message)
      })
      dispatch({ type: 'GET_MESSAGES', payload: orderBy(messages, 'date','desc')})
    } catch(e) {
      console.error(e)
    }
  }
}