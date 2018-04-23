import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { FetchOrder, OrderPageChange } from '../actions';
import { FormatTime } from "../util";

const mapCodeToStatus = {
    '0': '初始化订单',
    '1': '已付款',
    '2': '已出票',
    '3': '未出票已过期',
    '4': '取消交易',
    '5': '退款申请中',
    '6': '退款申请不通过',
    '7': '退款中',
    '8': '退款成功',
    '9': '退款失败',
};

class OrderManage extends Component {
    componentDidMount() {
        this.props.dispatch(FetchOrder());
    }
    render() {
        let { dispatch, dataList, pageNo, totalCount, } = this.props;
        return (
            <div className="route">
                <Table
                    dataSource={dataList}
                    bordered
                    columns={
                        [
                            { title: '订单ID', key: 'orderId', dataIndex: 'orderId', },
                            { title: '演出名称', key: 'showName', dataIndex: 'showName', },
                            { title: '演出开始时间', key: 'startTime', dataIndex: 'startTime', render: (text, reocrd) => (FormatTime(text)) },
                            { title: '演出类型', key: 'typeName', dataIndex: 'typeName', },
                            { title: '订单总金额(元)', key: 'orderTotalAmount', dataIndex: 'orderTotalAmount', render: (text, record) => (+text / 100) },
                            { title: '订单状态', key: 'status', dataIndex: 'status', render: (text, record) => (mapCodeToStatus[text]) },
                            { title: '演出地址', key: 'address', dataIndex: 'address', },
                        ]
                    }
                    pagination={{
                        current: pageNo,
                        total: totalCount,
                        hideOnSinglePage: !0,
                        showQuickJumper: !0,
                        onChange: (targetPage, pageSize) => {
                            dispatch(OrderPageChange(targetPage - pageNo));
                            dispatch(FetchOrder(targetPage));
                        }
                    }}
                />
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        pageNo: state.Order.pageNo,
        dataList: state.Order.dataList,
        totalCount: state.Order.totalCount,
    }
}

export default connect(mapStateToProps)(OrderManage);