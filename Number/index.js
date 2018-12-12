/*
 * @method   重写Number类型的fixed方法(四舍五入)
 * @origin   https://github.com/tianxiangbing/toFixed/blob/master/src/index.js 
 * @author   add by yangguoqiang @18/01/31
 * @params 
 *     d     {Number.Int}   小数位截取 
 * @return   {String}       数字截取后的字符串形式
 * @demo     123.321.toFixed(2)
 */
Number.prototype.toFixed = function (d) {
    var s = this + "";
    if (!d) d = 0;
    d = parseInt(d);
    if (s.indexOf(".") == -1) s += ".";
    s += new Array(d + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
        if (a == d + 2) {
            a = s.match(/\d/g);
            if ((pm !== '-' && parseInt(a[a.length - 1]) > 4) || (pm === "-" && parseInt(a[a.length - 1]) > 5)) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] == 10) {
                        a[i] = 0;
                        b = i != 1;
                    } else break;
                }
            }
            s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
        } if (b) s = s.substr(1);
        return (pm + s).replace(/\.$/, "");
    } 
    return this + "";
};


/*
 * @method   检测是否是个数字(包括数字字符串  但是不包括 344. 这种)
 * @author   add by yangguoqiang @18/05/31
 * @params 
 *     val        {Any}      元数据
 * @return   {Boolean}       true/false
 * @demo     isRealNum(234533)
 */
export function isRealNum(val) {
	var patrn = /^(-)?\d+(\.\d+)?$/;
	if (patrn.exec(val) == null || val === '') {
		return false;
	} else {
		return true;
	}
}

// 两者间的随机数
export function random(lower, upper) {
    var range = upper - lower + 1;
    return (Math.floor((Math.random() * range) + lower));
}



function _isAlpha(ch) {
    return (((ch >= 'a') && (ch <= 'z')) || ((ch >= 'A') && (ch <= 'Z')));
}
function _isNumeric(ch) {
    return ((ch >= '0') && (ch <= '9'));
}

// 获得n为的随机密码
export function getRandomPassword(n) {
    var s = "", ch;
    while (s.length < n) {
        ch = String.fromCharCode(random(33, 122));
        if (_isAlpha(ch) || _isNumeric(ch)) {
            s += ch;
        }
    }
    return (s.toLowerCase());
}


//现金额大写转换函数
    //upDigit(168752632)
    //result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
    //upDigit(1682)
    //result："人民币壹仟陆佰捌拾贰元整"
    //upDigit(-1693)
    //result："欠人民币壹仟陆佰玖拾叁元整"
    export function upDigit(n) {
        let fraction = ['角', '分', '厘'];
        let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        let unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        let head = n < 0 ? '欠人民币' : '人民币';
        n = Math.abs(n);
        let s = '';
        for (let i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (let i = 0; i < unit[0].length && n > 0; i++) {
            let p = '';
            for (let j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
            //s = p + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    }


// 实现金额大写转换函数
function transform(tranvalue) {
    try {
        var i = 1;
        var dw2 = new Array("", "万", "亿"); //大单位
        var dw1 = new Array("拾", "佰", "仟"); //小单位
        var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
        //以下是小写转换成大写显示在合计大写的文本框中     
        //分离整数与小数
        var source = splits(tranvalue);
        var num = source[0];
        var dig = source[1];
        //转换整数部分
        var k1 = 0; //计小单位
        var k2 = 0; //计大单位
        var sum = 0;
        var str = "";
        var len = source[0].length; //整数的长度
        for (i = 1; i <= len; i++) {
            var n = source[0].charAt(len - i); //取得某个位数上的数字
            var bn = 0;
            if (len - i - 1 >= 0) {
                bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
            }
            sum = sum + Number(n);
            if (sum != 0) {
                str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
                if (n == '0') sum = 0;
            }
            if (len - i - 1 >= 0) { //在数字范围内
                if (k1 != 3) { //加小单位
                    if (bn != 0) {
                        str = dw1[k1].concat(str);
                    }
                    k1++;
                } else { //不加小单位，加大单位
                    k1 = 0;
                    var temp = str.charAt(0);
                    if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
                        str = str.substr(1, str.length - 1);
                    str = dw2[k2].concat(str);
                    sum = 0;
                }
            }
            if (k1 == 3) //小单位到千则大单位进一
            {
                k2++;
            }
        }
        //转换小数部分
        var strdig = "";
        if (dig != "") {
            var n = dig.charAt(0);
            if (n != 0) {
                strdig += dw[Number(n)] + "角"; //加数字
            }
            var n = dig.charAt(1);
            if (n != 0) {
                strdig += dw[Number(n)] + "分"; //加数字
            }
        }
        str += "元" + strdig;
    } catch (e) {
        return "0元";
    }
    return str;
}

//拆分整数与小数
function splits(tranvalue) {
    var value = new Array('', '');
    temp = tranvalue.split(".");
    for (var i = 0; i < temp.length; i++) {
        value[i] = temp[i];
    }
    return value;
}