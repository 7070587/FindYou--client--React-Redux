/*
能發送ajax請求的函數模塊
函數的返回值是promise對象
 */

import axios from 'axios';

// data={}請求的數據對象，type請求方式
export default function ajax(url, data = {}, type = 'GET') {
    if (type === 'GET') {   // 發送GET請求
        // 拼請求參數的字符串
        // data: {username: '展耀', password: 0000}
        // paramStr: username=展耀&password=0000
        // 得到的是keys對象的所有數組，keys是屬性名，就是username和password組成的數組
        let paramStr = '';
        Object.keys(data).forEach(key => {
            paramStr += `${key}=${data[key]}&`;
        });
        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length - 1);     // paramStr.length - 1 去掉最後一個字
        }
        // 使用axios發get請求
        return axios.get(`${url}?${paramStr}`);
    } else if (type === 'POST') {    // 發送POST請求
        // 使用axios發post請求
        return axios.post(url, data);
    }

}