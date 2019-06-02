import firebase from 'firebase';
import db from '../config/firebase';
import orderBy from 'lodash/cloneDeep';
import { allowNotifications, sendNotification } from './index'


export const getPosts = () => {
    return async (dispatch, getState) => {
        try {
            const { role, residence } = getState().user;
            let resolvedPosts = []
            if (role === 'keeper') {
                const posts = await db.collection('posts').get();
                posts.forEach(async (post) => {
                    resolvedPosts.push(post.data())
                })
            } else {
                const posts = await db.collection('posts').where("residence", "==", residence).get();
                posts.forEach(async (post) => {
                    resolvedPosts.push(post.data())
                })
            }

            await dispatch(allowNotifications())
            dispatch({ type: 'GET_POSTS', payload: orderBy(resolvedPosts, 'loggedDate', 'desc') })
        } catch (e) {
            alert(e)
        }

    }
}

