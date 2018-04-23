function formatNumberToString(num) {
    return +num < 10 ? '0' + num : '' + num;
}

/**
 * 
 * @param {number} timeStamp
 * @returns {string}
 */
export function FormatTime(timeStamp) {
    timeStamp = +timeStamp;
    let date = new Date(timeStamp);
    let getFullYear = date.getFullYear(),
        getMonth = date.getMonth() + 1,
        getDate = date.getDate(),
        getHours = date.getHours(),
        getMinutes = date.getMinutes();
    getMonth = formatNumberToString(getMonth);
    getDate = formatNumberToString(getDate);
    getHours = formatNumberToString(getHours);
    getMinutes = formatNumberToString(getMinutes);
    return `${getFullYear}-${getMonth}-${getDate} ${getHours}:${getMinutes}`;
}