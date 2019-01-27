/*
消息頁面路由容器組件
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

/*
對chatMsgs使用chat_id來進行分組，並得到每個組的LastMsgs組成的數組（功能型的函數）
1.找出每個聊天的lastMsg，並用一個對象容器來保存 {屬性名: 屬性值} ---> {chat_id: lastMsg}
2.得到所有lastMsg的數組
3.對數組進行排序，根據create_time降序排序
 */
function getLastMsgs(chatMsgs, userId) {
    // 1.找出每個聊天的lastMsg，並用一個對象容器來保存 {屬性名: 屬性值} ---> {chat_id: lastMsg}
    const lastMsgObjs = {};

    chatMsgs.forEach(msg => {
        // 對msg進行個體的消息數量統計
        if (msg.to === userId && !msg.read) {
            msg.unReadCount = 1;
        } else {
            msg.unReadCount = 0;
        }

        // 得到msg的聊天標識id
        const chatId = msg.chat_id;

        // 獲取已經保存的當前組件lastMsg
        let lastMsg = lastMsgObjs[chatId];

        // 沒有
        if (!lastMsg) {     // 當前msg就是所在組的lastMsg
            lastMsgObjs[chatId] = msg;
        } else {    // 有
            // 累計unReadCount = 已經統計的 + 當前msg的
            const unReadCount = lastMsg.unReadCount + msg.unReadCount;
            // 如果msg比lastMsg晚，就將msg保存為lastMsg
            if (msg.create_time > lastMsg.create_time) {
                lastMsgObjs[chatId] = msg;
            }

            // 將unReadCount並保存在最新的lastMsg上
            lastMsgObjs[chatId].unReadCount = unReadCount;
        }
    });

    // 2.得到所有lastMsg的數組
    const lastMsgs = Object.values(lastMsgObjs);

    // 3.對數組進行排序，根據create_time降序排序，sort(可以傳入比較函數)
    lastMsgs.sort((m1, m2) => {
        // 如果結果 < 0（負數），將m1放在前面
        // 如果結果 = 0，位置不變
        // 如果結果 > 0（正數），將m2放在前面

        return m2.create_time - m1.create_time;
    });

    return lastMsgs;
}


class Message extends Component {
    render() {

        // 取出數據
        const {user} = this.props;      // 我
        const {users, chatMsgs} = this.props.chat;      // 對方

        // 對chatMsgs進行分組，使用chat_id來分組，只取出最後一條，組成數組，還要排序
        const lastMsgs = getLastMsgs(chatMsgs, user._id);

        return (
            <List style={{marginTop: 50, marginBottom: 50}}>

                {
                    lastMsgs.map(msg => {

                        // 得到目標用戶的id
                        const targetUserId = msg.to === user._id ? msg.from : msg.to;

                        // 得到目標用戶的訊息
                        const targetUser = users[targetUserId];

                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount}/>}
                                thumb={targetUser.avatar ? require(`../../assets/images/${targetUser.avatar}.png`) : null}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                            >
                                {msg.content}
                                <Brief>{targetUser.username}</Brief>
                            </Item>
                        );
                    })
                }

            </List>
        );
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message);