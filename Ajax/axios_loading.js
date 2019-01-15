// 首先，请求开始的时候开始 loading，
// 然后在请求返回后结束 loading。重点就是要拦截请求和响应。
// 然后，要解决多个请求合并为一次 loading。
import axios from 'axios'

import env from '@/../config/prod.env'

import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from './axiosInitHelper'

const URL_PREFIX = env.URL_PREFIX

// 创建axios实例
const $ = axios.create({
  baseURL: URL_PREFIX,
  timeout: 15000
})

// 请求拦截器
// axios 提供了请求拦截和响应拦截的接口，
// 每次请求都会调用showFullScreenLoading方法，
// 每次响应都会调用tryHideFullScreenLoading()方法
$.interceptors.request.use((config) => {
  if (config.showLoading) {
    showFullScreenLoading()
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
$.interceptors.response.use((response) => {
  if (response.config.showLoading) {
    tryHideFullScreenLoading()
  }
  return response
}, (error) => {
  tryHideFullScreenLoading()
  return Promise.reject(error)
})
// 实际上，现在的功能还差一点。如果某个请求不需要 loading 呢，那么发请求的时候加个 showLoading： false的参数就好了。在请求拦截和响应拦截时判断下该请求是否需要loading，需要 loading 再去调用showFullScreenLoading()方法即可。

const defaultConfig = { showLoading: true }
export default {
  get: (url, config) => $.get(url, { ...defaultConfig, ...config }),
  put: (url, data, config) => $.put(url, data, { ...defaultConfig, ...config }),
  post: (url, data, config) => $.post(url, data, { ...defaultConfig, ...config }),
  patch: (url, data, config) => $.patch(url, data, { ...defaultConfig, ...config }),
  delete: (url, data, config) => $.delete(url, { ...defaultConfig, ...config })
}
