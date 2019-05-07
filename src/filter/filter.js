const conversion = {
    changeHouseName: function (name) {
        let str = "";
        if (!name)
            return;
        name = name.replace(/^\s+|\s+$/gm, '');
        let names = name.toUpperCase();
        switch (names) {
            case "AUDB":
                str = "澳洲仓库";
                break;
            case "AUFK":
                str = "澳洲福克兰";
                break;
            case "JPDB,JPSFDB":
                str = "日本仓库";
                break;
            case "DEDB":
                str = "德国仓库";
                break;
            case "HKDB":
                str = "香港仓库";
                break;
            case "KRDB":
                str = "韩国仓库";
                break;
            case "QDDB":
                str = "QDDB";
                break;
            case "UKDB":
                str = "英国仓库";
                break;
            case "USDB":
                str = "美国仓库";
                break;
            case "USDB,JPDB,JPSFDB,AUDB,DEDB,UKDB":
                str = "全部仓库";
                break;
            default:
                str = names;
        }
        return str;
    },
    changeTypeName: function (index) {
        let str = "支付未处理";
        switch (parseInt(index)) {
            case 2:
                str = "支付未处理";
                break;
            case 3:
                str = "处理未打板";
                break;
            case 4:
                str = "打板未交接";
                break;
            case 5:
                str = "出库未起飞";
                break;
            case 6:
                str = "起飞未降落";
                break;
            case 7:
                str = "降落未清关";
                break;
            case 8:
                str = "七天无路由";
                break;
        }
        return str;
    }
};

export default conversion;
