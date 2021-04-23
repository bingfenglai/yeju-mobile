import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let lifeData = {};
let is_authc = false;
try {
    // 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
    lifeData = uni.getStorageSync('lifeData');
	is_authc = uni.getStorageSync('yeju_is_authc')
} catch (e) {

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token'];

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
    // 判断变量名是否在需要存储的数组中
    if (saveStateKeys.indexOf(key) != -1) {
        // 获取本地存储的lifeData对象，将变量添加到对象中
        let tmp = uni.getStorageSync('lifeData');
        // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
        tmp = tmp ? tmp : {};
        tmp[key] = value;
        // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
        uni.setStorageSync('lifeData', tmp);
    }
}
const store = new Vuex.Store({
    state: {
		is_authc: is_authc,
		socketTask: undefined,
		eventList: [],
        // 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
        // 加上vuex_前缀，是防止变量名冲突，也让人一目了然
        vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {name: '明月'},
        vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		//vuex_token: '',
        // 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
        vuex_version: '1.0.1',
        vuex_demo: '绛紫',
		test_token: 'yeju_eyJhbGciOiJSUzUxMiJ9.eyJzdWJqZWN0Ijoie1wicHJpbmNpcGFsXCI6XCI5NjkzOTJcIixcImV4cGlyYXRpb25cIjo2NjYsXCJ0aW1lVW5pdFwiOlwiREFZU1wiLFwiYXV0aG9yaXR5TGlzdFwiOm51bGwsXCJzZXNzaW9uSWRcIjpcIjk2OTM5MTE2MTQ2MTI0NDIzMzlcIn0iLCJqdGkiOiJNalJrWWpJeU1UTXRPV05oTmkwMFlqVTRMVGd4WXpBdE1EYzVPV0l4T0RBNE5XUTMiLCJleHAiOjE2NzUxNDE2OTB9.mfn-ukAoiQGjatl6rCdJHDbtXecC8XzrnCwDe-GZzK_p1TlJcByQyhKx1B886xFPUDPu9LEf7KbrqDs5ouWT_Z-oS0v_rd1sWll9fJCTxaqsF53-pnIMSpkxR2slAnwQuKNNtttIGLYsURewUtYja5Ks1D9ZSQrIMMxtF1wj1iYnGgp4pEpH_n7AwS7T8yMv3up22Ibgy7Z7oZ3RCWei-GF4pY5vyqqyMgp5IkS4wtKEfEFzVUoQQWUomIOdGSr6SUjNBJ04oeDOBjCONuZU-lBpds_B1Dh30omNoZlFJsWUbN2hChOMD1pcC11IKYmTmvr6KgmHuNnE_jWnm_ZR8A',
		test_account: '969392',
		test_Id: '2021',
		// 自定义tabbar数据
        // vuex_tabbar: [{
        // 		iconPath: "/static/index.png",
        // 		selectedIconPath: "/static/index-selected.png",
        // 		text: '首页',
        // 		pagePath: '/pages/index/index'
        // 	},
        // 	// {
        // 	// 	iconPath: "/static/uview/example/js.png",
        // 	// 	selectedIconPath: "/static/uview/example/js_select.png",
        // 	// 	text: '工具',
        // 	// 	midButton: true,
        // 	// 	pagePath: '/pages/example/js'
        // 	// },
        // 	{
        // 		iconPath: "/static/center.png",
        // 		selectedIconPath: "/static/center-select.png",
        // 		text: '我',
        // 		pagePath: '/pages/my/index'
        // 	}
        // ]
    },
	computed: {
		test_token(){
			this.$uStore.state.test_token
		}
	},
    mutations: {
        $uStore(state, payload) {
            // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
            let nameArr = payload.name.split('.');
            let saveKey = '';
            let len = nameArr.length;
            if (len >= 2) {
                let obj = state[nameArr[0]];
                for (let i = 1; i < len - 1; i++) {
                    obj = obj[nameArr[i]];
                }
                obj[nameArr[len - 1]] = payload.value;
                saveKey = nameArr[0];
            } else {
                // 单层级变量，在state就是一个普通变量的情况
                state[payload.name] = payload.value;
                saveKey = payload.name;
            }
            // 保存变量到本地，见顶部函数定义
            saveLifeData(saveKey, state[saveKey])
        },

        SET_TOKEN(state, token) {
			console.log("SET_TOKEN", token)
            state.vuex_token = token
        },
		
		WEBSOCKET_INIT(state, url) {
					// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
					state.socketTask = uni.connectSocket({
						url: url,
						// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
						success(data) {
							console.log("websocket连接成功");
						},
					});
		
					// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
					state.socketTask.onOpen((res) => {
						console.log("WebSocket连接正常打开中...！");
						state.is_open_socket = true;
						// 注：只有连接正常打开中 ，才能正常收到消息
						state.socketTask.onMessage((res) => {
							console.log("收到服务器内容：" + res.data);
						});
					})
				},
				WEBSOCKET_SEND(state, p) {
					console.log("ws发送！");
					state.socketTask.send({
						data: p,
						async success() {
							console.log("消息发送成功");
						},
					});
				},
		
    },

    actions: {
		
		WEBSOCKET_INIT({commit}, url) {
			commit('WEBSOCKET_INIT', url)
		},
		
		WEBSOCKET_SEND({commit}, p) {
			commit('WEBSOCKET_SEND', p)
		},
		
        saveToken({commit}, token) {
            commit('SET_TOKEN', token)
        },
		
		
    }
})


export function getToken(){
	
	return uni.getStorageSync('yeju_token')
}

export function saveToken(token){
	uni.setStorageSync('yeju_token', token)
}

export function saveAuthcStatus(status){
	uni.setStorageSync('yeju_is_authc',status)
}

export function isAuthc(){
	let flag = uni.getStorageSync('yeju_is_authc');
	if(flag==undefined|| flag==null){
		saveAuthcStatus(false);
		flag = false;
	}
	
	return flag;
}

export default store
