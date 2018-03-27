const fakeUserData = [];
let cityArr = ['北京','上海','广州','深圳','天津','成都','杭州','南京', '武汉','大连','青岛'];
let cityLen = cityArr.length;
for (let i = 0; i < 10; i++) {
    let random = ~~(Math.random()*cityLen);
    fakeUserData.push({
        userId: '100000' + (i < 10 ? '0' : '') + i,
        username: 'user' + i,
        number: '123-456-7890',
        city: cityArr[random],
        country: '中国'
    })
}

const fakeOrderData = [];
for (let i = 0; i < 10; i++) {
    fakeOrderData.push({
        productName: '演出' + (Math.random() * 10).toFixed(0),
        orderId: '100000' + (i < 10 ? '0' : '') + i,
        time: '2018-03-20',
        address: '武汉',
        type: '类型',
        price: '￥' + (Math.random() * 1000).toFixed(0),
        status: '0|1|2'
    })
}

const fakeEncashData = [];
for (let i = 0; i < 30; i++) {
    fakeEncashData.push({
        encashId: '10000' + (i < 10 ? '0' + i : i),
        encashStartTime: '2018-03-21',
        encashStarterId: '1000000001',
        encashAmount: '￥10000',
        encashDestAccount: '2000001',
        encashDestAccountName: 'someone',
        encashStatus: 'pending'
    })
}

const fakeBusinessData = [];
for (let i = 0; i < 10; i++) {
    fakeBusinessData.push({
        businessId: '10000000000' + (i < 10 ? '0' + i : i),
        businessReviewStatus: ['失败','通过','审核中'][i % 3],
        reveiwStatusCode: i % 3,
        businessName: '商家' + i,
        businessEncashAccount: ~~(Math.random()*1000000),
        businessEncashAccountName: 'account-name',
        businessEncashRecords: fakeEncashData.map(item => ({...item, encashStarterId:'10000000000' + (i < 10 ? '0' + i : i)})),
        businessReviewFile: 'review file'
    })
}

const fakeProductData = [];
for(let i = 0; i<10;i++) {
    fakeProductData.push(i);
}

module.exports.fakeUserData = fakeUserData;
module.exports.fakeOrderData = fakeOrderData;
module.exports.fakeBusinessData = fakeBusinessData;
module.exports.fakeProductData = fakeProductData;