import firebase from 'firebase';
import db from '../config/firebase';
import cloneDeep from 'lodash/cloneDeep';
import {allowNotifications, sendNotification, notifyAll} from './index'

export const updateScreen = (screen) => {
    return { type: 'UPDATE_SCREEN', payload: screen }
}