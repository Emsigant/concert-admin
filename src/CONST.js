// actions consts
export const ADMIN_CONSTS = {
    ADMIN_FETCH_STATUS_CHANGE: 'admin-fetch-status-change',
    ADMIN_PUSH_DATA_TO_STORE: 'admin-push-data-to-store',
    ADMIN_SUBMIT_STATUS_CHANGE: 'admin-submit-status-change',
    ADMIN_PAGE_CHANGE: 'admin-page-change',
    ADMIN_UPDATE_STATUS_CHANGE: 'admin-update-status-change',
};
export const USER_CONSTS = {
    PUSH_CONTENT_TO_USER_STORE: '1',
    USER_FETCH_STATUS_CHANGE: '2',
    USER_PAGE_CHANGE: '3',
};
export const PRODUCT_CONSTS = {

};
export const BUSINESS_CONSTS = {
    PUSH_BUSINESS_CONTENT_TO_STORE: 'B1',
    BUSINESS_PAGE_CHANGE: 'B2',
    BUSINESS_FETCH_STATUS_CHANGE: 'B3',
    BUSINESS_CHANGE_FILTER: 'B4',
    PUSH_WITHDRAW_CONTENT_TO_STORE: 'W1',
    WITHDRAW_PAGE_CHANGE: 'W2',
    WITHDRAW_FETCH_STATUS_CHANGE: 'W3',
};
export const ORDER_CONSTS = {
    PUSH_ORDER_CONTENT_TO_STORE: 'ORDER1',
    ORDER_PAGE_CHNAGE: 'ORDER2',
};

export const COMMON_STATUS = {
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
    INTI: 'init',
};

// const name style:
/**
 * PUSH_MODULE_CONTENT_TO_STORE, 
 * MODULE_PAGE_CHANGE, 
 * MODULE_ACTION_STATUS_CHANGE,
 */