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
	  gap_marginBottom: 5,
	  
	  //标签导航开始
	  tabs_list: [],
	  tabs_data: [{
	  	name: '关注',
	  	count: 100
	  }, {
	  	name:  '推荐',
	  	count: 7
	  }, {
	  	name: '电影'
	  },{
	  	name: '电视剧'
	  },{
	  	name: '小视频'
	  }, {
	  	name:  '游戏'
	  }, {
	  	name: '校园'
	  },{
	  	name: '影视'
	  },{
	  	name: '音乐'
	  }],
	  
	  tabs_current: 0,
	  tabs_sectionCurrent: 0,
	  tabs_isScroll: true,
	  tabs_tabCountIndex: 0,
	  tabs_activeColor: this.$u.color['primary'],
	  tabs_bold: true,
	  tabs_control: true,
	  tabs_offset: [5, -5],
	  
	  //房源瀑布开始
	  waterfall_loadStatus: 'loadmore',
	  waterfall_flowList: [],
	  waterfall_list: [
	  	{
	  		price: 35,
	  		title: '北国风光，千里冰封，万里雪飘',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg'
	  	},
	  	{
	  		price: 75,
	  		title: '望长城内外，惟余莽莽',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg'
	  	},
	  	{
	  		price: 385,
	  		title: '大河上下，顿失滔滔',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
	  	},
	  	{
	  		price: 784,
	  		title: '欲与天公试比高',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg'
	  	},
	  	{
	  		price: 7891,
	  		title: '须晴日，看红装素裹，分外妖娆',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg'
	  	},
	  	{
	  		price: 2341,
	  		shop: '李白杜甫白居易旗舰店',
	  		title: '江山如此多娇，引无数英雄竞折腰',
	  		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg'
	  	},
	  	{
	  		price: 661,
	  		shop: '李白杜甫白居易旗舰店',
	  		title: '惜秦皇汉武，略输文采',
	  		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg'
	  	},
	  	{
	  		price: 1654,
	  		title: '唐宗宋祖，稍逊风骚',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
	  	},
	  	{
	  		price: 1678,
	  		title: '一代天骄，成吉思汗',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
	  	},
	  	{
	  		price: 924,
	  		title: '只识弯弓射大雕',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
	  	},
	  	{
	  		price: 8243,
	  		title: '俱往矣，数风流人物，还看今朝',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
	  	}
	  ],
	  
	  //底线属性开始
	  
	  divider_text: '我是有底线的',
	  divider_bgColor: '#fafafa',
	  divider_halfWidth: 150,
	  divider_borderColor: '#dcdfe6',
	  divider_type: 'primary',
	  divider_color: '#909399',
	  divider_fontSize: '26'
	  

    }
  },
  onLoad() {
	this.tabs_list = this.tabs_data;
	this.waterfall_addRandomData();
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
    }, 
	
	
	//tabs 导航
	tabs_change(index) {
		this.tabs_current = index;
	},
	
	// 房源瀑布
	waterfall_addRandomData() {
		for (let i = 0; i < 10; i++) {
			let index = this.$u.random(0, this.waterfall_list.length - 1);
			// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
			let item = JSON.parse(JSON.stringify(this.waterfall_list[index]));
			item.id = this.$u.guid();
			this.waterfall_flowList.push(item);
		}
	},
	waterfall_remove(id) {
		this.$refs.uWaterfall.remove(id);
	},
	waterfall_clear() {
		this.$refs.uWaterfall.clear();
	}
    
  }
}