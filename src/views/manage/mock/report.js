import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let axiosmock = window.axiosmock = new MockAdapter(axios)


let data=[]
for(let i=0;i<9;i++){
  data.push({
    id: i+1,
    name: 'APP下载,APP今日用户下载,注册方式,用户变化,设备详情,用户转化率,日活跃度,每日新增用户'.split(',')[Math.floor(Math.random()*8)],
    dataType: 'APP数量统计,用户数量统计,转化率,活跃度统计'.split(',')[Math.floor(Math.random()*4)],
    chartType:'柱状图,柱状图,饼状图'.split(',')[Math.floor(Math.random()*3)],
    layout:'1*1,2*1,2*2'.split(',')[Math.floor(Math.random()*3)],
    appCodes:'首页,运营,题库,考试网,增值服务,教学平台'.split(',')[Math.floor(Math.random()*6)]
  })
}


axiosmock.onGet('/api/manage').reply(200, {
  reportdata:data
})
axiosmock.onAny().passThrough()
