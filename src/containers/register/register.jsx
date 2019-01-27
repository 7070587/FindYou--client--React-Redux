/*
註冊路由組件
 */

import React, {Component} from 'react';
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";  // 渲染Redirect，會自動重定向

import Logo from '../../components/logo/logo'
import {register} from "../../redux/actions";   // 引入註冊的異步action

const ListItem = List.Item;

export class Register extends Component {

    // 保存收集的數據
    state = {
        username: '',   // 帳號
        password: '',   // 密碼
        password2: '',  // 確認密碼
        type: 'wantJob',       // 帳號類型     wantjob
    };

    // 點擊註冊調用
    register = () => {
       // console.log(this.state);
        // register()，()的參數看異步action裡面的接收什麼 --> {username, password, type}，就是上面的state不要password2
        this.props.register(this.state)
    };

    // 處理輸入數據的改變，更新對應的狀態， name(屬性名), val
    handleChange = (name, val) => {
        // 更新狀態
        this.setState({
            //[變量]，屬性名默認是字符串，但希望是變量，所以屬性名不是name，而是name的值
            [name]: val
        });
    };

    toLogin = () => {
        this.props.history.replace('/login');
    };

    render() {
        const {type} = this.state;      // 讀取type的值
        const {msg, redirectTo} = this.props.user;

        // 判斷redirectTo是否有值，如果有值，就需要重定向到指定的路由路徑
        if (redirectTo) {
            // 下面的return就不用執行，一定要用{}寫to={redirectTo}
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>Find&emsp;You!!&emsp;求&nbsp;職&nbsp;交&nbsp;流&nbsp;平&nbsp;台</NavBar>
                <WhiteSpace/> <WhiteSpace/> <WhiteSpace/>
                <Logo/>
                <WingBlank>
                    <WhiteSpace/> <WhiteSpace/> <WhiteSpace/>
                    {msg ? <div className='error-msg'>{msg}</div> : null}
                    <List>
                        <InputItem placeholder='請輸入帳號' onChange={val => {this.handleChange('username', val)}}>帳號：</InputItem>
                        <InputItem placeholder='請輸入密碼' type='password' onChange={val => {this.handleChange('password', val)}}>密碼：</InputItem>
                        <InputItem placeholder='請再次確認密碼' type='password' onChange={val => {this.handleChange('password2', val)}}>確認密碼：</InputItem>
                        <ListItem>
                            <span>帳號類型：</span>
                            &emsp;
                            <Radio checked={type === 'wantJob'} onChange={() => {this.handleChange('type', 'wantJob')}}>求職</Radio>
                            &emsp;&emsp;
                            <Radio checked={type === 'applyJob'} onChange={() => {this.handleChange('type', 'applyJob')}}>徵才</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>註&emsp;&emsp;冊</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有帳號&emsp;直接登入</Button>
                    </List>

                </WingBlank>
            </div>
        );
    }
}


export default connect(
    state => ({user: state.user}),
    {register}
)(Register);
