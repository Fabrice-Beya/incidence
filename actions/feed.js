import firebase from 'firebase';
import db from '../config/firebase';
import orderBy from 'lodash/cloneDeep';


export const getPosts = () => {
    return async (dispatch, getState) => {
        try {
            const posts = await db.collection('posts').get();
            let resolvedPosts = []
			posts.forEach((post)=>{
				resolvedPosts.push(post.data())
			})
            dispatch({type: 'GET_POSTS', payload: orderBy(resolvedPosts, 'date', 'desc')})
        } catch (e) {
            alert(e)
        }
       
    }
}

