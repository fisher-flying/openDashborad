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
    redirect: '/reports'
  },
  {
    path: '/reports',
    meta: { title: '报表管理', icon: 'fa fa-bar-chart' },
    component: 'manage/reports'
  },
  {
    path: '/pages',
    meta: { title: '页面管理', icon: 'fa fa-file-text-o' },
    component: 'manage/pages'
  },
  {
    path: '/pageConfig/:id?',
    component: 'manage/pageConfig'
  },
  {
    path: '/404',
    component: 'error/notFound404'
  }
]
window.routes = routes

export default routes
