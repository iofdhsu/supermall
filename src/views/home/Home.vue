<template>
  <div id="home" >
	  <!-- <router-view ></router-view> -->
	  <nav-bar  class="home-nav"><div slot="center">购物街</div></nav-bar>
	  <tab-control ref="tabControl1" :titles="['流行','新款','精选']"
	  @tabClick="tabClick" class="tab-control" v-show="isTabFixed"></tab-control>
	  <scroll class="content" ref="scroll" :probe-type="3" 
	  @scroll="contentScroll" :pull-up-load="true"
	  @pullingUp="loadMore" :pull-down-refresh="true" @pullingDown="refresh">
		  <home-swiper  :banners='banners'></home-swiper>
		  <recommend-view :recommends='recommends'></recommend-view>
		  <feature-view></feature-view>
		  <tab-control ref="tabControl2" :titles="['流行','新款','精选']"
		  @tabClick="tabClick" :class="{fixed:isTabFixed}"></tab-control>
		  <good-list :goods="goods[currentType].list"></good-list>
	  </scroll>
	  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

	


  </div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView.vue'
	import TabControl from 'components/content/tabControl/TabControl.vue'
	import GoodList from 'components/content/goods/GoodsList.vue'
	import Scroll from 'components/common/scroll/Scroll.vue'
	import BackTop from 'components/content/backTop/BackTop.vue'
	
	import {getHomeMultidata,getHomeGoods} from 'network/home'
	
	import {debounce} from 'common/utils.js'
	
	export default {
    name: "Home",
	components:{
		NavBar,
		HomeSwiper,
		RecommendView,
		FeatureView,
		TabControl,
		GoodList,
		Scroll,
		BackTop
	},
	data(){
		return{
			// result:null
			banners:[],
			recommends:[],
			goods:{
				'pop':{page:0,list:[]},
				'new':{page:0,list:[]},
				'sell':{page:0,list:[]}
			},
			currentType:'pop',
			isShowBackTop:false,
			tabOffsetTop: 0,
			isLoad: false,
			isTabFixed:false,
			saveY: 0,
			itemImgListener:null,

		}
	},
	activated() {
		this.$refs.scroll.scrollTo(0,this.saveY,0)
		this.$refs.scroll.refresh()
	},
	deactivated() {
		this.saveY = this.$refs.scroll.scroll.y
		
		this.$bus.$off('itemImageLoad',this.itemImgListener)
	},
	created() {
		this.getHomeMultidata()
		
		this.getHomeGoods('pop')
		this.getHomeGoods('new')
		this.getHomeGoods('sell')
		

	}, 
	mounted(){
		
		// const refresh = this.debounce(this.$refs.scroll.refresh,50)
		const refresh = debounce(this.$refs.scroll.refresh,50)
		
		this.itemImgListener = () => {
			// console.log('--------')
			// this.scroll && this.$refs.scroll.refresh()
			// this.$refs.scroll.refresh()
			refresh()
		}
		
		this.$bus.$on('itemImageLoad',this.itemImgListener)
	},
	methods:{
		debounce(func,delay){
			let timer = null
			return function(...args){
				if (timer) clearTimeout(timer)
				timer = setTimeout(() => {
					func.apply(this,args)
				},delay)
			}
		},
		refresh(){
			// console.log("refresh")
			// // this.goods[type].page = 0
			this.refreshHomeGoods(this.currentType)
			this.getHomeGoods(this.currentType)
			
			this.$refs.scroll.finishPullDown()
			// window.location.reload()

			
		},
		loadMore(){
			this.getHomeGoods(this.currentType)
			this.$refs.scroll.finishPullUp()
			// this.$refs.scroll.scroll.refresh()
		},
		contentScroll(position){
			// console.log(position)
			this.isShowBackTop = (-position.y) > 1000
			
			this.isTabFixed = (-position.y) > this.tabOffsetTop
			
		},
		backClick(){
			this.$refs.scroll.scrollTo(0,0)
		},
		tabClick(index){
			switch(index){
				case 0 :this.currentType = 'pop' ;break
				case 1 :this.currentType = 'new' ;break
				case 2 :this.currentType = 'sell'; break
			}
			this.$refs.tabControl1.currentIndex = index;
			this.$refs.tabControl2.currentIndex = index;
		},
		getHomeMultidata(){
			getHomeMultidata().then(res => {
				// console.log(res)
				// this.result = res
				// console.log(this.result)
				this.banners = res.data.banner.list
				this.recommends = res.data.recommend.list
			})
		},
		getHomeGoods(type){
			const page = this.goods[type].page + 1
			getHomeGoods(type,page).then(res => {
				console.log(res)
				
				this.goods[type].list.push(...res.data.list)
				this.goods[type].page += 1
				// this.$refs.scroll.finishPullUp()
				if(!this.isLoad){
					// console.log(this.$refs.tabControl.$el.offsetTop)
					this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
					this.isLoad = true
				}
				
			})
		},
		refreshHomeGoods(type){
			this.goods[type].page = 0
			this.goods[type].list.splice(0,this.goods[type].list.length)
			// this.goods[type].list.slice(0,30)
			// this.getHomeMultidata()
			// this.getHomeGoods(type)
			// this.$refs.scroll.scroll.refresh()
			
		
		}
	}
  }
</script>

<style scoped>
	.home-nav{
		background-color: var(--color-tint);
		color: white;
/* 		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
		/* margin-bottom: 44px; */
	}
	#home{
		/* padding-bottom:44px; */
		height:100vh;
		position: relative;
	}
	.tab-control{
		position: relative;

		z-index: 9;
	}
	
	.content{
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		/* background-color: white; */
		overflow:hidden
	}
	
/* 	.fixed{
		position: fixed;
		left: 0;
		right: 0;
		top: 44px;
	} */
/* 	.content{
		height: calc( 100% - 88px);
		overflow: hidden;
		
	} */

</style>
