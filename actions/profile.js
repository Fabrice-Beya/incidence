import firebase from 'firebase';
import db from '../config/firebase';
import orderBy from 'lodash/cloneDeep';

export const getProfile = (uid) => {
    return async (dispatch) => {
        try {
            const query = await db.collection('users').doc(uid).get();
            if(query.exists){
                let profile = query.data();
                let posts = []
                const postsQuery = await db.collection('posts').where('uid', '==', uid).get()
                postsQuery.forEach(function(response) {
                  posts.push(response.data())
                })
                profile.posts = orderBy(posts, 'date','desc')
                dispatch({type: 'GET_PROFILE', payload: profile})
            }
        } catch (e) {
            alert(e)
        }
       
    }
}


