import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { FetchUser, UserPageChange } from '../actions';

const columns = [
    { title: '用户ID', dataIndex: 'userId', key: 'userId' },
    { title: '用户昵称', dataIndex: 'username', key: 'username' },
    { title: '电话号', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: '城市', dataIndex: 'city', key: 'city' },
    { title: '国家', dataIndex: 'country', key: 'country' }
];

class UserManage extends Component {
    componentDidMount() {
        this.props.dispatch(FetchUser());
    }
    render() {
        const { dataList, pageNo, totalCount, dispatch, fetchStatus } = this.props;
        const paginationOptions = {
            current: pageNo,
            onChange(targetPage, pageSize) {
                dispatch(UserPageChange(targetPage - pageNo));
                dispatch(FetchUser(targetPage));
            },
            total: totalCount,
            showQuickJumper: true
        };
        return (
            <div className='route'>
                <Table
                    loading={fetchStatus === 'pending'}
                    columns={columns}
                    dataSource={dataList}
                    bordered
                    pagination={paginationOptions}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataList: state.User.dataList,
        pageNo: state.User.pageNo,
        totalCount: state.User.totalCount,
        fetchStatus: state.User.fetchStatus,
    }
}

export default connect(mapStateToProps)(UserManage);