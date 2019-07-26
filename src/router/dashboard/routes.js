/**
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
           佛祖保佑       永无霸葛
           心外无法       法外无心
**/

// 路由设置
const routes = [
  {
    path: '/',
    redirect: '/operation'
  },
  {
    path: '/login',
    component: 'dashboard/login'
  },
  {
    path: '/overview',
    component: 'dashboard/overview'
  },
  {
    path: '/operation',
    component: 'dashboard/operation'
  },
  {
    path: '/userview',
    component: 'dashboard/userview'
  },
  {
    path: '/hotspot',
    component: 'dashboard/hotspot'
  },
  {
    path: '/profession',
    component: 'dashboard/profession'
  },
  {
    path: '/enterprise',
    component: 'dashboard/enterprise'
  },
  {
    path: '/404',
    component: 'error/notFound404'
  }
]
window.routes = routes

export default routes
