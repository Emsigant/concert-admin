export function fakeFetchUserData(start = 0, end = 10) {
    let arr = [];
    let cityArr = ['北京', '上海', '广州', '深圳', '天津', '重庆', '成都', '杭州', '南京', '武汉', '西安', '大连', '青岛'];
    let cityLen = cityArr.length;
    for (let i = start; i < end; i++) {
        let random = ~~(Math.random() * cityLen);
        arr.push({
            key: 'user-' + '100000' + (i < 10 ? '0' : '') + i,
            userId: '100000' + (i < 10 ? '0' : '') + i,
            username: 'user' + i,
            phoneNumber: '12345678901',
            city: cityArr[random],
            country: '中国'
        })
    }
    return arr;
}

export function fakeFetchOrderData(start = 0, end = 10) {
    let fakeOrderData = [];
    for (let i = start; i < end; i++) {
        fakeOrderData.push({
            key: 'order-' + i,
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

const fakeEncashData = [];
for (let i = 0; i < 30; i++) {
    fakeEncashData.push({
        key: 'encash-record-' + '10000' + (i < 10 ? '0' + i : i),
        encashId: '10000' + (i < 10 ? '0' + i : i),
        encashStartTime: '2018-03-21',
        encashStarterId: '1000000001',
        encashAmount: '￥10000',
        encashDestAccount: '2000001',
        encashDestAccountName: 'someone',
        encashStatus: 'pending'
    })
}

export function fakeFetchBusinessData(start = 0, end = 10) {
    let fakeBusinessData = [];
    for (let i = start; i < end; i++) {
        fakeBusinessData.push({
            key: 'business-' + '10000000000' + (i < 10 ? '0' + i : i),
            businessId: '10000000000' + (i < 10 ? '0' + i : i),
            businessReviewStatus: ['失败', '通过', '审核中'][i % 3],
            reveiwStatusCode: i % 3,
            businessName: '商家' + i,
            businessEncashAccount: ~~(Math.random() * 1000000),
            businessEncashAccountName: 'account-name',
            businessEncashRecords: fakeEncashData.map(item => ({
                ...item,
                encashStarterId: '10000000000' + (i < 10 ? '0' + i : i)
            })),
            businessReviewFile: 'review file'
        })
    }
    return fakeBusinessData;
}