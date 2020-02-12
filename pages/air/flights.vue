<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in datalist" :key="index" :data="item" />

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"    
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsHead from "@/components/air/flightsHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
export default {
  computed:{
    datalist (){
      if(!this.flightsData.flights){
        return []
      }
      const arr = this.flightsData.flights.slice(
        (
          this.pageIndex - 1) * this.pageSize,
          this.pageIndex * this.pageSize
        )
      return arr
    }
  },
  components: {
    FlightsHead,
    FlightsItem
  },
  data() {
    return {
      flightsData: [],
      pageIndex:1,
      pageSize:5,
      total:0
    };
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      if(res.data.flights.length <= 0){
        this.$confirm('查无该城市航班,点击确定返回','提示',{
          type:'warning',
          confirmButtonText: "确定",
          showCancelButton: false,
          beforeClose: (action, instance, done)=>{
            if(action === 'confirm'){
              this.$router.push('/air')
              done()
            }
          }
        })
      }
      console.log(res);
      this.flightsData = res.data;
      this.total = res.data.total
    });
  },
  methods:{
    //切换条数时触发的事件
    handleSizeChange(index){
      console.log(index);
      this.pageSize = index
    },
    //切换页数时触发的事件
    handleCurrentChange(index){
      console.log(index);
      this.pageIndex = index
      
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>