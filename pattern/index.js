// 接受fn参数是个函数 含有return结果的函数
// 使用getSingle(fn)(); 为结果res
// 单例模式: 保证一个类只有一个实例，并提供一个全局访问的访问点
export function getSingle(fn) {
    let res;
    return function() {
        return res || (res = fn.apply(this, arguments))
    }
}

// 策略模式: 算法封装，同一入口走不同分支，走对应的策略对象
// if else 通过 Obj[key]来替代，走不同分支，消除了丑陋的if else
// 1、对象定义的形式
const stategies = {
    "S": salary => salary * 4,
    "A": salary => salary * 3,
    "B": salary => salary * 2
}
// 返回函数的执行  其实stategies[level] 就相当于下面的 A | B | S
const calc = (level, salary) => stategies[level](salary);

// 同样还可以改成函数形式 (底层：高级函数，函数return返回函数)
// 2、函数定义的形式
const S = salary => salary * 4;
const B = salary => salary * 3;
const A = salary => salary * 2;
const calc = (fun, salary) => fun(salary);


/**
 * 发布订阅
 * 发布者: 对象/类
 * 订阅: listen( push 动作 )
 * 发布(广播): trigger( 遍历函数，执行 )
 * 取消订阅: splice 动作
 */
const event = {
    clientList: {},
    listen: function(key, fn) {
        if(this.clientList[key]) {
            this.clientList[key] = []; // 为了构造一个监听的数组
        }
        this.clientList[key].push(fn); // listen监听函数 就是把方法fn放入列表 
    },
    trigger: function() {
        // key 是首个参数
        var key = Array.prototype.shift.call(arguments), // trigger
        // fns  订阅方法的数组
        fns = this.clientList[key];
        if(!fns || fns.length === 0) {
            return false;
        }
        for(var i = 0, fn; fn = fns[i++];) {
            // arguments 除去首参的其他参数  每个订阅的方法分别用参数来执行
            fn.apply(this, arguments);
        }
    },
    remove: function(key, fn) {
        var fns = this.clientList[key]; // 找到此key下面的所有订阅列表
        if(!fns) return false;
        if(!fn) {
            fns && (fns.length = 0); // 当没有传入回调函数,那么取消此key下所有的订阅列表
        }else {
            for(var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if(_fn === fn) { // 如果传入到fn到函数在订阅列表中
                    fns.splice(l, 1); // 删除所订阅的函数
                }
            }   
        }

    }
}