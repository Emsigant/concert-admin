import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { fakeFetchOrderData } from '../data';
import { fetchOrderData, orderPageChange, orderClear } from '../actions';

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
        this.props.dispatch(fetchOrderData(fakeFetchOrderData()));
    }
    componentWillUnmount() {
        this.props.dispatch(orderClear());
    }
    render() {
        const { data, totalPage, page, dispatch } = this.props;
        const paginationOptions = {
            current: page,
            defaultCurrent: 1,
            onChange(targetPage, pageSize) {
                dispatch(orderPageChange(targetPage - page));
                dispatch(orderClear());
                dispatch(fetchOrderData(fakeFetchOrderData((targetPage - 1) * 10, targetPage * 10)));
            },
            total: (totalPage * 10),
            pageSize: 10,
            showQuickJumper: true
        };
        return (
            <div className="route">
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

let mapStateToProps = state => {
    return {
        data: state.Order.data,
        page: state.Order.page,
        totalPage: state.Order.totalPage
    }
}

export default connect(mapStateToProps)(OrderManage);