/*
登入路由組件
 */

import React, {Component} from 'react';

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";  // 渲染Redirect，會自動重定向

import Logo from '../../components/logo/logo'
import {login} from "../../redux/actions";

export class Login extends Component {

    // 保存收集的數據
    state = {
        username: '',   // 帳號
        password: '',   // 密碼
    };

    login = () => {
       // console.log(this.state);
        this.props.login(this.state);
    };

    // 處理輸入數據的改變，更新對應的狀態， name(屬性名), val
    handleChange = (name, val) => {
        // 更新狀態
        this.setState({
            //[變量]，屬性名默認是字符串，但希望是變量，所以屬性名不是name，而是name的值
            [name]: val
        });
    };

    toRegister = () => {
        this.props.history.replace('/register');
    };

    render() {

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

                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>登&emsp;&emsp;入</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>沒有帳號 點擊註冊</Button>
                    </List>

                </WingBlank>
            </div>
        );
    }
}


export default connect(
    state => ({user: state.user}),
    {login}
)(Login);
