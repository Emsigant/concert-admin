import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import { businessPageChange } from '../actions';
import BusinessPage from './sub-pages/BusinessPage';
import EncashRecord from './sub-pages/EncashRecord';
import ReviewFile from './sub-pages/ReviewFile';
import SwitchPageBar from '../components/SwitchPageBar';

class Business extends Component {
    constructor(p) {
        super(p);
        this.state = {
            routeRenderArr: [0]
        }
    }
    componentDidMount() {
        let { pathname } = this.props.history.location;
        let { totalPage, page, match, history, dispatch } = this.props;
        if (/\/page/.test(pathname)) {
            let targetPage = +pathname.split('/').pop();
            dispatch(businessPageChange(targetPage - page));
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
        const { dispatch, page, match, totalPage, history } = this.props;
        let { routeRenderArr } = this.state;
        return (
            <div>
                <div className="content-header">商家管理</div>
                {
                    routeRenderArr.map((item, index) => (
                        <Route
                            key={'business-page-route' + index}
                            component={BusinessPage}
                            path={
                                item === 0 ?
                                    match.url :
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
                    action={businessPageChange}
                    from='business'
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        totalPage: state.Business.totalPage,
        page: state.Business.page,
        data: state.Business.data
    }
}

export default connect(mapStateToProps)(Business);