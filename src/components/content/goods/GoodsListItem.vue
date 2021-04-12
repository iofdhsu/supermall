<template>
  <div class="goods-item" @click="itemClick">

	<img v-lazy="showImage" alt="" @load="imageLoad">

    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
	  <span class="sale">销量:{{showSale}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
	computed:{
		showImage(){
			return  this.goodsItem.image  || this.goodsItem.img || this.goodsItem.show.img
		},
		showSale(){
			return  this.goodsItem.itemSale || this.goodsItem.sale
		}
	},
	methods:{
		imageLoad(){
			// console.log("imageLoad")
			this.$bus.$emit('itemImageLoad')
		},
		itemClick(){
			this.$router.push('/detail/' + this.goodsItem.iid)
		}
	}
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
/*    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; */

  }

  .goods-item img {
    width: 100%;
    border-radius: 10px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .sale {
    margin-left: 10px;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
