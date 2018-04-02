import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Modal } from 'antd';

import { fakeFetchBusinessData } from '../data';
import { fetchBusinessData, businessClear, businessPageChange } from '../actions';

import image from '../c.jpg';

const encashRecordsColumns = [
    { title: '提现ID', key: 'encashId', dataIndex: 'encashId' },
    { title: '提现时间', key: 'encashStartTime', dataIndex: 'encashStartTime' },
    { title: '提现商家ID', key: 'encashStarterId', dataIndex: 'encashStarterId' },
    { title: '提现金额', key: 'encashAmount', dataIndex: 'encashAmount' },
    { title: '提现账户', key: 'encashDestAccount', dataIndex: 'encashDestAccount' },
    { title: '提现账户名', key: 'encashDestAccountName', dataIndex: 'encashDestAccountName' },
    { title: '提现状态', key: 'encashStatus', dataIndex: 'encashStatus' }
];
const encashRecordsPagination = {
    pageSize: 50,
    hideOnSinglePage: true
};

class BusinessManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFileModal: false,
            showRecordModal: false
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchBusinessData(fakeFetchBusinessData()));
    }
    render() {
        const { data, page, totalPage, dispatch } = this.props;
        const { showFileModal, showRecordModal } = this.state;
        const paginationOptions = {
            current: page,
            defaultCurrent: 1,
            onChange(targetPage, pageSize) {
                dispatch(businessPageChange(targetPage - page));
                dispatch(businessClear());
                dispatch(fetchBusinessData(fakeFetchBusinessData((targetPage - 1) * 10, targetPage * 10)));
            },
            total: (totalPage * 10),
            pageSize: 10,
            showQuickJumper: true
        };
        const columns = [
            { title: '商家ID', dataIndex: 'businessId', key: 'businessId' },
            { title: '商家名称', dataIndex: 'businessName', key: 'businessName' },
            { title: '商家提现账户', dataIndex: 'businessEncashAccount', key: 'businessEncashAccount' },
            { title: '商家提现账户名', dataIndex: 'businessEncashAccountName', key: 'businessEncashAccountName' },
            { title: '商家审核状态', dataIndex: 'businessReviewStatus', key: 'businessReviewStatus' },
            {
                title: '商家审核文件', key: 'businessReviewFile', render: () => (<a onClick={() => {
                    this.setState({
                        showFileModal: true
                    })
                }}>查看审核文件</a>)
            },
            {
                title: '商家提现记录', key: 'businessEncashRecords', render: () => (<a onClick={() => {
                    this.setState({
                        showRecordModal: true
                    })
                }}>查看提现记录</a>)
            },
            {
                title: '操作', key: 'operation', render: (text, record) => (
                    record.reveiwStatusCode === 2 ?
                        <div>
                            <a style={{ color: '#0a0' }}>通过</a>
                            <span className="ant-divider"></span>
                            <a style={{ color: '#f00' }}>不通过</a>
                        </div>
                        :
                        '-'
                )
            }
        ];
        return (
            <div className='route'>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    loading={data.length === 0}
                    pagination={paginationOptions}
                />
                <Modal
                    style={{ top: 20 }}
                    visible={showFileModal}
                    title='商家审核文件'
                    footer={null}
                    onCancel={() => { this.setState({ showFileModal: false }) }}
                    width={800}
                >
                    <img src={image} alt="商家审核文件" style={{ width: '100%' }} />
                </Modal>
                <Modal
                    style={{ top: 20 }}
                    visible={showRecordModal}
                    title='商家提现记录'
                    footer={null}
                    onCancel={() => { this.setState({ showRecordModal: false }) }}
                    width={800}
                >
                    <Table
                        columns={encashRecordsColumns}
                        pagination={encashRecordsPagination}
                        dataSource={data[0] ? data[0].businessEncashRecords : []}
                        bordered
                    />
                </Modal>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        data: state.Business.data,
        page: state.Business.page,
        totalPage: state.Business.totalPage
    }
}

export default connect(mapStateToProps)(BusinessManage);