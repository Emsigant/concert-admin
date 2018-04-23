import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { FetchOrder, OrderPageChange } from '../actions';
import { FormatTime } from "../util";

const mapCodeToStatus = {
    '0': '',
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
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
                            { title: '订单状态', key: 'status', dataIndex: 'status', },
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