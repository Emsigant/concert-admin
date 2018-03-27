import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { userPageChange } from '../actions';
import SwitchPageBar from '../components/SwitchPageBar';
import UserPage from './sub-pages/UserPage';

class User extends Component {
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
            dispatch(userPageChange(targetPage - page));
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
                <div className='content-header'>用户管理</div>
                {
                    routeRenderArr.map(item => (
                        <Route
                            exact={item === 0}
                            key={'user-page-route-' + item}
                            path={
                                item === 0 ?
                                    `${match.url}` :
                                    `${match.url}/page/${item + 1}`
                            }
                            component={UserPage}
                        />
                    ))
                }
                <SwitchPageBar
                    currentPage={page}
                    totalPage={totalPage}
                    dispatch={dispatch}
                    match={match}
                    action={userPageChange}
                    from='user'
                />
            </div>
        )
    }
}

const mapPropsToState = state => {
    // console.log(state) // console twice?
    return {
        data: state.User.data,
        page: state.User.page,
        totalPage: state.User.totalPage
    }
}

export default connect(mapPropsToState)(User);

User.propTypes = {
    userData: PropTypes.arrayOf(PropTypes.object),
    userPage: PropTypes.number,
    totalPage: PropTypes.number
}