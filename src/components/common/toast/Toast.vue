<template>
    <div class="toast" v-show="show">
       <div>{{message}}</div>
    </div>
</template>

<script>
export default {
    name:'Toast',
    props:{
        message:{
            type:String,
            default:''
        },
		show:{
			type:Boolean,
			default:false
		}
    }
}
</script>

<style scoped>
    .toast{
        position: fixed;
        z-index: 999;
        left: 50%;
        top: 50%;
        padding: 5px;
        font-size: 14px;
		color: #fff;
        transform: translate(-50%,-50%);
        background-color: rgba(0,0,0,.5)
    }
</style>