<template>
	<view>
		<view>
		<u-navbar
		    :is-back="isBack" ,
		    :is-fixed="isFixed"
		    :background="background"
			:title="title" 
		></u-navbar>
		</view>
		
		<view>
		<u-toast ref="uToast"></u-toast>
		<!-- 消息列表开始 -->
		<u-swipe-action
			bg-color="rgb(250, 250, 250)"
			@open="open"
			:disabled="disabled"
			:index="index"
			v-for="(item, index) in list"
			:key="item.id"
			:show="item.show"
			@click="click"
			:btn-width="btnWidth"
			@close="close"
			:options="options"
			@content-click="contentClick"
		>
			<view class="item u-border-bottom">
				<image mode="aspectFill" :src="item.images" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.title }}</text>
				</view>
			</view>
		</u-swipe-action>
		</view>
	</view>
</template>

<script>
	import {getToken} from '../../store/index.js'
	import {connect} from './message.js'
	export default {
		data() {
			return {
				
				// 顶部导航
				title: '消息',
				isBack: false,
				isFixed: true,
				background: {
				  'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				
				//消息列表开始
				disabled: false,
				list: [],
				list1: [
					{
						id: 1,
						title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false
					},
					{
						id: 2,
						title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false
					},
					{
						id: 3,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false,
					}
				],
				btnWidth: 180,
				options: [
					{
						text: '收藏',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
				
				
			}
		},
		onLoad() {
			setTimeout(() => {
				this.list = this.list1;
			}, 0)
		},
		onShow() {
			this.is_authc(getToken());
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
			},
			
			open(index) {
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				});
			},
			
			click(index, index1) {
				if(index1 == 1) {
					this.list.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
				} else {
					this.list[index].show = false;
					this.$u.toast(`收藏成功`);
				}
			},
			
			close(index) {
				this.list[index].show = false;
			},
			
			contentClick(index) {
				console.log('点击了： ',index);
			}
			
			
			
		}
	}
</script>

<style>
	.item {
		display: flex;
		padding: 20rpx;
	}
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}

</style>
