<template>
  <div class="download">
    <img class="top1" src="../assets/images/download/top.jpg" alt="" />

    <div class="gif"></div>
    <img class="success" src="../assets/images/download/success.jpg" alt="" />

    <!-- <img class="top" src="../assets/images/download/top2.png" alt="" />
    <div class="gif"></div> -->

    <img class="tips" src="../assets/images/download/tips.png" alt="" />
    <img class="step step1" src="../assets/images/download/step1.jpg" alt="" />
    <img class="step step2" src="../assets/images/download/step2.jpg" alt="" />
    <img class="step step3" src="../assets/images/download/step3.jpg" alt="" />
    <img class="step step4" src="../assets/images/download/step4.jpg" alt="" />
    <div class="bottom">
      <a class="link" :href="androidUrl" v-if="isAndroid"> </a>
      <a class="link" v-else :href="iosUrl"></a>
      <img
        class="btn"
        src="../assets/images/download/download-btn.png"
        alt=""
      />
    </div>
    <div class="toast" v-if="showToast">额度已到账可极速提现！2S后跳转下载</div>
  </div>
</template>

<script>
import utls from "../utils/utils.js";
export default {
  data() {
    return {
      isAndroid: true,
      androidUrl:
        "https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/jiguang.apk",
      iosUrl:
        "itms-services://?action=download-manifest&url=https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/manifest_jiguang.plist",
      showToast: false
    };
  },
  async created() {
    let data = {
      channelNo: this.$channelNo,
      clientType: this.$clientType
    };
    let res = await this.$ajax.get("/ad/browserCount", { params: data });
    if (res && res.data && res.data.msg == "success") {
      console.log("埋点：", res);
    }

    this.isAndroid = utls.isAndroid();
    if (utls.isAndroid()) {
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
      window.location.href = this.androidUrl;
    } else {
      window.location.href = this.iosUrl;
    }
  }
};
</script>

<style lang="less" scoped>
.download {
  width: 100vw;
  font-size: 0px;
  text-align: center;
  background-color: #fff;
  padding-bottom: 110px;
  .top1,
  .success,
  .dian {
    width: 100%;
  }
  .gif {
    width: 100%;
    height: 60px;
    // .gif {
    //   margin: -70px auto -50px;
    //   width: 40%;
    // }
    background-image: url("../assets/images/download/gif.gif");
    background-position: 50% 55%;
    background-size: 50%;
    background-repeat: no-repeat;
  }

  .tips {
    width: 80%;
  }
  .step {
    width: 100%;
    //margin-bottom: -5px;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100vw;
    height: 110px;
    overflow: hidden;
    background-image: url("../assets/images/download/footer.jpg");
    background-size: auto 100%;
    text-align: center;
    .tips {
      color: #fff;
    }
    .link {
      position: absolute;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      width: 318px;
      height: 50px;
      border-radius: 50px;
    }
    .btn {
      margin-top: 40px;
      height: 50px;
    }
  }
  .toast {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    max-width: 90%;
    padding: 10px;
    box-sizing: border-box;
    //background-color: #b4b2b5;
    background-color: #000;
    opacity: 0.6;
    color: #fff;
    white-space: nowrap;
    font-size: 18px;
    border-radius: 10px;
  }
}
</style>
