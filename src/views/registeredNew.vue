<template>
  <div class="registered">
    <div class="top-con">
      <div class="amount">
        {{ amount | format1 }}<span class="comma">,</span>{{ amount | format2 }}
      </div>
      <img class="top" src="../assets/images/registeredNew/1 (1).jpg" alt="" />
    </div>
    <img class="step" src="../assets/images/registeredNew/1 (2).jpg" alt="" />
    <div class="registered-top">
      <div class="tel-con">
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
    </div>
    <div class="registered-middle" v-if="countDown > -1">
      <input
        class="verification"
        type="text"
        v-model="verification"
        placeholder="请输入验证码"
      />
      <div class="countDown-btn">{{ countDown }}S</div>
    </div>
    <div class="registered-bottom">
      <img
        class="btn"
        :class="{ active: !isTime }"
        @click="checkFun()"
        src="../assets/images/registeredNew/btn.png"
        alt=""
      />
      <div class="prompt">
        <span class="icon-con" @click="agreeFun()">
          <img
            v-if="isAgree"
            class="left"
            src="../assets/images/registeredNew/dui.png"
            alt=""
          />
          <i class="air" v-else></i>
        </span>
        <div class="txt">
          点击“立即领取额度”按钮即同意<span class="red">
            <a class="red" href="http://gdzlwlkj.cn:83/register.html"
              >《注册协议》</a
            >
            <a class="red" href="http://gdzlwlkj.cn:83/privacy.html">
              《犀牛分期隐私政策》</a
            >
          </span>
        </div>
      </div>
    </div>

    <div class="switch" v-if="true">
      <img
        class="switch-img"
        src="../assets/images/registeredNew/1 (5).png"
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
              <div class="tips tips1" v-if="item.type == '1'"></div>
              <div class="tips tips2" v-else></div>
            </div>
            <div class="bottom">{{ item.txt }}</div>
          </div>
        </div>
      </div>
    </div>

    <img class="reason" src="../assets/images/registeredNew/1 (6).jpg" alt="" />
    <div class="footer" v-if="true">
      <!-- <img class="img" src="../assets/images/registeredNew/1 (7).jpg" alt="" /> -->
      <div class="title">闽ICP备2020018285号</div>
      <div class="subtitle">理性借款，避免逾期</div>
      <div class="content">
        贷款有风险，借款需谨慎，请根据个人能力合理贷款；实际贷款额度因个人情况和资质而定，资金来源于银行等正规借款机构本平台为贷款信息平台不涉及贷款业务。
      </div>
    </div>
    <div class="footer2" v-if="false">
      <div class="item">广州正梁网络科技有限公司</div>
      <div class="item">粤ICP备20044831号-1</div>
      <div class="item">年利率不超过36%</div>
      <div class="item">贷款资金由哈尔滨市龙商小额贷款有限责任公司提供</div>
      <div class="item">放款额度及放款时间以机构审批结果为准</div>
      <div class="item">投资有风险，贷款需谨慎</div>
      <div class="content">
        郑重声明：平台只提供贷款咨询服务，放款由银行或金融机构进行，所有贷款申请在未成功贷款前绝不收取任何费用，为了保证您的资金安全，请不要相信任何要求您支付费用的信息、邮件、电话等不实信息。
      </div>
    </div>
    <div class="toast" v-if="tips.length > 0">{{ tips }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toName: "download",
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
      count: 0,
      amount: 100000,
      isTime: true
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
    let amount = setInterval(() => {
      if (this.amount < 200000) {
        this.amount += 625;
      } else {
        this.isTime = false;
        clearInterval(amount);
      }
    }, 0);
  },
  methods: {
    agreeFun() {
      this.isAgree = !this.isAgree;
    },
    async checkFun() {
      // this.$router.push({ name: this.toName });
      // return false;
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
          this.$router.push({ name: this.toName });
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
        channelNo: this.$channelNo,
        majia: "xiniufenqi"
      };
      let res = await this.$ajax.get("/api/user/loginByAuthCode", {
        params: data
      });
      if (res && res.data) {
        if (res.data.status == 0) {
          this.$router.push({ name: this.toName });
        } else {
          this.tips = res.data.msg;
        }
      }
    }
  },
  filters: {
    format1(val) {
      val = val + "";
      return val.slice(0, 3);
    },
    format2(val) {
      val = val + "";
      return val.slice(3);
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
  background-color: #fff;
  .top-con {
    position: relative;
    .top {
      width: 100%;
    }
    .amount {
      position: absolute;
      left: 50%;
      top: 54.5%;
      transform: translateX(-50%);
      font-size: 54px;
      color: #e33858;
      font-weight: bold;
      white-space: nowrap;
      .comma {
        position: relative;
        top: -10px;
        //  margin: 0 -13px;
      }
    }
  }

  .step {
    //margin-top: -5px;
    width: 100%;
  }
  .registered-top {
    width: 100%;
    padding: 20px 50px 0px;
    box-sizing: border-box;
    background-image: url("../assets/images/registeredNew/1 (3).jpg");
    background-size: 100%;
    background-repeat: no-repeat;

    .tel-con {
      width: 100%;
      height: 60px;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      .mobile-img {
        top: 45px;
        left: 50%;
        width: 15px;
      }
      .tel {
        font-size: 16px;
        padding-left: 13px;
        height: 20px;
        border: none;
        outline: none;
      }
    }
  }
  .registered-middle {
    width: 100%;
    background-image: url("../assets/images/registeredNew/line.jpg");
    background-size: 100%;
    padding: 10px 50px;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    .verification {
      min-width: 0;
      flex: 1;
      height: 50px;
      border: none;
      outline: none;
      border-radius: 10px;
      background-color: #fff;
      color: #737373;
      margin-right: 20px;
      padding: 0 10px;
      box-sizing: border-box;
      font-size: 16px;
    }
    .countDown-btn {
      width: 60px;
      height: 50px;
      line-height: 50px;
      border-radius: 10px;
      color: #fff;
      background-color: #f24b5f;
      font-size: 16px;
    }
  }
  .registered-bottom {
    width: 100%;
    padding: 15px 20px 0;
    box-sizing: border-box;
    background-image: url("../assets/images/registeredNew/1 (4).jpg");
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;

    .btn {
      // position: absolute;
      // top: -40px;
      // left: 50%;
      // margin-left: -38%;
      width: 90%;
    }
    .active {
      animation: zoom 1s ease 0s infinite alternate;
    }
    .prompt {
      padding: 70px 20px 30px;
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
        .left {
          width: 16px;
        }
      }
      .txt {
        font-size: 14px;
        color: #dddbdb;
        text-align: left;
        .red,
        .red:active,
        red:focus {
          color: #d6cd9d !important;
        }
      }
    }
    @media screen and (min-width: 376px) {
      .prompt {
        padding: 70px 20px 40px;
      }
    }
  }

  .switch {
    margin-top: -28px;
    margin-bottom: 10px;
    position: relative;
    .switch-img {
      width: 100%;
    }
    .content {
      width: 78%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -31%);
      .item {
        border-bottom: 1px solid #f7f4f0;
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
              color: #e33858;
              font-size: 14px;
              margin-right: 8px;
            }

            .tips1 {
              background: url("../assets/images/registeredNew/apply.jpg");
            }
            .tips2 {
              background: url("../assets/images/registeredNew/loan.jpg");
            }
            .tips {
              width: 45px;
              height: 18px;
              background-repeat: no-repeat;
              background-size: cover;
            }
          }
          .bottom {
            color: #727171;
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
    background-image: url("../assets/images/registeredNew/footer-bg.jpg");
    background-repeat: repeat-x;
    background-color: #f8f8f8;
    width: 100%;
    padding: 30px 17px 20px;
    box-sizing: border-box;
    .title {
      font-size: 12px;
      color: #787878;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .subtitle {
      font-size: 15px;
      color: #787878;
      margin-bottom: 10px;
    }
    .content {
      font-size: 12px;
      color: #787878;
    }
  }
  .footer2 {
    color: #9f9f9f;
    font-size: 14px;
    line-height: 1.5;
    background-image: url("../assets/images/registeredNew/footer-bg.jpg");
    background-repeat: repeat-x;
    background-color: #f8f8f8;
    width: 100%;
    padding: 30px 17px 20px;
    box-sizing: border-box;
    .item {
      text-align: center;
    }
    .content {
      font-size: 12px;
      //text-indent: 2em;
      text-align: left;
    }
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
