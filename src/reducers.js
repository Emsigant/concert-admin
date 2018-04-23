/**
 * message.success will be here
 */
import {
    message
} from 'antd';
import {
    combineReducers,
} from 'redux';
import {
    UserConsts,
    OrderConsts,
    BusinessConsts,
    ProductConsts,
    AdminConsts
} from './actions'
import {
    ADMIN_CONSTS,
    USER_CONSTS,
    BUSINESS_CONSTS,
    PRODUCT_CONSTS,
    ORDER_CONSTS,
} from "./CONST";

// 重构的User模块
function User(state, action) {
    switch (action.type) {
        case USER_CONSTS.PUSH_CONTENT_TO_USER_STORE:
            {
                return {
                    ...state,
                    pageNo: action.content.pageNo,
                    dataList: action.content.dataList,
                    totalCount: action.content.totalCount,
                }
            }
        case USER_CONSTS.USER_FETCH_STATUS_CHANGE:
            {
                return {
                    ...state,
                    fetchStatus: action.status,
                }
            }
        case USER_CONSTS.USER_PAGE_CHANGE:
            {
                return {
                    ...state,
                    pageNo: state.pageNo + action.diff,
                }
            }
        default:
            {
                return {
                    pageNo: 1,
                    totalCount: 1,
                    dataList: [],
                    fetchStatus: 'init',
                }
            }
    }
}

// order module
function Order(state, action) {
    switch (action.type) {
        case ORDER_CONSTS.PUSH_ORDER_CONTENT_TO_STORE:
            {
                return {
                    ...state,
                    pageNo: action.content.pageNo,
                    pageSize: action.content.pageSize,
                    totalCount: action.content.totalCount,
                }
            }
            break;
        case ORDER_CONSTS.ORDER_PAGE_CHNAGE:
            {
                return {
                    ...state,
                    pageNo: state.pageNo + action.diff,
                }
            }
            break;
        case ORDER_CONSTS.ORDER_FETCH_STATUS_CHANGE:
            {
                return {
                    ...state,
                    fetchStatus: action.status,
                }
            }
        default:
            {
                return {
                    pageNo: 1,
                    totalCount: 1,
                    dataList: [],
                    fetchStatus: 'init',
                }
            }
    }
}

function Business(state, action) {
    switch (action.type) {
        case BUSINESS_CONSTS.PUSH_BUSINESS_CONTENT_TO_STORE:
            {
                return {
                    ...state,
                    dataList: action.content.dataList,
                    pageNo: action.content.pageNo,
                    totalCount: action.content.totalCount,
                }
            }
        case BUSINESS_CONSTS.BUSINESS_CHANGE_FILTER:
            {
                return {
                    ...state,
                    statusFilter: action.statusFilter,
                }
            }
        case BUSINESS_CONSTS.BUSINESS_FETCH_STATUS_CHANGE:
            {
                return {
                    ...state,
                    fetchStatus: action.status,
                }
            }
        case BUSINESS_CONSTS.BUSINESS_PAGE_CHANGE:
            {
                return {
                    ...state,
                    pageNo: state.pageNo + action.diff,
                }
            }
        case BUSINESS_CONSTS.WITHDRAW_PAGE_CHANGE:
            {
                return {
                    ...state,
                    recordPageNo: state.recordPageNo + action.diff,
                }
            }
        case BUSINESS_CONSTS.PUSH_WITHDRAW_CONTENT_TO_STORE:
            {
                return {
                    ...state,
                    recordData: action.content.dataList,
                    recordPageNo: action.content.pageNo,
                    recordTotalCount: action.content.totalCount,
                }
            }
        case BUSINESS_CONSTS.WITHDRAW_FETCH_STATUS_CHANGE:
            {
                return {
                    ...state,
                    recordFetchStatus: action.status,
                }
            }
        default:
            {
                return {
                    pageNo: 1,
                    totalCount: 1,
                    dataList: [],
                    fetchStatus: 'init',
                    statusFilter: '0',
                    recordData: [],
                    recordPageNo: 1,
                    recordTotalCount: 1,
                    recordFetchStatus: 'init',
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
        case ADMIN_CONSTS.ADMIN_PUSH_DATA_TO_STORE:
            {
                return {
                    ...state,
                    data: action.content.dataList,
                    total: action.content.totalCount,
                    page: action.content.pageNo,
                }
            }
        case ADMIN_CONSTS.ADMIN_FETCH_STATUS_CHANGE:
            {
                return {
                    ...state,
                    fetchDataStatus: action.status,
                }
            }
        case ADMIN_CONSTS.ADMIN_SUBMIT_STATUS_CHANGE:
            {
                return {
                    ...state,
                    submitDataStatus: action.status,
                }
            }
        case ADMIN_CONSTS.ADMIN_PAGE_CHANGE:
            {
                return {
                    ...state,
                    page: state.page + action.diff,
                }
            }
        case ADMIN_CONSTS.ADMIN_UPDATE_STATUS_CHANGE:
            {
                return {
                    ...state,
                    updateDataStatus: action.status,
                }
            }
        default:
            {
                return {
                    data: [],
                    page: 1,
                    total: 1,
                    fetchDataStatus: 'init',
                    submitDataStatus: 'init',
                    updateDataStatus: 'init',
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