<template>
  <div id="app">
    <div class="header">
      <h2>废弃</h2>
    </div>
    <div class="formdiv">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="demo-input-suffix">
          <div class="formp">追踪YY号</div>
          <div class="block">
            <!-- <el-input placeholder="请输入追踪YY号" v-model="form.yynumber" clearable>
              </el-input> -->
            <el-input
              placeholder="请输入追踪YY号"
              v-model="form.yynumber"
              clearable
              @blur="searchpd"
            >
            </el-input>
          </div>
        </div>
        <div class="createBtn">
          <el-button type="primary" @click="onSubmit">立即追踪</el-button>
        </div>
        <div class="yyinfodiv">
          <div>YY昵称：{{ yyname }}</div>
          <div>YY签名：{{ sign }}</div>
          <div>直播间号：{{ roomId }}</div>
          <div>直播间短位：{{ shortRoomId }}</div>
          <div>当前置顶：{{ topCid }}</div>
          <div>当前位置：{{ subCid }}</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      form: {
        yynumber: "" //  追踪YY号
      },
      yyinfo: "",
      yyname: "",
      roomId: "",
      shortRoomId: "",
      sign: "",
      subCid: "",
      topCid: ""
    };
  },
  created() {},
  methods: {
    searchpd: function() {},
    onSubmit: function() {
      this.axios({
        url: process.env.API_HOST + "/mobileweb/u/" + this.form.yynumber, // 请求地址
        method: "get", //  请求方法
        responseType: "json", // 返回值类型
        header: {
          "Access-Control-Allow-Origin": "https://mobi.yy.com/"
        }
      })
        .then(res => {
          let resdata = res.data;
          // 获取script标签内的内容
          let reg = /<script[^>]*>([^<]|<(?!\/script))*<\/script>/gim;
          let aa = resdata.match(reg);
          // 如果具有script标签
          if (aa != null) {
            aa.forEach(ele => {
              let startIndex = ele.indexOf(">");
              let endIndex = ele.lastIndexOf("<");
              ele = ele.slice(startIndex + 1, endIndex);
              if (ele.indexOf("anchorInfo") != -1) {
                console.log(ele); //每一段script标签的内容
                let reg2 = /anchorInfo:([\s\S]*?)}/g;
                let bb = ele.match(reg2);
                var cc = bb.toString().replace(/anchorInfo:/g, "");
                let testJson = eval("(" + cc + ")");
                this.yyinfo = testJson;
                console.log(testJson);
                this.yyname = testJson.nick;
                this.roomId = testJson.roomId;
                this.shortRoomId = testJson.shortRoomId;
                this.sign = testJson.sign;

                this.axios({
                  url:
                    process.env.API_HOST +
                    "/mobileweb/profile/checkUidOnline?uid=" +
                    this.yyinfo.uid, // 请求地址
                  method: "get", //  请求方法
                  responseType: "json", // 返回值类型
                  header: {
                    "Access-Control-Allow-Origin": "https://mobi.yy.com/"
                  }
                })
                  .then(res => {
                    let resdata = res.data;
                    this.subCid = resdata.data.subCid;
                    this.topCid = resdata.data.topCid;
                    console.log(resdata);
                  })
                  .catch(error => {
                    console.log(error); // 请求失败
                    this.$message({
                      showClose: true,
                      message: "很抱歉，查询出错！",
                      type: "error"
                    });
                  });
              }
            });
          }

          // console.log(aa);
          //   console.log(yyuserinfo); //  请求成功
        })
        .catch(error => {
          console.log(error); // 请求失败
          this.$message({
            showClose: true,
            message: "很抱歉，查询出错！",
            type: "error"
          });
        });
    }
  }
};
</script>
