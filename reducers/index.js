import { combineReducers } from 'redux'

const user = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_EMAIL':
            return { ...state, email: action.payload }
        case 'UPDATE_PASSWORD':
            return { ...state, password: action.payload }
        case 'UPDATE_fullname':
            return { ...state, fullname: action.payload }
        case 'UPDATE_LOCATION':
            return {...state, location: action.payload}
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

const post = (state ={}, action) => {
    switch (action.type) {
        case 'UPDATE_TITLE':
            return {...state, title: action.payload}
        case 'UPDATE_CATAGORY':
            return {...state, catagory: action.payload}
        case 'UPDATE_LOGGED_DATE':
            return {...state, loggedDate: action.payload}
        case 'UPDATE_INCIDENCE_DATE':
            return {...state, incidenceDate: action.payload}
        case 'UPDATE_DESCRIPTION':
            return {...state, description: action.payload}
        case 'UPDATE_PHOTOS':
            return {...state, postPhotos: action.payload}
        case 'UPDATE_LOCATION':
            return {...state, location: action.payload}
        case 'UPDATE_POST':
            return  action.payload;
        default:
            return state
    }
}   

const feed = (state ={}, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return {...state, feed: action.payload}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user,
    post,
    feed
})

export default rootReducer;