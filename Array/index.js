// 给目标数组的指定位置插入新数组
// arr = [1, 2, 5, 6]  在2, 5之间插入 [3, 4];
export function insertArrInPosition(origin, pos, dist) {
    dist.unshift(pos, 0);
    Array.prototype.splice.apply(origin, dist);
    return origin;
}