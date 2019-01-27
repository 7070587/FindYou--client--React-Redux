/*
選擇用戶頭像的UI組件
 */

import React, {Component} from 'react';
import {List, Grid} from "antd-mobile";
import PropTypes from 'prop-types';

export default class AvatarSelector extends Component {

    static propTypes = {
        setAvatar: PropTypes.func.isRequired
    };

    // 設置icon初始值為null
    state = {
        icon: null
    };

    constructor(props) {
        super(props);
        // 準備需要顯示的列表數據
        this.avatarList = [];
        for (let i = 0; i < 10; i++) {
            this.avatarList.push({
                text: `頭像${i + 1}`,
                icon: require(`../../assets/images/頭像${i + 1}.png`)    // 不能使用import
            });
        }
    }

    // el數組中被點擊的元素，並以解構的寫法來寫
    handleClick = ({text, icon}) => {
        // 更新當前組件狀態
        this.setState({icon});
        // 調用函數更新父組件（頭像名稱）狀態
        this.props.setAvatar(text);
    };

    render() {
        // 頭部界面
        const {icon} = this.state;
        const listAvatar = !icon ? '請選擇頭像' : (
            <div>
                已經選擇頭像：&nbsp;<img src={icon}/>
            </div>
        );
        return (
            <List renderHeader={() => listAvatar}>
                <Grid data={this.avatarList}
                      columnNum={5}
                      onClick={this.handleClick}>
                </Grid>
            </List>
        );
    }
}

