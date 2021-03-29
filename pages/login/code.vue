<template>
  <view class="wrap">
    <view class="key-input">
      <view class="title">输入验证码</view>
      <view class="tips">验证码已发送至 +150****9320</view>
      <u-message-input :focus="true" :value="value" @change="change" @finish="finish" mode="bottomLine"
                       :maxlength="maxlength"></u-message-input>
      <text :class="{ error: error }">验证码错误，请重新输入</text>
      <view class="captcha">
        <text :class="{ noCaptcha: show }" @tap="noCaptcha">收不到验证码点这里</text>
        <text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
      </view>
    </view>
  </view>
</template>

<script>
import config from '../../config.js'
import mystore from '../../store/index.js'

export default {
  data() {
    return {
      maxlength: 4,
      value: '',
      second: 60,
      show: false,
      error: false
    };
  },
  computed: {},
  onLoad() {
    // this.getCaptcha()
    let interval = setInterval(() => {
      this.second--;
      if (this.second <= 0) {
        this.show = true;
        if (this.value.lenth != 4) {
          this.error = true;
        }
        clearInterval(interval);
      }
    }, 1000);
  },
  methods: {
    // 收不到验证码选择时的选择
    noCaptcha() {
      uni.showActionSheet({
        itemList: ['重新获取验证码', '接听语音验证码'],
        success: function (res) {

        },
        fail: function (res) {

        }
      });
    },
    // change事件侦听
    change(value) {
      // console.log('change', value);
      if (value.length == 4 && this.error == false) {
        console.log("路由前，，，，")

      }
    },
    // 输入完验证码最后一位执行
    finish(value) {
      this.error = false;
      console.log('验证码输入完成', value);
	  console.log("active",config.state.active)
	  if(config.state.active==='dev'){
		  mystore.state.vuex_token = '456';
	  }
      
      this.$u.route({
        url: 'pages/index/index',
        // 跳转到tabBar需要这个类型才能跳转
        type: 'switchTab'
      })


    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 80 rpx;
}

.box {
  margin: 30 rpx 0;
  font-size: 30 rpx;
  color: 555;
}

.key-input {
  padding: 30 rpx 0;

  text {
    display: none;
  }

  .error {
    display: block;
    color: red;
    font-size: 30 rpx;
    margin: 20 rpx 0;
  }
}

.title {
  font-size: 50 rpx;
  color: #333;
}

.key-input .tips {
  font-size: 30 rpx;
  color: #333;
  margin-top: 20 rpx;
  margin-bottom: 60 rpx;
}

.captcha {
  color: $u-type-warning;
  font-size: 30 rpx;
  margin-top: 40 rpx;

  .noCaptcha {
    display: block;
  }

  .regain {
    display: block;
  }
}
</style>
