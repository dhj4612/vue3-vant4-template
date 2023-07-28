import {get} from '@/utils/request.js'
import {showToast} from "vant";

const def_options = {showError: true, handlerError: e => console.log(e)}

const ApiWrapper = (apiAction, options = def_options) => {
    return new Promise(resolve => apiAction
        .then(result => resolve({data: result}))
        .catch(e => {
            if (options?.showError) {
                showToast(e.message || '未知错误')
            }
            if (options?.handlerError) {
                options.handlerError(e)
            }
            resolve({error: e})
        }))
}

export const helloApi = (data = {}) => {
    return ApiWrapper(get('/hello', data))
}
