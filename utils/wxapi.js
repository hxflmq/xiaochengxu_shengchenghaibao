/*
 * 保存图片到相册
 */
function saveImgToLocal(imagePath, msg) {
  //判断用户是否授权"保存到相册"
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.writePhotosAlbum']) {
        savePhoto(imagePath, msg);
      } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            savePhoto(imagePath, msg);
          },
          fail() {
            wx.showModal({
              title: '您没有授权，无法保存到相册',
              confirmText: "知道了",
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                } else if (res.cancel) {
                }
              }
            })
          }
        })
      } else {
        wx.openSetting({
          success(res) {
            if (res.authSetting['scope.writePhotosAlbum']) {
              savePhoto(imagePath, msg);
            } else {
              wx.showModal({
                title: '您没有授权，无法保存到相册',
                confirmText: "知道了",
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                  } else if (res.cancel) {
                  }
                }
              })
            }
          }
        })
      }
    }
  })
}
function savePhoto(imagePath,msg) {
  var that = this;
  wx.saveImageToPhotosAlbum({
    filePath: imagePath,
    success(res) {
      wx.showModal({
        title: '二维码已保存到系统相册',
        content: msg ? msg:'',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('点击确定')
          } else if (res.cancel) {
            //console.log('点击取消')
          }
        }
      })
    }
  })
}
//方法对外开放（开放才能从外部调用）
module.exports = {
  saveImgToLocal: saveImgToLocal
}