import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import { fakeBusinessData } from '../../data';
import Loading from '../../components/loading';
import { businessData, businessClear } from '../../actions';
import EncashRecord from './EncashRecord';
import ReviewFile from './ReviewFile';

class BusinessPage extends Component {
    constructor(p) {
        super(p);
        this.state = {
            showEncashRecord: !1,
            showReviewFile: !1,
            encashRecordIndex: 0,
            reviewFileIndex: 0
        }
        this.close = this.close.bind(this);
    }
    close() {
        this.setState({
            showEncashRecord: !1,
            showReviewFile: !1
        })
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(businessData([...fakeBusinessData]));
        }, 500);
    }
    componentDidUpdate() {

    }
    componentWillUnmount() {
        this.props.dispatch(businessClear());
    }
    render() {
        let { data, page, totalPage, match } = this.props;
        let { showEncashRecord, showReviewFile, encashRecordIndex, reviewFileIndex } = this.state;
        return (
            <div className='route-content'>
                <div style={{ padding: '.5rem' }}>第{page}页，共{totalPage}页</div>
                <div className='list-title-bar'>
                    <div className="flex-item">#</div>
                    <div className="flex-item">商家名称</div>
                    <div className="flex-item">银行收款账户</div>
                    <div className="flex-item">银行收款名称</div>
                    <div className="flex-item">认证状态</div>
                    <div className="flex-item">认证文件</div>
                    <div className="flex-item">提现记录</div>
                    <div className="flex-item">操作</div>
                </div>
                <div className='list-wrapper'>
                    {
                        data.length ?
                            data.map((item, index) => (
                                <div key={'user' + index} className='list-wrapper-item'>
                                    <div className="flex-item">{(page - 1) * 10 + index + 1}</div>
                                    <div className="flex-item">{item.businessId}</div>
                                    <div className='flex-item'>{item.businessEncashAccount}</div>
                                    <div className='flex-item'>{item.businessEncashAccountName}</div>
                                    <div className='flex-item'>{item.businessReviewStatus}</div>
                                    <div className='flex-item'>
                                        <a onClick={() => {
                                            this.setState({
                                                showReviewFile: true,
                                                reviewFileIndex: index
                                            })
                                        }}>查看文件</a>
                                    </div>
                                    <div className='flex-item'>
                                        <a onClick={() => {
                                            this.setState({
                                                showEncashRecord: true,
                                                encashRecordIndex: index
                                            })
                                        }}>查看记录</a>
                                    </div>
                                    <div className='flex-item'>
                                        {
                                            item.reveiwStatusCode !== 2 ?
                                                '-' :
                                                (
                                                    <div>
                                                        <a style={{ color: 'green' }}>通过</a>
                                                        &nbsp;
                                        <a style={{ color: 'red' }}>不通过</a>
                                                    </div>
                                                )

                                        }
                                    </div>
                                </div>
                            )) :
                            <Loading />
                    }
                </div>
                {
                    showEncashRecord ? <EncashRecord close={this.close} index={encashRecordIndex} /> : null
                }
                {
                    showReviewFile ? <ReviewFile close={this.close} index={reviewFileIndex} /> : null
                }
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        page: state.Business.page,
        data: state.Business.data,
        totalPage: state.Business.totalPage
    }
}

export default connect(mapStateToProps)(BusinessPage)