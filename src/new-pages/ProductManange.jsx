import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Modal, Button } from 'antd';

import { ProductPageChange, FetchProduct, FetchDetail, ShelfProduct, OffShelfProduct, ModifyProductStatus, } from '../actions';
import { FormatTime } from '../util';

const mapCodeToStatus = {
    '0': '未上架',
    '1': '审核中',
    '2': '已上架',
    '3': '审核不通过',
};

const _mapCodeToStatus = {
    '0': '不展示',
    '1': '普通展示',
    '2': '首页推荐',
    '3': '小编推荐',
    '4': '首页+小编',
};

class ProductManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetailModal: false,
        }
    }
    componentDidMount() {
        this.props.dispatch(FetchProduct());
    }
    render() {
        let { dataList, dispatch, pageNo, totalCount, detailDataList, } = this.props;
        let { showDetailModal } = this.state;
        return (
            <div className="route">
                <Table
                    rowKey={record => record.showId}
                    columns={
                        [
                            { title: '演出ID', key: 'showId', dataIndex: 'showId' },
                            { title: '演出名称', key: 'showName', dataIndex: 'showName' },
                            { title: '价格区间', key: 'pricePeriod', dataIndex: 'pricePeriod' },
                            { title: '上架状态', key: 'productPriceRange', dataIndex: 'productPriceRange' },
                            { title: '演出地址', key: 'address', dataIndex: 'address' },
                            { title: '剧院名称', key: 'theaterName', dataIndex: 'theaterName' },
                            { title: '上架状态', key: 'shelfStatus', dataIndex: 'shelfStatus', render: (text) => (mapCodeToStatus[text]) },
                            { title: '展示状态', key: 'status', dataIndex: 'status', render: (text) => (_mapCodeToStatus[text]) },
                            {
                                title: '查看详细', render: (text, record) => (
                                    <a onClick={() => {
                                        this.setState({
                                            showDetailModal: true,
                                        });
                                        dispatch(FetchDetail(record.showId));
                                    }}>查看详细</a>
                                )
                            },
                            {
                                title: '上架', render: (text, record) => (
                                    <Button size='small' type='primary' onClick={() => {
                                        dispatch(ShelfProduct(record.showId, '2', 'extra', pageNo));
                                    }}>上架</Button>
                                )
                            },
                            {
                                title: '下架', render: (text, record) => (
                                    <Button size='small' type='danger' onClick={() => {
                                        dispatch(OffShelfProduct(record.showId, '0', 'extra', pageNo));
                                    }}>下架</Button>
                                )
                            },
                            {
                                title: '首页推荐', render: (text, record) => (
                                    <Button size='small' onClick={() => {
                                        if (record.status === '1') {
                                            dispatch(ModifyProductStatus(record.showId, '2', pageNo));
                                        } else if (record.status === '2') {
                                            dispatch(ModifyProductStatus(record.showId, '1', pageNo));
                                        } else if (record.status === '4') {
                                            dispatch(ModifyProductStatus(record.showId, '3', pageNo));
                                        } else if (record.status === '3') {
                                            dispatch(ModifyProductStatus(record.showId, '4', pageNo));
                                        }
                                    }}>{record.status === '2' || record.status === '4' ? '取消' : '首页推荐'}</Button>
                                )
                            },
                            {
                                title: '小编精选', render: (text, record) => (
                                    <Button size='small' onClick={() => {
                                        if (record.status === '1') {
                                            dispatch(ModifyProductStatus(record.showId, '3', pageNo));
                                        } else if (record.status === '3') {
                                            dispatch(ModifyProductStatus(record.showId, '1', pageNo));
                                        } else if (record.status === '4') {
                                            dispatch(ModifyProductStatus(record.showId, '2', pageNo));
                                        } else if (record.status === '2') {
                                            dispatch(ModifyProductStatus(record.showId, '4', pageNo));
                                        }
                                    }}>{record.status === '3' || record.status === '4' ? '取消' : '小编推荐'}</Button>
                                )
                            },
                        ]
                    }
                    dataSource={dataList}
                    bordered
                    pagination={
                        {
                            current: pageNo,
                            total: totalCount,
                            hideOnSinglePage: !0,
                            showQuickJumper: !0,
                            onChange: (targetPage, pageSize) => {
                                dispatch(ProductPageChange(targetPage - pageNo));
                                dispatch(FetchProduct(targetPage));
                            }
                        }
                    }
                />
                <Modal
                    visible={showDetailModal}
                    footer={null}
                    onCancel={() => { this.setState({ showDetailModal: false }) }}
                    width={800}
                    style={{ top: 20 }}
                >
                    {
                        showDetailModal ?
                            <div>
                                <Table
                                    dataSource={detailDataList}
                                    loading={detailDataList.length === 0}
                                    columns={
                                        [
                                            { title: '票类型', key: 'ticketType', dataIndex: 'ticketType', },
                                            { title: '价格(元)', key: 'price', dataIndex: 'price', render: (text) => (+text / 100), },
                                            { title: '库存', key: 'stock', dataIndex: 'stock', },
                                            { title: '开始时间', key: 'startTime', dataIndex: 'startTime', render: (text) => (FormatTime(text)), },
                                            { title: '简介', key: 'introduction', dataIndex: 'introduction', },
                                        ]
                                    }
                                    pagination={{
                                        hideOnSinglePage: true,
                                        pageSize: 1000,
                                    }}
                                />
                            </div> :
                            null
                    }
                </Modal>
            </div>
        )
    }
}
let mapStateToProps = state => {
    return {
        dataList: state.Product.dataList,
        pageNo: state.Product.pageNo,
        totalCount: state.Product.totalCount,
        detailDataList: state.Product.detailDataList,
    }
}

export default connect(mapStateToProps)(ProductManage);