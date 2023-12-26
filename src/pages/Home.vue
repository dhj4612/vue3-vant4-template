<template>
  <h1>HelloWorld</h1>
  <van-button @click="onExport" type="primary" block>export</van-button>
  <van-button @click="onRequest" type="default">register</van-button>
  <van-date-picker/>
</template>

<script setup>
import axios from "axios";
import {getAuthorization} from "@/utils/authorization.js";
import {registerApi} from "@/api/index.js";

const onRequest = async () => {
  const [d, e] = await registerApi({
    phone: '',
    realName: '',
    password: ''
  })
  console.log(d, e)
}
const onExport = async () => {
  return new Promise((resolve, reject) => {
    axios.post(`/api/dropout/export`, {}, {
      responseType: 'blob',
      headers: {
        token: getAuthorization()
      }
    }).then(async res => {
      console.log(res)
      try {
        if (res.status !== 200) {
          reject()
          return
        }
        await handlerDownloadData(res)
        resolve()
      } catch (e) {
        console.error(e)
        reject()
      }
    }).catch(err => {
      console.log(err)
      reject()
    })
  })
}
/**
 * 下载响应的二进制数据
 * @param res 接口响应体
 */
const handlerDownloadData = (res) => {
  return new Promise((resolve, reject) => {
    try {
      const {data, headers} = res
      const contentDispositionVal = headers['content-disposition']
      const fileName = contentDispositionVal
          .substring(contentDispositionVal.indexOf('=') + 1).trim().replace('\"', '');
      // 此处当返回 json 文件时需要先对 data 进行 JSON.stringify 处理，其他类型文件不用做处理
      //const blob = new Blob([JSON.stringify(data)], ...)
      const blob = new Blob([data], {type: headers['content-type']})
      let dom = document.createElement('a')
      let url = window.URL.createObjectURL(blob)
      dom.href = url
      dom.download = decodeURI(fileName)
      dom.style.display = 'none'
      document.body.appendChild(dom)
      dom.click()
      dom.parentNode.removeChild(dom)
      window.URL.revokeObjectURL(url)
      resolve()
    } catch (e) {
      console.log(e)
      reject()
    }
    console.log('aaaa')
  })
}
</script>

<style scoped>

</style>
