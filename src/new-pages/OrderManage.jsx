import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { FetchOrder, OrderPageChange, } from '../actions';

const columns = [
    { title: '订单ID', dataIndex: 'orderId', key: 'orderId' },
    { title: '商品名称', dataIndex: 'productName', key: 'productName' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '订单价格', dataIndex: 'price', key: 'price' },
    { title: '订单状态', dataIndex: 'status', key: 'status' }
];

class OrderManage extends Component {
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render() {
        return (
            <div className="route">
                111
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        pageNo: state.Order.pageNo,
        dataList: state.Order.dataList,
        totalCount: state.Order.totalCount,
        fetchStatus: state.Order.fetchStatus,
    }
}

export default connect(mapStateToProps)(OrderManage);