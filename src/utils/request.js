import axios from 'axios'
import {getAuthorization, hasAuthorization} from '@/utils/authorization.js'

const instance = axios.create({
    baseURL: '/api', timeout: 30000,
})
const errorWrapper = (status, message, errorData) => {
    return {status, message, errorData}
}
const handlerErrResponse = ({response}) => {
    if (!response) {
        return Promise.reject(errorWrapper(null, '网络连接失败'))
    }
    const {status, data} = response
    if (status === 404) {
        return Promise.reject(errorWrapper(status, '请求的资源不存在', data))
    }
    if (status === 401) {
        // TODO 未登录
        return Promise.reject(errorWrapper(status, '登录失效，请重新登录', data))
    }
    if (status === 403) {
        // TODO 未授权
        return Promise.reject(errorWrapper(status, '未授权的访问', data))
    }
    if (status === 500) {
        return Promise.reject(errorWrapper(status, '服务器内部错误', data))
    }
    return Promise.reject(errorWrapper(status, '未知错误', data))
}

instance.interceptors.request.use(
    config => {
        if (hasAuthorization()) {
            config.headers['token'] = getAuthorization()
        }
        return config
    },
    e => Promise.reject(e))
instance.interceptors.response.use(
    response => Promise.resolve(response?.data),
    e => handlerErrResponse(e))

export const post = (url, data, config) => instance.post(url, data, config)
export const get = (url, params, config) => instance.get(url, {params, ...config})
export const postForm = (url, data, config) => instance.post(url, data, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }, ...config,
})
