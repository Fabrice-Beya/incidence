import firebase from 'firebase';
import db from '../config/firebase';
import orderBy from 'lodash/cloneDeep';


export const getComments = (id) => {
    return async (dispatch) => {
        try {
            const query = await db.collection('comments').where('postId', '==', id).get();
           
                let comments = []
                query.forEach(function(response) {
                    comments.push(response.data())
                })
                dispatch({type: 'GET_COMMENTS', payload:  comments})
         
        } catch (e) {
            alert(e)
        }
       
    }
}


