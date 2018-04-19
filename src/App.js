import React, { Component } from 'react';
import { HashRouter, Route, NavLink, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { LocaleProvider } from 'antd';
import moment from 'moment';

import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './App.css';
import 'antd/dist/antd.css';

import reducers from './reducers';

// new pages
import Welcome from './new-pages/Welcome';
import UserManage from './new-pages/UserManage';
import OrderManage from './new-pages/OrderManage';
import BusinessManage from './new-pages/BusinessManage';
import ProductManage from './new-pages/ProductManange';
import AccountManage from './new-pages/AccountManange.jsx';
// abandoned pages
// import User from './pages/user';
// import Order from './pages/order';
// import Product from './pages/product';
// import Business from './pages/business';

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
        { id: 5, text: '账号管理', to: '/account', path: '/account', c: AccountManage }
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
