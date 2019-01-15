import { Loading } from 'element-ui'
import _ from 'lodash'

let needLoadingRequestCount = 0
let loading

function startLoading() {
  console.log('startLoading =============')
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  console.log('endLoading==========')
  loading.close()
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// 那么showFullScreenLoading tryHideFullScreenLoading()要干的事儿就是将同一时刻的请求合并。声明一个变量needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}


// 在 request1 的 loading 还没结束时，request2 的 loading 已经开始。这种情况 request1 和 request2 在时间上有一定的重合，所以 loading 可以合并。
// 那么 request3 是在 request2 结束后 100ms 开始 loading.这时你会发现 loading 两次，并且中间有一次极短的闪烁，这当然是很不好的体验了。

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    _.debounce(tryCloseLoading, 300)()
  }
}
