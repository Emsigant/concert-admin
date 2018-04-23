import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Modal, Button, Input } from 'antd';

import { FetchBusiness, BusinessPageChange, BusinessChangeFilter, FetchWithdraw, WithdrawPageChange, UpdateBusiness, } from '../actions';
import { FormatTime } from "../util";

const mapStatusCodeToStatus = {
	'0': '审核中',
	'1': '审核通过',
	'2': '审核未通过',
};
const statusArr = [
	{ text: '审核中', statusCode: '0', },
	{ text: '审核通过', statusCode: '1', },
	{ text: '审核未通过', statusCode: '2', },
];

class InTable extends Component {
	componentDidMount() {
		this.props.dispatch(FetchWithdraw(1, 10, this.props.userId));
	}
	render() {
		let { dataList, dispatch, totalCount, pageNo, fetchStatus, userId, } = this.props;
		return (
			<div>
				<Table
					bordered
					loading={fetchStatus === 'pending'}
					dataSource={dataList}
					rowKey={record => record.withdrawOrderId}
					columns={
						[
							{ title: "提款商家名", key: 'userName', dataIndex: 'userName', },
							{ title: "提款金额(元)", key: 'amount', dataIndex: 'amount', render: (text, record) => (+text / 100) },
							{ title: "提款发起时间", key: 'createTime', dataIndex: 'createTime', render: (text, record) => (FormatTime(text)) },
							{ title: '提现银行卡号', key: 'bankCardNo', dataIndex: 'bankCardNo' },
							{ title: '银行名称', key: 'bankName', dataIndex: 'bankName' },
							{ title: '提现状态', key: 'status', dataIndex: 'status', render: (text, record) => (text === '0' ? '提现中' : text === '1' ? '提现成功' : '提现失败') },
						]
					}
					pagination={{
						hideOnSinglePage: true,
						showQuickJumper: true,
						onChange: (targetPage, pageSize) => {
							dispatch(WithdrawPageChange(targetPage - pageNo));
							dispatch(FetchWithdraw(targetPage, 10, userId));
						},
						current: pageNo,
						total: totalCount,
					}}
				/>
			</div>
		)
	}
}

class BusinessManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showFileModal: false,
			showRecordModal: false,
			userId: '',
			src: '',
		}
	}
	componentDidMount() {
		this.props.dispatch(FetchBusiness(1, 10, '0'));
	}
	render() {
		let { dataList, pageNo, totalCount, fetchStatus, statusFilter, dispatch,
			recordData, recordTotalCount, recordPageNo, recordFetchStatus, } = this.props;
		let { showFileModal, src, showRecordModal, userId, } = this.state;
		return (
			<div className='route'>
				<div className='filter-select-wrapper'>
					审核状态：
					{
						statusArr.map(item => (
							<div
								key={'filter-select' + item.statusCode}
								className={"filter-select" + (statusFilter === item.statusCode ? ' filter-select-active' : '')}
								onClick={() => {
									dispatch(BusinessChangeFilter(item.statusCode))
									dispatch(FetchBusiness(1, 10, item.statusCode));
								}}
							>
								{item.text}
							</div>
						))
					}
				</div>
				<Table
					bordered
					loading={fetchStatus === 'pending'}
					dataSource={dataList}
					rowKey={record => record.userId}
					columns={[
						{ title: '商家名称', key: 'userName', dataIndex: 'userName' },
						{ title: '提现银行卡号', key: 'bankCardNo', dataIndex: 'bankCardNo' },
						{ title: '银行名称', key: 'bankName', dataIndex: 'bankName' },
						{ title: '认证状态', key: 'status', dataIndex: 'status', render: (text) => (mapStatusCodeToStatus[text]) },
						{
							title: '认证文件', key: 'authImageUrl', dataIndex: 'authImageUrl', render: (text) => {
								return (
									<a onClick={() => {
										this.setState({
											showFileModal: true,
											src: text,
										})
									}}>查看文件</a>
								)
							}
						},
						{
							title: '提现记录', render: (text, record) => (record.status === '1' ? <a onClick={() => {
								this.setState({
									showRecordModal: true,
									userId: record.userId,
								})
							}}>查看提现记录</a> : '不可用')
						},
						{
							title: '操作', render: (text, record) => {
								return (
									record.status === '0' ?
										(
											<div>
												<Button size='small' type='primary' style={{ marginRight: '.5rem' }}
													onClick={() => {
														dispatch(UpdateBusiness({
															userName: record.userName,
															userId: record.userId,
															status: '1',
														}, pageNo, statusFilter));
													}}
												>
													通过
												</Button>
												<Button size='small' type='danger'
													onClick={() => {
														Modal.info({
															title: '请输入不通过原因',
															content: (
																<Input id={'not-pass-reason' + record.userId} />
															),
															onOk: () => {
																let extra = document.getElementById('not-pass-reason' + record.userId).value;
																dispatch(UpdateBusiness({
																	userName: record.userName,
																	userId: record.userId,
																	status: '2',
																	extra,
																}, pageNo, statusFilter));
															},
															okText: '确认',
														})
													}}
												>
													不通过
												</Button>
											</div>
										)
										:
										<Button disabled size='small'>不可操作</Button>
								)
							}
						},
						{
							title: '不通过原因', key: 'extra', dataIndex: 'extra', render: (text, record) => (
								<div>{record.status !== '2' ? '-' : text}</div>
							)
						}
					]}
					pagination={{
						hideOnSinglePage: true,
						showQuickJumper: true,
						onChange: (targetPage, pageSize) => {
							dispatch(BusinessPageChange(targetPage - pageNo));
							dispatch(FetchBusiness(targetPage, 10, statusFilter));
						},
						current: pageNo,
						total: totalCount,
					}}
				/>
				<Modal
					visible={showFileModal}
					title='查看认证文件'
					width={800}
					style={{ top: 20 }}
					footer={null}
					onCancel={() => {
						this.setState({
							showFileModal: false,
							src: ''
						})
					}}
				>
					<img src={src} alt="商家认证文件" style={{ width: '100%' }} />
				</Modal>
				<Modal
					visible={showRecordModal}
					title='查看提现记录'
					width={800}
					style={{ top: 20 }}
					footer={null}
					onCancel={() => {
						this.setState({
							showRecordModal: false,
							userId: ''
						})
					}}
				>
					{
						userId === '' ? null :
							<InTable
								userId={userId}
								dataList={recordData}
								pageNo={recordPageNo}
								totalCount={recordTotalCount}
								fetchStatus={recordFetchStatus}
								dispatch={dispatch}
							/>
					}
				</Modal>
			</div>
		)
	}
}

let mapStateToProps = state => {
	return {
		dataList: state.Business.dataList,
		totalCount: state.Business.totalCount,
		pageNo: state.Business.pageNo,
		fetchStatus: state.Business.fetchStatus,
		statusFilter: state.Business.statusFilter,
		recordData: state.Business.recordData,
		recordFetchStatus: state.Business.recordFetchStatus,
		recordPageNo: state.Business.recordPageNo,
		recordTotalCount: state.Business.recordTotalCount,
	}
}

export default connect(mapStateToProps)(BusinessManage);