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

const profile = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PROFILE':
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
        case 'CLEAR_POST':
            return  action.payload;
        case 'UPDATE_COMMENT':
            return {...state, comment: action.payload}
        case 'UPDATE_STATUS':
            return {...state, status: action.payload}
        default:
            return state
    }
}  

const messages = (state = {}, action) => {
    switch (action.type) {
      case 'GET_MESSAGES':
        return action.payload
      default:
        return state
    }
  }

  const comments = (state = [], action) => {
    switch (action.type) {
      case 'GET_COMMENTS':
        return action.payload
    case 'UPDATE_COMMENTS':
        return action.payload
      default:
        return state
    }
  }

const feed = (state =null, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return action.payload;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user,
    post,
    feed, 
    profile,
    messages,
    comments
})

export default rootReducer;