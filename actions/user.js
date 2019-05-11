import firebase from 'firebase';
import db from '../config/firebase';
import orderBy from 'lodash/cloneDeep';

export const updateEmail = (email) => {
    return {type: 'UPDATE_EMAIL', payload: email}
}

export const updatePassword = (password) => {
    return {type: 'UPDATE_PASSWORD', payload: password}
}

export const updateFullname = (fullname) => {
    return {type: 'UPDATE_fullname', payload: fullname}
}

// export const updateLocation = (location) => {
//     return {type: 'UPDATE_LOCATION', payload: location}
// }

export const updateResidence = (residence) => {
    return {type: 'UPDATE_RESIDENCE', payload: residence}
}

export const updateUnit = (unit) => {
    return {type: 'UPDATE_UNIT', payload: unit}
}

export const updatePhoto = (photo) => {
    return {type: 'UPDATE_PHOTO', payload: photo}
}

export const signout = () => {
    return {type: 'SIGNOUT', payload: {}}
}

export const login = () => {
    return async (dispatch, getState) => {
        try {
            const {email, password} = getState().user
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            dispatch(getUser(response.user.uid))
        } catch (e) {
            alert(e)
        }
       
    }
}

export const facebookLogin = () => {
    return async (dispatch) => {
        try {
            const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('517691692096650');
            if (type === 'success') {
                // Build Firebase credential with the Facebook access token.
                const credential = await firebase.auth.FacebookAuthProvider.credential(token);
            
                // Sign in with credential from the Facebook user.
                const response = await firebase.auth().signInWithCredential(credential);
                const user = await db.collection('users').doc(response.uid).get();
             
                if(!user.exists){
                    const newUser = {
                        uid: response.uid,
                        email: response.email,
                        fullname: response.displayName,
                        location: '',
                        residence:' ',
                        unit: '',
                        photo: response.photoURL,
                        token: null
                    }   
        
                    await db.collection('users').doc(response.uid).set(newUser)

                    dispatch({type: 'SIGNUP', payload: newUser})
                } else {
                    dispatch(getUser(response.uid))
                }
              }
        } catch (e) {
            alert(e)
        }
       
    }
}

export const signup = () => {
    return async (dispatch, getState) => {
        try {
            const {email, password, fullname, residence, unit, photo} = getState().user
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            
            if(response.user.uid){
                const user = {
                uid: response.user.uid,
                email: email,
                fullname: fullname,
                residence: residence || ' ',
                unit: unit || ' ',
                photo: photo || ' ',
                role: 'tenant',
                token: null
                }   

                await db.collection('users').doc(response.user.uid).set(user)
                dispatch({type: 'SIGNUP', payload: user})
            }
        } catch (e) {
            alert(e)
        }
       
    }
}

export const updateUser = () => {
    return async (dispatch, getState) => {
        try {
            const {user} = getState();
        
            const updatedUser = await db.collection('users').doc(user.uid).set(user);
            
            if(user.exists){
                dispatch({type: 'UPDATE_USER', payload: updatedUser.data()})
            }
        } catch (e) {
            alert(e)
        }
       
    }
}

export const getUser = (uid) => {
    return async (dispatch) => {
        try {
            const query = await db.collection('users').doc(uid).get();
            if(query.exists){
                let user = query.data();
                let posts = []
                const postsQuery = await db.collection('posts').where('uid', '==', uid).get()
                postsQuery.forEach(function(response) {
                  posts.push(response.data())
                })
                user.posts = orderBy(posts, 'date','desc')
                dispatch({type: 'LOGIN', payload: user})
            }
        } catch (e) {
            alert(e)
        }
       
    }
}



