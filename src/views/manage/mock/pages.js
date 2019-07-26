import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let axiosmock = window.axiosmock = new MockAdapter(axios)


let data=[]
for(let i=0;i<9;i++){
  data.push({
    id: i+1,
    type: '首页,二级页面'.split(',')[Math.floor(Math.random()*2)],
    name: '首页,运营,题库,考试网,增值服务,教学平台'.split(',')[Math.floor(Math.random()*6)],
    createDate:'2018-06-24',
    createBy:'刘强,王洋'.split(',')[Math.floor(Math.random()*2)]
  })
}


axiosmock.onGet('/api/managePages').reply(200, {
  pagesdata:data
})
axiosmock.onAny().passThrough()
