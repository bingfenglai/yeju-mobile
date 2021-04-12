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
				<image  shape="circle" class="u-avatar"  :src="item.images" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-2" style="font-size: 36rpx; font-weight: 600;">{{ item.title }}</text>
					<text class="msg">{{item.msg}}</text>
					<u-badge  class="badge" :count="item.msg_count" :isDot=false size="medium" ></u-badge>
				</view>
			</view>
		</u-swipe-action>
		</view>
		
		
		<view>
			<my-no-network></my-no-network>
		</view>
	</view>
	
</template>

<script>
	import {getToken} from '../../store/index.js'
	import {connect} from './message.js'
	import myNoNetwork from '../no-network/index.vue'
	export default {
		components: {
		  myNoNetwork
		        },
		data() {
			return {
				
				circle: 'circle',
				
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
						title: '荔枝',
						msg: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
						images: 'http://8.129.77.225:9000/yeju/%E8%87%B4%E4%B8%80%20-%20%E5%89%AF%E6%9C%AC.png',
						show: false,
						msg_count: 3
					},
					{
						id: 2,
						title: '霓裳',
						msg: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
						images: 'http://8.129.77.225:9000/yeju/%E8%87%B4%E4%B8%80%20-%20%E5%89%AF%E6%9C%AC.png',
						show: false,
						msg_count: 2
					},
					{
						id: 3,
						title: '翠峰',
						msg: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: 'http://8.129.77.225:9000/yeju/%E8%87%B4%E4%B8%80%20-%20%E5%89%AF%E6%9C%AC.png',
						msg_count: 101
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
			
			onclickMesItem(id){
				
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
				let title = this.list[index].title;
				console.log(title);
				this.$u.route({
					url: 'pages/message/message-details/index',
					type: 'to',
					params: {title: title}}
				)
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
		margin-top: 20rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
	
	.msg {
		 white-space: nowrap;
		 width: 600rpx;
		 display: block;
		 overflow: hidden;
		 text-overflow: ellipsis;
		 color: #82848A;
		 padding-right: 60rpx;
	}
	
	.badge{
		
		margin-top: 75rpx;
		margin-right: 20rpx;
		
		
	}
	
	
</style>
