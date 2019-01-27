/*
包含多個action type名稱常量
 */

/*  ----- 操作 user 數據 ----- */

// 註冊或登入成功的action type
export const AUTH_SUCCESS = 'auth_success';

// 註冊或登入失敗的錯誤提示訊息，請求前/請求後
export const ERROR_MSG = 'error_msg';

// 接收帳號
export const RECEIVE_USER = 'receive_user';

// 重新設定帳號訊息
export const RESET_USER = 'reset_user';

/*  ----- 操作 user 數據 ----- */


/*  ----- 操作 userList 數據 ----- */

// 接收帳號列表數據
export const RECEIVE_USER_LIST = 'receive_user_list';


/*  ----- 操作 chat 數據 ----- */

// 接收所有相關消息列表
export const RECEIVE_MSG_LIST = 'receive_msg_list';

// 接收一條消息
export const RECEIVE_MSG = 'receive_msg';

// 查看過了某個聊天消息
export const MSG_READ = 'msg_read';