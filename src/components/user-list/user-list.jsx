/*
顯示指定用戶列表的UI組件
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {WingBlank, WhiteSpace, Card} from "antd-mobile";
import {withRouter} from "react-router-dom";
import QueueAnim from 'rc-queue-anim';


const Header = Card.Header;
const Body = Card.Body;

class UserList extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    };

    render() {
        const {userList} = this.props;

        return (
            <WingBlank style={{marginBottom: 50, marginTop: 50}}>
                <QueueAnim type='scale' delay={100}>
                    {/* alpha left right top bottom scale scaleBig scaleX scaleY */}

                    {
                        userList.map(user => (
                            <div key={user._id}>
                                <WhiteSpace/>
                                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                    <Header
                                        // thumb={require(`../../assets/images/${user.avatar}.png`)}
                                        extra={user.username}
                                    />
                                    <Body>
                                    <div>職缺名稱： {user.position}</div>
                                    {user.company ? <div>公司: {user.company}</div> : null}
                                    {user.salary ? <div>工作待遇: {user.salary}</div> : null}
                                    {user.experience ? <div>工作經歷: {user.experience}</div> : null}
                                    {user.language ? <div>語文能力: {user.language}</div> : null}
                                    {user.skill ? <div>技能專長: {user.skill}</div> : null}
                                    {user.info ? <div>簡介: {user.info}</div> : null}

                                    </Body>
                                </Card>
                            </div>
                        ))
                    }

                </QueueAnim>

            </WingBlank>
        );
    }
}

export default withRouter(UserList);
