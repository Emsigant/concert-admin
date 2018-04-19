// re-designed user module
import {
    fakeAdminData,
    fakeUserData,
} from "./data";
import {
    ADMIN_CONSTS,
    USER_CONSTS,
    COMMON_STATUS,
} from "./CONST";

const ENVIRONMENT = 'dev';
const COMMON_FETCH_OPTIONS = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
};

// order module
export const OrderConsts = {
    ORDER_DATA: 'ORDER_DATA',
    ORDER_PAGE: 'ORDER_PAGE',
    ORDER_PAGE_CHANGE: 'ORDER_PAGE_CHANGE',
    ORDER_CLEAR: 'ORDER_CLEAR'
}
export function orderData(data) {
    return {
        type: OrderConsts.ORDER_DATA,
        data
    }
}
export function fetchOrderData(data, timeout = 500) {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(orderData(data));
        }, timeout);
    }
}
export function orderPage(totalPage) {
    return {
        type: OrderConsts.ORDER_PAGE,
        totalPage
    }
}
export function orderPageChange(step) {
    return {
        type: OrderConsts.ORDER_PAGE_CHANGE,
        step
    }
}
export function orderClear() {
    return {
        type: OrderConsts.ORDER_CLEAR
    }
}

// business module
export const BusinessConsts = {
    BUSINESS_DATA: 'BUSINESS_DATA',
    BUSINESS_PAGE: 'BUSINESS_PAGE',
    BUSINESS_PAGE_CHANGE: 'BUSINESS_PAGE_CHANGE',
    BUSINESS_CLEAR: 'BUSINESS_CLEAR'
}
export function businessData(data) {
    return {
        type: BusinessConsts.BUSINESS_DATA,
        data
    }
}
export function fetchBusinessData(data, timeout = 500) {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(businessData(data));
        }, timeout);
    }
}
export function businessPage(totalPage) {
    return {
        type: BusinessConsts.BUSINESS_PAGE,
        totalPage
    }
}
export function businessPageChange(step) {
    return {
        type: BusinessConsts.BUSINESS_PAGE_CHANGE,
        step
    }
}
export function businessClear() {
    return {
        type: BusinessConsts.BUSINESS_CLEAR
    }
}

// product module
export const ProductConsts = {
    PRODUCT_DATA: 'PRODUCT_DATA',
    PRODUCT_PAGE: 'PRODUCT_PAGE',
    PRODUCT_PAGE_CHANGE: 'PRODUCT_PAGE_CHANGE',
    PRODUCT_CLEAR: 'PRODUCT_CLEAR'
}
export function productData(data) {
    return {
        type: ProductConsts.PRODUCT_DATA,
        data
    }
}
export function fetchProductData(data, timeout = 500) {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(productData(data));
        }, timeout);
    }
}
export function productPage(totalPage) {
    return {
        type: ProductConsts.PRODUCT_PAGE,
        totalPage
    }
}
export function productPageChange(step) {
    return {
        type: ProductConsts.PRODUCT_PAGE_CHANGE,
        step
    }
}
export function productClear() {
    return {
        type: ProductConsts.PRODUCT_CLEAR
    }
}

// common status change function
// StatusChangeGenerator('admin')('fetch')(status) => { type:ADMIN_CONST['ADMIN_FETCH_STATUS_CHANGE'], status }
function StatusChangeGenerator(_module = '') {
    switch (_module) {
        case 'admin':
            {
                return (_action = '') => (status) => ({
                    type: ADMIN_CONSTS[`${_module.toUpperCase()}_${_action.toUpperCase()}_STATUS_CHANGE`],
                    status,
                })
            }
            break;
        case 'user':
            {
                return (_action = '') => (status) => ({
                    type: USER_CONSTS[`${_module.toUpperCase()}_${_action.toUpperCase()}_STATUS_CHANGE`],
                    status,
                })
            }
            break;
        case 'product':
            {

            }
            break;
        case 'business':
            {

            }
            break;
        case 'order':
            {

            }
            break;
        default:
            {
                throw new Error('Unknown module');
            }
    }
}

// new user manage module
function PushContentToUserStore(content) {
    return {
        type: USER_CONSTS.PUSH_CONTENT_TO_USER_STORE,
        content,
    }
}

export function UserPageChange(diff) {
    return {
        type: USER_CONSTS.USER_PAGE_CHANGE,
        diff,
    }
}
export function FetchUser(pageNo = 1, pageSize = 10) {
    return (dispatch, getState) => {
        dispatch(StatusChangeGenerator('user')('fetch')(COMMON_STATUS.PENDING));
        if (ENVIRONMENT === 'dev') {
            setTimeout(() => {
                dispatch(StatusChangeGenerator('user')('fetch')(COMMON_STATUS.RESOLVED));
                dispatch(PushContentToUserStore({
                    dataList: fakeUserData((pageNo - 1) * 10, pageNo * 10),
                    totalCount: 50,
                    pageNo,
                }));
            }, 500);
        } else if (ENVIRONMENT === 'prod') {

        }
    }
}

// new admin manage module
function AdminFetchStatusChange(status) {
    return {
        type: ADMIN_CONSTS.ADMIN_FETCH_STATUS_CHANGE,
        status,
    }
}

function AdminPushDataToStore(content) {
    return {
        type: ADMIN_CONSTS.ADMIN_PUSH_DATA_TO_STORE,
        content,
    }
}

function AdminSubmitStatusChange(status) {
    return {
        type: ADMIN_CONSTS.ADMIN_SUBMIT_STATUS_CHANGE,
        status,
    }
}

function AdminUpdateStatusChange(status) {
    return {
        type: ADMIN_CONSTS.ADMIN_UPDATE_STATUS_CHANGE,
        status,
    }
}
export function AdminPageChange(diff) {
    return {
        type: ADMIN_CONSTS.ADMIN_PAGE_CHANGE,
        diff,
    }
}

export function FetchAdminData(pageNo = 1, pageSize = 10) {
    return (dispatch, getState) => {
        dispatch(AdminFetchStatusChange(COMMON_STATUS.PENDING));
        if (ENVIRONMENT === 'dev') {
            setTimeout(() => {
                dispatch(AdminFetchStatusChange(COMMON_STATUS.RESOLVED));
                dispatch(AdminPushDataToStore({
                    total: 50,
                    dataList: fakeAdminData((pageNo - 1) * 10, pageNo * 10),
                    pageNo,
                }));
            }, 500);
        } else if (ENVIRONMENT === 'prod') {

        }
    }
}

export function SubmitAdmin(data, pageNo) {
    return (dispatch, getState) => {
        dispatch(AdminSubmitStatusChange(COMMON_STATUS.PENDING));
        if (ENVIRONMENT === 'dev') {
            setTimeout(() => {
                dispatch(AdminSubmitStatusChange(COMMON_STATUS.RESOLVED));
                dispatch(FetchAdminData(pageNo));
            }, 500);
        } else if (ENVIRONMENT === 'prod') {

        }
    }
}

export function UpdateAdmin(data, pageNo) {
    return (dispatch, getState) => {
        dispatch(AdminUpdateStatusChange(COMMON_STATUS.PENDING));
        if (ENVIRONMENT === 'dev') {
            setTimeout(() => {
                dispatch(AdminUpdateStatusChange(COMMON_STATUS.RESOLVED));
                dispatch(FetchAdminData(pageNo));
            }, 500);
        } else if (ENVIRONMENT === 'prod') {

        }
    }
}