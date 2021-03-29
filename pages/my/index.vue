<template>
	<view>
		<u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">uView ui</view>
				<view class="u-font-14 u-tips-color">微信号:helang_uView</view>
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
		
		
	</view>
</template>

<script>
	import {tabbar_list} from "../../common/tabbar/tabbar_list.js"
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				
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
		onLoad() {
			
		},
		methods: {
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

<style lang="scss">
page{
	background-color: #ededed;
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
