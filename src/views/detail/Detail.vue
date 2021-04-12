<template>
	  <div id="detail">
		  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
		  <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
			  <detail-swiper :top-images="topImages"></detail-swiper>
			  <detail-base-info :goods="goods"></detail-base-info>
			  <detail-shop-info :shop="shop"></detail-shop-info>
			  <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
			  <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
			  <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
			  <good-list ref="recommend" :goods="recommends"></good-list>
			  
		  </scroll>
		  <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
		  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
		  <toast :message="message" :show="show"></toast>
		  <!-- <back-top></back-top> -->
	  </div>

</template>

<script>
	
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	import DetailBottomBar from './childComps/DetailBottomBar.vue'
	
	
	
	import Toast from 'components/common/toast/Toast.vue'
	import Scroll from 'components/common/scroll/Scroll'
	import GoodList from 'components/content/goods/GoodsList.vue'
	import BackTop from 'components/content/backTop/BackTop.vue'
	
	import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
	import {debounce} from 'common/utils.js'
	
  export default {
    name: "Detail",
	components:{
		DetailNavBar,
		DetailSwiper,
		DetailBaseInfo,
		DetailShopInfo,
		DetailGoodsInfo,
		DetailParamInfo,
		DetailCommentInfo,
		DetailBottomBar,
		GoodList,
		Scroll,
		BackTop,
		Toast,

		
		
	},

	data() {
		return{
			iid: null,
			topImages:[],
			goods:{},
			shop:{},
			detailInfo:{},
			paramInfo:{},
			commentInfo:{},
			recommends:[],
			newRefresh:null,
			itemImgListener:null,
			themeTopYs: [0,1000,2000,3000],
			currentIndex: 0,
			isShowBackTop:false,
			message:'',
			show:false
		}
	},
	created() {
		console.log(this.$route.params)
		this.iid = this.$route.params.iid
		
		getDetail(this.iid).then(res => {
			// console.log(res)
			const data = res.result
			this.topImages = data.itemInfo.topImages
			
			this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
			
			this.shop = new Shop(data.shopInfo)
			
			this.detailInfo = data.detailInfo
			
			this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
			
			// 2.7.保存评论信息
			if (data.rate.list) {
			  this.commentInfo = data.rate.list[0];
			}
		})
		
		getRecommend().then(res => {
			this.recommends = res.data.list
		})
		
	},
	mounted() {
		const newRefresh = debounce(this.$refs.scroll.refresh,100) 
		this.itemImgListener = () => {
			newRefresh()
		}
		this.$bus.$on('itemImageLoad',this.itemImgListener)
	},
	updated() {

	},
	destroyed() {
		this.$bus.$off('itemImageLoad',this.itemImgListener)
	},
	methods:{
		addToCart(){
			const product = {}
			product.image = this.topImages[0]
			product.title = this.goods.title
			product.desc = this.goods.desc
			product.price = this.goods.realPrice
			product.iid = this.iid
			// console.log(product)
			this.$store.commit('addCart',product)
			this.show = true 
			this.message = '已加购'
			setTimeout(() => {
				this.show = false
				this.message = ''
		
			},2000)
		},
		imageLoad(){
			this.$refs.scroll.refresh()
			this.themeTopYs = []
			this.themeTopYs.push(0)
			this.themeTopYs.push(this.$refs.params.$el.offsetTop)
			this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
			this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
			console.log(this.themeTopYs)

		},
		backClick(){
			this.$refs.scroll.scrollTo(0,0)
		},
		titleClick(index){
			this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
		},
		contentScroll(position){
			// console.log(position)
			this.isShowBackTop = (-position.y) > 1000
			const positionY = -position.y
			// console.log(positionY)
			// // this.isTabFixed = (-position.y) > this.tabOffsetTop
			for(let i in this.themeTopYs){
				// i = i*1
				i= parseInt(i)
				// console.log(1+i)
				if(this.currentIndex !== i){
					if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
						console.log(i)
						this.currentIndex = i
						this.$refs.nav.currentIndex = i
					}else if(i === this.themeTopYs.length-1 && positionY > this.themeTopYs[this.themeTopYs.length-1]){
						console.log(i)
						this.currentIndex = i
						this.$refs.nav.currentIndex = i
					}
				}
			}
			
		}
		

	}
  }
</script>

<style scoped>
	#detail{
		position: absolute;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}
	.detail-nav{
		position: fixed;
		background-color: #fff;
		z-index: 10;
		width: 100%;
	
		/* position: relative; */
		/* z-index: 10; */
		/* background-color: #fff; */
	}
	
	.content{
		height: calc(100% - 58px - 44px);
		margin-top: 44px;
		margin-bottom: 58px;
		/* background-color: white; */
		/* overflow:hidden */
/* 		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0; */
	}
</style>
