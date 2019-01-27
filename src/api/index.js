/*
包含多個接口請求的函數的模塊
函數的返回值是promise對象
 */

import ajax from './ajax';

// 接口請求函數的命名都是reqXXX的形式
// 註冊API接口
// user：包含帳號所有相關信息的對象
export const reqRegister = (user) => ajax('/register', user, 'POST');
// '/register'因為埠號不同，所以無法發送請求
// 'http://localhost:4000/register' 會有跨域問題，client是3000，而server是4000
// 解決方法之一：使用代理：在package.json加入"proxy": "http://localhost:4000" ，而'/register'維持不變

// 登入API接口
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST');

// 更新帳號API接口
export const reqUpdateUser = (user) => ajax('/update', user, 'POST');

// 獲取帳號訊息API接口，GET為預設值，可以不用寫
export const reqUser =() => ajax('/user', "GET");

// 獲取帳號列表API接口
export const reqUserList =(type) => ajax('/userlist', {type},);

// 獲取當前帳號的聊天消息列表API接口
export const reqChatMsgList =() => ajax('msglist');

// 修改指定消息為已讀API接口
export const reqReadMsg =(from) => ajax('readmsg', {from}, 'POST');