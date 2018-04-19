import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Table, Modal, } from 'antd';

class AccountManage extends Component {
    render() {
        let { } = this.props;
        return (
            <div className="route">
                <div className="route-header">
                    <Button type='primary'><Icon type='plus' />添加新管理员</Button>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        data: state.Admin.data,
        page: state.Admin.page,
        total: state.Admin.total,
    }
}

export default connect(mapStateToProps)(AccountManage);