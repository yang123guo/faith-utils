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