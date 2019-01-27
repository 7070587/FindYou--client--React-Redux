/*
徵才者頁面路由容器組件
 */

import React, {Component} from 'react';
import {connect} from "react-redux";

import UserList from '../../components/user-list/user-list';
import {getUserList} from '../../redux/actions'

class ApplyJob extends Component {

    // 一加載就發請求
    componentDidMount() {
        // 獲取userList
        this.props.getUserList('wantJob');
    }

    render() {
        return (
            <UserList userList={this.props.userList}/>
        );
    }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(ApplyJob);