/**
 * 管道式函数组合  -->  生成新的函数
 * 使用场景：任务A，任务B，任务C必须按照顺序执行，并且A的输出作为B的输入，B的输出作为C的输入，最后得到结果
 * 常规做法：funcC(funcB(funcA('hello')))
 * 使用： 传入需要按顺序执行的函数  从右到左,然后生成新的函数
 * let funcA = (str) =>  str += '-A',funcB = (str) => str += '-B',funcC = (str) =>  str += '-C';
 * let newFn = compose(funcC, funcB, funcA); newFn('hello')
 */ 
export function compose() {
    var args = arguments;
    // 从最后一个参数开始处理
    var start = args.length - 1;
    return function() {
        var i = start;
        // 执行最后一个函数,并得到结果result
        var result = args[start].apply(this, arguments); 
        // 从后往前一个个调用传进来的函数，并将上一次执行的结果作为参数传进下一个函数
        while (i--) result = args[i].call(this, result); 
        // 最后将结果导出
        return result;
    };
};