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

/*
1、< 60s, 显示为“刚刚”
2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
 */
function timeFormat(time) {
    var date = new Date(time)
        , curDate = new Date()
        , year = date.getFullYear()
        , month = date.getMonth() + 1
        , day = date.getDate()
        , hour = date.getHours()
        , minute = date.getMinutes()
        , curYear = curDate.getFullYear()
        , curHour = curDate.getHours()
        , timeStr;

    if (year < curYear) {
        timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
    } else {
        var pastTime = curDate - date
            , pastH = pastTime / 3600000;

        if (pastH > curHour) {
            timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
        } else if (pastH >= 1) {
            timeStr = '今天 ' + hour + ':' + minute + '分';
        } else {
            var pastM = curDate.getMinutes() - minute;
            if (pastM > 1) {
                timeStr = pastM + '分钟前';
            } else {
                timeStr = '刚刚';
            }
        }
    }
    return timeStr;
}