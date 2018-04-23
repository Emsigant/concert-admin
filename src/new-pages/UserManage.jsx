import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { FetchUser, UserPageChange } from '../actions';

const columns = [
    { title: '用户ID', dataIndex: 'userId', key: 'userId' },
    { title: '用户昵称', dataIndex: 'nickName', key: 'nickName' },
    { title: '电话号', dataIndex: 'phone', key: 'phone' },
    { title: '国家', dataIndex: 'country', key: 'country' },
];

class UserManage extends Component {
    componentDidMount() {
        this.props.dispatch(FetchUser());
    }
    render() {
        const { dataList, pageNo, totalCount, dispatch, fetchStatus, } = this.props;
        const paginationOptions = {
            current: pageNo,
            onChange(targetPage, pageSize) {
                window.scrollTo(0, 0);
                dispatch(UserPageChange(targetPage - pageNo));
                dispatch(FetchUser(targetPage));
            },
            total: totalCount,
            showQuickJumper: true,
        };
        return (
            <div className='route'>
                <Table
                    rowKey={record => record.userId}
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