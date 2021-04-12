const mutations = {
  addCart(state, info) {
    console.log(info);

    // 1.查看是否添加过
    const oldInfo = state.cartList.find(item => item.iid === info.iid)

    // 2.+1或者新添加
    if (oldInfo) {
      oldInfo.count += 1
	  const msg = '当前商品数量+1'
	  console.log(msg)
	  // console.log(this.$bus)
	  // this.$bus.$emit('jiagou')
    } else {
      info.count = 1
      info.checked = false
	  const msg = '已添加购物车'
      state.cartList.push(info)
	  console.log(msg)
	  // console.log(this.$bus)
	  // this.$bus.$emit('jiagou')
	  
    }
  }
}

export default mutations

