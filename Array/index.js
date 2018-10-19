// 给目标数组的指定位置插入新数组
// arr = [1, 2, 5, 6]  在2, 5之间插入 [3, 4];
export function insertArrInPosition(origin, pos, dist) {
    dist.unshift(pos, 0);
    Array.prototype.splice.apply(origin, dist);
    return origin;
}

// 求得数组中某个数出现的次数
// countOccurrences([1,1,2,1,2,3], 1) -> 3
export function countOccurrences(arr, value) {
    return arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
}

// 筛选出数组中的非唯一值。
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]
export function filterNonUnique(arr) {
    return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
}

// 按几层拍平  多维数组
// flattenDepth([1,[2],[[[3],4],5]], 2) -> [1,2,[3],4,5]
export function flattenDepth(arr, depth = 1) {
    return depth != 1 
        ? arr.reduce((a, v) => a.concat(Array.isArray(v) 
            ? flattenDepth(v, depth - 1) : v), [])
        : arr.reduce((a, v) => a.concat(v), []);
}


// 返回两个数组之间的对称差。
// symmetricDifference([1,2,3], [1,2,4]) -> [3,4]
export function symmetricDifference(a, b) {
    const sA = new Set(a), sB = new Set(b);
    return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
} 

// 返回两个数组中都显示的元素的数组。
// similarity([1,2,3], [1,2,4]) -> [1,2]
export function similarity(arr, values) {
    return arr.filter(v => values.includes(v));
} 

// 返回在两个数组中的任意一个中存在的每个元素。
// union([1,2,3], [4,3,2]) -> [1,2,3,4]
export function similarity(a, b) {
    return Array.from(new Set([...a, ...b]));
} 



