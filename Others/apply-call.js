// 给console.log 添加一个 mark 前缀
export function log() {
	var args = Array.prototype.slice.call(arguments);
	args.unshift('mark');
	console.log.apply(console, args);
};


export function getMax(numbers) {
    Math.max.apply(Math, numbers)
}