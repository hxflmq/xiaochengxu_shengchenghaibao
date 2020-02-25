
var app = getApp();

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Litemall-Token': wx.getStorageSync('token')
      },
      success: function(res) {

        if (res.statusCode == 200) {

          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            wx.navigateTo({
              url: '/pages/auth/login/login'
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function(err) {
        reject(err)
      }
    })
  });
}

/**
 * 封封微信的的request
 */
function requestIgnoreLogin(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Litemall-Token': wx.getStorageSync('token')
      },
      success: function(res) {
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject(res.errMsg);
        }
      },
      fail: function(err) {
        reject(err)
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}
// 解析链接中的参数
// let getQueryString = function (url, name) {
//   console.log("url = " + url)
//   console.log("name = " + name)
//   var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
//   var r = url.substr(1).match(reg)
//   if (r != null) {
//     console.log("r = " + r)
//     console.log("r[2] = " + r[2])
//     return r[2]
//   }
//   return null;
// }

// 封装倒计时的方法：
function interval(lastTime, _this, index) { //到期时间戳
  interval = setInterval(function() {　　　　
    var insertTime = _this.data.insertTime;　　　　 // 获取现在的时间
    var nowTime = new Date();　　　　
    var nowTime = Date.parse(nowTime); //当前时间戳
    var differ_time = lastTime - nowTime; //时间差：
    if (differ_time >= 0) {　　　　　　
      var differ_day = Math.floor(differ_time / (3600 * 24 * 1e3));
      //相差天数
      var differ_hour = Math.floor(differ_time % (3600 * 1e3 * 24) / (1e3 * 60 * 60));
      //相差小时
      var differ_minute = Math.floor(differ_time % (3600 * 1e3) / (1000 * 60));
      //相差分钟
      var s = Math.floor(differ_time % (3600 * 1e3) % (1000 * 60) / 1000);　　　　　　
      if (differ_day.toString().length < 2) {　　　　　　　　
        differ_day = "0" + differ_day;　　　　　　
      }　　　　　　
      if (differ_hour.toString().length < 2) {　　　　　　　　
        differ_hour = "0" + differ_hour;　　　　　　
      }　　　　　　
      if (differ_minute.toString().length < 2) {　　　　　　　　
        differ_minute = "0" + differ_minute;　　　　　　
      }　　　　
      if (s.toString().length < 2) {
        s = "0" + s;
      }　　　
      var str = differ_day + '天' + differ_hour + '时' + differ_minute + '分' + s;
      insertTime[index] = str;　　　　　　
      _this.setData({
        insertTime: insertTime
      });　
    } else { // 到期时，不再进行倒计时
      console.log("不进行倒计时");　　　　　　
      insertTime[index] = "00天00小时00分";　　　　　　
      _this.setData({
        insertTime: insertTime
      });　　　　　　
      clearInterval(interval);　　　　
    }
  }, 1000);
}

const fsm = wx.getFileSystemManager();
const FILE_BASE_NAME = 'tmp_base64src'; //自定义文件名

function base64src(base64data, cb) {
  const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
  if (!format) {
    return (new Error('ERROR_BASE64SRC_PARSE'));
  }
  const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
  const buffer = wx.base64ToArrayBuffer(bodyData);
  fsm.writeFile({
    filePath,
    data: buffer,
    encoding: 'binary',
    success() {
      cb(filePath);
    },
    fail() {
      return (new Error('ERROR_BASE64SRC_WRITE'));
    },
  });
};

module.exports = {
  formatTime,
  request,
  requestIgnoreLogin,
  redirect,
  showErrorToast,
  interval,
  base64src 
  // getQueryString
}