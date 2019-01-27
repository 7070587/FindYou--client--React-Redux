/*

 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavBar, List, InputItem, Grid, Icon} from "antd-mobile";
import {sendMsg, readMsg} from '../../redux/actions';
import QueueAnim from 'rc-queue-anim';

const Item = List.Item;

class Chat extends Component {

    state = {
        content: '',
        isShow: false   // 是否顯示表情列表，默認為不顯示
    };

    // 在第一次render()之前回調
    componentWillMount() {
        // 初始化表情列表數據
        const emojis = [
            '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆',
            '😉', '😊', '😋', '😎', '😍', '😙', '😚', '🙂',
            '🤗', '🤔', '😐', '😑', '😶', '🙄', '😏', '😣',
            '😥', '🤓', '😰', '😱', '😮', '🤐', '😯', '😪',
            '😫', '😴', '😌', '😛', '🤤', '😒', '😓', '😔',
            '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😩',
            '😟', '😤', '😢', '😭', '😦', '😧', '😨', '🤧',
            '😵', '😡', '😠', '😷', '🤒', '🤕', '🤢', '😬',
            '😇', '🤠', '🤥', '😘', '😳', '🙌', '🙏', '✍',
            '👈', '👉', '☝', '👆', '🖕', '👇', '✌', '🖖',
            '🤘', '🤙', '🖐', '✋', '👌', '👍', '👎', '✊',
            '👊', '🤛', '🤜', '🤚', '👋', '👏', '👐', '🤝',
        ];
        this.emojis = emojis.map(emoji => ({text: emoji}));
    }

    componentDidMount() {
        // 初始化顯示列表：點擊進入後會自動到底部
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentDidUpdate() {
        // 初始更新示列表：發消息後會自動到底部
        window.scrollTo(0, document.body.scrollHeight);

    }

    componentWillUnmount() {    // 在退出之前
        // 發請求，更新消息的未讀狀態，未讀 --> 已讀
        const from = this.props.match.params.userId;
        const to = this.props.user._id;
        this.props.readMsg(from, to);
    }

    // 解決表情包的bug
    toggleShow = () => {
        const isShow = !this.state.isShow;
        this.setState({isShow});
        if (isShow) {
            // 異步手動派發resize 事件,解決表情列表顯示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    };

    handleSend = () => {
        // 收集數據
        const from = this.props.user._id;
        const to = this.props.match.params.userId;
        const content = this.state.content.trim();

        // 發送請求（發消息）
        if (content) {
            this.props.sendMsg({from, to, content});
        }
        // 清除輸入數據
        this.setState({
            content: '',
            isShow: false
        });

    };

    render() {

        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;

        // 計算當前聊天的chatId
        const meId = user._id;

        // 判斷users是否有值
        if (!users[meId]) {     // 如果沒有獲取到數據，直接不做任何顯示
            return null;
        }

        const targetId = this.props.match.params.userId;
        const targetName = this.props.match.params.username;
        const chatId = [meId, targetId].sort().join('_');

        // 對chatMsgs進行過濾，使用chat_id進行過濾
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);

        // 得到得到目標用戶的avatar圖片對象
        const targetAvatar = users[targetId].avatar;
        // 判斷是否有頭像，有頭像才顯示，沒有頭像不顯示
        const targetIcon = targetAvatar ? require(`../../assets/images/${targetAvatar}.png`) : null;

        return (

            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left'/>}
                    className='sticky-header'
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                <List style={{marginTop: 50, marginBottom: 50}}>
                    <QueueAnim type='alpha' delay={100}>
                        {/* alpha left right top bottom scale scaleBig scaleX scaleY */}
                        {/* 根據Msgs產生多個List標籤 */}
                        {
                            msgs.map(msg => {
                                if (targetId === msg.from) {     // 對方發給我的消息
                                    return (
                                        <Item
                                            key={msg._id}
                                            thumb={targetIcon}
                                        >
                                            {msg.content}
                                        </Item>
                                    );
                                } else {    // 我發給對方的消息 meId === msg.to

                                    return (
                                        <Item
                                            key={msg._id}
                                            className='chat-me'
                                            extra='我'
                                        >
                                            {msg.content}
                                        </Item>
                                    );
                                }
                            })
                        }
                    </QueueAnim>


                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="請輸入"
                        value={this.state.content}
                        onChange={val => this.setState({content: val})}
                        onFocus={() => this.setState({isShow: false})}
                        extra={
                            <span>
                                <span onClick={this.toggleShow} style={{marginRight: 6}}>😊</span>
                            <span onClick={this.handleSend}>送出</span>
                            </span>
                        }
                    />
                    {this.state.isShow ? (
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                this.setState({content: this.state.content + item.text})
                                //    先顯示content，之後再加上表情包
                            }}
                        />
                    ) : null}

                </div>
            </div>);
    }
}


export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg, readMsg}
)(Chat);