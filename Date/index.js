formatDate = function (b, c) {
    if (this.isNull(c) || this.isNull(b)) {
        return b;
    }
    b = this.toDate(b);
    var e = {
        "M+": b.getMonth() + 1,
        "d+": b.getDate(),
        "h+": b.getHours(),
        "m+": b.getMinutes(),
        "s+": b.getSeconds(),
        "q+": Math.floor((b.getMonth() + 3) / 3),
        "S": b.getMilliseconds()
    };
    if (/(y+)/.test(c)) {
        c = c.replace(RegExp.$1, (b.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var d in e) {
        if (new RegExp("(" + d + ")").test(c)) {
            c = c.replace(RegExp.$1, RegExp.$1.length == 1 ? e[d] : ("00" + e[d]).substr(("" + e[d]).length));
        }
    }
    return c;
};