<template>
  <div class="header">
    <el-row type="flex">
      <div class="img">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <el-row class="list" type="flex">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <el-row class="user" type="flex">
        <el-dropdown>
          <span class="el-dropdown-link xiaoxi">
            <i class="el-icon-bell"></i>
            消息
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <nuxt-link to="/user/login" class="loginto" v-if="!$store.state.user.userInfo.token">登录 / 注册</nuxt-link>
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" />
            {{$store.state.user.userInfo.user.nickname}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <!-- {{$store.state.user.user}} -->
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.header {
  width: 1000px;
  height: 60px;
  margin: 0 auto;
  .el-row {
    justify-content: space-between;
    align-items: center;
  }
  .img {
    width: 156px;
    height: 60px;
    img {
      width: 100%;
      padding-top: 8px;
    }
  }
  .list {
    flex: 1;
    margin: 0 20px;
    box-sizing: border-box;
    justify-content: flex-start;
    .nuxt-link-exact-active {
      color: #fff;
      background-color: #409eff;
      transition-duration: 500ms;
      &:hover {
        color: #fff;
      }
    }
    a {
      display: inline-block;
      height: 60px;
      font-size: 16px;
      line-height: 60px;
      padding: 0 20px;
      box-sizing: border-box;
      &:hover {
        color: #409eff;
        border-bottom: 5px solid #409eff;
      }
    }
  }
  .user {
    .xiaoxi {
      font-size: 14px;
    }
    .loginto {
      font-size: 14px;
      margin-left: 8px;
      color: #666;
      &:hover {
        color: #409eff;
        border-bottom: 1px solid #409eff;
      }
    }
  }
  .active {
    color: #fff;
    background-color: #409eff;
  }
}
.el-dropdown-link{
    img{
        width:36px;
        height:36px;
        border-radius: 50px;
        vertical-align: middle
    }
}
</style>