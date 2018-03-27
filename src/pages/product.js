import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import ProductPage from './sub-pages/ProductPage';
import { productPageChange } from '../actions';
import SwitchPageBar from '../components/SwitchPageBar';

class Product extends Component {
    constructor(p) {
        super(p);
        this.state = {
            routeRenderArr: [0]
        }
    }
    componentDidMount() {
        let { pathname } = this.props.history.location;
        let { totalPage, page, match, dispatch, history } = this.props;
        if (/\/page/.test(pathname)) {
            let targetPage = +pathname.split('/').pop();
            dispatch(productPageChange(targetPage - page));
            history.push(match.url + '/page/' + targetPage);
        }
        let arr = [];
        for (let i = 0; i < totalPage; i++) {
            arr.push(i);
        }
        this.setState({
            routeRenderArr: arr
        })
    }
    componentDidUpdate() {

    }
    render() {
        let { page, totalPage, dispatch, match, history } = this.props;
        let { routeRenderArr } = this.state;
        return (
            <div>
                <div className="content-header">商品管理</div>
                {
                    routeRenderArr.map((item, index) => (
                        <Route
                            exact={item === 0}
                            key={'product-page-route-' + item}
                            path={
                                item === 0 ?
                                    match.url :
                                    `${match.url}/page/${item + 1}`
                            }
                            component={ProductPage}
                        />
                    ))
                }
                <SwitchPageBar
                    currentPage={page}
                    totalPage={totalPage}
                    dispatch={dispatch}
                    match={match}
                    history={history}
                    action={productPageChange}
                    from='product'
                />
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

export default connect(mapStateToProps)(Product);