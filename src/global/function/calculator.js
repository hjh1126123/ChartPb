const calculator = {
    ToFixed: function toFixed(number, decimal) {
        decimal = decimal || 0;
        let s = String(number);
        let decimalIndex = s.indexOf('.');
        if (decimalIndex < 0) {
            let fraction = '';
            for (let i = 0; i < decimal; i++) {
                fraction += '0';
            }
            return s + '.' + fraction;
        }
        let numDigits = s.length - 1 - decimalIndex;
        if (numDigits <= decimal) {
            let fraction = '';
            for (let i = 0; i < decimal - numDigits; i++) {
                fraction += '0';
            }
            return s + fraction;
        }
        let digits = s.split('');
        let pos = decimalIndex + decimal;
        let roundDigit = digits[pos + 1];
        if (roundDigit > 4) {
            //跳过小数点
            if (pos === decimalIndex) {
                --pos;
            }
            digits[pos] = Number(digits[pos] || 0) + 1;
            //循环进位
            while (digits[pos] === 10) {
                digits[pos] = 0;
                --pos;
                if (pos === decimalIndex) {
                    --pos;
                }
                digits[pos] = Number(digits[pos] || 0) + 1;
            }
        }
        //避免包含末尾的.符号
        if (decimal === 0) {
            decimal--;
        }
        return digits.slice(0, decimalIndex + decimal + 1).join('');
    }
};

export default calculator;
