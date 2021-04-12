<template>
	<div class="">
		<nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
		<cart-list ></cart-list>
		<bottom-bar></bottom-bar>
		<!-- <Toast1></Toast1> -->
	</div>

</template>

<script>
	
	  import NavBar from 'components/common/navbar/NavBar.vue'
	  import CartList from './childComps/CartList'
	  import BottomBar from './childComps/BottomBar'
	  import { mapGetters } from 'vuex'
	  // import Toast1 from '../../components/common/toast/Toast1.vue'
	  
	
  export default {
    name: "Cart",
	components:{
		NavBar,
		CartList,
		BottomBar,
		// Toast1
	},
	computed:{
		// cartCount(){
		// 	return this.$store.state.cartList.length
		// }
		...mapGetters(['cartCount','cartList'])
	}
  }
</script>

<style scoped>
	  .nav-bar {
	    background-color: var(--color-tint);
	    font-weight: 700;
	    color: #fff;
	  }
</style>
