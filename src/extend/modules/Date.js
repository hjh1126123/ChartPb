export default {
    stringToDate : function(dateStr,separator){
        if(!separator){
            separator="-";
        }
        let dateArr = dateStr.split(separator);
        let year = parseInt(dateArr[0]);
        let month;
        //处理月份为04这样的情况
        if(dateArr[1].indexOf("0") === 0){
            month = parseInt(dateArr[1].substring(1));
        }else{
            month = parseInt(dateArr[1]);
        }
        let day = parseInt(dateArr[2]);
        return new Date(year, month - 1, day);
    }
}