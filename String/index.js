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

// 字符串长度截取
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