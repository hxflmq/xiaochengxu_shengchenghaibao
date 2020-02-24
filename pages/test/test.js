//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // canvas 
    _width: 0, //手机屏宽
    _heigth: 0,//手机屏高
    swiperHeight: 300,//主图图片高度
    canvasType: false,//canvas是否显示
    loadImagePath: '',//下载的图片
    imageUrl: 'https://cos.myfaka.com/car/service/1.jpg', //主图网络路径
    codeUrl: 'https://cos.myfaka.com/car/share/code.jpg',//二维码网络路径
    localImageUrl: '', //绘制的商品图片本地路径
    localCodeUrl: '', //绘制的二维码图片本地路径
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },
  /*按生成图片按钮时*/
  creatQrcodePictures: function () {
    wx.showLoading({
      title: '正在绘制图片',
    })
    /*获取手机宽高*/
    let that = this
    let imgHeigth = this.data.swiperHeight
    let imgUrl = this.data.imageUrl
    let qrcodeUrl = this.data.codeUrl
    wx.getSystemInfo({
      success(res) {
        that.setData({
          _width: res.windowWidth,
          _heigth: res.windowHeight,
          canvasType: true,
        })
        // 获取图片信息生成canvas
        that.getImginfo([imgUrl, qrcodeUrl], 0);
      }
    })
  },
  // 获取图片信息
  getImginfo: function (urlArr, _type) {
    let that = this;
    wx.getImageInfo({
      src: urlArr[_type], 
      success: function (res) {
        //res.path是网络图片的本地地址
        if (_type === 0) { //商品图片
          that.setData({
            localImageUrl: res.path,
          })
          that.getImginfo(urlArr, 1)
        } else {
          that.setData({ //二维码
            localCodeUrl: res.path,
          })
          // 创建canvas图片
          that.createNewImg();
        }
      },
      fail: function (res) {
        //失败回调
        console.log('Fail：', _type, res)
      }
    });
  },
  //绘制canvas
  createNewImg: function () {
    let _width = this.data._width,
      _heigth = this.data._heigth; //屏幕宽与高
 
    let imgHeigth = this.data.swiperHeight, //原图片高度
      scale = (_width - 40) / _width, //缩小比例
      that = this;
    let imgH = imgHeigth * scale; //绘制时图片显示高度  
    let ctx = wx.createCanvasContext('mycanvas');
    // 绘制背景
    ctx.setFillStyle("#fff");
    ctx.fillRect(0, 0, _width - 40, imgH + 160);
    //绘制图片
    ctx.drawImage(this.data.localImageUrl, 10, 10, _width - 60, imgH);
 
    // 绘制标题
    ctx.setFontSize(18);
    ctx.setFillStyle('#333');
 
    let txtWidth = _width - 60 + 30 - 100 - 50; //文字的宽度
 
    //商品名称
    ctx.fillText('汽车服务：白金蜡', 10, imgH + 40, txtWidth);
    // 绘制价格单位 '￥'
    ctx.setFontSize(14);
    ctx.setFillStyle('#d2aa68');
    ctx.fillText('￥', 10, imgH + 65, txtWidth);
    // 绘制价格
    ctx.setFontSize(18);
     ctx.fillText('90元/次', 26, imgH + 65, txtWidth);
    // 绘制小程序名称
    ctx.setFontSize(20);
    ctx.setFillStyle('red');
    ctx.fillText('武鸣爱车', 10, imgH + 105, txtWidth);
    // 绘制提示信息
    ctx.setFontSize(14);
    ctx.setFillStyle('#999');
    ctx.fillText('微信小程序 • 长按识别', 10, imgH + 125, txtWidth);
 
    // 绘制二维码
    ctx.drawImage(this.data.localCodeUrl, _width - 80 + 80 - 150, imgH + 20, 100, 100);
    // 显示绘制
    ctx.draw();
 
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            loadImagePath: tempFilePath,
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 500);
    //关闭提示
    wx.hideLoading();
  },
  //点击保存到相册
  saveImg: function () {
    //调用wxapi.js里集成的接口
    app.globalData.wxapi.saveImgToLocal(this.data.loadImagePath);
  },
  // 关闭弹窗
  onClickOverlay: function () {
    this.setData({
      canvasType: false
    });
  },
})