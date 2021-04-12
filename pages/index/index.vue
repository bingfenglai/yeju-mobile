<template>

  <view >
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
			
			<u-icon  name="http://8.129.77.225:9000/yeju/icon/2.png" :size="46"></u-icon>
			<view class="grid-text">整租</view>
		</u-grid-item>
		
		<u-grid-item :index="1">
			<u-icon name="http://8.129.77.225:9000/yeju/icon/1.png" :size="46"></u-icon>
			<view class="grid-text">合租</view>
		</u-grid-item>
		<u-grid-item :index="2">
			
			<u-icon name="http://8.129.77.225:9000/yeju/icon/3.png" :size="46"></u-icon>
			<view class="grid-text">短租</view>
		</u-grid-item>
		<u-grid-item :index="3">
			<image src="https://cdn.uviewui.com/uview/grid/hot5.png" :style="{
				top: col == 3 ? '14rpx' : '8rpx',
				right: col == 3 ? '40rpx' : '28rpx'
			}" style="width: 34rpx;height: 34rpx;" class="badge-icon" mode="widthFix"></image>
			<u-icon name="home" :size="46" color="#FF8584"></u-icon>
			<view class="grid-text">优选房</view>
		</u-grid-item>
		<u-grid-item :index="4">
			<u-icon name="http://8.129.77.225:9000/yeju/icon/6.png" :size="46"></u-icon>
			<view class="grid-text">本周房源</view>
		</u-grid-item>
		<u-grid-item :index="5"> 
			<u-icon name="map" :size="46" color="#99DAEB"></u-icon>
			<view class="grid-text">地图找房</view>
		</u-grid-item>
		<u-grid-item :index="6">
			
			<u-icon name="http://8.129.77.225:9000/yeju/icon/5.png" :size="46"></u-icon>
			<view class="grid-text">查看成交</view>
		</u-grid-item>
		<u-grid-item :index="7">
			<u-icon name="http://8.129.77.225:9000/yeju/icon/3.png" :size="46"></u-icon>
			<view class="grid-text">我要出租</view>
		</u-grid-item>
		
	</u-grid>
	</view>
	
	<view class="tabs_top"></view>
	
	<!-- 标签导航开始 -->
		<view>
			
			<u-tabs :list="tabs_list" :is-scroll="tabs_isScroll" :current="tabs_current" @change="tabs_change"></u-tabs>
			
		</view>
	
	
	
	
	<!-- waterfall 房源瀑布流 -->
	<view class="wrap">
		<u-waterfall v-model="waterfall_flowList" ref="uWaterfall">
			<template v-slot:left="{ leftList }">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="onHouseItemClick(item.id)">
					<!-- 微信小程序需要hx2.8.11版本才支持在template中引入其他组件，比如下方的u-lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="demo-title">{{ item.title }}</view>
					<view class="demo-price">￥ {{ item.price }}</view>
					<view class="demo-tag">
						<view class="label ">精选房|面朝大海</view>
					</view>
					<!-- <view class="demo-shop">{{ item.shop }}</view> -->
					
				</view>
			</template>
			<template v-slot:right="{ rightList }">
				<view class="demo-warter" img-mode="aspectFill" v-for="(item, index) in rightList" :key="index" @click="onHouseItemClick(item.id)">
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="demo-title">{{ item.title }}</view>
					<view class="demo-price">￥{{ item.price }}</view>
					
					
					<view class="demo-tag">
						
						<view class="label ">椰居优品 </view>
						<view>|</view>
						<view class="label "> 春暖花开</view>
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