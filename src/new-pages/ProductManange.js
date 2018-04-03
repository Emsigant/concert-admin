import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Modal } from 'antd';

import { fakeFetchProductData } from '../data';
import { productClear, fetchProductData, productPageChange } from '../actions';

class ProductManage extends Component {
    componentDidMount() {
        this.props.dispatch(fetchProductData(fakeFetchProductData()));
    }
    componentWillUnmount() {
        this.props.dispatch(productClear());
    }
    render() {
        const { data, totalPage, page, dispatch } = this.props;
        const columns = [
            { title: '商品ID', key: 'productId', dataIndex: 'productId' },
            { title: '商品标题', key: 'productTitle', dataIndex: 'productTitle' },
            { title: '价格区间', key: 'productPriceRange', dataIndex: 'productPriceRange' },
            { title: '详细信息', key: 'productDetail', render:(text, record) => ( <a onClick={
                () => {
                    Modal.info({
                        title:'详细信息',
                        content: (
                            <div>
                                { record.productId }
                                {
                                    Object.keys(record.productDetail).map(item => (
                                        <div key={'product-detail-'+item}>
                                            {item}:{' '}{record.productDetail[item]}
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    })
                }
            }
            >查看详细</a> ) },
            { title: '折扣信息', key: 'productDiscountInfo', dataIndex: 'productDiscountInfo' },
            { title: '所属商家', key: 'productOriginBusiness', dataIndex: 'productOriginBusiness' },
            { title: '上架状态', key: 'productStatus', dataIndex: 'productStatus' },
            { title: '精选', key: 'highlight', render:(text, record)=>( <a>{record.isHighLight?'取消精选':'设为精选'}</a> ) },
            { title: '小编推荐', key: 'recommend', render:(text, record)=>( <a>{record.isRecommendation?'取消推荐':'设为小编推荐'}</a> ) },
            { title: '下架', key: 'abandon', render:()=>( <a style={{color:'red'}}>下架</a> ) },
        ];
        const paginationOptions = {
			current: page,
			defaultCurrent: 1,
			onChange(targetPage, pageSize) {
				dispatch(productPageChange(targetPage - page));
				dispatch(productClear());
				dispatch(fetchProductData(fakeFetchProductData((targetPage - 1) * 10, targetPage * 10)));
			},
			total: (totalPage * 10),
			pageSize: 10,
			showQuickJumper: true
		};
        return (
            <div className="route">
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    loading={data.length === 0}
                    pagination={paginationOptions}
                />
            </div>
        )
    }
}
let mapStateToProps = state => {
	return {
		data: state.Product.data,
		page: state.Product.page,
		totalPage: state.Product.totalPage
	}
}

export default connect(mapStateToProps)(ProductManage);