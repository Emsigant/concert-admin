import cimage from "./c.jpg";
export function fakeUserData(start = 0, end = 10) {
    let arr = [];
    let cityArr = ['北京', '上海', '广州', '深圳', '天津', '重庆', '成都', '杭州', '南京', '武汉', '西安', '大连', '青岛'];
    let cityLen = cityArr.length;
    for (let i = start; i < end; i++) {
        let random = ~~(Math.random() * cityLen);
        arr.push({
            userId: '100000' + (i < 10 ? '0' : '') + i,
            nickName: 'user' + i,
            phone: '12345678901',
            country: '中国'
        })
    }
    return arr;
}

export function fakeFetchOrderData(start = 0, end = 10) {
    let fakeOrderData = [];
    for (let i = start; i < end; i++) {
        fakeOrderData.push({
            key: ['order-', i].join(''),
            productName: '演出' + (Math.random() * 10).toFixed(0),
            orderId: '100000' + (i < 10 ? '0' : '') + i,
            time: '2018-03-20',
            address: '武汉',
            type: '类型',
            price: '￥' + (Math.random() * 1000).toFixed(0),
            status: '0|1|2'
        })
    }
    return fakeOrderData;
}


export function fakeFetchEncashRecord(start = 0, end = 10) {
    let fakeEncashData = [];
    for (let i = start; i < end; i++) {
        fakeEncashData.push({
            "amount": 2014,
            "bankCardNo": "",
            "bankName": "",
            "createTime": 1523867180000,
            "status": "0",
            "userName": "wxn",
            "withdrawOrderId": "WI0000000008" + i,
        })
    }
    return fakeEncashData;
}

export function fakeFetchBusinessData(start = 0, end = 10, statusFilter = '0') {
    let fakeBusinessData = [];
    for (let i = start; i < end; i++) {
        fakeBusinessData.push({
            userId: '10000000000' + (i < 10 ? '0' + i : i),
            authImageUrl: cimage,
            userName: '商家名称' + i,
            bankCardNo: '1000000' + i,
            status: statusFilter, // '0'认证中 '1'认证通过 '2'认证失败，
            bankName: "中国工商银行",
        })
    }
    return fakeBusinessData;
}

export function fakeFetchProductData(start = 0, end = 10) {
    let fakeArr = [];
    for (let i = start; i < end; i++) {
        fakeArr.push({
            key: ['product-', i].join(''),
            productId: ['100000', i].join(''),
            productTitle: ['product', i].join(''),
            productPriceRange: '50-100',
            productDetail: {
                ticketType: [1, 2, 3].map(item => ('type-' + item)),
                ticketPrice: [50, 75, 100],
                ticketAmount: 100,
                introduction: 'an introduction',
                time: '2018-04-03'
            },
            productDiscountInfo: 8,
            productOriginBusiness: 'a-business',
            productStatus: '0|1|2',
            productIsHighlight: false,
            prodcutIsRecommendation: false
        })
    }
    return fakeArr;
}

export function fakeAdminData(start = 0, end = 10) {
    let arr = [];
    for (let i = start; i < end; i++) {
        arr.push({
            userId: `UI0000${i}`,
            phone: `1234567890${i}`,
            status: '' + (i % 2), // '0' for normal, '1' for non-used
            nickName: 'nickname',
        })
    }
    return arr;
}