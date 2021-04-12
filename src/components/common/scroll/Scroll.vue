<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
	  pullDownRefresh:{
		  type: Boolean,
		  default: false
		  
    }
	},
    data() {
      return {
        scroll: null,
        message: '哈哈哈'
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
		pullDownRefresh:this.pullDownRefresh,
		mouseWheel:true
      })

      // 2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })

      // 3.监听上拉事件
      this.scroll.on('pullingUp', () => {
		// console.log('pullingUp')
		
        this.$emit('pullingUp')
		// this.finishPullUp()
      })
 
	 this.scroll.on('pullingDown', () => {
		// console.log('pullingUp')
		
	    this.$emit('pullingDown')
		// this.finishPullUp()
	  })
	},
    methods: {
		scrollTo(x, y, time=300) {
			this.scroll.scrollTo(x, y, time)
		 },
		finishPullUp() {
			this.scroll.finishPullUp()
		 },
		finishPullDown(){
			this.scroll.finishPullDown()
		},
		 refresh(){
			// console.log('------')
			// this.scroll && this.scroll.refresh()
			this.scroll.refresh()
		}
    }
  }
</script>

<style scoped>

</style>
