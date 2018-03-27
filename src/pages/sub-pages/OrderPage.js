import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fakeOrderData } from '../../data';
import Loading from '../../components/loading';
import { orderData, orderClear } from '../../actions';

class OrderPage extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(orderData([...fakeOrderData]));
        }, 500);
    }
    componentWillUnmount() {
        this.props.dispatch(orderClear());
    }
    render() {
        const { data, page, totalPage } = this.props;
        return (
            <div className='route-content'>
                <div style={{ padding: '.5rem' }}>第{page}页，共{totalPage}页</div>
                <div className='list-title-bar'>
                    <div className="flex-item">#</div>
                    <div className="flex-item">订单ID</div>
                    <div className="flex-item">产品名称</div>
                    <div className="flex-item">时间</div>
                    <div className="flex-item">地址</div>
                    <div className="flex-item">类型</div>
                    <div className="flex-item">订单价格</div>
                    <div className="flex-item">订单状态</div>
                </div>
                <div className='list-wrapper'>
                    {
                        data.length ?
                            data.map((item, index) => (
                                <div key={'user' + index} className='list-wrapper-item'>
                                    <div className="flex-item">{(page - 1) * 10 + index + 1}</div>
                                    <div className="flex-item">{item.orderId}</div>
                                    <div className='flex-item'>{item.productName}</div>
                                    <div className='flex-item'>{item.time}</div>
                                    <div className='flex-item'>{item.address}</div>
                                    <div className='flex-item'>{item.type}</div>
                                    <div className='flex-item'>{item.price}</div>
                                    <div className='flex-item'>{item.status}</div>
                                </div>
                            )) :
                            <Loading />
                    }
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        page: state.Order.page,
        data: state.Order.data,
        totalPage: state.Order.totalPage
    }
}

export default connect(mapStateToProps)(OrderPage)