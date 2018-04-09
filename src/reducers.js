/**
 * message.success will be here
 */
import {
    message
} from 'antd';
import {
    combineReducers
} from 'redux';
import {
    UserConsts,
    OrderConsts,
    BusinessConsts,
    ProductConsts,
    AdminConsts
} from './actions'

// 重构的User模块
function User(state, action) {
    switch (action.type) {
        case UserConsts.PUSH_USER_DATA:
            {
                return {
                    ...state,
                    data: action.data
                }
            }
        case UserConsts.USER_PAGE_CHANGE:
            {
                let page = state.page + action.step;
                return {
                    ...state,
                    page
                }
            }
        case UserConsts.PUSH_USER_PAGE:
            {
                return {
                    ...state,
                    totalPage: action.totalPage
                }
            }
        case UserConsts.USER_CLEAR:
            {
                return {
                    ...state,
                    data: []
                }
            }
        default:
            {
                return {
                    page: 1,
                    totalPage: 10,
                    data: []
                }
            }
    }
}

// order module
function Order(state, action) {
    switch (action.type) {
        case OrderConsts.ORDER_DATA:
            {
                return {
                    ...state,
                    data: action.data
                }
            }
        case OrderConsts.ORDER_PAGE:
            {
                return {
                    ...state,
                    totalPage: action.totalPage
                }
            }
        case OrderConsts.ORDER_PAGE_CHANGE:
            {
                let page = state.page + action.step
                return {
                    ...state,
                    page
                }
            }
        case OrderConsts.ORDER_CLEAR:
            {
                return {
                    ...state,
                    data: []
                }
            }
        default:
            {
                return {
                    page: 1,
                    totalPage: 20,
                    data: []
                }
            }
    }
}

function Business(state, action) {
    switch (action.type) {
        case BusinessConsts.BUSINESS_DATA:
            {
                return {
                    ...state,
                    data: action.data
                }
            }
        case BusinessConsts.BUSINESS_PAGE:
            {
                return {
                    ...state,
                    totalPage: action.totalPage
                }
            }
        case BusinessConsts.BUSINESS_PAGE_CHANGE:
            {
                let page = state.page + action.step
                return {
                    ...state,
                    page
                }
            }
        case BusinessConsts.BUSINESS_CLEAR:
            {
                return {
                    ...state,
                    data: []
                }
            }
        default:
            {
                return {
                    page: 1,
                    totalPage: 30,
                    data: [],
                    encashRecords: []
                }
            }
    }
}

function Product(state, action) {
    switch (action.type) {
        case ProductConsts.PRODUCT_DATA:
            {
                return {
                    ...state,
                    data: action.data
                }
            }
        case ProductConsts.PRODUCT_PAGE:
            {
                return {
                    ...state,
                    totalPage: action.totalPage
                }
            }
        case ProductConsts.PRODUCT_PAGE_CHANGE:
            {
                let page = state.page + action.step
                return {
                    ...state,
                    page
                }
            }
        case ProductConsts.PRODUCT_CLEAR:
            {
                return {
                    ...state,
                    data: []
                }
            }
        default:
            {
                return {
                    page: 1,
                    totalPage: 10,
                    data: []
                }
            }
    }
}

function Admin(state, action) {
    switch (action.type) {
        case AdminConsts.ADMIN_DATA:
            {
                return {
                    ...state,
                    data: action.data
                }
            }
        case AdminConsts.ADMIN_PAGE:
            {
                return {
                    ...state,
                    totalPage: action.totalPage
                }
            }
        case AdminConsts.ADMIN_PAGE_CHANGE:
            {
                let page = state.page + action.step;
                return {
                    ...state,
                    page
                }
            }
        case AdminConsts.ADMIN_CLEAR:
            {
                return {
                    ...state,
                    data: []
                }
            }
        case AdminConsts.ADMIN_BEGIN_LOADING:
            {
                let len = state.data.length;
                let data = [...state.data];
                for (let i = 0; i < len; i++) {
                    if (data[i].adminId === action.id) {
                        data[i].loading = true;
                        break;
                    }
                }
                return {
                    ...state,
                    data
                }
            }
        case AdminConsts.ADMIN_FINISH_PENDING:
            {
                message.success('成功注销');
                let len = state.data.length;
                let data = [...state.data];
                for (let i = 0; i < len; i++) {
                    if (data[i].adminId === action.id) {
                        data[i].loading = false;
                        data[i].disabled = true;
                        break;
                    }
                }
                return {
                    ...state,
                    data
                }
            }
        case AdminConsts.ADMIN_BEGIN_SUBMIT:
            {
                return {
                    ...state,
                    showFormLoading: true
                }
            }
        case AdminConsts.ADMIN_FINISH_SUBMIT:
            {
                message.success('成功提交');
                return {
                    ...state,
                    showFormLoading: false
                }
            }
        case AdminConsts.ADMIN_SHOW_FORM:
            {
                return {
                    ...state,
                    showForm: true
                }
            }
        case AdminConsts.ADMIN_CLOSE_FORM:
            {
                return {
                    ...state,
                    showForm: false
                }
            }
        default:
            {
                return {
                    data: [],
                    totalPage: 1,
                    page: 1,
                    showFormLoading: false,
                    showForm: false
                }
            }
    }
}

const reducers = combineReducers({
    User,
    Order,
    Business,
    Product,
    Admin
});
export default reducers;