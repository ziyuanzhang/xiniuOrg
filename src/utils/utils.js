let utls = {
  isAndroid: () => {
    // if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    //   this.isAndroid = false;
    // } else {
    //   this.isAndroid = true;
    // }
    let u = navigator.userAgent;
    if (u.indexOf("Android") > -1 || u.indexOf("Adr") > -1) {
      return true;
    } else {
      return false;
    }
  },
  GetUrlParam: paraName => {
    let url = document.location.toString();
    let arrObj = url.split("?");

    if (arrObj.length > 1) {
      let arrPara = arrObj[1].split("&");
      let arr;

      for (let i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");

        if (arr != null && arr[0] == paraName) {
          return arr[1];
        }
      }
      return "";
    } else {
      return "";
    }
  }
};

export default utls;
