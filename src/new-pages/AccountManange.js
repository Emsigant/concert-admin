import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Input, message, Form, Table } from 'antd';

import { fetchAdminData, adminClear, adminPageChange, adminPending, adminSubmit, adminShowForm, adminCloseForm } from '../actions';
import { fakeAdminData } from '../data';

const FormItem = Form.Item;

// add-new-from start
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddNewForm extends Component {
    componentDidMount() {
        this.props.form.validateFields();
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submitNewAccount(values);
            }
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="vertical" onSubmit={(e) => { this.handleSubmit(e) }}>
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" />} placeholder="新用户名" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" />} type="text" placeholder="新密码" />
                    )}
                </FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                    loading={this.props.loading}
                >
                    确认添加
                </Button>
            </Form>
        );
    }
}
const WrappedAddNewForm = Form.create()(AddNewForm);
// add-new-from end

class AccountManage extends Component {
    componentDidMount() {
        this.props.dispatch(fetchAdminData(fakeAdminData()));
    }
    componentWillUnmount() {
        this.props.dispatch(adminClear());
    }
    submitNewAccount(data) {
        // submit new account here
        this.props.dispatch(adminSubmit(data));
    }
    componentDidUpdate() {
        console.log(this.props.data);
    }
    showAddForm() {
        this.props.dispatch(adminShowForm());
    }
    closeAddForm() {
        this.props.dispatch(adminCloseForm());
    }
    logOutAccount(id) {
        // log out account
        this.props.dispatch(adminPending(id));
    }
    render() {
        const { data, page, totalPage, dispatch, showFormLoading, showForm } = this.props;
        const columns = [
            { title:'管理员ID', key: 'adminId', dataIndex: 'adminId' },
            { title:'管理员账号', key: 'adminAccount', dataIndex: 'adminAccount' },
            { title:'操作', key: 'operation', render: (text, record) => (
                <Button
                    type='danger'
                    onClick={() => {this.logOutAccount(record.adminId)}}
                    loading={record.loading}
                    disabled={record.disabled}
                >注销</Button>
            ) }
        ];
        const pagination = {
            current: page,
			defaultCurrent: 1,
			onChange(targetPage, pageSize) {
				dispatch(adminPageChange(targetPage - page));
				dispatch(adminClear());
				dispatch(fetchAdminData(fakeAdminData((targetPage - 1) * 10, targetPage * 10)));
			},
			total: (totalPage * 10),
			pageSize: 10,
			showQuickJumper: true
        }
        return (
            <div className="route">
                <div className="fixed-header-bar">
                    <Button onClick={() => { this.showAddForm() }}><Icon type='plus' />添加新管理员</Button>
                    <Modal
                        visible={showForm}
                        onCancel={() => { this.closeAddForm() }}
                        title='添加新管理员'
                        footer={null}
                        width={239}
                    >
                        {
                            showForm ?
                                <WrappedAddNewForm
                                    submitNewAccount={(data) => { this.submitNewAccount(data) }}
                                    loading={showFormLoading}
                                /> :
                                null
                        }
                    </Modal>
                </div>
                <div style={{ marginTop: '4rem' }}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        loading={data.length === 0}
                        pagination={pagination}
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
        totalPage: state.Admin.totalPage,
        showFormLoading: state.Admin.showFormLoading,
        showForm: state.Admin.showForm
	}
}

export default connect(mapStateToProps)(AccountManage);