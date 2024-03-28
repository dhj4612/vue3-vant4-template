<template>
  <h1>HelloWorld</h1>
  <!--  <van-button @click="onExport" type="primary" block>export</van-button>-->
  <!--  <van-button @click="onRequest" type="default">register</van-button>-->
  <!--  <van-date-picker/>-->

  <json-viewer
      :value="jsonData"
      :expand-depth=5
      copyable
      boxed
      sort></json-viewer>
</template>

<script setup>
import axios from "axios";
import {getAuthorization} from "@/utils/authorization.js";
import {registerApi} from "@/api/index.js";
import {ref} from "vue";

const parse = JSON.parse("{\"a\":[{\"cityId\":610900,\"cityName\":\"安康\",\"cityPinYin\":\"ankang\"},{\"cityId\":340800,\"cityName\":\"安庆\",\"cityPinYin\":\"anqing\"},{\"cityId\":210300,\"cityName\":\"鞍山\",\"cityPinYin\":\"anshan\"},{\"cityId\":410500,\"cityName\":\"安阳\",\"cityPinYin\":\"anyang\"}],\"b\":[{\"cityId\":340300,\"cityName\":\"蚌埠\",\"cityPinYin\":\"bangbu\"},{\"cityId\":130600,\"cityName\":\"保定\",\"cityPinYin\":\"baoding\"},{\"cityId\":610300,\"cityName\":\"宝鸡\",\"cityPinYin\":\"baoji\"},{\"cityId\":150200,\"cityName\":\"包头\",\"cityPinYin\":\"baotou\"},{\"cityId\":450500,\"cityName\":\"北海\",\"cityPinYin\":\"beihai\"},{\"cityId\":110100,\"cityName\":\"北京\",\"cityPinYin\":\"beijing\"},{\"cityId\":210500,\"cityName\":\"本溪\",\"cityPinYin\":\"benxi\"}],\"c\":[{\"cityId\":220100,\"cityName\":\"长春\",\"cityPinYin\":\"changchun\"},{\"cityId\":430700,\"cityName\":\"常德\",\"cityPinYin\":\"changde\"},{\"cityId\":350182,\"cityName\":\"长乐\",\"cityPinYin\":\"changle\"},{\"cityId\":430100,\"cityName\":\"长沙\",\"cityPinYin\":\"changsha\"},{\"cityId\":320581,\"cityName\":\"常熟\",\"cityPinYin\":\"changshu\"},{\"cityId\":320400,\"cityName\":\"常州\",\"cityPinYin\":\"changzhou\"},{\"cityId\":445100,\"cityName\":\"潮州\",\"cityPinYin\":\"chaozhou\"},{\"cityId\":510100,\"cityName\":\"成都\",\"cityPinYin\":\"chengdu\"},{\"cityId\":431000,\"cityName\":\"郴州\",\"cityPinYin\":\"chenzhou\"},{\"cityId\":150400,\"cityName\":\"赤峰\",\"cityPinYin\":\"chifeng\"},{\"cityId\":500100,\"cityName\":\"重庆\",\"cityPinYin\":\"chongqing\"},{\"cityId\":341100,\"cityName\":\"滁州\",\"cityPinYin\":\"chuzhou\"}],\"d\":[{\"cityId\":532900,\"cityName\":\"大理\",\"cityPinYin\":\"dali\"},{\"cityId\":210200,\"cityName\":\"大连\",\"cityPinYin\":\"dalian\"},{\"cityId\":210600,\"cityName\":\"丹东\",\"cityPinYin\":\"dandong\"},{\"cityId\":230600,\"cityName\":\"大庆\",\"cityPinYin\":\"daqing\"},{\"cityId\":140200,\"cityName\":\"大同\",\"cityPinYin\":\"datong\"},{\"cityId\":510600,\"cityName\":\"德阳\",\"cityPinYin\":\"deyang\"},{\"cityId\":441900,\"cityName\":\"东莞\",\"cityPinYin\":\"dongguan\"},{\"cityId\":370500,\"cityName\":\"东营\",\"cityPinYin\":\"dongying\"}],\"e\":[{\"cityId\":511181,\"cityName\":\"峨眉山\",\"cityPinYin\":\"emeishan\"}],\"f\":[{\"cityId\":440600,\"cityName\":\"佛山\",\"cityPinYin\":\"foshan\"},{\"cityId\":350181,\"cityName\":\"福清\",\"cityPinYin\":\"fuqing\"},{\"cityId\":210400,\"cityName\":\"抚顺\",\"cityPinYin\":\"fushun\"},{\"cityId\":350300,\"cityName\":\"莆田\",\"cityPinYin\":\"futian\"},{\"cityId\":210900,\"cityName\":\"阜新\",\"cityPinYin\":\"fuxin\"},{\"cityId\":341200,\"cityName\":\"阜阳\",\"cityPinYin\":\"fuyang\"},{\"cityId\":350100,\"cityName\":\"福州\",\"cityPinYin\":\"fuzhou\"}],\"g\":[{\"cityId\":360700,\"cityName\":\"赣州\",\"cityPinYin\":\"ganzhou\"},{\"cityId\":440100,\"cityName\":\"广州\",\"cityPinYin\":\"guangzhou\"},{\"cityId\":450300,\"cityName\":\"桂林\",\"cityPinYin\":\"guilin\"},{\"cityId\":520100,\"cityName\":\"贵阳\",\"cityPinYin\":\"guiyang\"}],\"h\":[{\"cityId\":230100,\"cityName\":\"哈尔滨\",\"cityPinYin\":\"haerbin\"},{\"cityId\":460100,\"cityName\":\"海口\",\"cityPinYin\":\"haikou\"},{\"cityId\":130400,\"cityName\":\"邯郸\",\"cityPinYin\":\"handan\"},{\"cityId\":330100,\"cityName\":\"杭州\",\"cityPinYin\":\"hangzhou\"},{\"cityId\":610700,\"cityName\":\"汉中\",\"cityPinYin\":\"hanzhong\"},{\"cityId\":340100,\"cityName\":\"合肥\",\"cityPinYin\":\"hefei\"},{\"cityId\":430400,\"cityName\":\"衡阳\",\"cityPinYin\":\"hengyang\"},{\"cityId\":320800,\"cityName\":\"淮安\",\"cityPinYin\":\"huaian\"},{\"cityId\":340600,\"cityName\":\"淮北\",\"cityPinYin\":\"huaibei\"},{\"cityId\":341000,\"cityName\":\"黄山\",\"cityPinYin\":\"huangshan\"},{\"cityId\":420200,\"cityName\":\"黄石\",\"cityPinYin\":\"huangshi\"},{\"cityId\":150100,\"cityName\":\"呼和浩特\",\"cityPinYin\":\"huhehaote\"},{\"cityId\":441300,\"cityName\":\"惠州\",\"cityPinYin\":\"huizhou\"},{\"cityId\":211400,\"cityName\":\"葫芦岛\",\"cityPinYin\":\"huludao\"},{\"cityId\":150700,\"cityName\":\"呼伦贝尔\",\"cityPinYin\":\"hulunbeier\"},{\"cityId\":330500,\"cityName\":\"湖州\",\"cityPinYin\":\"huzhou\"}],\"j\":[{\"cityId\":440700,\"cityName\":\"江门\",\"cityPinYin\":\"jiangmen\"},{\"cityId\":320281,\"cityName\":\"江阴\",\"cityPinYin\":\"jiangyin\"},{\"cityId\":410800,\"cityName\":\"焦作\",\"cityPinYin\":\"jiaozuo\"},{\"cityId\":330400,\"cityName\":\"嘉兴\",\"cityPinYin\":\"jiaxing\"},{\"cityId\":445200,\"cityName\":\"揭阳\",\"cityPinYin\":\"jieyang\"},{\"cityId\":220200,\"cityName\":\"吉林\",\"cityPinYin\":\"jilin\"},{\"cityId\":370100,\"cityName\":\"济南\",\"cityPinYin\":\"jinan\"},{\"cityId\":420800,\"cityName\":\"荆门\",\"cityPinYin\":\"jingmen\"},{\"cityId\":421000,\"cityName\":\"荆州\",\"cityPinYin\":\"jingzhou\"},{\"cityId\":330700,\"cityName\":\"金华\",\"cityPinYin\":\"jinhua\"},{\"cityId\":370800,\"cityName\":\"济宁\",\"cityPinYin\":\"jining\"},{\"cityId\":350582,\"cityName\":\"晋江\",\"cityPinYin\":\"jinjiang\"},{\"cityId\":210700,\"cityName\":\"锦州\",\"cityPinYin\":\"jinzhou\"},{\"cityId\":360400,\"cityName\":\"九江\",\"cityPinYin\":\"jiujiang\"}],\"k\":[{\"cityId\":410200,\"cityName\":\"开封\",\"cityPinYin\":\"kaifeng\"},{\"cityId\":530100,\"cityName\":\"昆明\",\"cityPinYin\":\"kunming\"},{\"cityId\":320583,\"cityName\":\"昆山\",\"cityPinYin\":\"kunshan\"}],\"l\":[{\"cityId\":131000,\"cityName\":\"廊坊\",\"cityPinYin\":\"langfang\"},{\"cityId\":620100,\"cityName\":\"兰州\",\"cityPinYin\":\"lanzhou\"},{\"cityId\":511100,\"cityName\":\"乐山\",\"cityPinYin\":\"leshan\"},{\"cityId\":320700,\"cityName\":\"连云港\",\"cityPinYin\":\"lianyungang\"},{\"cityId\":211000,\"cityName\":\"辽阳\",\"cityPinYin\":\"liaoyang\"},{\"cityId\":530700,\"cityName\":\"丽江\",\"cityPinYin\":\"lijiang\"},{\"cityId\":141000,\"cityName\":\"临汾\",\"cityPinYin\":\"linfen\"},{\"cityId\":371300,\"cityName\":\"临沂\",\"cityPinYin\":\"linyi\"},{\"cityId\":331100,\"cityName\":\"丽水\",\"cityPinYin\":\"lishui\"},{\"cityId\":341500,\"cityName\":\"六安\",\"cityPinYin\":\"liuan\"},{\"cityId\":450200,\"cityName\":\"柳州\",\"cityPinYin\":\"liuzhou\"},{\"cityId\":350800,\"cityName\":\"龙岩\",\"cityPinYin\":\"longyan\"},{\"cityId\":410300,\"cityName\":\"洛阳\",\"cityPinYin\":\"luoyang\"},{\"cityId\":510500,\"cityName\":\"泸州\",\"cityPinYin\":\"luzhou\"}],\"m\":[{\"cityId\":340500,\"cityName\":\"马鞍山\",\"cityPinYin\":\"maanshan\"},{\"cityId\":440900,\"cityName\":\"茂名\",\"cityPinYin\":\"maoming\"},{\"cityId\":511400,\"cityName\":\"眉山\",\"cityPinYin\":\"meishan\"},{\"cityId\":510700,\"cityName\":\"绵阳\",\"cityPinYin\":\"mianyang\"}],\"n\":[{\"cityId\":360100,\"cityName\":\"南昌\",\"cityPinYin\":\"nanchang\"},{\"cityId\":511300,\"cityName\":\"南充\",\"cityPinYin\":\"nanchong\"},{\"cityId\":320100,\"cityName\":\"南京\",\"cityPinYin\":\"nanjing\"},{\"cityId\":450100,\"cityName\":\"南宁\",\"cityPinYin\":\"nanning\"},{\"cityId\":320600,\"cityName\":\"南通\",\"cityPinYin\":\"nantong\"},{\"cityId\":411300,\"cityName\":\"南阳\",\"cityPinYin\":\"nanyang\"},{\"cityId\":330200,\"cityName\":\"宁波\",\"cityPinYin\":\"ningbo\"}],\"p\":[{\"cityId\":211100,\"cityName\":\"盘锦\",\"cityPinYin\":\"panjin\"},{\"cityId\":410400,\"cityName\":\"平顶山\",\"cityPinYin\":\"pingdingshan\"}],\"q\":[{\"cityId\":370200,\"cityName\":\"青岛\",\"cityPinYin\":\"qingdao\"},{\"cityId\":441800,\"cityName\":\"清远\",\"cityPinYin\":\"qingyuan\"},{\"cityId\":130300,\"cityName\":\"秦皇岛\",\"cityPinYin\":\"qinhuangdao\"},{\"cityId\":230200,\"cityName\":\"齐齐哈尔\",\"cityPinYin\":\"qiqihaer\"},{\"cityId\":350500,\"cityName\":\"泉州\",\"cityPinYin\":\"quanzhou\"},{\"cityId\":530300,\"cityName\":\"曲靖\",\"cityPinYin\":\"qujing\"},{\"cityId\":330800,\"cityName\":\"衢州\",\"cityPinYin\":\"quzhou\"}],\"r\":[{\"cityId\":371100,\"cityName\":\"日照\",\"cityPinYin\":\"rizhao\"}],\"s\":[{\"cityId\":460200,\"cityName\":\"三亚\",\"cityPinYin\":\"sanya\"},{\"cityId\":310100,\"cityName\":\"上海\",\"cityPinYin\":\"shanghai\"},{\"cityId\":411400,\"cityName\":\"商丘\",\"cityPinYin\":\"shangqiu\"},{\"cityId\":440500,\"cityName\":\"汕头\",\"cityPinYin\":\"shantou\"},{\"cityId\":440200,\"cityName\":\"韶关\",\"cityPinYin\":\"shaoguan\"},{\"cityId\":330600,\"cityName\":\"绍兴\",\"cityPinYin\":\"shaoxing\"},{\"cityId\":210100,\"cityName\":\"沈阳\",\"cityPinYin\":\"shenyang\"},{\"cityId\":440300,\"cityName\":\"深圳\",\"cityPinYin\":\"shenzhen\"},{\"cityId\":130100,\"cityName\":\"石家庄\",\"cityPinYin\":\"shijiazhuang\"},{\"cityId\":350581,\"cityName\":\"石狮\",\"cityPinYin\":\"shishi\"},{\"cityId\":420300,\"cityName\":\"十堰\",\"cityPinYin\":\"shiyan\"},{\"cityId\":220300,\"cityName\":\"四平\",\"cityPinYin\":\"siping\"},{\"cityId\":220700,\"cityName\":\"松原\",\"cityPinYin\":\"songyuan\"},{\"cityId\":510900,\"cityName\":\"遂宁\",\"cityPinYin\":\"suining\"},{\"cityId\":321300,\"cityName\":\"宿迁\",\"cityPinYin\":\"suqian\"},{\"cityId\":320500,\"cityName\":\"苏州\",\"cityPinYin\":\"suzhou\"},{\"cityId\":341300,\"cityName\":\"宿州\",\"cityPinYin\":\"suzhou\"}],\"t\":[{\"cityId\":370900,\"cityName\":\"泰安\",\"cityPinYin\":\"taian\"},{\"cityId\":320585,\"cityName\":\"太仓\",\"cityPinYin\":\"taicang\"},{\"cityId\":140100,\"cityName\":\"太原\",\"cityPinYin\":\"taiyuan\"},{\"cityId\":321200,\"cityName\":\"泰州\",\"cityPinYin\":\"taizhou\"},{\"cityId\":331000,\"cityName\":\"台州\",\"cityPinYin\":\"taizhou\"},{\"cityId\":130200,\"cityName\":\"唐山\",\"cityPinYin\":\"tangshan\"},{\"cityId\":120100,\"cityName\":\"天津\",\"cityPinYin\":\"tianjin\"},{\"cityId\":211200,\"cityName\":\"铁岭\",\"cityPinYin\":\"tieling\"},{\"cityId\":150500,\"cityName\":\"通辽\",\"cityPinYin\":\"tongliao\"},{\"cityId\":340700,\"cityName\":\"铜陵\",\"cityPinYin\":\"tongling\"}],\"w\":[{\"cityId\":370700,\"cityName\":\"潍坊\",\"cityPinYin\":\"weifang\"},{\"cityId\":371000,\"cityName\":\"威海\",\"cityPinYin\":\"weihai\"},{\"cityId\":330300,\"cityName\":\"温州\",\"cityPinYin\":\"wenzhou\"},{\"cityId\":420100,\"cityName\":\"武汉\",\"cityPinYin\":\"wuhan\"},{\"cityId\":340200,\"cityName\":\"芜湖\",\"cityPinYin\":\"wuhu\"},{\"cityId\":320509,\"cityName\":\"吴江\",\"cityPinYin\":\"wujiang\"},{\"cityId\":650100,\"cityName\":\"乌鲁木齐\",\"cityPinYin\":\"wulumuqi\"},{\"cityId\":320200,\"cityName\":\"无锡\",\"cityPinYin\":\"wuxi\"}],\"x\":[{\"cityId\":350200,\"cityName\":\"厦门\",\"cityPinYin\":\"xiamen\"},{\"cityId\":610100,\"cityName\":\"西安\",\"cityPinYin\":\"xian\"},{\"cityId\":430300,\"cityName\":\"湘潭\",\"cityPinYin\":\"xiangtan\"},{\"cityId\":420600,\"cityName\":\"襄阳\",\"cityPinYin\":\"xiangyang\"},{\"cityId\":610400,\"cityName\":\"咸阳\",\"cityPinYin\":\"xianyang\"},{\"cityId\":420900,\"cityName\":\"孝感\",\"cityPinYin\":\"xiaogan\"},{\"cityId\":130500,\"cityName\":\"邢台\",\"cityPinYin\":\"xingtai\"},{\"cityId\":630100,\"cityName\":\"西宁\",\"cityPinYin\":\"xining\"},{\"cityId\":410700,\"cityName\":\"新乡\",\"cityPinYin\":\"xinxiang\"},{\"cityId\":411500,\"cityName\":\"信阳\",\"cityPinYin\":\"xinyang\"},{\"cityId\":411000,\"cityName\":\"许昌\",\"cityPinYin\":\"xuchang\"},{\"cityId\":320300,\"cityName\":\"徐州\",\"cityPinYin\":\"xuzhou\"}],\"y\":[{\"cityId\":320900,\"cityName\":\"盐城\",\"cityPinYin\":\"yancheng\"},{\"cityId\":321000,\"cityName\":\"扬州\",\"cityPinYin\":\"yangzhou\"},{\"cityId\":222401,\"cityName\":\"延吉\",\"cityPinYin\":\"yanji\"},{\"cityId\":370600,\"cityName\":\"烟台\",\"cityPinYin\":\"yantai\"},{\"cityId\":511500,\"cityName\":\"宜宾\",\"cityPinYin\":\"yibin\"},{\"cityId\":420500,\"cityName\":\"宜昌\",\"cityPinYin\":\"yichang\"},{\"cityId\":640100,\"cityName\":\"银川\",\"cityPinYin\":\"yinchuan\"},{\"cityId\":210800,\"cityName\":\"营口\",\"cityPinYin\":\"yingkou\"},{\"cityId\":330782,\"cityName\":\"义乌\",\"cityPinYin\":\"yiwu\"},{\"cityId\":320282,\"cityName\":\"宜兴\",\"cityPinYin\":\"yixing\"},{\"cityId\":430600,\"cityName\":\"岳阳\",\"cityPinYin\":\"yueyang\"},{\"cityId\":140800,\"cityName\":\"运城\",\"cityPinYin\":\"yuncheng\"},{\"cityId\":530400,\"cityName\":\"玉溪\",\"cityPinYin\":\"yuxi\"}],\"z\":[{\"cityId\":370400,\"cityName\":\"枣庄\",\"cityPinYin\":\"zaozhuang\"},{\"cityId\":320582,\"cityName\":\"张家港\",\"cityPinYin\":\"zhangjiagang\"},{\"cityId\":130700,\"cityName\":\"张家口\",\"cityPinYin\":\"zhangjiakou\"},{\"cityId\":350600,\"cityName\":\"漳州\",\"cityPinYin\":\"zhangzhou\"},{\"cityId\":440800,\"cityName\":\"湛江\",\"cityPinYin\":\"zhanjiang\"},{\"cityId\":441200,\"cityName\":\"肇庆\",\"cityPinYin\":\"zhaoqing\"},{\"cityId\":410100,\"cityName\":\"郑州\",\"cityPinYin\":\"zhengzhou\"},{\"cityId\":321100,\"cityName\":\"镇江\",\"cityPinYin\":\"zhenjiang\"},{\"cityId\":442000,\"cityName\":\"中山\",\"cityPinYin\":\"zhongshan\"},{\"cityId\":330900,\"cityName\":\"舟山\",\"cityPinYin\":\"zhoushan\"},{\"cityId\":440400,\"cityName\":\"珠海\",\"cityPinYin\":\"zhuhai\"},{\"cityId\":430200,\"cityName\":\"株洲\",\"cityPinYin\":\"zhuzhou\"},{\"cityId\":370300,\"cityName\":\"淄博\",\"cityPinYin\":\"zibo\"},{\"cityId\":510300,\"cityName\":\"自贡\",\"cityPinYin\":\"zigong\"},{\"cityId\":520300,\"cityName\":\"遵义\",\"cityPinYin\":\"zunyi\"}]}");

console.log(JSON.stringify(parse))

const jsonData = ref(JSON.stringify({
  name: 'zhangsan',
  age: 18
}))

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
