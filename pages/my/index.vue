<template>
	<view>
		<u-navbar
		    :is-back="isBack" ,
		    :is-fixed="isFixed"
		    :background="background"
			:title="title"
		></u-navbar>
		
		
		
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{nick_name}}</view>
				<view class="u-font-14 u-tips-color">ID: {{yeju_id}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="支付"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="收藏"></u-cell-item>
				<u-cell-item icon="photo" title="相册"></u-cell-item>
				<u-cell-item icon="coupon" title="卡券"></u-cell-item>
				<u-cell-item icon="heart" title="关注"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view>
			<my-no-network></my-no-network>
		</view>
	</view>
</template>



<script>
	import {tabbar_list} from "../../common/tabbar/tabbar_list.js"
	import mystore from "../../store/index.js"
	import {getToken} from '../../store/index.js'
	import myNoNetwork from '../no-network/index.vue'
	
	export default {
		components: {
		  myNoNetwork
		        },
		data() {
			return {
				
				// 顶部导航
				title: '个人中心',
				isBack: false,
				isFixed: true,
				background: {
				  'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				
				nick_name: 'Ferryman',
				yeju_id: 'l314zhenniubi',
				
				pic:'http://8.129.77.225:9000/yeju/%E8%87%B4%E4%B8%80%20-%20%E5%89%AF%E6%9C%AC.png',
				
				current: 1,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				tabbar: tabbar_list,
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#5098FF'
				}
			
		},
		onShow() {
			let token = getToken();
			this.is_authc(token)
		},
		
		methods: {
			is_authc(token) {
			  console.log("is_authc")
			  
			  console.log("token", token.toString())
			  if (token === undefined || token === '') {
			    console.log("未登录")
			    this.$u.route({
			      url: 'pages/login/index'
			    })
			  }
		}
	},
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.right-item {
  margin: 0 12 rpx;
  position: relative;
  color: #ffffff;
  display: flex;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
