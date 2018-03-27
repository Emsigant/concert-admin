import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { orderPageChange } from '../actions';

import OrderPage from './sub-pages/OrderPage';
import SwitchPageBar from '../components/SwitchPageBar';

class Order extends Component {
    constructor(p) {
        super(p);
        this.state = {
            routeRenderArr: [0]
        }
    }
    componentDidMount() {
        // push currect path after force refresh from browser
        let { pathname } = this.props.history.location;
        let { totalPage, page, match, history, dispatch } = this.props;
        if (/\/page/.test(pathname)) {
            let targetPage = +pathname.split('/').pop();
            dispatch(orderPageChange(targetPage - page));
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
    render() {
        let { totalPage, page, dispatch, match, history } = this.props;
        let { routeRenderArr } = this.state;
        return (
            <div>
                <div className="content-header">订单管理</div>
                {
                    routeRenderArr.map((item, index) => (
                        <Route
                            key={'order-page-route' + index}
                            component={OrderPage}
                            path={
                                item === 0 ?
                                    `${match.url}` :
                                    `${match.url}/page/${item + 1}`
                            }
                            exact={item === 0}
                        />
                    ))
                }
                <SwitchPageBar
                    currentPage={page}
                    totalPage={totalPage}
                    dispatch={dispatch}
                    match={match}
                    history={history}
                    action={orderPageChange}
                    from='order'
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        page: state.Order.page,
        totalPage: state.Order.totalPage,
        data: state.Order.data
    }
}

export default connect(mapStateToProps)(Order);