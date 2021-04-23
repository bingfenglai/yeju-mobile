
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const config = new Vuex.Store({
	state:{
		active: 'dev',
		baseUrl: 'http://10.0.2.2:81/',
		BaseWebsocketUrl: 'ws://10.0.2.2:81'
	},
	
	computed:{
		active(){
			config.state.active;
		}
	},
	
	

})

export default config