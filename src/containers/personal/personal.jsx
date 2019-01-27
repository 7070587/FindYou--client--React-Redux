/*
個人中心頁面路由容器組件
 */

import React, {Component} from 'react';
import {Result, List, WhiteSpace, Button, Modal} from "antd-mobile";
import {connect} from 'react-redux'
import Cookies from 'js-cookie';

import {resetUser} from "../../redux/actions";

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends Component {

    logout = () => {
        Modal.alert('登出', '確認退出登入嘛？', [
            {text: '取消'},
            {
                text: '確認',
                onPress: () => {
                    // 退出登入
                    // 刪除cookie中的userId
                    Cookies.remove('userId');

                    // 刪除Redux管理的user，使user回到初始狀態
                    this.props.resetUser();
                },
            }
        ])
    };

    render() {
        const {username, avatar,company, position, info, experience, salary, language, skill} = this.props.user;

        return (
            <div style={{marginBottom: 50, marginTop: 50}}>
                <Result
                    img={<img src={require(`../../assets/images/${avatar}.png`)} style={{width: 50}} alt="avatar" />}
                    title={username}
                    message={company}
                />

                <List renderHeader={() => '相關訊息'}>
                    <Item multipleLine>
                        <Brief>職缺名稱： {position}</Brief>
                        <Brief>簡介： {info}</Brief>
                        <Brief>工作經歷： {experience}</Brief>
                        {salary ? <Brief>工作待遇： {salary}</Brief> : null}
                        {language ? <Brief>語文能力： {language}</Brief> : null}
                        {skill ? <Brief>技能專長： {skill}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/> <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logout}>登&emsp;出</Button>
                </List>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal)