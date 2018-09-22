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