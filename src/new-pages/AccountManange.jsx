import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Table, Modal, Input } from 'antd';
import { FetchAdminData, AdminPageChange, UpdateAdmin, SubmitAdmin } from "../actions";

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPhone: '',
            newPassword: '',
            t1: false,
            t2: false,
        }
    }
    showWarningSpan(condition) {
        return condition ? <span className='red-span'>不可为空</span> : null;
    }
    formValidate() {
        let { newPassword, t2, newPhone, t1 } = this.state;
        return newPassword !== '' && t2 && t1 && newPhone !== '';
    }
    onChange(e) {
        let target = e.target.dataset.target,
            value = e.target.value;
        if (target === 'phone') {
            this.setState({
                newPhone: value,
                t1: true,
            })
        } else {
            this.setState({
                newPassword: value,
                t2: true,
            })
        }
    }
    render() {
        let { newPassword, t2, newPhone, t1 } = this.state;
        return (
            <div>
                <Input
                    prefix={<Icon type='user' />}
                    placeholder='账号'
                    data-target='phone'
                    onChange={(e) => { this.onChange(e) }}
                />
                {
                    this.showWarningSpan(newPhone === '' && t1)
                }
                <Input
                    prefix={<Icon type='lock' />}
                    style={{ marginTop: '1rem' }}
                    placeholder='密码'
                    data-target='password'
                    onChange={(e) => { this.onChange(e) }}
                />
                {
                    this.showWarningSpan(newPassword === '' && t2)
                }
                <br />
                <Button
                    type='primary'
                    style={{ marginTop: '1rem' }}
                    onClick={() => {
                        this.props.dispatch(SubmitAdmin({
                            phone: newPhone,
                            password: newPassword,
                        }, this.props.pageNo))
                        this.props.closeModal();
                    }}
                    disabled={!this.formValidate.call(this)}
                >确认添加</Button>
            </div >
        )
    }
}

class AccountManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddFormModal: true,
        }
    }
    componentDidMount() {
        this.props.dispatch(FetchAdminData());
    }
    render() {
        let { data, page, total, dispatch, fetchDataStatus, submitDataStatus } = this.props;
        let { showAddFormModal } = this.state;
        return (
            <div className="route">
                <Modal
                    visible={showAddFormModal}
                    onCancel={() => { this.setState({ showAddFormModal: false }) }}
                    title='添加管理员'
                    footer={null}
                >
                    {
                        showAddFormModal ?
                            <AddForm
                                closeModal={() => { this.setState({ showAddFormModal: false }) }}
                                dispatch={dispatch}
                                pageNo={page}
                            /> :
                            null
                    }
                </Modal>
                <div className="route-header">
                    <Button type='primary' onClick={() => { this.setState({ showAddFormModal: true }) }}>
                        <Icon type='plus' />添加新管理员
                    </Button>
                </div>
                <div>
                    <Table
                        loading={fetchDataStatus === 'pending'}
                        bordered
                        dataSource={data}
                        rowKey={record => record.userId}
                        columns={
                            [
                                { title: '管理员账号', dataIndex: 'phone', key: 'phone' },
                                {
                                    title: '状态', dataIndex: 'status', key: 'status', render: (text, record) => (
                                        <div>{record.status === '0' ? '正常' : '已注销'}</div>
                                    )
                                },
                                {
                                    title: '操作', render: (text, record) => (
                                        <div>
                                            {record.status === '1' ?
                                                null :
                                                <Button size='small' type='danger'
                                                    onClick={() => { dispatch(UpdateAdmin({ ...record, status: '1', }, page)) }}
                                                >注销</Button>}
                                        </div>
                                    )
                                },
                            ]
                        }
                        pagination={
                            {
                                total,
                                hideOnSinglePage: true,
                                current: page,
                                showQuickJumper: true,
                                onChange: (targetPage, pageSize) => {
                                    dispatch(AdminPageChange(targetPage - page));
                                    dispatch(FetchAdminData(targetPage));
                                }
                            }
                        }
                    />
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        data: state.Admin.data,
        page: state.Admin.page,
        total: state.Admin.total,
        fetchDataStatus: state.Admin.fetchDataStatus,
        submitDataStatus: state.Admin.submitDataStatus,
    }
}

export default connect(mapStateToProps)(AccountManage);