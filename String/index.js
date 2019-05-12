// 获取随机字符串
export function getRandom() {
    return String(new Date().getTime()).slice(-5) + Math.random().toString(12);
}

// ES6 自带repeat方法  str.repeat(n)
export function repeat(n, str) {
    return new Array(n + 1).join(str);
}

function repeat1(src, n) {
    return (n > 0) ? src.concat(repeat1(src, --n)) : "";
}

// 字符串长度截取 不靠谱
function cutstr(str, len) {
    var temp,
        icount = 0,
        patrn = /[^\x00-\xff]/,
        strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
                if (patrn.exec(temp) == null) {
                    icount = icount + 1
            } else {
                icount = icount + 2
            }
            strre += temp
            } else {
            break;
        }
    }
    return strre + "..."
}

// 字符串长度截取2
function truncateString(str, num) {
    return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
}


/**
 *javascript按字节进行截取
 *
 * param str 要截取的字符串
 * param L 要截取的字节长度，注意是字节不是字符，一个汉字两个字节
 * return 截取后的字符串
 */
function cutStr(str,L){    
    var result = '',
        strlen = str.length, // 字符串长度
        chrlen = str.replace(/[^\x00-\xff]/g,'**').length; // 字节长度


    if(chrlen<=L){return str;}
    
    for(var i=0,j=0;i<strlen;i++){
        var chr = str.charAt(i);
        if(/[\x00-\xff]/.test(chr)){
            j++; // ascii码为0-255，一个字符就是一个字节的长度
        }else{
            j+=2; // ascii码为0-255以外，一个字符就是两个字节的长度
        }
        if(j<=L /* || j==L+1 */){ // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
            result += chr;
        }else{ // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
            return result;
        }
    }
}


// 全角转换为半角函数
function ToCDB(str){
    var result = '';
    for(var i=0; i < str.length; i++){
        code = str.charCodeAt(i);
        if(code >= 65281 && code <= 65374){
            result += String.fromCharCode(str.charCodeAt(i) - 65248);
        }else if (code == 12288){
            result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
        }else{
            result += str.charAt(i);
        }
    }
    return result;
}

// 转为驼峰字母
// toCamelCase("some_database_field_name") -> 'someDatabaseFieldName'
// toCamelCase("Some label that needs to be camelized") -> 'someLabelThatNeedsToBeCamelized'
// toCamelCase("some-javascript-property") -> 'someJavascriptProperty'
// toCamelCase("some-mixed_string with spaces_underscores-and-hyphens") -> 'someMixedStringWithSpacesUnderscoresAndHyphens'
function toCamelCase(str) {
    return str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) =>  p2 ? p2.toUpperCase() : p1.toLowerCase());
}


//检测字符串
//ecDo.checkType('165226226326','phone')
//result：false
//大家可以根据需要扩展
checkType: function (str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'text':
            return /^\w+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default:
            return true;
    }
}

// 在字符串'...'中找出'blog'的出现次数
// var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
//ecDo.countStr(strTest,'blog')
//result：6
function countStr(str, strSplit) {
    return str.split(strSplit).length - 1
}
