<template>
  <div class="registerComplete">
    <img class="img" src="../assets/images/tips/icon.png" alt="" />
    <div class="txt">恭喜您已经注册成功！</div>
    <div class="txt">客服会在24小时内与您联系</div>
    <div class="tips">特别提醒</div>
    <div class="tips2">
      平台承诺不会向用户收入任何费用，放款前收取任何费用都属于欺诈行为，请拒绝付费或联系客服进行投诉。
    </div>
    <div class="btn" @click="closeFun()">确 定</div>
  </div>
</template>
<script>
export default {
  methods: {
    closeFun() {
      window.location.href = "about:blank";
      window.close();
    }
  }
};
</script>
<style lang="less" scoped>
.registerComplete {
  font-size: 0px;
  padding: 0 30px;
  box-sizing: border-box;
  text-align: center;
  .img {
    width: 40%;
    margin: 60px auto 0;
  }
  .txt {
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin-bottom: 5px;
  }
  .tips {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #a8a8a8;
    line-height: 1.5;
  }
  .tips2 {
    text-align: left;
    font-size: 16px;
    color: #a8a8a8;
    line-height: 1.5;
  }
  .btn {
    margin-top: 40px;
    font-size: 16px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #fff;
    border-radius: 5px;
    background-color: #e33858;
  }
}
</style>
