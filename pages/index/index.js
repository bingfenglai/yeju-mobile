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
	  
	  //城市选择
	  selected_city:{
		  city_name: "海口",
		  city_id: "120"
	  },

      //搜索关键词
      keyword: undefined,
	  clearabled: true,
	  search_disabled: true,
	  
	  //消息图标
	  MegIsDot: false,
	  mesg_count: 2,
     


      //轮播图属性开始
      swipe_mode: 'round',
      swipe_list: [{
        image: 'http://8.129.77.225:9000/yeju/banner/1.png',
        title: '昨夜星辰昨夜风，画楼西畔桂堂东'
      },
        {
          image: 'http://8.129.77.225:9000/yeju/banner/2.png',
          title: '身无彩凤双飞翼，心有灵犀一点通'
        },
        {
          image: 'http://8.129.77.225:9000/yeju/banner/3.png',
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
		  name: '推荐'
	  },
	  {name: '新上'},
	  {name: '热门商圈'}],
	  
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
	  		title: '海大优等生公寓2居',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://8.129.77.225:9000/yeju/house/1.png'
	  	},
	  	{
	  		price: 75,
	  		title: '海大优等生公寓10栋120',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://8.129.77.225:9000/yeju/house/2.png'
	  	},
	  	{
	  		price: 385,
	  		title: '海大优等生公寓10栋119',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://8.129.77.225:9000/yeju/house/3.png'
	  	},
	  	{
	  		price: 784,
	  		title: '海大优等生公寓10栋121',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://8.129.77.225:9000/yeju/house/4.jpg'
	  	},
	  	{
	  		price: 7891,
	  		title: '海大优等生公寓10栋122',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://8.129.77.225:9000/yeju/house/5.jpg'
	  	},
	  	{
	  		price: 2341,
	  		shop: '',
	  		title: '海大优等生公寓10栋123',
	  		image: 'http://8.129.77.225:9000/yeju/house/6.jpg'
	  	},
	  	{
	  		price: 661,
	  		shop: '',
	  		title: '海大优等生公寓10栋124',
	  		image: 'http://8.129.77.225:9000/yeju/house/7.jpg'
	  	},
	  	{
	  		price: 1654,
	  		title: '子衿公寓 面朝大海 春暖花开',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://8.129.77.225:9000/yeju/house/8.jpg'
	  	},
	  	{
	  		price: 1678,
	  		title: '男德学院精品房1栋101',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://8.129.77.225:9000/yeju/house/9.jpg'
	  	},
	  	{
	  		price: 924,
	  		title: '男德学院精品房4栋346',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://8.129.77.225:9000/yeju/house/10.jpg'
	  	},
	  	{
	  		price: 8243,
	  		title: '侠客岛精选小洋楼',
	  		shop: '李白杜甫白居易旗舰店',
	  		image: 'http://8.129.77.225:9000/yeju/house/12.jpg'
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
	  
	// 城市选择方法
	selectCity(){
		this.$refs.uToast.show({
			title: '点击了城市',
			type: 'success'
		});
	},
	
	//九宫格方法
	  
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
	
	// 搜索
	  
	doSearch(keyword){
		console.log("搜索内容：", keyword);
		this.$u.route({
			url: 'pages/search/index',
			params: {params: keyword}
		})
	},
	
	search_click(){
		this.$u.route({
			url: 'pages/search/index'
		})
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