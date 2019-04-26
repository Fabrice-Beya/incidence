import firebase from 'firebase';
import db from '../config/firebase';
import cloneDeep from 'lodash/cloneDeep';

export const updateTitle = (text) => {
    return {type: 'UPDATE_TITLE', payload: text}
}

export const updateCatagory = (text) => {
    return {type: 'UPDATE_CATAGORY', payload: text}
}

// export const updateLoggedDate = (date) => {
//     return {type: 'UPDATE_LOGGED_DATE', payload: date}
// }

export const updateIncidenceDate = (date) => {
    return {type: 'UPDATE_INCIDENCE_DATE', payload: date}
}

export const updateDescription = (text) => {
    return {type: 'UPDATE_DESCRIPTION', payload: text}
}

export const updateLocation = (location) => {
    return {type: 'UPDATE_LOCATION', payload: location}
}


export const updatePhotos = (url) => {
    return async (dispatch, getState) => {
        try {
            const {postPhotos} = getState().post
            if(postPhotos){
                postPhotos.push(url)
                dispatch({type: 'UPDATE_PHOTOS', payload: postPhotos})
            } else {
                let postPhotos = [url]
                dispatch({type: 'UPDATE_PHOTOS', payload: postPhotos})
            }
        } catch (e) {
            alert(e)
        }
       
    }
}

export const uploadPost = () => {
    return async (dispatch, getState) => {
        try {
            const {post, user} = getState();
            console.log(post);
            const upload = {
                title: post.title,
                catagory: post.catagory,
                loggedDate: new Date().getDate(),
                incidenceDate: String(post.incidenceDate),
                location: post.location || {},
                description: post.description,
                postPhotos: post.postPhotos || [],
                uid: user.uid ,
                fullname: user.fullname,
                residence: user.residence,
                unit: user.unit,
                photo: user.photo || ' ',
                likes : []
            }
            const ref = await db.collection('posts').doc();
            upload.id = ref.id;
            ref.set(upload);
        } catch (e) {
            alert(e)
        }
       
    }
}

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

export const getUserPosts = (uid) => {
    return async (dispatch, getState) => {
        try {
            const posts = await db.collection('posts').where('uid', '==', uid).get();
            let resolvedPosts = []
			posts.forEach((post)=>{
				resolvedPosts.push(post.data())
            })
            console.log(resolvedPosts)
            return resolvedPosts
        } catch (e) {
            alert(e)
        }
       
    }
}

export const updatePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const posts = await db.collection('posts').doc(post.id).set();
        
        } catch (e) {
            alert(e)
        }
       
    }
}

export const likePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const {uid,username, photo} = getState().user;
            
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
                likerId: uid,
                likerPhoto: photo,
                likerName: username,
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
