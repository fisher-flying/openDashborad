import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let axiosmock = window.axiosmock = new MockAdapter(axios)


let data=[{
	id: '4',
	icon: "heart-o",
	name: "热点分析"
}]


axiosmock.onGet('/api/menu').reply(200, {
  list:data
})
axiosmock.onAny().passThrough()
