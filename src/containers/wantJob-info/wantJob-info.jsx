/*
求職者（找工作）訊息完善路由容器組件
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {NavBar, InputItem, TextareaItem, Button} from "antd-mobile";


import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import {updateUser} from "../../redux/actions";

class WantJobInfo extends Component {

    // 收集填寫的資訊
    state = {
        avatar: '',
        position: '',
        info: '',
        skill: '',
        experience: '',
        language: '',
    };

    // 設置更新頭像的狀態，set方法設置什麼，參數就傳什麼
    setAvatar = (avatar) => {
        this.setState({
            avatar
        });
    };


    // 收集訊息的函數
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    // 保存訊息
    save = () => {
        this.props.updateUser(this.state);
    };

    render() {

        // 如果帳號資訊已經完善，自動重定向到對應的主界面
        const {avatar, position, info, skill, language, experience, type} = this.props.user;
        if (avatar && position && info && skill && language && experience) {   // 說明帳號訊息已經更新
            const path = type === 'wantJob' ? '/wantjob' : '/applyjob';
            return <Redirect to={path} />
        }

        return (
            <div>
                <NavBar>填&nbsp;寫&nbsp;求&nbsp;職&nbsp;者&nbsp;訊&nbsp;息</NavBar>
                <AvatarSelector setAvatar={this.setAvatar}/>
                <InputItem onChange={val => {this.handleChange('position', val)}}>職務名稱：</InputItem>
                <InputItem onChange={val => {this.handleChange('experience', val)}}>工作經歷：</InputItem>
                <InputItem onChange={val => {this.handleChange('language', val)}}>語文能力：</InputItem>
                <TextareaItem title='技能專長：' rows={2}
                              onChange={val => {this.handleChange('skill', val)}}/>
                <TextareaItem title='個人簡介：' rows={3}
                              onChange={val => {this.handleChange('info', val)}}/>
                <Button type='primary' onClick={this.save}>儲&emsp;存</Button>
            </div>
        );
    }
}


export default connect(
    state => ({user: state.user}),
    {updateUser}
)(WantJobInfo)
