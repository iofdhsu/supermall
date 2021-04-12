<template>
  <tab-bar>
    <tab-bar-item path="/home" >
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
	<tab-bar-item path="/counter" >
	  <img slot="item-icon" src="~assets/img/tabbar/dianzan.svg" alt=""  @click="addCount">
	  <img slot="item-icon-active" src="~assets/img/tabbar/dianzan_active.svg" alt=""  @click="addCount">
	  <div slot="item-text"  @click="addCount">{{counter}}</div>
	</tab-bar-item>
	
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    },

	data(){
		return{
			counter:0,
			msg:"子组件的信息"
		}
	},
	created() {
		this.$bus.$on('dianzan1',(counter) => {
			console.log(counter)
			this.counter = counter
		
		})
	},
	methods: {
	  addCount() {
	    this.counter++
		let counter = this.counter
		// console.log(counter)
		this.$emit('tabCount',counter)
		this.$bus.$emit('dianzan',counter)
	  }
	}
  }
</script>

<style scoped>

</style>
