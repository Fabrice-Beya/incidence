import { combineReducers } from 'redux'

const user = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_EMAIL':
            return { ...state, email: action.payload }
        case 'UPDATE_PASSWORD':
            return { ...state, password: action.payload }
        case 'UPDATE_fullname':
            return { ...state, fullname: action.payload }
        // case 'UPDATE_LOCATION':
        //     return {...state, location: action.payload}
        case 'UPDATE_RESIDENCE':
            return { ...state, residence: action.payload }
        case 'UPDATE_UNIT':
            return { ...state, unit: action.payload }
        case 'UPDATE_PHOTO':
            return { ...state, photo: action.payload }
        case 'LOGIN':
            return action.payload
        case 'SIGNUP':
            return action.payload
        case 'SIGNOUT':
            return action.payload;
        default:
            return state
    }
}

// const post = (state = null, action) => {
//     switch (action.type) {
//         case 'UPDATE_DESCRIPTION':
//             return {...state, description: action.payload}
//         case 'GET_POSTS':
//             return {...state, feed: action.payload}
//         default:
//             return state
//     }
// }   

const rootReducer = combineReducers({
    user,
    // post
})

export default rootReducer;