<template>
  <div class="index">
    <div class="block">
      <span class="demonstration"></span>
      <el-carousel height="700px">
        <el-carousel-item v-for="(item,index) in list" :key="index" height="700px">
          <div class="imgs" :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat `"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[]
    }
  },
  mounted(){
    this.$axios({
      url:'/scenics/banners',
    }).then(res => {
      console.log(res);
      this.list = res.data.data
    })
  }
};
</script>

<style scoped lang='less'>
.index{
  min-width: 1000px;
  .imgs{
  width: 100%;
  height: 100%;
}
}


</style>