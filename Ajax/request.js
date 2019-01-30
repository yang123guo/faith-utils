/*
 * @file: 公共处理ajax基础工具
 * @version: 1.0.0
 * @author: yangguoqiang
 * @Date: 2019-01-22 22:15:05
 * @LastEditors: yangguoqiang
 * @LastEditTime: 2019-01-30 23:17:24
 * @Description:
 */

import axios from 'axios';
import {
    getTimeStamp
} from './index';
import { notification } from 'antd';


// 默认配置项
const defaultConfig = {
    axios: {
        timeout: 2000,
        baseUrl: '', // TODO: 区分环境
    },
    platform: {
        channelId: 0,
        platformId: 0  // 0 代表的是PC端
    },
    codeMessage: {
        200: '服务器成功返回请求的数据。',
        201: '新建或修改数据成功。',
        202: '一个请求已经进入后台排队（异步任务）。',
        204: '删除数据成功。',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限（令牌、用户名、密码错误）。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
        default: '出错，请检查。'
    },
    methodMap: {
        get: true,
        delete: true,
        head: true,
        post: false,
        put: false,
        patch: false,
    }
};

// 创建axios实例
const $ = axios.create({
    ...defaultConfig.axios
})

// 检验错误类型，抛出相应的文案 并抛出错误
// TODO: 依赖 response status url  statusText
// 依赖 notification组件
/*
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
        if (code === '107001101' || code === '107001199' || code === '107001198') {
            // 未登录 分散认证未通过 游客
            return Promise.reject({
                response
            });
        }

        if (code !== '0' && parseInt(code.slice(len - 3, len), 10) >= 200 || +code === 1002) {
            return Promise.reject({
                response
            });
        }
        return {
            success: +code === 0,
            message: data.message || statusText,
            status,
            data: response.data
        };
    }
    const errortext = defaultConfig.codeMessage[response.status] ||
        response.statusText ||
        defaultConfig.codeMessage.default;
    // notification.error({
    //     message: `请求错误 ${response.status}: ${response.url}`,
    //     description: errortext
    // });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
    const { response } = error;
    let msg;
    let status;
    let otherData = {};
    if (response) {
        const { data, statusText } = response;
        otherData = data;
        status = response.status;
        msg = data.message || statusText;
    } else {
        status = 500;
        msg = <div><p>新品开售，异常火爆,</p><p>稍后再试一下吧</p></div>;
    }
    // 全局错误提示
    Toast.info({
        content: msg
    });
    return Promise.reject({ success: false, status, message: msg, data: { ...otherData } });
};
*/

// 请求拦截器
$.interceptors.request.use(
    config => {
        // if (store.state.token) {
        //     config.headers.Authorization = `token ${store.state.token}`
        // }
        console.log('这里是请求配置的拦截：', config)
        return config
    },
    err => {
        return Promise.reject(err)
    },
)

// 响应拦截器
$.interceptors.response.use(
    response => {
        console.log('这里是响应数据的拦截：', response)
        return response
    },
    error => {
        console.log('这里是错误的初始拦截：', error)
        if (error.response) {
            console.log('这里是错误的响应内容：')
            // console.dir(error.response);
            const {
                status,
                data
            } = error.response;

            /*
                data等同于 ajax中的失败 err
                status 是一个number
            */

            switch (+status) {
                case 200:
                    // 服务正确 通过code处理
                    break;
                case 401:
                    /* // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT)
                    // 只有在当前路由不是登录页面才跳转
                    router.currentRoute.path !== 'login' &&
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.path },
                    }) */
                    break;
                default:
                    const errortext = defaultConfig.codeMessage[status || 'default'];
                    notification.error({
                        message: `请求错误 ${status}`,
                        description: errortext
                    });
                    break;
            }
        }
        return Promise.reject(error.response.data)
    },
)


/**
 * @method 封装http请求   拦截处理、规范参数为对象形式、可以加入Loading等
 * @param  {String}      url          传入的url字符串
 * @param  {String}      method       传入的方法
 * @param  {Object}      data         传入的参数
 * @param  {[Boolean]}   timestamp    是否增加时间戳    默认 true
 * @return {String}      返回编译后的url字符串
 */
export default function request({
    url = '',
    method = 'get',
    data = {},
    timestamp = true,     // 是否给请求的url挂在 时间戳
    ...attr               // 其他参数合集
}) {
    // 提交参数混入平台选项
    const param = {
        ...defaultConfig.platform,
        ...data
    };
    url = url + (timestamp ? getTimeStamp(url) : '');
    method = String(method).toLowerCase();
    if (Object.keys(defaultConfig.methodMap).includes(method)) {
        /**
         * post/patch/put   键 params
         * get/delete/head  键 data
         */
        const mixin = {
            [defaultConfig.methodMap[method] ? 'params' : 'data']: param
        };
        return $({
            url,
            method,
            ...mixin,
            ...attr
        });
    } else {
        // TODO: 提示方法传入不正确
        return Promise.reject({
            data: '请求参数出错',
            success: false,
            message: '请求参数出错',
            code: '0'
        });
    }
}

// export default axios;
