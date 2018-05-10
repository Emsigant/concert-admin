// re-designed user module
import {
    fakeAdminData,
    fakeUserData,
    fakeFetchBusinessData,
    fakeFetchEncashRecord,
} from "./data";
import {
    ADMIN_CONSTS,
    USER_CONSTS,
    COMMON_STATUS,
    ORDER_CONSTS,
    BUSINESS_CONSTS,
    PRODUCT_CONSTS,
} from "./CONST";
import {
    message,
} from "antd";

const _jsstr = JSON.stringify;
const ENVIRONMENT = 'dev';
const COMMON_FETCH_OPTIONS = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
};

// new order module
function PushOrderContentToStore(content) {
    return {
        type: ORDER_CONSTS.PUSH_ORDER_CONTENT_TO_STORE,
        content,
    }
}
export function OrderPageChange(diff) {
    return {
        type: ORDER_CONSTS.ORDER_PAGE_CHNAGE,
        diff,
    }
}

export function FetchOrder(pageNo = 1, pageSize = 10) {
    return (dispatch, getState) => {
        fetch('/admin/client/query/order', {
                method: 'post',
                body: _jsstr({
                    pageNo,
                    pageSize
                }),
                ...COMMON_FETCH_OPTIONS,
            })
            .then(res => res.json())
            .then(res => {
                if (res.code === '1') {
                    message.success('获取信息成功', .5);
                    dispatch(PushOrderContentToStore(res.content));
                } else {
                    message.error('获取信息失败，请重试', .5);
                }
            })
            .catch(err => {
                message.error('获取信息失败，请重试', .5);
            });
    }
}

// new business module
export function BusinessPageChange(diff) {
    return {
        type: BUSINESS_CONSTS.BUSINESS_PAGE_CHANGE,
        diff,
    }
}

function PushBusinessContentToStore(content) {
    return {
        type: BUSINESS_CONSTS.PUSH_BUSINESS_CONTENT_TO_STORE,
        content,
    }
}

export function BusinessChangeFilter(statusFilter) {
    return {
        type: BUSINESS_CONSTS.BUSINESS_CHANGE_FILTER,
        statusFilter,
    }
}

export function UpdateBusiness(data, pageNo = 1, statusFilter = '0') {
    return (dispatch, getState) => {
        fetch('/admin/certificate_client', {
                method: 'post',
                body: JSON.stringify(data),
                ...COMMON_FETCH_OPTIONS,
            })
            .then(res => res.json())
            .then(res => {
                if (res.code === '1') {
                    message.success('修改成功');
                    dispatch(FetchBusiness(pageNo, 10, statusFilter))
                } else {
                    message.error('修改失败，请重试');
                }
            })
            .catch(err => {
                message.error('修改失败，请重试');
            });
    }
}

export function FetchBusiness(pageNo = 1, pageSize = 10, statusFilter = '0') {
    window.scrollTo(0, 0);
    return (dispatch, getState) => {
        dispatch(StatusChangeGenerator('business')('fetch')(COMMON_STATUS.PENDING));
        if (ENVIRONMENT === 'dev') {
            setTimeout(() => {
                dispatch(StatusChangeGenerator('business')('fetch')(COMMON_STATUS.RESOLVED));
                dispatch(PushBusinessContentToStore({
                    dataList: fakeFetchBusinessData((pageNo - 1) * 10, pageNo * 10, statusFilter),
                    totalCount: 50,
                    pageNo,
                }))
            }, 500);
        } else {
            fetch('/admin/client/query', {
                    method: 'post',
                    body: JSON.stringify({
                        pageNo,
                        pageSize,
                        status: statusFilter,
                    }),
                    ...COMMON_FETCH_OPTIONS,
                })
                .then(res => res.json())
                .then(res => {
                    if (res.code === '1') {
                        message.success('成功获取信息', .5);
                        dispatch(StatusChangeGenerator('business')('fetch')(COMMON_STATUS.RESOLVED));
                        dispatch(PushBusinessContentToStore(res.content));
                    } else {
                        message.error('获取信息失败，请重试', .5);
                        dispatch(StatusChangeGenerator('business')('fetch')(COMMON_STATUS.REJECTED));
                    }
                })
                .catch(err => {
                    message.error('获取信息失败，请重试', .5);
                    dispatch(StatusChangeGenerator('business')('fetch')(COMMON_STATUS.REJECTED));
                });
        }
    }
}

function PushWithdrawContentToStore(content) {
    return {
        type: BUSINESS_CONSTS.PUSH_WITHDRAW_CONTENT_TO_STORE,
        content,
    }
}

function WithdrawFetchStatusChange(status) {
    return {
        type: BUSINESS_CONSTS.WITHDRAW_FETCH_STATUS_CHANGE,
        status,
    }
}
export function WithdrawPageChange(diff) {
    return {
        type: BUSINESS_CONSTS.WITHDRAW_PAGE_CHANGE,
        diff,
    }
}
export function FetchWithdraw(pageNo = 1, pageSize = 10, userId) {
    return (dispatch, getState) => {
        dispatch(WithdrawFetchStatusChange(COMMON_STATUS.PENDING));
        if (ENVIRONMENT === 'dev') {
            setTimeout(() => {
                dispatch(WithdrawFetchStatusChange(COMMON_STATUS.RESOLVED));
                dispatch(PushWithdrawContentToStore({
                    dataList: fakeFetchEncashRecord((pageNo - 1) * 10, pageNo * 10),
                    pageNo,
                    totalCount: 100,
                }))
            }, 500);
        } else {
            fetch('/admin/client/withdraw_order', {
                    method: 'post',
                    body: JSON.stringify({
                        pageNo,
                        pageSize,
                        userId,
                    }),
                    ...COMMON_FETCH_OPTIONS,
                })
                .then(res => res.json())
                .then(res => {
                    if (res.code === '1') {
                        message.success('成功获取信息', .5);
                        dispatch(WithdrawFetchStatusChange(COMMON_STATUS.RESOLVED));
                        dispatch(PushWithdrawContentToStore(res.content));
                    } else {
                        message.error('获取信息失败，请重试', .5);
                        dispatch(WithdrawFetchStatusChange(COMMON_STATUS.REJECTED));
                    }
                })
                .catch(err => {
                    message.error('获取信息失败，请重试', .5);
                    dispatch(WithdrawFetchStatusChange(COMMON_STATUS.REJECTED));
                });
        }
    }
}

// new product module
// a1
function PushProductContentToStore(content) {
    return {
        type: PRODUCT_CONSTS.PUSH_PRODUCT_CONTENT_TO_STORE,
        content,
    }
}
// a2
export function ProductPageChange(diff) {
    return {
        type: PRODUCT_CONSTS.PRODUCT_PAGE_CHANGE,
        diff,
    }
}

export function FetchProduct(pageNo = 1, pageSize = 10) {
    return (dispatch, getState) => {
        fetch('/admin/query/product', {
                method: 'post',
                body: _jsstr({
                    pageNo,
                    pageSize,
                }),
                ...COMMON_FETCH_OPTIONS,
            })
            .then(res => res.json())
            .then(res => {
                if (res.code === '1') {
                    message.success('成功获取商品基本信息列表', .5);
                    dispatch(PushProductContentToStore(res.content));
                } else {
                    message.error('获取信息失败，请重试', .5);
                }
            })
            .catch(err => {
                message.error('获取信息失败，请重试', .5);
            });
    }
}
// a3
function PushDetailContentToStore(content) {
    return {
        type: PRODUCT_CONSTS.PUSH_DETAIL_CONTENT_TO_STORE,
        content,
    }
}
export function FetchDetail(showId) {
    return (dispatch, getState) => {
        dispatch(PushDetailContentToStore({
            dataList: [],
        }));
        fetch('/admin/query/product/detail', {
                method: 'post',
                body: _jsstr({
                    showId,
                }),
                ...COMMON_FETCH_OPTIONS,
            })
            .then(res => res.json())
            .then(res => {
                if (res.code === '1') {
                    message.success('成功获取详细信息', .5);
                    dispatch(PushDetailContentToStore(res.content));
                } else {
                    message.error('获取详细信息失败，请重试', .5);
                }
            })
            .catch(err => {
                message.error('获取详细信息失败，请重试', .5);
            });
    }
}

export function ShelfProduct(showId, shelfStatus = '2', extra = 'extra', pageNo) {
    return (dispatch, getState) => {
        fetch('/admin/show/shelf', {
                method: 'post',
                body: _jsstr({
                    showId,
                    shelfStatus,
                    extra,
                }),
                ...COMMON_FETCH_OPTIONS,
            })
            .then(res => res.json())
            .then(res => {
                if (res.code === '1') {
                    message.success('上架成功', .5);
                    dispatch(FetchProduct(pageNo));
                } else {
                    message.success('上架失败，请重试', .5);
                }
            })
            .catch(err => {
                message.success('上架失败，请重试', .5);
            });
    }
}

export function OffShelfProduct(showId, shelfStatus = '0', extra = 'extra', pageNo) {
    return (dispatch, getState) => {
        fetch('/admin/show/offshelf', {
                method: 'post',
                body: _jsstr({
                    showId,
                    shelfStatus,
                    extra,
                }),
                ...COMMON_FETCH_OPTIONS,
            })
            .then(res => res.json())
            .then(res => {
                if (res.code === '1') {
                    message.success('下架成功', .5);
                    dispatch(FetchProduct(pageNo));
                } else {
                    message.success('下架失败，请重试', .5);
                }
            })
            .catch(err => {
                message.success('下架失败，请重试', .5);
            });
    }
}

export function ModifyProductStatus(showId, status = '', pageNo) {
    return (dispatch, getState) => {
        fetch('/admin/show/modify/', {
                method: 'post',
                body: _jsstr({
                    showId,
                    status,
                }),
                ...COMMON_FETCH_OPTIONS,
            })
            .then(res => res.json())
            .then(res => {
                if (res.code === '1') {
                    if (status === '4') {
                        message.success('已设为 首页+小编推荐', .5);
                    } else if (status === '2') {
                        message.success('已设为 首页推荐', .5);
                    } else if (status === '3') {
                        message.success('已设为 小编推荐', .5);
                    } else if (status === '1') {
                        message.success('已设为 普通展示', .5);
                    }
                    dispatch(FetchProduct(pageNo));
                } else {
                    message.error('修改状态失败，请重试', .5);
                }
            })
            .catch(err => {
                message.error('修改状态失败，请重试', .5);
            })
    }
}

// common status change function
// StatusChangeGenerator('admin')('fetch')(status) 
// => { type:ADMIN_CONST['ADMIN_FETCH_STATUS_CHANGE'], status }
function StatusChangeGenerator(_module = '') {
    switch (_module) {
        case 'admin':
            {
                let _M = _module.toUpperCase();
                return (_action = '') => (status = '') => ({
                    type: ADMIN_CONSTS[`${_M}_${_action.toUpperCase()}_STATUS_CHANGE`],
                    status,
                })
            }
            break;
        case 'user':
            {
                let _M = _module.toUpperCase();
                return (_action = '') => (status = '') => ({
                    type: USER_CONSTS[`${_M}_${_action.toUpperCase()}_STATUS_CHANGE`],
                    status,
                })
            }
            break;
        case 'product':
            {
                let _M = _module.toUpperCase();
                return (_action = '') => (status = '') => ({
                    type: PRODUCT_CONSTS[`${_M}_${_action.toUpperCase()}_STATUS_CHANGE`],
                    status,
                });
            }
            break;
        case 'business':
            {
                let _M = _module.toUpperCase();
                return (_action = '') => (status = '') => ({
                    type: BUSINESS_CONSTS[`${_M}_${_action.toUpperCase()}_STATUS_CHANGE`],
                    status,
                });
            }
            break;
        case 'order':
            {
                let _M = _module.toUpperCase();
                return (_action = '') => (status = '') => ({
                    type: ORDER_CONSTS[`${_M}_${_action.toUpperCase()}_STATUS_CHANGE`],
                    status,
                });
            }
            break;
        default:
            {
                throw new Error('Unknown status change event');
            }
    }
}

// new user manage module
// 2018-04-23 v1.0
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
    console.log('fetching page ', pageNo);
    return (dispatch, getState) => {
        dispatch(StatusChangeGenerator('user')('fetch')(COMMON_STATUS.PENDING));
        if (ENVIRONMENT === 'dev') {
            setTimeout(() => {
                message.success('成功获取用户列表', .5);
                dispatch(StatusChangeGenerator('user')('fetch')(COMMON_STATUS.RESOLVED));
                dispatch(PushContentToUserStore({
                    dataList: fakeUserData((pageNo - 1) * 10, pageNo * 10),
                    totalCount: 50,
                    pageNo,
                }));
            }, 500);
        } else {
            fetch('/admin/user/query', {
                    method: 'post',
                    body: JSON.stringify({
                        pageNo,
                        pageSize
                    }),
                    ...COMMON_FETCH_OPTIONS,
                })
                .then(res => res.json())
                .then(res => {
                    if (res.code === '1') {
                        message.success('成功获取用户列表', .5);
                        dispatch(StatusChangeGenerator('user')('fetch')(COMMON_STATUS.RESOLVED));
                        dispatch(PushContentToUserStore(res.content));
                    } else {
                        message.error('获取用户列表失败，请重试', .5);
                        dispatch(StatusChangeGenerator('user')('fetch')(COMMON_STATUS.REJECTED));
                    }
                })
                .catch(err => {
                    message.error('获取用户列表失败，请重试', .5);
                    dispatch(StatusChangeGenerator('user')('fetch')(COMMON_STATUS.REJECTED));
                });
        }
    }
}

// new admin manage module
// 2018-04-23 v1.0
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
                message.success('成功获取管理员列表', .5);
                dispatch(AdminFetchStatusChange(COMMON_STATUS.RESOLVED));
                dispatch(AdminPushDataToStore({
                    totalCount: 50,
                    dataList: fakeAdminData((pageNo - 1) * 10, pageNo * 10),
                    pageNo,
                }));
            }, 500);
        } else {
            fetch('/admin/query', {
                    method: 'post',
                    body: JSON.stringify({
                        pageNo,
                        pageSize
                    }),
                    ...COMMON_FETCH_OPTIONS,
                })
                .then(res => res.json())
                .then(res => {
                    if (res.code === '1') {
                        message.success('成功获取管理员列表', .5);
                        dispatch(AdminFetchStatusChange(COMMON_STATUS.RESOLVED));
                        dispatch(AdminPushDataToStore(res.content));
                    } else {
                        message.error('获取管理员列表失败，请重试', .5);
                        dispatch(AdminFetchStatusChange(COMMON_STATUS.REJECTED));
                    }
                })
                .catch(err => {
                    message.error('获取管理员列表失败，请重试', .5);
                    dispatch(AdminFetchStatusChange(COMMON_STATUS.REJECTED));
                });
        }
    }
}

export function SubmitAdmin(data, pageNo) {
    return (dispatch, getState) => {
        dispatch(AdminSubmitStatusChange(COMMON_STATUS.PENDING));
        if (ENVIRONMENT === 'dev') {
            setTimeout(() => {
                message.success('成功添加管理员', .5);
                dispatch(AdminSubmitStatusChange(COMMON_STATUS.RESOLVED));
                dispatch(FetchAdminData(pageNo));
            }, 500);
        } else {
            fetch('/admin/insert', {
                    body: JSON.stringify(data),
                    method: 'post',
                    ...COMMON_FETCH_OPTIONS,
                })
                .then(res => res.json())
                .then(res => {
                    if (res.code === '1') {
                        message.success('成功添加管理员', .5);
                        dispatch(AdminSubmitStatusChange(COMMON_STATUS.RESOLVED));
                        dispatch(FetchAdminData(pageNo));
                    } else {
                        message.error('添加管理员失败', .5);
                        dispatch(AdminSubmitStatusChange(COMMON_STATUS.REJECTED));
                    }
                })
                .catch(err => {
                    message.error('添加管理员失败', .5);
                    dispatch(AdminSubmitStatusChange(COMMON_STATUS.REJECTED));
                    console.log(err);
                });
        }
    }
}

export function UpdateAdmin(data, pageNo) {
    return (dispatch, getState) => {
        dispatch(AdminUpdateStatusChange(COMMON_STATUS.PENDING));
        if (ENVIRONMENT === 'dev') {
            setTimeout(() => {
                message.success('成功注销管理员', .5);
                dispatch(AdminUpdateStatusChange(COMMON_STATUS.RESOLVED));
                dispatch(FetchAdminData(pageNo));
            }, 500);
        } else {
            fetch('/admin/logout_admin', {
                    method: 'post',
                    body: JSON.stringify(data),
                    ...COMMON_FETCH_OPTIONS,
                })
                .then(res => res.json())
                .then(res => {
                    if (res.code === '1') {
                        message.success('成功注销管理员', .5);
                        dispatch(AdminUpdateStatusChange(COMMON_STATUS.RESOLVED));
                        dispatch(FetchAdminData(pageNo));
                    } else {
                        message.error('注销管理员失败，请重试', .5);
                        dispatch(AdminUpdateStatusChange(COMMON_STATUS.REJECTED));
                    }
                })
                .catch(err => {
                    message.error('注销管理员失败，请重试', .5);
                    dispatch(AdminUpdateStatusChange(COMMON_STATUS.REJECTED));
                });
        }
    }
}