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

export const likePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const {uid,fullname, photo} = getState().user;
            
            const home = cloneDeep(getState().post.feed);
            let newFeed = home.map(item => {
                if(item.id=== post.id){
                    item.likes.push(uid)
                } return item
            })

            const posts = await db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(uid)
            });
            db.collection('activity').doc().set({
                postId: post.id,
                postPhoto: post.photo,
                title: post.title,
                likerId: uid,
                likerPhoto: photo,
                likerName: fullname,
                uid: post.uid,
                date: new Date().getTime(),
                type: 'LIKE'
            })
            dispatch({type: 'GET_POSTS', payload: newFeed})
        } catch (e) {
            alert(e)
        }
       
    }
}

export const unlikePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const {uid} = getState().user;

            const home = cloneDeep(getState().post.feed);
            let newFeed = home.map(item => {
                if(item.id=== post.id){
                    item.likes.pop(uid)
                } return item
            })

            const posts = await db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(uid)
            });
            const query = await db.collection('activity').where('postId', '==', post.id).where('likerId', '==', uid).get();
            query.forEach((response) =>
                response.ref.delete()
            )

            dispatch({type: 'GET_POSTS', payload: newFeed})
        } catch (e) {
            alert(e)
        }
       
    }
}
