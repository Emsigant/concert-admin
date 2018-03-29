import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Pagination } from 'antd';

import { fakeFetchUserData } from '../data';
import { userData, userPageChange } from '../actions';

const columns = [
    { title: 'UserId', dataIndex: 'userId', key: 'userId' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Country', dataIndex: 'country', key: 'country' }
];

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableLoading: true
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(userData(fakeFetchUserData()));
            this.setState({
                tableLoading: false
            })
        }, 500);  
    }
    render() {
        const { data, page, totalPage, dispatch } = this.props;
        const { tableLoading } = this.state;
        const thisComponent = this;
        const paginationOptions = {
            current: page,
            defaultCurrent: 1,
            onChange(targetPage, pageSize) {
                dispatch(userPageChange(targetPage - page));
                thisComponent.setState({
                    tableLoading: true
                });
                setTimeout(() => {
                    dispatch(userData(fakeFetchUserData((targetPage-1)*10, targetPage*10)));
                    thisComponent.setState({
                        tableLoading: false
                    });
                }, 500);
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
                    loading={tableLoading}
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