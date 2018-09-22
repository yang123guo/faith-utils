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
const stategies = {
    "S": salary => salary * 4,
    "A": salary => salary * 3,
    "B": salary => salary * 2
}

const calc = (level, salary) => stategies[level](salary);
