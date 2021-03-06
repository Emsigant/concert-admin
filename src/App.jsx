import React, { Component } from 'react';
import { HashRouter, Route, NavLink, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { LocaleProvider, Icon, message, } from 'antd';
import moment from 'moment';

import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './App.css';
import 'antd/dist/antd.css';

import reducers from './reducers';

// new pages
import Welcome from './new-pages/Welcome';
import UserManage from './new-pages/UserManage.jsx';
import OrderManage from './new-pages/OrderManage.jsx';
import BusinessManage from './new-pages/BusinessManage.jsx';
import ProductManage from './new-pages/ProductManange.jsx';
import AccountManage from './new-pages/AccountManange.jsx';

moment.locale('zh_cn');

let store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
  constructor(p) {
    super(p);
    this.state = {
      itemList: [
        { id: 0, text: '欢迎', to: '/', path: '/', c: Welcome },
        { id: 1, text: '用户管理', to: '/user', path: '/user', c: UserManage },
        { id: 2, text: '订单管理', to: '/order', path: '/order', c: OrderManage },
        { id: 3, text: '商品管理', to: '/product', path: '/product', c: ProductManage },
        { id: 4, text: '商家管理', to: '/business', path: '/business', c: BusinessManage },
        { id: 5, text: '账号管理', to: '/account', path: '/account', c: AccountManage },
      ]
    };
  }
  render() {
    let { state } = this;
    return (
      <LocaleProvider locale={zh_CN}>
        <Provider store={store}>
          <HashRouter>
            <div className='main'>
              <div className="side-bar">
                <ul>
                  {state.itemList.map(item => (
                    <li key={'li' + item.id}>
                      <NavLink to={item.to} exact={item.to === '/'} activeClassName='active-item' className='item'>{item.text}</NavLink>
                    </li>
                  ))}
                </ul>
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem' }}>
                  <span style={{ cursor: 'pointer' }}
                    onClick={() => {
                      fetch('/admin/logout', {
                        credentials: 'include',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      })
                        .then(res => res.json())
                        .then(res => {
                          if (res.code === '1') {
                            window.location.href = '/admin';
                          } else {
                            message.error('退出登录失败，请重试', .5);
                          }
                        })
                        .catch(err => {
                          message.error('退出登录失败，请重试', .5);
                        });
                    }}
                  >
                    <Icon type='logout' style={{ color: '#fff', marginRight: '.5rem' }} />
                    退出登录
                </span>

                </div>
              </div>
              <div className="content">
                <Switch>
                  {state.itemList.map(item => (
                    <Route key={'Route' + item.id} component={item.c} exact={item.to === '/'} path={item.path}></Route>
                  ))}
                </Switch>
              </div>
            </div>
          </HashRouter>
        </Provider>
      </LocaleProvider>
    )
  }
}

export default App;
