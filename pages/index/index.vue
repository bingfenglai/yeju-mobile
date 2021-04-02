<template>

  <view>
    <!-- 顶部导航条 开始 -->
    <view>
      <u-navbar
          :is-back="isBack" ,
          :is-fixed="isFixed"
          :background="background"
      >
	  
		<view @tap="selectCity" class="u-icon-item citySelected">
			<u-icon name="map-fill" size="40" color="#909399"></u-icon>
			<text class="u-icon-name">{{selected_city.city_name}}</text>
		</view>
	  
        <view class="search-wrap">
          <!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
          <u-search 
			v-model="keyword" 
			@search="doSearch" 
			:show-action="showAction" 
			:disabled="search_disabled"
			@click="search_click"
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
	
	
	<!-- 标签导航开始 -->
		<view>
			
			<u-tabs :list="tabs_list" :is-scroll="tabs_isScroll" :current="tabs_current" @change="tabs_change"></u-tabs>
			
		</view>
	
	<!-- 间隔槽 -->
	
	<view>
		<u-gap :bg-color="gap_bgColor" :height="gap_height" :margin-top="gap_marginTop" :margin-bottom="gap_marginBottom"></u-gap>
	</view>
	
	
	<!-- waterfall 房源瀑布流 -->
	<view class="wrap">
		<u-waterfall v-model="waterfall_flowList" ref="uWaterfall">
			<template v-slot:left="{ leftList }">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<!-- 微信小程序需要hx2.8.11版本才支持在template中引入其他组件，比如下方的u-lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="demo-title">{{ item.title }}</view>
					<view class="demo-price">￥ {{ item.price }}</view>
					<view class="demo-tag">
						<view class="demo-tag-owner">自营</view>
						<view class="demo-tag-text">放心购</view>
					</view>
					<view class="demo-shop">{{ item.shop }}</view>
					<view class="u-close">
						<u-icon name="close-circle-fill" color="#fa3534" size="34" @click="waterfall_remove(item.id)"></u-icon>
					</view>
				</view>
			</template>
			<template v-slot:right="{ rightList }">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="demo-title">{{ item.title }}</view>
					<view class="demo-price">￥{{ item.price }}</view>
					<view class="demo-tag">
						<view class="demo-tag-owner">自营</view>
						<view class="demo-tag-text">放心购</view>
					</view>
					<view class="demo-shop">{{ item.shop }}</view>
					<view class="u-close">
						<u-icon name="close-circle-fill" color="#fa3534" size="34" @click="waterfall_remove(item.id)"></u-icon>
					</view>
				</view>
			</template>
		</u-waterfall>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="waterfall_loadStatus" @loadmore="waterfall_addRandomData"></u-loadmore>
	</view>
	
	
	
	
	
	
	 <!-- 底线开始 -->
	<view>
		<u-divider :type="divider_type" :borderColor="divider_borderColor" :bg-color="divider_bgColor"
		:half-width="divider_halfWidth" :color="divider_color" :font-size="divider_fontSize">{{divider_text}}</u-divider>
	</view>
	
	<!-- 网络状态监听 -->
	<my-no-network></my-no-network>


  </view>

</template>

<script src="./index.js">

</script>

<style scoped lang="scss">
	@import "./index.scss"
</style>

<style>

</style>