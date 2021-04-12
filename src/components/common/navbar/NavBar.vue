<template>
	<div class="nav-bar">
		<div class="left"><slot name="left"></slot></div>
		<div class="center"><slot name="center"></slot></div>
		<div class="right"><slot name="right"></slot></div>
	</div>
</template>

<script>
	export default {
	  name: "NavBar"
	}
</script>

<style scoped>
	.nav-bar{
		display: flex;
		height: 44px;
		line-height: 44px;
		text-align: center;
		box-shadow: 0px 2px 2px rgb(100,100,100,.1);
		
	}
	.left,.right{
		width: 60px;
		/* background-color: #63A35C; */
	}
	.center{
		flex: 1;
		/* background-color: #0000FF; */
	}
</style>
