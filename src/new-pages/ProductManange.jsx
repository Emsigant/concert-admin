import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Modal, Button } from 'antd';

import { ProductPageChange, FetchProduct, FetchDetail, ShelfProduct, OffShelfProduct, } from '../actions';
import { FormatTime } from '../util';

const mapCodeToStatus = {
    '0': '未上架',
    '1': '审核中',
    '2': '已上架',
    '3': '审核不通过',
}

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