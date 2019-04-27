import firebase from 'firebase';
import db from '../config/firebase';
import cloneDeep from 'lodash/cloneDeep';

export const updateTitle = (text) => {
    return {type: 'UPDATE_TITLE', payload: text}
}

export const updateCatagory = (text) => {
    return {type: 'UPDATE_CATAGORY', payload: text}
}

export const updateIncidenceDate = (date) => {
    return {type: 'UPDATE_INCIDENCE_DATE', payload: date}
}

export const updateDescription = (text) => {
    return {type: 'UPDATE_DESCRIPTION', payload: text}
}

export const updateLocation = (location) => {
    return {type: 'UPDATE_LOCATION', payload: location}
}

export const updatePostLocal = (post) => {
    return {type: 'UPDATE_POST', payload: post}
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
                catagory: post.catagory || 'Other',
                loggedDate: new Date().getDate() || '',
                incidenceDate: String(post.incidenceDate).substring(0, String(post.incidenceDate).indexOf('G')) || new Date().getDate(),
                location: post.location || {},
                description: post.description || ' ',
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

export const updatePost = () => {
    return async (dispatch, getState) => {
        try {
           const post = getState().post;
           
            const posts = await db.collection('posts').doc(post.id).set(post);
        
        } catch (e) {
            alert(e)
        }
       
    }
}

export const deletePost = () => {
    return async (dispatch, getState) => {
        try {
           const {id} = getState().post;
           
            const posts = await db.collection('posts').doc(id).delete()
        
        } catch (e) {
            alert(e)
        }
       
    }
}

