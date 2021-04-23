<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>

<script>
	
	
	
	export default {
		data(){
			return {
				modalShow: false,
				modalShowContent: '',
				
			}
		},
		onLaunch: function() {
			//uni.setStorageSync('yeju_token','yeju_eyJhbGciOiJSUzUxMiJ9.eyJzdWJqZWN0Ijoie1wicHJpbmNpcGFsXCI6XCI5NjkzOTJcIixcImV4cGlyYXRpb25cIjo2NjYsXCJ0aW1lVW5pdFwiOlwiREFZU1wiLFwiYXV0aG9yaXR5TGlzdFwiOm51bGwsXCJzZXNzaW9uSWRcIjpcIjk2OTM5MTE2MTQ2MTI0NDIzMzlcIn0iLCJqdGkiOiJOamhqTnpnelltUXROelF5WWkwMFlqVTBMV0U0WVRndFlUTmpZelEzWm1NeE5UWmgiLCJleHAiOjE2NzUyMzk2MDJ9.HkckX3qHs29S4seLBKeXWYTi26lXoF6_yEocOesN43Eh6GjWwDBMxU2VxTptMh2bFXMH6mu0eS4Bb27SynOUx9hm4tChCsyBrWfpiMbaH4FbbSd-lm5ZZZLKO2NTf_j9bQ6eLLxtPiuMpQzkr6tkQabPV3n9uQViI6cbAYq5CsK5T-U6u9eizZl-Yx0NS3k2YJyYJcpmlLcskE_Zfaue1-Ft-gF9jb4qozq8M_aUndQ5xhyK-K-9I0kmoKtur7wcs2YQYowxFjj6fhfK883a_xPtLypAShtQ46bFutjCBhe5X5jwynOCCnB701gfjGxxvhFe5zpjtEBe_QIvx8GE-g')
			//uni.setStorageSync('yeju_token',undefined)
			console.log('App Launch')
			
			
			
			
			
			
			
		},
		onShow: function() {
			
			console.log('App Show')
				
		},
		onHide: function() {
			console.log('App Hide')
		},
		
			
	}
</script>
