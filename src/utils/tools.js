import {showToast} from 'vant'
import dayjs from 'dayjs'
import Decimal from 'decimal.js'

/**
 * 精确比较两个数值的大小
 * @param ops1
 * @param ops2
 * @return {undefined|number} 1-[ops1 > ops2],0-[ops1 === ops2],-1-[ops1 < ops2]
 */
export function numericalAccurateCompare(ops1, ops2) {
    if ((!ops1 && Number(ops1).toString() !== '0') || (!ops2 && Number(ops2).toString() !== '0')) {
        return undefined
    }
    return Decimal.sub(ops1, ops2).comparedTo(0)
}

/**
 * 等待指定毫秒时间
 * @param delay
 * @return {Promise<unknown>}
 */
export function wait(delay = 1000) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

/**
 * 格式化时间 YYYY_MM_DD
 * @param date
 * @return {string|string}
 */
export function ymd_format(date) {
    return date ? dayjs(date).format('YYYY-MM-DD') : ''
}

/**
 * 格式化时间 YYYY_MM_DD_HH_mm_ss
 * @param date
 * @return {*}
 */
export function ymd_hms_format(date) {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
}

/**
 * 获取 url 参数，转化为对象
 * @return {{[p: string]: string}}
 */
export function urlParam() {
    // 创建一个URLSearchParams实例
    const urlSearchParams = new URLSearchParams(window.location.search);
    // 把键值对列表转换为一个对象
    return Object.fromEntries(urlSearchParams.entries());
}

/**
 * 复制内容到粘贴板
 * @param copyContent 内容
 * @param message 复制后的提示消息
 */
export function copyToClipboard(copyContent, message) {
    let aux = document.createElement("input");
    aux.setAttribute("value", copyContent);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    if (message) {
        showToast(message)
    }
}

/**
 * 格式金额
 * @param money 值
 * @param maximumFractionDigits 使用的小数位数的最大数目，可能的值是从 0 到 20
 * @param minimumFractionDigits 使用的小数位数的最小数目，可能的值是从 0 到 20
 * @param minimumIntegerDigits 使用的整数数字的最小数目.可能的值是从 1 到 21,默认值是 1
 * @param useGrouping 是否使用分组分隔符，如千位分隔符或千/万/亿分隔符，默认为 true
 * @return {string}
 */
export const formatMoney = (money, minimumIntegerDigits = 1, minimumFractionDigits = 2, maximumFractionDigits = 2, useGrouping = true) => {
    return new Intl.NumberFormat("zh-CN", {
        style: 'currency',
        currency: 'CNY',
        currencyDisplay: 'symbol',
        useGrouping,
        minimumIntegerDigits,
        minimumFractionDigits,
        maximumFractionDigits
    }).format(money);
};

/**
 * 格式化金额（带￥符号）
 * @param money 数值金额
 * @param useGrouping 是否使用分组符号
 * @param prefix 前缀
 * @param suffix 后缀
 * @return string
 */
export function formatAmountSymbol({money, useGrouping = true, prefix = '', suffix = ''}) {
    if (Number.isNaN(Number(money))) {
        return ''
    }
    if (money || money === 0) {
        return `${prefix}${formatMoney(money, 1, 2, 2, useGrouping)}${suffix}`
    }
    return ''
}

/**
 * 格式化金额，无符号
 * @param money
 * @param useGrouping 是否使用分组符号
 * @param prefix 前缀
 * @param suffix 后缀
 * @return string
 */
export function formatAmount({money, useGrouping = true, prefix = '', suffix = ''}) {
    if (Number.isNaN(Number(money))) {
        return ''
    }
    if (money || money === 0) {
        return `${prefix}${formatMoney(money, 1, 2, 2, useGrouping)
            .replaceAll('¥', '')}${suffix}`
    }
    return ''
}

/**
 * 根据屏幕宽度和 ui 像素大小计算视口单位
 * 实际上是计算 px 单位占总视口单位的百分之几
 */
export const pxTvw = (px) => `${(px / Number.parseInt(import.meta.env.VITE_VIEWPORT_WIDTH)) * 100}vw`
