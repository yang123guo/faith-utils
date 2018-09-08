// 接受fn参数是个函数 含有return结果的函数
// 使用getSingle(fn)(); 为结果res
export function getSingle(fn) {
    let res;
    return function() {
        return res || (res = fn.apply(this, arguments))
    }
}