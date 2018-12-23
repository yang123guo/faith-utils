import warning from 'warning';

/*
 * @method   错误警告，只警告一次
 * @author   add by yangguoqiang @18/03/01
 * @params 
 *     condition     {Boolean.false}    生效条件，条件为false才执行
 *     format        {String}           提示语句
 *     arg           {[any]}            可选
 * @return   {undefined}       执行语句，无返回
 * @demo     warningOnce(false, '此处错误')
 */
const warned = {};
export function warningOnce(condition, format, arg) {
    if (!warned[format]) {
        warning(condition, format, arg);
        warned[format] = true;
    }
}


/*
 * @method   检测数据类型
 * @author   add by yangguoqiang @18/04/29
 * @params 
 *     type     {Sting}  
 *     param    {any}   
 * @return   {boolean}       返回ture/false
 * @demo     checkType('String', [])
 */
export function checkType(type, param) {
    const typeList = ['String', 'Number', 'Array', 'Object', 'Boolean', 'Undefined', 'Function'];
    let isType = typeList.includes(type);
    if (isType) {
        return Object.prototype.toString.call(param).slice(8, -1) === type;
    }
    warningOnce(isType, `第一个参数须为${String(typeList)}中其一`)
    return false
}

/*
 * @method   if条件下为false   除去NaN、0、-0、false   剩余undefined、null、""
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isWrong('')    因为后台返回数据不规范
 */
export function isWrong(param) {
    return (typeof param === 'undefined') || param === null || param === ''
}


/*
 * @method   测试不存在或者值为true 同等效力
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     one     {any}
 * @return   {boolean}       返回ture/false
 * @demo     undefinedOrTrue('')    
 */
export function undefinedOrTrue(one) {
    return (typeof one === 'undefined' || one === true)
}

/*
 * @method   测试 不存在或者值为false 同等效力
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     one     {any}
 * @return   {boolean}       返回ture/false
 * @demo     undefinedOrfalse('')
 */
export function undefinedOrfalse(one) {
    return (typeof one === 'undefined' || one === false)
}

/*
 * @method   根据不同类型初始化 null 输出后台可用的数据格式。
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     origin    {any}      数据来源
 *     type      {string}   数据类型
 * @return   {any}          返回
 * @demo     typeFormat('', 'string')
 */
export function typeFormat(origin, type) {
    let isVoid = isWrong.call(null, origin);
    switch (true) {
        // 'input', 'textarea', 'datepicker', 'select', 'checkbox', 'radio', 'refer', 'label' 和 number的空value处理
        case ([...CONFIG.string, ...CONFIG.number].includes(type) && isVoid):
            return '';
        // switch 的空value处理为boolean值
        case (CONFIG.boolean.includes(type) && isVoid):
            return !!origin;
        default:
            return origin;
    }
}


Array.prototype.except = function (target) {
    if (Array.isArray(target)) {
        let dist = this.filter(function (val) {
            return target.every(function (key) {
                return val !== key
            })
        })
        return dist;
    }
    warningOnce(Array.isArray(target), '传入的参考项须为数组')
    return false;
}






