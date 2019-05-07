const chart = {
    normalBarBind: function (data, title, childTitle, unit, xListProp, yListProp) {
        let tmpData = {
            title: title,
            childTitle: childTitle,
            xList: [],
            yList: [],
            unit: unit
        };
        if (Array.isArray(data) && data.length > 0) {

                data.forEach(function (item) {
                    tmpData.xList.push(item[xListProp]);

                    let tmpArray = [];
                    tmpArray.push(item[xListProp]);
                    tmpArray.push(item[yListProp]);

                    tmpData.yList.push(tmpArray);
                });
        }
        return tmpData;
    },
    normalBarBindChild: function (data, dataProp, title, childTitle, unit, xListProp, yListProp) {
        let tmpData = {
            title: title,
            childTitle: childTitle,
            xList: [],
            yList: [],
            unit: unit
        };
        if (Array.isArray(data) && data.length > 0) {
            if (data !== undefined && !!data) {
                data.forEach(function (item) {
                    tmpData.xList.push(item[dataProp][xListProp]);

                    let tmpArray = [];
                    tmpArray.push(item[dataProp][xListProp]);
                    tmpArray.push(item[dataProp][yListProp]);

                    tmpData.yList.push(tmpArray);
                });
            }
        }
        return tmpData;
    },
    normalBarBindFixedXList: function (data, title, childTitle, unit, xList, xListProp, yListProp) {
        let tmpData = {
            title: title,
            childTitle: childTitle,
            xList: xList,
            yList: [],
            unit: unit
        };
        if (Array.isArray(data)) {
            data.forEach(function (item) {
                let tmpArray = [];
                tmpArray.push(item[xListProp]);
                tmpArray.push(item[yListProp]);

                tmpData.yList.push(tmpArray);
            });
        }
        return tmpData;
    },
    doubleBarBind: function (data, title, childTitle, unit, xList, childTitleProy, xListProp, yListProp) {
        let tmpData = {
            title: title,
            xList: xList,
            yList: [],
            yList2: [],
            childTitle: childTitle[0],
            childTitle2: childTitle[1],
            unit: unit
        };
        if (Array.isArray(data)) {
            data.forEach(function (item) {
                let tmpArray = [];
                switch (item[childTitleProy]) {
                    case childTitle[0]:
                        tmpArray.push(item[xListProp]);
                        tmpArray.push(item[yListProp]);
                        tmpData.yList.push(tmpArray);
                        break;

                    case childTitle[1]:
                        tmpArray.push(item[xListProp]);
                        tmpArray.push(item[yListProp]);
                        tmpData.yList2.push(tmpArray);
                        break;
                }
            });
        }
        return tmpData;
    },
    doubleBarBindMoreRow: function (title, childTitle, unit, data, xList, yListField, yListGroup, yListGroupCondition) {
        let tmpData = {
            title: title,
            xList: xList,
            yList: [],
            yList2: [],
            childTitle: childTitle[0],
            childTitle2: childTitle[1],
            unit: unit
        };

        if (Array.isArray(data) && data) {
            data.forEach(item => {
                let tmpArray = [];
                switch (item[yListGroup]) {
                    case yListGroupCondition[0] :
                        tmpArray.push(item[yListField[0]]);
                        tmpArray.push(item[yListField[1]]);
                        tmpData.yList.push(tmpArray);
                        break;

                    case yListGroupCondition[1]:
                        tmpArray.push(item[yListField[0]]);
                        tmpArray.push(item[yListField[1]]);
                        tmpData.yList2.push(tmpArray);
                        break;
                }
            });
        }
        return tmpData;
    },
    doubleBarBindMoreCol: function (data, title, childTitle, unit, xList, xListProp, yListProp) {
        let tmpData = {
            title: title,
            xList: xList,
            yList: [],
            yList2: [],
            childTitle: childTitle[0],
            childTitle2: childTitle[1],
            unit: unit
        };
        if (Array.isArray(data)) {
            data.forEach(function (item) {
                let tmpArray = [];
                tmpArray.push(item[xListProp]);
                tmpArray.push(item[yListProp[0]]);

                tmpData.yList.push(tmpArray);

                tmpArray = [];
                tmpArray.push(item[xListProp]);
                tmpArray.push(item[yListProp[1]]);

                tmpData.yList2.push(tmpArray);
            });
        }
        return tmpData;
    },
    normalCircleBind: function (data, scale, title, childName, names, valueProps) {
        let tmpData = {
            scale: scale,
            title: title,
            childName: childName,
            data: []
        };
        if (Array.isArray(names) && Array.isArray(valueProps)) {
            if (names.length === valueProps.length) {
                data.forEach(function (dataItem) {
                    valueProps.forEach(function (item, index) {
                        let tmp = {
                            name: {},
                            value: {}
                        };
                        tmp.name = names[index];
                        tmp.value = Number(dataItem[item]);

                        tmpData.data.push(tmp);
                    });
                });
            }
        }
        return tmpData;
    },
    simpleCircleBind: function (data, title, subText, nameProp, valueProp) {
        let tmpData = {
            title: title,
            subText: subText,
            data: []
        };
        data.forEach(function (dataItem) {
            let tmp = {
                name: {},
                value: {}
            };
            tmp.name = dataItem[nameProp];
            tmp.value = dataItem[valueProp];

            tmpData.data.push(tmp);
        });
        return tmpData;
    }
};

export default chart;