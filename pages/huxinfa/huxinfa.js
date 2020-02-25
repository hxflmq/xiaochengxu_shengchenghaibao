

//获取应用实例
const app = getApp();
Page({
  data: {
    scrotop:false,
    ismeke_model:true,
    all_list:[],
    showTactive_tab:1,
    showTactive:1,
    arr_today:[],
    wxImageUrl:'',
    newGoods: [],
    hotGoods: [], 
    topics: [],
    brands: [], 
    groupons: [],
    floorGoods: [
      {
        alreadySold:520,
        brief:'胡新发最帅',
        commentCounts:8,
        goodsIcon:'京东',
        goodsLabels:['胡新发大师','胡新发大神'],
        id:1314,
        isHot:false,
        isNew:false,
        name:'胡新发是最棒的',
        originPrice:0,
        picUrl:'http://img2.imgtn.bdimg.com/it/u=3134377699,2151968213&fm=26&gp=0.jpg',
        price:999,
        rebateProfit:0,
        remainder:5213,
        specificationId:286,
        wellCommentsPct:88
      },
      {
        alreadySold:520,
        brief:'最帅胡新发',
        commentCounts:8,
        goodsIcon:'淘宝',
        goodsLabels:['大师胡新发','大神胡新发'],
        id:1314,
        isHot:false,
        isNew:false,
        name:'胡新发是最棒的',
        originPrice:0,
        picUrl:'http://img3.imgtn.bdimg.com/it/u=2465116500,3479670655&fm=26&gp=0.jpg',
        price:999,
        rebateProfit:0,
        remainder:5213,
        specificationId:286,
        wellCommentsPct:88
      }
    ],
    checkedSpecPrice: 0, 
 
    banner: [], 
    today_length:[],
    today_list:[],
    banner_b: [
     {
        url: '/static/images/gf_index_bianli.png',
        name: '官方正品'
     },
      {
        url: '/static/images/gf_index_guanfang.png',
        name: '便利直邮'
      },
      {
        url: '/static/images/gf_index_jifen.png',
        name: '积分尊享'
      },
    ], 
    channel: [],
    coupon: [],

    noCollectImage: '/static/images/icon_collect.png',
    hasCollectImage: '/static/images/icon_collect_checked.png',
    collectImage: '/static/images/icon_collect.png',
    openAttr: false,
    buyDetail: {},
    number: 1,
    pro_d_id: '',
    specificationList: {},
    specificationListProductNum: '',

    // 生成海报参数
    _width: 0, //手机屏宽
    _heigth: 0,//手机屏高
    swiperHeight: 300,//主图图片高度
    canvasType: false,//canvas是否显示
    loadImagePath: '',//下载的图片
    imageUrl: '', //主图网络路径
    hearderImg:'https://wx.qlogo.cn/mmopen/vi_32/kVroh8aKgIJRJYluTLmzPDVULK91SNibWky5U1xGxnUbBUNrM0iaey3oh4XpYOKmwRQd0zoUBKNKorry12cicczbA/132', //头像网络路径
    codeUrl: 'https://cos.myfaka.com/car/share/code.jpg',//二维码网络路径
    localImageUrl: '', //绘制的商品图片本地路径
    localCodeUrl: '', //绘制的二维码图片本地路径
    localUserhearimg:'', //绘制的用户头像图片本地路径
    localzanimg:'/static/youpic/zan.png', //绘制赞图片
    localgoodsimg:'/static/youpic/pinglun.png',
    canvas_goodname:'',//绘制商品名称
    canvas_nowprice:'',//绘制商品现在价格
    canvas_oldprice:'',//绘制商品之前价格
    canvas_zanmunber:'',//绘制商品赞数
    canvas_pinglunmunber:''//绘制商品赞数
    // 生成海报参数
    
  },

  close_moke(){
    this.setData({
      ismeke_model:true
    })
  },

  
 
  
  onLoad: function(options) {
   
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    
   
  },
  // 页面分享
  onShareAppMessage: function() {
    let that = this;
    var imageUrl= that.data.wxImageUrl
    console.log(imageUrl)
    return {
      title: that.data.canvas_goodname,
      imageUrl: imageUrl,
      path: '/pages/index/index?goodId=32',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: "分享成功",
          duration: 1000,
          icon: "success"
        })
        this.setData({
          ismeke_model:true
        })
        console.log('成功', res)
      },
      fail: function (res) {
        wx.showToast({
          title: "分享失败",
          duration: 1000,
          icon: "success"
        })
      }
    }
  },
 
  onHide: function() {
    // 页面隐藏
    this.closeAttr();
  },
  onUnload: function() {
    // 页面关闭
  },

 

  closeAttr: function() {
    this.setData({
      openAttr: false,
    });
  },
 
  



// 海报生成开始
//分享返利生成海报开始
 /*按生成图片按钮时*/
 creatQrcodePictures: function (e) {
  //  商品详情信息
  console.log(e.currentTarget.dataset.gooddetail)
  // console.log('用户', wx.getStorageSync('userInfo').avatarUrl)
  let rmb = '￥'
  if(e.currentTarget.dataset.gooddetail.originPrice==null){
    e.currentTarget.dataset.gooddetail.originPrice = ''
    rmb = ''
  }
  console.log(e.currentTarget.dataset.gooddetail.originPrice)
  this.setData({
    imageUrl:e.currentTarget.dataset.gooddetail.picUrl,
    wxImageUrl:e.currentTarget.dataset.gooddetail.picUrl,
    hearderImg: 'https://wx.qlogo.cn/mmopen/vi_32/kVroh8aKgIJRJYluTLmzPDVULK91SNibWky5U1xGxnUbBUNrM0iaey3oh4XpYOKmwRQd0zoUBKNKorry12cicczbA/132',
    canvas_goodname:e.currentTarget.dataset.gooddetail.name,//绘制商品名称
    canvas_nowprice:e.currentTarget.dataset.gooddetail.price,//绘制商品现在价格
    canvas_oldprice:rmb+e.currentTarget.dataset.gooddetail.originPrice,//绘制商品之前价格
    canvas_zanmunber:e.currentTarget.dataset.gooddetail.wellCommentsPct==null? '0':e.currentTarget.dataset.gooddetail.wellCommentsPct+'%',//绘制商品赞数 
    canvas_pinglunmunber:e.currentTarget.dataset.gooddetail.commentCounts==null? '0':e.currentTarget.dataset.gooddetail.commentCounts//绘制商品评论
  })
  wx.showLoading({
    title: '正在绘制图片',
  })
  /*获取手机宽高*/
  let that = this
  let imgHeigth = this.data.swiperHeight
  let imgUrl = this.data.imageUrl
  let hearderImg = this.data.hearderImg
  let qrcodeUrl = this.data.codeUrl
  wx.getSystemInfo({
    success(res) {
      that.setData({
        _width: res.windowWidth,
        _heigth: res.windowHeight,
        canvasType: true,
        ismeke_model:false
      })
      // 获取图片信息生成canvas
      that.getImginfo([imgUrl, qrcodeUrl,hearderImg], 0);
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
      console.log('tyie',_type)
      if (_type === 0) { //商品图片
        that.setData({
          localImageUrl: res.path,
        })
        that.getImginfo(urlArr, 1)
      } else if(_type === 1){
        that.setData({ //二维码
          localCodeUrl: res.path,
        })
        // // 创建canvas图片
        // that.createNewImg();
        that.getImginfo(urlArr, 2)
      }else{
        that.setData({ //头像信息
          localUserhearimg: res.path,
        })
        // 创建canvas图片
        that.createNewImg();
      }
    },
    fail: function (res) {
      //失败回调
      wx.showModal({
        title: '图片生成超时,请取消重试!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('点击确定')
            wx.navigateTo({
                  url: 'pages/index/index'
                });
          } else if (res.cancel) {
            //console.log('点击取消')
          }
        }
      })
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
  ctx.drawImage(this.data.localImageUrl, 20,10, _width - 150, imgH-40);
  // 绘制赞图片
  ctx.drawImage(this.data.localzanimg,20,imgH + 40,15, 15)
  // 绘制商品评价图片
  ctx.drawImage(this.data.localgoodsimg,90,imgH + 42,15,15)
  // 绘制标题
  ctx.setFontSize(18);
  ctx.setFillStyle('#333');

  let txtWidth = _width - 60 + 30 - 100 - 50; //文字的宽度
  //商品名称
  ctx.fillText(this.data.canvas_goodname, 20, imgH, txtWidth);
  // 绘制价格单位 '￥'
  ctx.setFontSize(14);
  ctx.setFillStyle('#E82F2F');
  ctx.fillText('￥', 20, imgH + 25, txtWidth);
  // 绘制价格 现在
  ctx.setFontSize(18);
  ctx.fillText(this.data.canvas_nowprice, 36, imgH + 25, txtWidth);
  // 之前价格
  ctx.setFontSize(16);
  ctx.setFillStyle('#ccc');
  ctx.fillText(this.data.canvas_oldprice, 70, imgH + 25, txtWidth);
  // 删除线
  ctx.strokeStyle="#ccc";
  ctx.moveTo( 72,290 );
  ctx.lineTo(118,290);
  ctx.stroke();
  // ctx.moveTo(200,100);
  // ctx.moveTo(300,100);


  ctx.beginPath();
  ctx.moveTo(0,100);
  ctx.lineTo(0,100);
  // 点赞文字    
  ctx.setFontSize(16);
  ctx.setFillStyle('#C7C7C7');
  ctx.fillText(this.data.canvas_zanmunber, 40, imgH + 55, txtWidth);
  ctx.beginPath();
  ctx.moveTo(0,100);
  ctx.lineTo(0,100);
  //  评论文字
  ctx.setFontSize(16);
  ctx.setFillStyle('#C7C7C7');
  ctx.fillText(this.data.canvas_pinglunmunber, 110, imgH + 55, txtWidth);
  ctx.beginPath();
  ctx.moveTo(0,100);
  ctx.lineTo(0,100);
ctx.stroke();
  
  // 绘制用户信息
  ctx.setFontSize(12);
  ctx.setFillStyle('#413D3C');
  let userinfo = '胡新发'
  ctx.fillText(userinfo, _width-330, imgH + 115, txtWidth);
  // 推荐商品信息
  ctx.setFontSize(12);
  ctx.setFillStyle('#A5A4A4');
  ctx.fillText('推荐您享受胡新发生产商品', _width-330, imgH + 145, txtWidth);

  // 制作用户头像
  ctx.save(); // 先保存状态 已便于画完圆再用
  ctx.beginPath(); //开始绘制
  //先画个圆
  ctx.arc(50,imgH + 125,24,0, Math.PI * 2, false);
  ctx.clip();//画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
  ctx.drawImage(this.data.localUserhearimg,20,imgH + 90,68, 68)
  // ctx.drawImage(this.data.localUserhearimg,50,40,0,0,25,125,78,78)
  ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
 // 绘制二维码
 ctx.drawImage(this.data.localCodeUrl, _width - 80 + 80 - 200, imgH + 40, 80, 80);
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
// 海报生成结束
})