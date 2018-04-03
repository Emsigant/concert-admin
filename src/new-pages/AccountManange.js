import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Input, message, Form } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddNewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        this.props.form.validateFields();
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submitNewAccount(values);
                this.setState({
                    loading: true
                })
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
                        <Input prefix={<Icon type="lock" />} type="password" placeholder="新密码" />
                    )}
                </FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                    loading={this.state.loading}
                >
                    确认添加
                </Button>
            </Form>
        );
    }
}
const WrappedAddNewForm = Form.create()(AddNewForm);

class AccountManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddForm: false
        }
    }
    submitNewAccount(data) {
        // submit new account here
        console.log(data);
        return new Promise(r => {
            setTimeout(() => {
                r();
            }, 1000);
        }).then(() => {
            message.success('添加成功');
            this.closeAddForm();
        })
    }
    showAddForm() {
        this.setState({
            showAddForm: true
        })
    }
    closeAddForm() {
        this.setState({
            showAddForm: false
        })
    }
    render() {
        const { showAddForm } = this.state;
        return (
            <div className="route">
                <div className="fixed-header-bar">
                    <Button onClick={() => { this.showAddForm() }}><Icon type='plus' />添加新管理员</Button>
                    <Modal
                        visible={showAddForm}
                        onCancel={() => { this.closeAddForm() }}
                        title='添加新管理员'
                        footer={null}
                        width={239}
                    >
                        {
                            showAddForm ?
                                <WrappedAddNewForm
                                    submitNewAccount={(data) => { this.submitNewAccount(data) }}
                                /> :
                                null
                        }
                    </Modal>
                </div>
                <div style={{ marginTop: '4rem' }}>
                    emmmm
                </div>
            </div>
        )
    }
}

export default AccountManage;