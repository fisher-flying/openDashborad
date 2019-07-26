import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let axiosmock = window.axiosmock = new MockAdapter(axios)


let linetwo=[{
	name:'点击率',
	type:'line',
	data:[250,500,400,290,330,600]
},{
	name:'预测值',
	type:'line',
	data:[500,240,470,150,420,300]
}]

axiosmock.onGet('/api/operation/clickrate').reply(200, {
  data:linetwo
})
axiosmock.onAny().passThrough()
