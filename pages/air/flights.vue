<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="copyflights" @flightslist="flightslist" />

        <!-- 航班头部布局 -->
        <FlightsHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in datalist" :key="index" :data="item" />
        <div v-show="isshow" class="shuju">
          <span class="el-icon-warning"></span>非常抱歉,没有找到相关结果,请修改筛选条件.
        </div>
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
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsAside from "@/components/air/flightsAside.vue";
import FlightsHead from "@/components/air/flightsHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
export default {
  computed: {
    datalist() {
      if (!this.flightsData.flights) {
        return [];
      }
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  },
  // watch: {
  // $route(){
  //   this.pageIndex = 1
  //   this.getData()
  //  }
  // },
  beforeRouteUpdate(to, from, next) {
    this.pageIndex = 1;
    next();
    this.getData();
  },
  components: {
    FlightsHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      isshow: false,
      flightsData: {
        info: {},
        flights: [],
        options: {}
      },
      copyflights: {
        info: {},
        flights: [],
        options: {}
      },
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        if (res.data.flights.length <= 0) {
          this.$confirm("查无该城市航班,点击确定返回", "提示", {
            type: "warning",
            confirmButtonText: "确定",
            showCancelButton: false,
            beforeClose: (action, instance, done) => {
              if (action === "confirm") {
                this.$router.push("/air");
                done();
              }
            }
          });
        }
        console.log(res);
        this.flightsData = res.data;
        this.copyflights = { ...res.data };
        this.total = res.data.total;
      });
    },
    //切换条数时触发的事件
    handleSizeChange(index) {
      console.log(index);
      this.pageSize = index;
    },
    //切换页数时触发的事件
    handleCurrentChange(index) {
      console.log(index);
      this.pageIndex = index;
    },
    flightslist(data) {
      this.flightsData.flights = data;
      this.total = data.length;
      if (data.length === 0) {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
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
.shuju {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  background-color: #ffffde;
}
.el-icon-warning {
  margin-right: 10px;
  font-size: 24px;
  color: #ffa41c;
}
</style>