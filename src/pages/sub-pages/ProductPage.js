import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../../components/loading';
import { productData, productClear } from '../../actions';
import { fakeProductData } from '../../data';
import image from '../../../src/r4.jpg';

class ProductPage extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(productData([...fakeProductData]));
        }, 500);
    }
    componentWillUnmount() {
        this.props.dispatch(productClear());
    }
    render() {
        let { page, totalPage, data } = this.props;
        return (
            <div className='route-content'>
                <div style={{ padding: '.5rem' }}>第{page}页，共{totalPage}页</div>
                {
                    data.length ?
                        data.map((item, index) => (
                            <div className='product-wrapper' key={'product-' + index}>
                                <img src={image} alt="" />
                                <div className="product-info">
                                    <div className='product-title'>product title</div>
                                    <div className='product-detail-wrapper'>
                                        <div className="product-detail">
                                            <div>productId:</div>
                                            <div>address: product-address</div>
                                            <div>price range: 100 ~ 200</div>
                                            <div>type:</div>
                                            <div>price:</div>
                                        </div>
                                        <div className='product-detail'>
                                            <div>amount:</div>
                                            <div>time:</div>
                                            <div>discount info:</div>
                                            <div>client</div>
                                            <div>sell status:</div>
                                        </div>
                                    </div>
                                    <div>intro:</div>
                                </div>
                                <div className='product-operation'>
                                    <div>abort</div>
                                    <div>certificate</div>
                                    <div>high light</div>
                                    <div>recommend</div>
                                </div>
                            </div>
                        )) :
                        <Loading />
                }
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        page: state.Product.page,
        totalPage: state.Product.totalPage,
        data: state.Product.data
    }
}

export default connect(mapStateToProps)(ProductPage);