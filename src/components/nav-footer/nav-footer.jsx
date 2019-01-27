/*
底部導航
 */

import React, {Component} from 'react';
import {TabBar} from "antd-mobile";
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";

const Item = TabBar.Item;

// 希望在非路由組建中使用路由庫的api？
// 使用withRouter()

class NavFooter extends Component {

    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired

    };

    render() {
        let {navList, unReadCount} = this.props;

        // 過濾掉hide為true的nav
        navList = navList.filter(nav => !nav.hide);
        const path = this.props.location.pathname;      // this.props.location.pathname --> 路由主見才會有這個屬性

        return (
            <TabBar>
                {
                    navList.map((nav) => (
                        <Item key={nav.path}
                              badge={nav.path === '/message' ? unReadCount : 0}
                              title={nav.text}
                              icon={{uri: require(`./images/${nav.icon}.png`)}}
                              selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                              selected={path === nav.path}
                              onPress={() => this.props.history.replace(nav.path)}
                        />
                    ))
                }
            </TabBar>
        );
    }
}

// 向外暴露withRouter()包裝產生的組件
// 內部會向組建中傳入一些路由組件特有的屬性：history/location/math
export default withRouter(NavFooter);
