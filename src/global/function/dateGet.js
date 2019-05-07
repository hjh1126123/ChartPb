const dateGet = {
    getTimestamp() {
        return (new Date()).valueOf();
    },
    getBeforeMonth(n) {
        let date = new Date();
        let month, day;
        date.setDate(date.getDate() - n);
        month = date.getMonth() + 1;
        day = date.getDate();
        return (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
    },
    getBeforeDate(n) {
        let date = new Date();
        let year, month, day;
        date.setDate(date.getDate() - n);
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        return year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
    },
    getNowFormatDate() {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    getNextDate(n) {
        let date = new Date();
        let year, month, day;
        date.setDate(date.getDate() + n);
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        return year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
    },
    calculateDiffTime(faultDat, completeTime) {
        let stime = Date.parse(new Date(faultDat));
        let etime = Date.parse(new Date(completeTime));
        let usedTime = etime - stime;  //两个时间戳相差的毫秒数
        return Math.floor(usedTime / (24 * 3600 * 1000));
    }
};

export default dateGet;