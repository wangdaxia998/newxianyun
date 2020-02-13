<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in airplaneSize"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
      <span>{{multiple}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小,
      //机型大小
      airplaneSize: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  computed: {
    multiple() {
      const newData = this.data.flights.filter(v => {
        let valid = true;
        
        if (this.company && v.airline_name !== this.company) {
          valid = false;
        }
        if (this.airSize && v.plane_size !== this.airSize) {
          valid = false;
        }
        if (this.airport && v.org_airport_name !== this.airport) {
          valid = false;
        }
        if (this.flightTimes) {
          const arr = this.flightTimes.split(",");
          const hours = +v.dep_time.split(":")[0];
          if (+arr[0] > hours || hours >= +arr[1]) {
            valid = false;
          }
        }
        
        return valid;
      });
      this.$emit("flightslist", newData);
      return "";
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      //   const newData = this.data.flights.filter(v => {
      //     return v.org_airport_name === value;
      //   });
      //   this.$emit("flightslist", newData);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      //   const arr = value.split(",");
      //   const newData = this.data.flights.filter(v => {
      //     const hours = +v.dep_time.split(":")[0];
      //     return +arr[0] <= hours && hours < +arr[1];
      //   });
      //   this.$emit("flightslist", newData);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      //   const newData = this.data.flights.filter(v => {
      //     return v.airline_name === value;
      //   });
      //   this.$emit("flightslist", newData);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      //   const newData = this.data.flights.filter(v => {
      //     return v.plane_size === value;
      //   });
      //   this.$emit("flightslist", newData);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport="", 
      this.flightTimes="", 
      this.company="",      
       this.airSize="" 
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>