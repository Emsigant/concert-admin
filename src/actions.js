// re-designed user module
export const UserConsts = {
    PUSH_USER_DATA: 'PUSH_USER_DATA',
    PUSH_USER_PAGE: 'PUSH_USER_PAGE',
    USER_PAGE_CHANGE: 'USER_PAGE_CHANGE',
    USER_CLEAR: 'USER_CLEAR'
}
export function userData(data) {
    return {
        type: UserConsts.PUSH_USER_DATA,
        data
    }
}
export function fetchUserData(data, timeout = 500) {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(userData(data));
        }, timeout);
    }
}
export function userPage(totalPage) {
    return {
        type: UserConsts.PUSH_USER_PAGE,
        totalPage
    }
}
export function userPageChange(step) {
    return {
        type: UserConsts.USER_PAGE_CHANGE,
        step
    }
}
export function userClear() {
    return {
        type: UserConsts.USER_CLEAR
    }
}

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
export function fetchOrderData(data, timeout=500) {
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
export function fetchBusinessData(data, timeout=500) {
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
export function fetchProductData(data, timeout=500) {
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