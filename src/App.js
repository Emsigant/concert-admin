import React, { Component } from 'react';
import { HashRouter, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from './reducers';

import User from './pages/user';
import Order from './pages/order';
import Product from './pages/product';
import Business from './pages/business';

let store = createStore(reducers);

class App extends Component {
  constructor(p) {
    super(p);
    this.state = {
      itemList: [
        {
          id: 0, text: '欢迎', to: '/', path: '/',
          c: () => (
            <div style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', fontSize: '3rem', display: 'flex' }}
            >Welcome</div>
          )
        },
        { id: 1, text: '用户管理', to: '/user', path: '/user', c: User },
        { id: 2, text: '订单管理', to: '/order', path: '/order', c: Order },
        { id: 3, text: '商品管理', to: '/product', path: '/product', c: Product },
        { id: 4, text: '商家管理', to: '/business', path: '/business', c: Business }
      ],
      p: {
        key1: 1,
        key2: 2,
        key3: 3
      }
    };
  }
  render() {
    let { state } = this;
    return (
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
              <div className="log-out">
                Logout
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
    )
  }
}

export default App;
