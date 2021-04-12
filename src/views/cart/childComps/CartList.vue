<template>

	<div class="cart-list">
		<Scroll class="content" ref="scroll">
			<!-- <li v-for="item in cartList">{{item}}</li> -->
			<cart-list-item v-for="(item,index) in cartList" :itemInfo="item"></cart-list-item>
		</Scroll>
	</div>

</template>

<script>
  import Scroll from 'components/common/scroll/Scroll.vue'
  import CartListItem from './CartListItem'
    import { mapGetters } from 'vuex'
	
	export default {
		name: "CartList",
    components: {
		  Scroll, 
		  CartListItem
    },
	computed:{
		...mapGetters(['cartCount','cartList'])
		
	},
	activated() {
		// console.log('---')
		this.$refs.scroll.refresh()
	}
    // props: {
		  // cartList: {
		  //   type: Array,
    //     default() {
		  //     return []
    //     }
    //   }
    // }
	}
</script>

<style scoped>
	.content{
		height: calc( 100vh - 44px - 49px );
		overflow: hidden;
		/* width: 100%; */
	}
</style>
