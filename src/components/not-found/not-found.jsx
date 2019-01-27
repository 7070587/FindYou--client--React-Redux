/*
提示找不到頁面的UI路由組件
 */

import React, {Component} from 'react';
import {Button} from "antd-mobile";


class NotFound extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>抱歉，找不到該頁面</h2>
                    <Button type='primary'
                            onClick={() => this.props.history.replace('/')}>
                        回首頁
                    </Button>
                </div>
            </div>
        )
    }
}

export default NotFound;