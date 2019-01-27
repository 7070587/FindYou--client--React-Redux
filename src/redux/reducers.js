/*
包含多個reducer函數：根據老的state和指定的action返回一個新的state
 */

import {combineReducers} from 'redux';

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST,
    MSG_READ
} from "./action-types";
import {getRedirectTo} from '../utils/index';

// 註冊後，服務器返回的是user（code, user, msg）
// 產生user狀態的reducer
// initUser是一個對象
const initUser = {
    username: '',      // 用戶名
    type: '',          // 用戶類型  wantJob/applyJob
    msg: '',           // 錯誤提示訊息
    redirectTo: ''     // 需要自動重定向的路由路徑
};

// 產生user狀態的reducer
function user(state = initUser, action) {   // initUser為state的初始值
    switch (action.type) {
        case AUTH_SUCCESS:  // data是user
            const {type, avatar} = action.data;
            return {...action.data, redirectTo: getRedirectTo(type, avatar)};
        case ERROR_MSG:     // data是msg
            return {...state, msg: action.data};
        case RECEIVE_USER:     // data是user
            return action.data;
        case RESET_USER:     // data是msg
            return {...initUser, msg: action.data};  // initUser清除之前的data，之後會自動跳轉到登入頁面
        default:
            return state;
    }
}

const initUserList = [];
// 產生userList狀態的reducer
function userList(state = initUserList, action) {   // initUserList為state的初始值
    switch (action.type) {
        case RECEIVE_USER_LIST:     // data為userList
            return action.data;
        default:
            return state;
    }
}


const initChat = {
    users: {},          // 所有帳戶訊息的對象，屬性名：userId、屬性值：{username, avatar}
    chatMsgs: [],        // 當前帳號所有相關msg的數組
    unReadCount: 0      // 總的消息未讀數量
};

// 產生聊天狀態的reducer
function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:      // data: {users, chatMsgs}
            const {users, chatMsgs, userId} = action.data;
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userId ? 1: 0), 0)
            };
        case RECEIVE_MSG:   // data: chatMsg
            const {chatMsg} = action.data;
            return  {
                users: state.users,
                // 先留下state.chatMsgs裡面的所有元素，之後再加上chatMsg，因為不能改變原來狀態的內容，只能加上新的
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userId ? 1: 0)

            };
        case MSG_READ:
            const {count, from, to} = action.data;
            state.chatMsgs.forEach(msg => {
                // 判斷是否需要更新
                if (msg.from === from && msg.to ===to && !msg.read) {
                    msg.read = true;
                }
            });
            return  {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to ===to && !msg.read) {     // 需要更新
                        return {...msg, read: true}
                    } else {    // 不需要更新
                        return msg;
                    }
                }),
                unReadCount: state.unReadCount - count
            };
        default:
            return state;
    }
}

export default combineReducers({
    user, userList, chat
});

// 向外暴露的狀態結構：{user: {}, userList: [], chat: {}}

