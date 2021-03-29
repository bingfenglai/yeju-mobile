<template>

  <view>
    <!-- 顶部导航条 开始 -->
    <view>
      <u-navbar
          :is-back="isBack" ,
          :is-fixed="isFixed"
          :background="background"
      >
        <view class="search-wrap" v-if="search">
          <!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
          <u-search v-model="keyword" :show-action="showAction" height="56" :action-style="{color: '#fff'}"></u-search>
        </view>
        <view class="navbar-right">
          <view class="message-box right-item">
            <u-icon name="chat" size="48"></u-icon>
            <u-badge count="0" size="mini" :offset="[-15, -15]"></u-badge>
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


    <!-- <!-- 底部到导航开始 -->


  </view>

</template>

<script>
import {tabbar_list} from "../../common/tabbar/tabbar_list.js"
import mystore from "../../store/index.js"

export default {
  data() {
    return {
      background: {
        'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
      },
      title: '首页',
      backText: '返回',
      isBack: false,
      search: true,
      custom: false,
      isFixed: true,
      showAction: true,
      backIconName: 'nav-back',


      //搜索关键词
      keyword: undefined,
      current: 0,
      show: true,
      bgColor: '#ffffff',
      borderTop: true,
      tabbar: tabbar_list,
      midButton: true,
      inactiveColor: '#909399',
      activeColor: '#5098FF',


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
      effect3d: false

    }
  },
  onLoad() {


  },

  onShow() {
    this.is_authc();
  },

  methods: {
    is_authc() {
      console.log("is_authc")
      const token = mystore.state.vuex_token
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
    },


    beforeSwitch(index) {

      console.log("指针：", index);
      this.$u.route({
        url: this.list[index].pagePath,
        type: 'redirect'
      });

      return true;
    },

    bgColorChange(index) {

      if (index == 0) {
        this.activeColor = '#5098FF';
        this.inactiveColor = '#909399';
      }
      if (index == 1) {
        this.activeColor = '#D0D0D0';
        this.inactiveColor = '#5A5A5A';
      }
      this.bgColor = ['#ffffff', '#1f1f1d'][index];
    },
    borderTopChange(index) {

      this.borderTop = !index;
    },
    badgeChange(index) {

    },
    minButtonChange(index) {
      console.log("minButtonChange")
      this.midButton = !index;
    }
  }
}
</script>

<style scoped lang="scss">
.slot-wrap {
  display: flex;
  align-items: center;
  /* 如果您想让slot内容占满整个导航栏的宽度 */
  flex: 1;
  /* 如果您想让slot内容与导航栏左右有空隙 */
  /* padding: 0 30rpx; */
}

.search-wrap {
  margin: 0 20 rpx;
  flex: 1;
}

.right-item {
  margin: 0 12 rpx;
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