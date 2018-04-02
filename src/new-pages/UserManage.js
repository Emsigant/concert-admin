import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { fakeFetchUserData } from '../data';
import { userPageChange, userClear, fetchUserData } from '../actions';

const columns = [
    { title: '用户ID', dataIndex: 'userId', key: 'userId' },
    { title: '用户昵称', dataIndex: 'username', key: 'username' },
    { title: '电话号', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: '城市', dataIndex: 'city', key: 'city' },
    { title: '国家', dataIndex: 'country', key: 'country' }
];

class UserManage extends Component {
    componentDidMount() {
        this.props.dispatch(fetchUserData(fakeFetchUserData()));
    }
    componentWillUnmount() {
        this.props.dispatch(userClear());
    }
    render() {
        const { data, page, totalPage, dispatch } = this.props;
        const paginationOptions = {
            current: page,
            defaultCurrent: 1,
            onChange(targetPage, pageSize) {
                dispatch(userPageChange(targetPage - page));
                dispatch(userClear());
                dispatch(fetchUserData(fakeFetchUserData((targetPage-1)*10, targetPage*10)));
            },
            total: (totalPage * 10),
            pageSize: 10,
            showQuickJumper: true
        };
        return (
            <div className='route'>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    loading={data.length === 0}
                    pagination={paginationOptions}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.User.data,
        page: state.User.page,
        totalPage: state.User.totalPage
    }
}

export default connect(mapStateToProps)(UserManage);