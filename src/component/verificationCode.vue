<template>
  <div class="verificationCode">
    <div class="main">
      <p class="head">
        <i class="iconfont icon-cuowu" @click="closeFun"></i>
      </p>
      <p class="title">请确认信息</p>
      <div class="tel-staic" v-if="showTxt">
        <span class="txt">{{ txt }}</span>
        <i class="iconfont icon-xiugai1" @click="editFun()"></i>
      </div>
      <div class="tel-input" v-else>
        <input class="input" type="number" v-model="telInput" />
        <i class="iconfont icon-chenggong" @click="confirmFun()"></i>
      </div>
      <div class="code-con">
        <input
          class="input"
          type="number"
          v-model="code"
          placeholder="请输入短信验证码"
        />
        <span
          class="tips"
          :class="{ active: countDown < 1 }"
          @click="againFun()"
          >重新获取({{ countDown }})</span
        >
      </div>
      <div class="question">
        <span @click="showExplainFun()">收不到验证码</span>
      </div>
      <div class="btn animation" @click="login()">
        立即拿钱
      </div>
    </div>
    <div class="bg" @click="closeFun"></div>
    <explain v-if="showExplain" @emitExplain="eventExplain"></explain>
  </div>
</template>
<script>
import explain from "@/component/explain";
export default {
  components: {
    explain
  },
  props: {
    tel: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      toName: "download",
      showTxt: true,
      txt: "",
      telInput: "",
      code: "",
      countDown: 60,
      showExplain: false
    };
  },
  created() {
    this.showTxt = true;
    this.txt = this.tel;
    this.telInput = this.tel;
    this.getVerification();
  },
  methods: {
    async getVerification() {
      let data = {
        majia: this.$majia,
        mobile: this.txt,
        authCodeType: 1
      };
      let res = await this.$ajax.get("/api/user/getAuthCode", {
        params: data
      });
      if (res && res.data) {
        if (res.data.status == 0) {
          this.$toast(res.data.msg);
          this.countDown = 60;
          let tim = setInterval(() => {
            this.countDown--;
            if (this.countDown < 1) {
              this.code = "";
              clearInterval(tim);
            }
          }, 1000);
        } else {
          this.$toast(res.data.msg);
        }
      }
    },
    async login() {
      let data = {
        authCode: this.code,
        mobile: this.txt,
        channelNo: this.$channelNo,
        majia: this.$majia
      };
      let res = await this.$ajax.get("/api/user/loginByAuthCode", {
        params: data
      });
      if (res && res.data) {
        if (res.data.status == 0) {
          this.$router.push({ name: this.toName });
        } else {
          this.$toast(res.data.msg);
        }
      }
    },
    againFun() {
      if (this.countDown < 1) {
        this.getVerification();
      }
    },
    editFun() {
      this.showTxt = false;
    },
    confirmFun() {
      if (this.telInput.trim().length < 11) {
        this.$toast("手机号不正确");
        return;
      }
      this.showTxt = true;
      this.txt = this.telInput;
      this.getVerification();
    },
    showExplainFun() {
      this.showExplain = true;
    },
    eventExplain() {
      this.showExplain = false;
    },
    closeFun() {
      this.$emit("emitVerificationCode");
    }
  },
  watch: {
    code(val) {
      if (val.trim().length == 6) {
        this.login();
      }
    }
  }
};
</script>
<style lang="less" scoped>
@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
.verificationCode {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .main {
    width: 85%;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 6;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1;
    .head {
      text-align: left;
      .iconfont {
        font-size: 14px;
      }
    }
    .title {
      font-size: 16px;
      color: #444;
      margin-bottom: 15px;
    }
    .tel-staic {
      .txt {
        color: #404040;
        font-size: 28px;
        margin-right: 10px;
      }
      .iconfont {
        font-size: 20px;
        color: #b1aeb0;
      }
    }
    .tel-input {
      .input {
        width: 176px;
        color: #404040;
        font-size: 28px;
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none;
      }
      .iconfont {
        font-size: 22px;
        color: #b1aeb0;
      }
    }
    .code-con {
      margin-top: 50px;
      margin-bottom: 35px;
      border: 1px solid #e0e0e0;
      height: 46px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .input {
        width: 136px;
        border: none;
        outline: none;
        font-size: 15px;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #b1aeb0;
      }
      .tips {
        color: #b1aeb0;
        font-size: 16px;
        padding-left: 10px;
        border-left: 1px solid #e0e0e0;
      }
      .tips.active {
        color: #ff9333;
      }
    }
    .question {
      text-align: right;
      margin-bottom: 5px;
      span {
        color: #4aa4f8;
        font-size: 12px;
        margin-right: 20px;
      }
    }
    .btn {
      width: 90%;
      height: 50px;
      line-height: 38px;
      color: #fff;
      text-align: center;
      margin: 0 auto 30px;
      background: url("../assets/images/registeredNew/btn-bg.png");
      background-repeat: no-repeat;
      background-size: contain;
    }
    .animation {
      animation: zoom 1s ease 0s infinite alternate;
    }
  }
  .bg {
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.5;
  }
}
</style>
