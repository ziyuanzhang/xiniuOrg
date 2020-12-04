<template>
  <div class="download">
    <img class="top" src="../assets/images/download/top2.png" alt="" />
    <div class="gif"></div>

    <img class="tips" src="../assets/images/download/tips.png" alt="" />
    <img class="step step1" src="../assets/images/download/step1.jpg" alt="" />
    <img class="step step2" src="../assets/images/download/step2.jpg" alt="" />
    <img class="step step3" src="../assets/images/download/step3.jpg" alt="" />
    <img class="step step4" src="../assets/images/download/step4.jpg" alt="" />
    <div class="bottom">
      <a
        class="link"
        href="https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/jiguang.apk"
        v-if="isAndroid"
      >
      </a>
      <a
        class="link"
        v-else
        href="itms-services://?action=download-manifest&url=https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/manifest_jiguang.plist"
      ></a>
      <img
        class="btn"
        src="../assets/images/download/download-btn.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import utls from "../utils/utils.js";
export default {
  data() {
    return {
      isAndroid: true
    };
  },
  created() {
    this.isAndroid = utls.isAndroid();
    console.log(this.isAndroid);
    if (utls.isAndroid()) {
      window.location.href =
        "https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/jiguang.apk";
    } else {
      window.location.href =
        "itms-services://?action=download-manifest&url=https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/manifest_jiguang.plist";
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
  .top {
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
    //margin-bottom: -5px;
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
}
</style>
