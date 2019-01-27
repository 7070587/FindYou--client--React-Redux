/*
主界面路由組件
 */

import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Cookies from 'js-cookie';    // 可以操作前端cookie的容器 set()/ get() /remove()
import {NavBar} from "antd-mobile";


import ApplyJobInfo from '../applyJob-info/applyJob-info';
import WantJobInfo from '../wantJob-info/wantJob-info'
import ApplyJob from '../applyjob/applyjob'
import WantJob from '../wantjob/wantjob'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'

import {getRedirectTo} from "../../utils";
import {getUser} from "../../redux/actions";

class Main extends Component {

    // 給組件對象添加屬性
    navList = [     // 包含所有導航組件的相關訊息數據
        {
            path: '/applyjob',       // 路由路徑
            component: ApplyJob,
            title: '求職者列表',      // 徵才者看到的頁面會是求職者的
            icon: 'wantjob',
            text: '求職',
        },
        {
            path: '/wantjob',       // 路由路徑
            component: WantJob,
            title: '徵才者列表',     // 求職者看到的頁面會是徵才者的
            icon: 'applyjob',
            text: '徵才',
        },
        {
            path: '/message', // 路由路徑
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路徑
            component: Personal,
            title: '個人帳號中心',
            icon: 'personal',
            text: '個人',
        }
    ];

    componentDidMount() {
        //曾經登入過（cookie中有userId），但現在還沒有登入（Redux管理的user中，沒有_id），發請求去獲取對應的user
        const userId = Cookies.get('userId');
        const {_id} = this.props.user;
        if (userId && !_id) {
            // 發送ajax異步請求，獲取user資訊
            this.props.getUser();
        }
    }

    render() {

        // 讀取cookie中的userId，
        const userId = Cookies.get('userId');

        // 如果沒有userId，自動重定向到登入界面
        if (!userId) {
            return <Redirect to='/login'/>
        }

        // 如果有，讀取redux中的user狀態
        const {user, unReadCount} = this.props;

        // 如果user沒有_id，返回null，即不做任何顯示
        if (!user._id) {
            return null;
        } else {
            // 如果有_id，表示已經有帳號資訊，顯示對應的界面
            // 如果已經登入了，如果請求根路徑，根據user的type和avatar來計算出一個重定向的路徑，並且自動重定向
            let path = this.props.location.pathname;
            if (path === '/') {
                // 得到一個重定向的路由路經
                path = getRedirectTo(user.type, user.avatar);
                return <Redirect to={path}/>
            }
        }

        const {navList} = this;
        const path = this.props.location.pathname;  // 請求的路徑

        // 得到當前的nav，可能沒有
        const currentNav = navList.find(nav => nav.path === path);
        // 在數組中找元素，使用find(callback, true) true --> 找到第一個數組元素

        // 用帳號類型去判斷要隱藏的路由
        if (currentNav) {
            // 決定哪個路由需要隱藏
            if (user.type === 'applyJob') {
                // 隱藏數組的第2個（title: '徵才者列表'）
                navList[1].hide = true;
            } else {
                // 隱藏數組的第1個（title: '求職者列表'）
                navList[0].hide = true;
            }
        }

        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)

                    }
                    <Route path={'/applyjobinfo'} component={ApplyJobInfo}/>
                    <Route path={'/wantjobinfo'} component={WantJobInfo}/>
                    <Route path={'/chat/:userId'} component={Chat}/>

                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount} /> : null}
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user, unReadCount: state.chat.unReadCount}),
    {getUser}
)(Main)

/*
1.實現自動登入
（1）在componentDidMount()
曾經登入過（cookie中有userId），但現在還沒有登入（Redux管理的user中，沒有_id），發請求去獲取對應的user

2.render()
（1）如果cookie中沒有userId，直接重定向到login
（2）判斷Redux管理的user中是否有_id，如果沒有_id，暫時不做任何顯示
（3）Redux管理的user中有_id，說明當前已經登入，顯示對應的頁面
（4）如果請求根路徑：根據user的type和avatar來計算出一個重定向的路徑，並且自動重定向
如果cookie中沒有userId，自動進入login登入頁面


 */
