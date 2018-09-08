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