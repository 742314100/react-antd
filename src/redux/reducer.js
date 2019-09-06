import {combineReducers} from 'redux'

import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER
} from './action-types'
import storageUtil from "../utils/storageUtil"

const initHeadTitle ='首页'

function headTitle(state=initHeadTitle,action) {
    switch(action.type){
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

const initUser =storageUtil.getUser()

function user(state=initUser,action){
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            return {...state,errorMsg:action.errorMsg}
        case RESET_USER:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    headTitle,
    user
})









