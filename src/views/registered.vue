<template>
  <div class="registered">
    <img class="logo" src="../assets/images/registered/logo.jpg" alt="" />
    <img class="step" src="../assets/images/registered/step.jpg" alt="" />
    <div class="registered-con">
      <div class="container">
        <div class="tip">
          <span class="square"></span>
          <span class="txt">请输入手机号立即申请</span>
        </div>
        <div class="mobile-con">
          <img
            class="mobile-img"
            src="../assets/images/registered/mobile.png"
            alt=""
          />
          <input
            class="tel"
            type="number"
            v-model="tel"
            placeholder="请输入你的手机号"
          />
        </div>
        <div class="verification-con" v-if="countDown > 0">
          <input
            class="verification"
            type="text"
            v-model="verification"
            placeholder="请输入验证码"
          />
          <div class="countDown-btn">{{ countDown }}S</div>
        </div>
        <div class="btn" @click="checkFun()">立即领取额度</div>
        <div class="prompt">
          <span class="icon-con" @click="agreeFun()">
            <img
              v-if="isAgree"
              class="right"
              src="../assets/images/registered/right.png"
              alt=""
            />
            <i class="air" v-else></i>
          </span>
          <div class="txt">
            点击“测测你能借多少”按钮即同意<span class="red">
              <a class="red" href="http://boss.cj713.cn:83/register.html"
                >《注册协议》</a
              >
              <a class="red" href="http://boss.cj713.cn:83/privacy.html">
                《犀牛分期隐私政策》</a
              >
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="switch">
      <img
        class="switch-img"
        src="../assets/images/registered/switch-bg.jpg"
        alt=""
      />
      <div class="content">
        <div class="item" v-for="(item, index) in selectedList" :key="index">
          <img
            class="headimg"
            :src="require(`../assets/images/registered/${item.img}.jpg`)"
            alt=""
          />
          <div class="right">
            <div class="top">
              <span class="tel">{{ item.tel }}</span>
              <div class="tips tips1" v-if="item.type == '1'">已申请</div>
              <div class="tips tips2" v-else>已放款</div>
            </div>
            <div class="bottom">{{ item.txt }}</div>
          </div>
        </div>
      </div>
    </div>

    <img class="reason" src="../assets/images/registered/reason.jpg" alt="" />
    <img class="footer" src="../assets/images/registered/footer.jpg" alt="" />
    <div class="toast" v-if="tips.length > 0">{{ tips }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tips: "",
      clientType: "",
      countDown: -1,
      tel: "",
      verification: "",
      list: [
        {
          img: "head1",
          tel: "136****8889",
          txt: "现在这样的平台太多了，这个是我用过最放心的，赞~~",
          type: "1" //1：已申请,2已放款
        },
        {
          img: "head2",
          tel: "189****1689",
          txt: "一点都不高！我借了18000，每月才还260元。",
          type: "2" //1：已申请,2已放款
        },
        {
          img: "head3",
          tel: "158****8662",
          txt: "是个大平台、我的不用面审，服务到位",
          type: "1" //1：已申请,2已放款
        },
        {
          img: "head4",
          tel: "189****1689",
          txt: "填了表就批了，你说呢？",
          type: "2" //1：已申请,2已放款
        },
        {
          img: "head5",
          tel: "158****8662",
          txt: "借款成功6000，听朋友安利这个软件，下载试试",
          type: "1" //1：已申请,2已放款
        },
        {
          img: "head6",
          tel: "189****1689",
          txt: "终于下款了，20000大元，终于下款了，20000大元！",
          type: "2" //1：已申请,2已放款
        },
        {
          img: "head7",
          tel: "152****6631",
          txt:
            "额度5000~申请5000~~一次性发放秒到，报着试试看态度搞的，今晚喝酒!",
          type: "1" //1：已申请,2已放款
        },
        {
          img: "head8",
          tel: "189****5264",
          txt: "在这贷款，最不怕的就是利息高",
          type: "1" //1：已申请,2已放款
        },
        {
          img: "head9",
          tel: "153****7562",
          txt: "门槛特别低，像我这样的新手小白也能正确使用，完美~",
          type: "1" //1：已申请,2已放款
        },
        {
          img: "head10",
          tel: "183****8222",
          txt: "步骤很少，在手机上几分钟就搞定了",
          type: "1" //1：已申请,2已放款
        }
      ],
      selectedList: [],
      isAgree: true,
      count: 0
    };
  },
  async created() {
    let data = {
      channelNo: "test",
      clientType: this.$clientType
    };
    let res = await this.$ajax.get("/ad/browserCount", { params: data });
    if (res && res.data && res.data.msg == "success") {
      console.log("埋点：", res);
    }
  },
  mounted() {
    setInterval(() => {
      if (this.count == 0) {
        this.count = 3;
      } else if (this.count == 3) {
        this.count = 6;
      } else if (this.count == 6) {
        this.count = 0;
      }
      this.selectedList = this.list.slice(this.count, this.count + 3);
    }, 1000);
  },
  methods: {
    agreeFun() {
      this.isAgree = !this.isAgree;
    },
    async checkFun() {
      if (!this.isAgree) {
        this.tips = "请先同意协议";
        return;
      }
      if (this.tel.trim().length == 0) {
        this.tips = "请输入手机号";
        return;
      }
      if (this.tel.trim().length < 11) {
        this.tips = "手机号不正确";
        return;
      }
      if (this.verification.length > 0) {
        this.login();
      } else {
        let data = {
          mobile: this.tel,
          clientType: this.$clientType
        };
        let res = await this.$ajax.get("/api/common/checkUser", {
          params: data
        });
        if (res && res.data && res.data.data == 1) {
          this.$router.push({ name: "download" });
        } else {
          this.getVerification();
        }
      }
    },
    async getVerification() {
      let data = {
        majia: "xiniufenqi",
        mobile: this.tel,
        authCodeType: 1
      };
      let res = await this.$ajax.get("/api/user/getAuthCode", {
        params: data
      });
      if (res && res.data) {
        if (res.data.status == 0) {
          this.countDown = 60;
          let tim = setInterval(() => {
            this.countDown--;
            if (this.countDown < 0) {
              this.verification = "";
              clearInterval(tim);
            }
          }, 1000);
        } else {
          this.tips = res.data.msg;
        }
      }
    },
    async login() {
      let data = {
        authCode: this.verification,
        mobile: this.tel,
        channelNo: "test",
        majia: "xiniufenqi"
      };
      let res = await this.$ajax.get("/api/user/loginByAuthCode", {
        params: data
      });
      if (res && res.data) {
        if (res.data.status == 0) {
          this.$router.push({ name: "download" });
        } else {
          this.tips = res.data.msg;
        }
      }
    }
  },
  watch: {
    tips() {
      if (this.tips.length > 0) {
        let setT = setTimeout(() => {
          this.tips = "";
          clearTimeout(setT);
        }, 2000);
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
.registered {
  width: 100vw;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  font-size: 0;
  background-color: #1b1b1b;

  .logo {
    width: 100%;
  }
  .step {
    //margin-top: -5px;
    width: 100%;
  }
  .registered-con {
    //margin-top: -5px;
    width: 100%;
    background-image: url("../assets/images/registered/registered-bg.jpg");
    .container {
      margin: 0 auto;
      padding: 20px 20px;
      box-sizing: border-box;
      width: calc(~"100% - 30px");
      background-color: #fff;
      border-radius: 10px;
      .tip {
        display: flex;
        align-items: center;
        .square {
          width: 4px;
          height: 16px;
          border-radius: 15px;
          background-color: #21f6f3;
          margin-right: 8px;
        }
        .txt {
          font-size: 13px;
          color: #737373;
        }
      }
      .mobile-con {
        overflow: hidden;
        margin-top: 15px;
        width: 100%;
        height: 58px;
        border-radius: 10px;
        background-color: #e6e6e6;
        display: flex;
        align-items: center;
        .mobile-img {
          height: 20px;
          margin-left: 80px;
          margin-right: 20px;
        }
        .tel {
          flex: 1;
          color: #737373;
          margin-right: 40px;
          height: 20px;
          font-size: 15px;
          background-color: transparent;
          border-width: 0px;
        }
      }
      .verification-con {
        margin-top: 10px;
        font-size: 14px;
        display: flex;
        align-items: center;
        .verification {
          flex: 1;
          height: 50px;
          border: none;
          outline: none;
          border-radius: 10px;
          background-color: #e6e6e6;
          color: #737373;
          margin-right: 20px;
          padding: 0 10px;
          box-sizing: border-box;
        }
        .countDown-btn {
          width: 60px;
          height: 50px;
          line-height: 50px;
          border-radius: 10px;
          color: #fff;
          background-color: #f24b5f;
        }
      }
      .btn {
        font-size: 18px;
        margin-top: 15px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-weight: bold;
        letter-spacing: 1px;
        margin-bottom: 20px;
        background: url("../assets/images/registered/btn.png");
        background-size: 100% 100%;
        animation: zoom 1s ease 0s infinite alternate;
      }
      .prompt {
        display: flex;
        align-items: flex-start;
        .icon-con {
          margin-top: 2px;
          margin-right: 15px;
          .air {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 1px solid #aaa;
            border-radius: 100px;
            box-sizing: border-box;
          }
          .right {
            width: 13px;
          }
        }
        .txt {
          font-size: 14px;
          color: #666;
          text-align: left;
          .red,
          .red:active,
          red:focus {
            color: #e7344a !important;
          }
        }
      }
    }
  }

  .switch {
    position: relative;
    .switch-img {
      width: 100%;
    }
    .content {
      width: 78%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -38%);
      .item {
        border-bottom: 1px solid #747474;
        padding: 10px 0 10px 0;
        display: flex;
        align-items: center;
        .headimg {
          width: 44px;
          height: 44px;
          margin-right: 15px;
          border-radius: 100px;
        }
        .right {
          .top {
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            .tel {
              color: #21ecea;
              font-size: 14px;
              margin-right: 8px;
            }

            .tips1 {
              color: #ff9000;
              background: url("../assets/images/registered/already_apply.png");
            }
            .tips2 {
              color: #63bd5c;
              background: url("../assets/images/registered/already_loan.png");
            }
            .tips {
              width: 78px;
              height: 20px;
              line-height: 16px;
              background-size: 100% 100%;
              font-size: 10px;
              background-repeat: no-repeat;
            }
          }
          .bottom {
            color: #fff;
            font-size: 12px;
            text-align: left;
          }
        }
      }
      .item:last-of-type {
        border-bottom: none;
      }
    }
  }
  .reason {
    //margin-top: -5px;
    width: 100%;
  }
  .footer {
    //margin-top: -5px;
    width: 100%;
  }
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9;
    transform: translate(-50%, -50%);
    color: #fff;
    min-width: 150px;
    padding: 10px 5px;
    border-radius: 10px;
    background-color: #000;
    opacity: 0.8;
    font-size: 14px;
  }
}
</style>
