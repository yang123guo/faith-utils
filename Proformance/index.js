// 性能优化之帧率
function fps(callback) {
    var requestAnimationFrame =    
        /** Chromium */
        window.requestAnimationFrame ||
        /** Webkit */
        window.webkitRequestAnimationFrame ||
        /** Mozilla Geko   */
        window.mozRequestAnimationFrame ||
        /** Opera Presto */
        window.oRequestAnimationFrame ||
        /** IE Trident */
        window.msRequestAnimationFrame ||
        /** Fallback function  */
        function (callbackFunc) {
            window.setTimeout(callbackFunc, 1000 / 60);   
        };

    var fps = 0;
    var last = Date.now();
    var offset;

    function step() {
        offset = Date.now() - last;
        fps += 1;

        if (offset >= 1000) {
            last += offset;

            /** callback with calculated fps */
            callback(fps);
        }

        requestAnimationFrame(step);
    }

    step();
}
