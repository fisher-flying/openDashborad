import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let axiosmock = window.axiosmock = new MockAdapter(axios)

//企业排名月份
let date=['2019-06','2019-05','2019-04','2019-03']
axiosmock.onGet('/api/operation/date').reply(200, {
  list:date
})

//企业排名表
let data=[]
for(let i=0;i<8;i++){
  data.push({
    id: i+1,
    name: '晋能大同公司,澄合矿业,煤炭学院鄂尔多斯学习中心,晋能忻州公司,神木煤业石窟店矿业有限公司,晋能临汾公司,清华同方,泽元软件'.split(',')[Math.floor(Math.random()*7)],
    time: '7979:33:20,7584:18:10,2539:54:16,1391:08:24,1177:16:42,1174:43:14,954:41:22'.split(',')[Math.floor(Math.random()*7)],
		//rchain:'5%,-10.2%,43%,-100.2%'.split(',')[Math.floor(Math.random()*4)],
		rchain:'5%,-10.2%,43%,-100.2%'.split(',')[Math.floor(Math.random()*4)],
    rcent:'15%'
  })
}
//企业排名表1
let data1=[]
for(let i=0;i<8;i++){
  data1.push({
    id: i+1,
    name: '和合谷,嘉和一品,煤炭学院鄂尔多斯学习中心,晋能忻州公司,神木煤业石窟店矿业有限公司,晋能临汾公司,清华同方,泽元软件'.split(',')[Math.floor(Math.random()*7)],
    time: '79:33:20,584:18:10,239:54:16,391:08:24,117:16:42,74:43:14,94:41:22'.split(',')[Math.floor(Math.random()*7)],
		//rchain:'5%,-10.2%,43%,-100.2%'.split(',')[Math.floor(Math.random()*4)],
		rchain:'15%,-20.2%,143%,-100.2%'.split(',')[Math.floor(Math.random()*4)],
    rcent:'20%'
  })
}
axiosmock.onGet('/api/operation/table').reply(200, {
  list:data
})
axiosmock.onGet('/api/operation/table/1').reply(200, {
  list:data1
})
axiosmock.onAny().passThrough()
