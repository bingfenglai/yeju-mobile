<template>

  <view>
    <!-- 顶部导航条 开始 -->
    <view>
      <u-navbar
          :is-back="isBack" ,
          :is-fixed="isFixed"
          :background="background"
      >
        <view class="search-wrap">
          <!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
          <u-search 
			v-model="keyword" 
			@search="doSearch" 
			:show-action="showAction" 
			
			:action-style="{color: '#fff'}" 
			:clearabled="clearabled" ></u-search>
        
		</view>
        <view class="navbar-right">
          <view class="message-box right-item">
            <u-icon name="chat" size="60" @click="clickMsg"></u-icon>
            <u-badge :count="mesg_count" :isDot=true size="mini" ></u-badge>
          </view>

        </view>
      </u-navbar>
    </view>

    <!-- 顶部导航条结束 -->

    <!-- 轮播图开始 -->
    <view class="">
	

      <view class="u-swipe-view">
        <u-toast ref="uToast"></u-toast>
        <u-swiper :height="250" :list="swipe_list" :title="swipe_title" :effect3d="effect3d"
                  :indicator-pos="indicatorPos" :mode="swipe_mode" :interval="3000" @click="swipe_click"></u-swiper>
      </view>
    </view>

	<view>
	<!-- 九宫格开始 -->
	<u-grid :col="col" @click="grid_click" v-if="!isSwiper" :border="grip_border">
		<u-grid-item name="item1" :index="0" @click="grid_item_click">
			<u-badge count="9" :offset="[col == 3 ? 20 : 14, col == 3 ? 30 : 20]"></u-badge>
			<u-icon name="photo" :size="46"></u-icon>
			<view class="grid-text">图片</view>
		</u-grid-item>
		<u-grid-item :index="1">
			<u-icon name="lock" :size="46"></u-icon>
			<view class="grid-text">锁头</view>
		</u-grid-item>
		<u-grid-item :index="2">
			<image src="https://cdn.uviewui.com/uview/grid/hot5.png" :style="{
				top: col == 3 ? '14rpx' : '8rpx',
				right: col == 3 ? '40rpx' : '28rpx'
			}" style="width: 34rpx;height: 34rpx;" class="badge-icon" mode="widthFix"></image>
			<u-icon name="hourglass" :size="46"></u-icon>
			<view class="grid-text">沙漏</view>
		</u-grid-item>
		<u-grid-item :index="3">
			<u-icon name="home" :size="46"></u-icon>
			<view class="grid-text">首页</view>
		</u-grid-item>
		<u-grid-item :index="4">
			<u-icon name="star" :size="46"></u-icon>
			<view class="grid-text">星星</view>
		</u-grid-item>
		<u-grid-item :index="5">
			<u-icon name="volume-up" :size="46"></u-icon>
			<view class="grid-text">音量</view>
		</u-grid-item>
		<u-grid-item :index="6">
			<image src="https://cdn.uviewui.com/uview/grid/hot6.png" style="width: 44rpx;height: 44rpx;top:0;right:0;" class="badge-icon"></image>
			<u-icon name="trash" :size="46"></u-icon>
			<view class="grid-text">回收站</view>
		</u-grid-item>
		<u-grid-item :index="7">
			<u-icon name="rewind-right" :size="46"></u-icon>
			<view class="grid-text">快进</view>
		</u-grid-item>
		<u-grid-item :index="8">
			<u-icon name="shopping-cart" :size="46"></u-icon>
			<view class="grid-text">购物车</view>
		</u-grid-item>
	</u-grid>
	</view>
	
	<!-- 间隔槽 -->
	
	<view>
		<u-gap :bg-color="gap_bgColor" :height="gap_height" :margin-top="gap_marginTop" :margin-bottom="gap_marginBottom"></u-gap>
	</view>


    <!-- <!-- 底部到导航开始 -->


  </view>

</template>

<script>
import {tabbar_list} from "../../common/tabbar/tabbar_list.js"
import mystore from "../../store/index.js"
import {getToken} from '../../store/index.js'


export default {
  data() {
    return {
      background: {
        'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
      },
      title: '首页',
      backText: '返回',
      isBack: false,
      custom: false,
      isFixed: true,
      showAction: false,
      backIconName: 'nav-back',
	  

      //搜索关键词
      keyword: undefined,
	  clearabled: true,
	  
	  //消息图标
	  MegIsDot: false,
	  mesg_count: 2,
     


      //轮播图属性开始
      swipe_mode: 'round',
      swipe_list: [{
        image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
        title: '昨夜星辰昨夜风，画楼西畔桂堂东'
      },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        }
      ],
      swipe_title: true,
      indicatorPos: 'bottomCenter',
      effect3d: false,
	  
	  
	  //九宫格属性开始
	  isSwiper: false,
	  grip_border: false,
	  col: 4,
	  
	  //间隔槽属性开始
	  gap_bgColor: this.$u.color.bgColor,
	  gap_height: 5,
	  gap_marginTop: 5,
	  gap_marginBottom: 5

    }
  },
  onLoad() {
	

  },

  onShow() {
    this.is_authc();
	this.keyword = undefined;
  },

  methods: {
	  
	grid_item_click(){
		
	},
	  
	grid_click(){
		
	},
	  
	clickMsg(){
		this.$u.route({
			url: 'pages/message/index',
			type: 'switchTab'
		})
	},
	  
	doSearch(keyword){
		console.log("搜索内容：", keyword);
		this.$refs.uToast.show({
			title: '搜索内容为：' + keyword,
			type: 'success'
		});
	},
    is_authc() {
      console.log("is_authc")
      const token = getToken()
      console.log("token", token)
      if (token === undefined || token === '') {
        console.log("未登录")
        this.$u.route({
          url: 'pages/login/index'
        })
      }

    },

    //轮播图相关方法
    swipe_click(index) {
      console.log(this.swipe_list[index].image)
    } 
    
  }
}
</script>

<style scoped lang="scss">
.slot-wrap {
  display: flex;
  align-items: center;
  /* 如果您想让slot内容占满整个导航栏的宽度 */
  /*flex: 1;*/
  /* 如果您想让slot内容与导航栏左右有空隙 */
  /* padding: 0 30rpx; */
}

.search-wrap {
  margin: 10 0 rpx;
  flex: 1;
 
  padding-left: 30rpx;
}

.right-item {
  margin: 0 0rpx;
  padding: 0 20rpx;
  position: relative;
  color: #ffffff;
  display: flex;
}

.message-box {

}

.slot-wrap {
  display: flex;
  align-items: center;
  flex: 1;
}

.navbar-right {
  margin-right: 24 rpx;
  display: flex;
}

.search-wrap {
  margin: 0 20 rpx;
  flex: 1;
}

</style>