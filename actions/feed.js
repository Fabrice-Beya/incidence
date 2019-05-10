import firebase from 'firebase';
import db from '../config/firebase';
import cloneDeep from 'lodash/cloneDeep';

export const getPosts = () => {
    return async (dispatch, getState) => {
        try {
            const posts = await db.collection('posts').get();
            let resolvedPosts = []
			posts.forEach((post)=>{
				resolvedPosts.push(post.data())
			})
            dispatch({type: 'GET_POSTS', payload: resolvedPosts})
        } catch (e) {
            alert(e)
        }
       
    }
}

