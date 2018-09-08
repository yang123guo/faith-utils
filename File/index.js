import { isWrong } from '../index';
import { isRealNum } from '../Number';

// 截取后缀名
export function extention(fileName) {
    return fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
} 


/*
 * @method   把B字节的size转化为特定容量
 * @author   add by yangguoqiang @18/05/31
 * @params 
 *     bytes      {Number}      元数据
 *     fixed      {Number}      小数位数  默认为2位
 * @return   {String}           返回相应的数量
 * @demo     bytesToSize(234533, 2)
 */
export function bytesToSize(bytes, fixed, unit) {
	fixed = fixed || 2;
	if (bytes == 0 || typeof bytes === 'undefined' || !isRealNum(bytes))
		return fixed > 0 ? `0.${Array(fixed + 1).join('0')}B` : '0B';
	var k = 1024,
		sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = isWrong(unit) ? Math.floor(Math.log(bytes) / Math.log(k)) : unit;
	return (bytes / Math.pow(k, i)).toFixed(fixed) + sizes[i];
}