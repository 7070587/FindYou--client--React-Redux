/*
包含多個action create
異步action（註冊、登入）
同步action
 */

import io from 'socket.io-client';
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from "./action-types";
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
} from '../api';


// 授權成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});

// 錯誤提示訊息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});

// 接收帳號的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user});

// 更新帳號的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg});

// 接收帳號列表的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList});

// 接收消息列表的同步action
const receiveMsgList = ({users, chatMsgs, userId}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userId}});

// 接收一個消息的同步action
const receiveMsg = (chatMsg, userId) => ({type: RECEIVE_MSG, data: {chatMsg, userId}});

// 讀取某個聊天消息的同步action
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}});



// 註冊異步action
export const register = (user) => {
    const {username, password, password2, type} = user;

    // 表單的前台驗證：如果不通過，返回一個errorMsg的同步action
    if (!username) {    // 帳號必須要輸入
        return errorMsg(`請輸入帳號`);
    } else if (!password) {    // 密碼必須要輸入
        return errorMsg(`請輸入密碼`);
    } else if (!password2) {    // 再次確認密碼必須要輸入
        return errorMsg(`請再次輸入密碼，以便進行確認`);
    } else if (password !== password2) {    // 確認兩次密碼是否輸入相同，如果不相同，返回一個errorMsg的同步action
        return errorMsg(`兩次輸入的密碼需要一致，請重新輸入`);
    }

    // 表單數據合法，返回一個發ajax請求的異步action函數
    return async dispatch => {      // 這邊就需要加上async
        // 發送註冊的異步請求，返回的是promise對象
        // 執行一個函數得到一個promise，但是不想要promise，而是想要一個異步結果，就可以使用await
        const response = await reqRegister({username, password, type});   // 這裡寫了await
        const result = response.data;   // {code: 0/1 data:user / msg: ''}
        if (result.code === 0) {    // 註冊成功
            // 登入成功，就接收聊天消息列表
            getMsgList(dispatch, result.data._id);
            // 分發授權成功的同步action
            dispatch(authSuccess(result.data))
        } else {    // 註冊失敗
            // 分發失敗的同步action，顯示錯誤訊息
            dispatch(errorMsg(result.msg));
        }

        // const response = reqRegister(user);
        // response.then(response => {
        //     const result = response.data;   // {code: 0/1 data:user / msg: ''}
        // });

    }
};


// 登入異步action
export const login = (user) => {
    const {username, password} = user;

    // 表單的前台驗證：如果不通過，返回一個errorMsg的同步action
    if (!username) {    // 帳號必須要輸入
        return errorMsg(`請輸入帳號`);
    } else if (!password) {    // 密碼必須要輸入
        return errorMsg(`請輸入密碼`);
    }

    // 表單數據合法，返回一個發ajax請求的異步action函數
    return async dispatch => {      // 這邊就需要加上async
        // 發送註冊的異步請求，返回的是promise對象
        // 執行一個函數得到一個promise，但是不想要promise，而是想要一個異步結果，就可以使用await
        const response = await reqLogin(user);   // 這裡寫了await
        const result = response.data;   // {code: 0/1 data:user / msg: ''}
        if (result.code === 0) {    // 登入成功
            // 登入成功，就接收聊天消息列表
            getMsgList(dispatch, result.data._id);
            // 分發授權成功的同步action
            dispatch(authSuccess(result.data))
        } else {    // 註冊失敗
            // 分發失敗的同步action，顯示錯誤訊息
            dispatch(errorMsg(result.msg));
        }

        // const response = reqLogin(user);
        // response.then(response => {
        //     const result = response.data;   // {code: 0/1 data:user / msg: ''}
        // });

    }
};

// 更新帳號異步action
export const updateUser = (user) => {

    return async dispatch => {
        const response = await reqUpdateUser(user);
        const result = response.data;

        if (result.code === 0) {    // 更新成功：data
            // 分發同步action
            dispatch(receiveUser(result.data));
        } else {    // 更新失敗：msg
            dispatch(resetUser(result.msg));

        }
    }
};

// 獲取帳號異步action
export const getUser = () => {
    return async dispatch => {
        // 執行異步ajax請求
        const response = await reqUser();
        const result = response.data;

        if (result.code === 0) {    // 成功獲取數據
            // 登入成功，就接收聊天消息列表
            getMsgList(dispatch, result.data._id);
            // 分發同步action
            dispatch(resetUser(result.data));
        } else {    // 獲取數據失敗
            dispatch(resetUser(result.msg));
        }

    }

};


// 獲取帳號列表的異步action
export const getUserList = (type) => {
    return async dispatch => {
        // 執行異步ajax請求
        const response = await reqUserList(type);
        const result = response.data;

        // 得到結果後，分發一個同步action
        if (result.code === 0) {
            dispatch(receiveUserList(result.data));
        }
    }
};

/*
單例模式：只有單一個實例，整個類裡面只有單一個socket
1.創建對象之前：判斷對象是否已經存在，只有不存在的時候才去創建對象
2.創建對象之後：保存對象，對象保存在哪裡？一般有兩種，
（1）保存在外部（全域）
（2）保存在某個對象裡面

 */

// 封裝啟動IO的函數
function initIO(dispatch, userId) {
    //1.創建對象之前：判斷對象是否已經存在，只有不存在的時候才去創建對象
    //把socket對象存在io裡面，（1）io是唯一的 （2）io存在於函數外部，所有函數都能看到，io是函數也是對象
    // 因此要先判斷io裡面是否有socket對象
    if (!io.socket) {
        // 連接server，得到與server的連接對象
        io.socket = io('ws://localhost:4000');   // 2.創建對象之後：保存對象

        // 綁定監聽，接收server發送的消息
        io.socket.on('receiveMsg', (chatMsg) => {
            console.log(`客戶端接收server發送的消息：`, chatMsg);

            // 只有當chatMsg是與當前帳號相關的消息，才去分發同步action保存消息
            // 可以使用from或to和當前的帳號進行比較
            if (userId === chatMsg.from || userId === chatMsg.to) {
                dispatch(receiveMsg(chatMsg));
            }
        });
    }
}

// 異步封裝獲取消息的函數
async function getMsgList(dispatch, userId) {
    // 初始化IO，並啟動監視
    initIO(dispatch, userId);
    const response = await reqChatMsgList();
    const result = response.data;
    if (result.code === 0) {
        const {users, chatMsgs} = result.data;

        // 分發同步action
        dispatch(receiveMsgList({users, chatMsgs, userId}));
    }
}

// 發送消息的異步action
export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        console.log('客戶端向server發送消息', {from, to, content});
        // 發消息給server
        io.socket.emit('sendMsg', {from, to, content});

    }
};

// 讀取消息的異步action
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsg(from);
        const result = response.data;
        if (result.code === 0) {
            const count = result.data;

            // 分發同步action
            dispatch(msgRead({count, from, to}));

        }

    }
};