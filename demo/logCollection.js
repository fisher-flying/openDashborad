(function () {
  var _accessFromCode = { 'Front': 1, 'Manager': 2, 'APIMethod': 3, 'App': 4, 'Baidu': 8, 'Douban': 9, 'MpWechat': 10, 'QQ': 11, 'QQUnion': 12, 'TQQ': 13, 'Wechat': 14, 'Weibo': 15, 'WXUnionID': 16, 'ZAS': 17 }
  // sso 的url
  var SSO_DOMAIN_URL = 'http://books123456789.ipmph.com/newsso'
  // 标识当前应用是否已经回传过日志
  var COOKIE_LOGINTIME = '_LST_0_'
  var Stat = {}
  Stat.init = function () {
    // debugger
    // 浏览器cookie未开启时，直接返回
    if (!navigator.cookieEnabled) {
      return
    }
    // 获取SSO在线接口获取登录状态等详情（jsonp请求方式）
    jsonp(SSO_DOMAIN_URL + '/online?ContentType=jsonp', function (res) {
      // 非登录状态，重置cookie回传日志标识记录
      if (!res || !res.Login) {
        return
      }
      var loginTime = getLoginTime()
      // 是登陆
      if (res.Login) {
        // 当前应用没回传日志
        if (res.Time != loginTime) {
          // 封装数据
          var splicingParams = Stat.handleData(res)
          // 拼接请求SSO页面的URL
          var ssoRequestUrl = SSO_DOMAIN_URL + '/logcollection/logCollection.html' +
            '?firstLogin=' + res['FirstLogin'] +
            '&login=' + res['Login'] +
            '&splicingParams=' + encodeURIComponent(JSON.stringify(splicingParams)) +
            '&domain=' + window.location.host +
            '&Time=' + res.Time
          // 创建动态iframe、URL(带参)指向SSO收集日志的空白页面，
          var iframe = document.createElement('iframe')
          iframe.setAttribute('src', ssoRequestUrl)
          iframe.onload = function () {
            if (iframe._isLoaded) {
              setLoginTime(res.Time)
            } else {
              iframe._isLoaded = true
            }
          }
          iframe.style.display = 'none'
          document.body.appendChild(iframe)
        }
      }
    })
  }
  // 去两端空格
  Stat.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
  // 拼接URL参数
  Stat.handleData = function (result) {
    var _accessFromCode_ = 1
    if (result.RegistPlat == null) {
      if (result.LoginPlatCode != null) {
        _accessFromCode_ = _accessFromCode[result.LoginPlatCode] <= 0 ? _accessFromCode_ : _accessFromCode[result.LoginPlatCode]
      }
    } else {
      _accessFromCode_ = _accessFromCode[result.RegistPlat] <= 0 ? _accessFromCode_ : _accessFromCode[result.RegistPlat]
    }
    return {
      'unitId': result.AccessID,
      'unitName': result.Name,
      'visitURL': encodeURIComponent(document.URL),
      'refererURL': encodeURIComponent(document.referrer),
      'visitTime': new Date().getTime(),
      'visitIP': Stat.trim(result.IP),
      'accessFrom': _accessFromCode_
    }
  }

  var seq = +(new Date())
  // 通过jsonp跨域请求后端接口，注意query中传递回调函数名的参数总是为callback
  var jsonp = function (url, data, onsuccess) {
    if (typeof data === 'function') {
      onsuccess = data
      data = null
    }
    var funName = '_jsonp' + seq++
    window[funName] = function (data) {
      if (onsuccess) {
        onsuccess(data)
      }
      window[funName] = null
    }
    url += (url.indexOf('?') !== -1 ? '&' : '?') + 'callback=' + funName
    if (data) {
      if (typeof data === 'object') {
        for (var k in data) {
          if (data.hasOwnProperty(k)) {
            url += '&' + k + '=' + encodeURIComponent(data[k])
          }
        }
      } else {
        url += String(data)
      }
    }
    var s = document.createElement('script')
    s.setAttribute('src', url)
    var head = document.head || document.documentElement
    head.appendChild(s)
  }
  function getLoginTime () {
    var _cookie = document.cookie.replace(/[ ]/g, '')  // 获取cookie，并且将获得的cookie格式化，去掉空格字符
    var _cookie_ary = _cookie.split(';')  // 将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    for (var i = 0; i < _cookie_ary.length; i++) {   // 使用for循环查找cookie中的tips变量
      var arr = _cookie_ary[i].split('=')   // 将单条cookie用"等号"为标识，将单条cookie保存为arr数组
      if (COOKIE_LOGINTIME === arr[0]) {  // 匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
        return arr[1]   // 将cookie的值赋给变量tips
      }
    }
    return 0
  }
  function setLoginTime (time) {
    document.cookie = COOKIE_LOGINTIME + '=' + time + ';path=/'
  }
  Stat.init()
})()
