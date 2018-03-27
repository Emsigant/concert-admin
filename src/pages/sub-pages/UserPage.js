import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fakeUserData } from '../../data';
import Loading from '../../components/loading';
import { pushUserDataToStore, UserClear } from '../../actions';

class UserPage extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(pushUserDataToStore([...fakeUserData]));
        }, 500);
    }
    componentWillUnmount() {
        this.props.dispatch(UserClear());
    }
    render() {
        const { data, page, totalPage } = this.props;
        return (
            <div className='route-content'>
                <div style={{ padding: '.5rem' }}>第{page}页，共{totalPage}页</div>
                <div className='list-title-bar'>
                    <div className="flex-item">#</div>
                    <div className="flex-item">用户ID</div>
                    <div className="flex-item">用户名</div>
                    <div className="flex-item">电话</div>
                    <div className="flex-item">城市</div>
                    <div className="flex-item">国家</div>
                </div>
                <div className='list-wrapper'>
                    {
                        data.length ?
                            data.map((item, index) => (
                                <div key={'user' + index} className='list-wrapper-item'>
                                    <div className="flex-item">{(page - 1) * 10 + index + 1}</div>
                                    <div className="flex-item">{item.userId}</div>
                                    <div className='flex-item'>{item.username}</div>
                                    <div className='flex-item'>{item.number}</div>
                                    <div className='flex-item'>{item.city}</div>
                                    <div className='flex-item'>{item.country}</div>
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
        page: state.User.page,
        data: state.User.data,
        totalPage: state.User.totalPage
    }
}

export default connect(mapStateToProps)(UserPage)

