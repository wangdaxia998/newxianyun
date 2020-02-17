<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{orderData.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      orderData: "",
      istime: ""
    };
  },
  mounted() {
    const { id } = this.$route.query;
    setTimeout(() => {
      this.$axios({
        url: `/airorders/${id}`,
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res);
        const { price, payInfo } = res.data;
        this.orderData = res.data;
        const stage = document.getElementById("qrcode-stage");
        QRCode.toCanvas(stage, payInfo.code_url, {
          width: 200
        });
        this.istime = setInterval(() => {
          this.ispay();
        }, 3000);
      });
    }, 200);
  },
  // 离开当前组件时触发销毁
  destroyed() {
    clearInterval(this.istime);
  },
  methods: {
    ispay() {
      const { id, price, orderNo } = this.orderData;
      this.$axios({
        url: "/airorders/checkpay",
        method: "POST",
        data: {
          id,
          nonce_str: price,
          out_trade_no: orderNo
        },
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        if (res.data.statusTxt == "支付完成") {
          clearInterval(this.istime);
          this.$alert("支付成功", "提示", {
            type: "success",
            confirmButtonText: "确定"
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>