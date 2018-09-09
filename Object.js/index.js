
// 是否有此属性
export function hasProperty(parent, child) {
    if (this.isNull(parent) || this.isNull(child)) {
        return false;
    }
    return (child in parent) || (parent.hasOwnProperty(child));
};