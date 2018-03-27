import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../../components/loading';
import { fakeBusinessData } from '../../data';
import { businessData } from '../../actions';

class EncashRecord extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(businessData([...fakeBusinessData]));
        }, 500);
    }
    render() {
        const { data, index, close } = this.props;
        return (
            <div className="record-list-wrapper">
                <div className="record-list-inner">
                    <div>
                        <div>
                            提现记录
                            <a onClick={() => { close(); }} style={{ float: 'right', cursor: 'pointer' }}>x</a>
                        </div>
                        <div className="list-title-bar">
                            <div className="flex-item">#</div>
                            <div className="flex-item">提现ID</div>
                            <div className="flex-item">提现时间</div>
                            <div className="flex-item">提现金额</div>
                            <div className="flex-item">提现账户</div>
                            <div className="flex-item">提现账户名</div>
                            <div className="flex-item">商家ID</div>
                            <div className="flex-item">状态</div>
                        </div>
                        <div className="list-wrapper">
                            {data[index] ?
                                data[index].businessEncashRecords.map((item, index) => (
                                    <div className='list-wrapper-item' key={'encash-record-' + index}>
                                        <div className="flex-item">{index + 1}</div>
                                        <div className="flex-item">{item.encashId}</div>
                                        <div className="flex-item">{item.encashStartTime}</div>
                                        <div className="flex-item">{item.encashAmount}</div>
                                        <div className="flex-item">{item.encashDestAccount}</div>
                                        <div className="flex-item">{item.encashDestAccountName}</div>
                                        <div className="flex-item">{item.encashStarterId}</div>
                                        <div className="flex-item">{item.encashStatus}</div>
                                    </div>
                                )) :
                                <Loading />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        page: state.Business.page,
        data: state.Business.data,
        totalPage: state.Business.totalPage,
    }
}

export default connect(mapStateToProps)(EncashRecord)