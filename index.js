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
 * @method   检测是否是常规的 Object  {} 这种形式
 * @author   add by yangguoqiang @18/03/05
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isObj()
 */


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
 * @method   检测是否是需要显示display的itemtype类型
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isWrong('')    因为后台返回数据不规范
 */
export function isDisplay(param) {
    return (CONFIG.displayTypes.includes(param))
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
 * @method   根据不同类型初始化 null
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     origin    {any}
 *     type      {string}
 * @return   {boolean}       返回ture/false
 * @demo     typeFormat('', 'string')
 */
export function typeFormat(origin, type) {
    if (CONFIG.string.includes(type) && (origin === null || origin === undefined)) {
        return ''
    }
    if (CONFIG.boolean.includes(type) && (origin === null || origin === undefined)) {
        return !!origin
    }
    return origin;
}


