<template >
	<div>
		<!-- <main-tab-bar class="main" @tabCount="tabCount"></main-tab-bar> -->
		<h2>点赞{{counter}}</h2>
    <input type="text" v-model="counter">
    {{counter}}
		<br />
		<button @click='tabCount()'>点赞1</button>

		  <div >
		    4396
		  </div>
		  <div >总销量</div>
		 <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
  import {backTopMixin} from 'common/mixin.js'
  	import BackTop from 'components/content/backTop/BackTop.vue'
  
  export default {
    name: "Counter",
	mixins:[backTopMixin],
	components:{
		MainTabBar,
		BackTop
	},
	data(){
		return{
			counter:0
		}
	},

	created() {
		this.$bus.$on('dianzan',(counter) => {
			console.log(counter)
			this.counter = counter
			this.$bus.$emit('dianzan1',counter)
		})
	},
	methods:{
	// 	getChild(){
	// 		console.log(this.$refs)
	// },
	
		tabCount(){
			// console.log(counter)
			this.counter++
			this.$bus.$emit('dianzan1',this.counter)
		},

	}
  }
</script>

<style scoped>
	.main{
		display: flex;
		background-color: blanchedalmond;
		
    position: absolute;
    left: 50%;
    top:50%;
    /* transform: translate(-50%,-50%); */
	}
</style>
