<template>
  <div id="app">
    <div class="header">
      <h2>YY志愿者联盟追踪器</h2>
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
        yynumber: "3594511" //  追踪YY号
      }
    };
  },
  created() {},
  methods: {
    searchpd: function() {
      this.axios({
        url: process.env.API_HOST + "/mobileweb/u/" + this.form.yynumber, // 请求地址
        method: "get", //  请求方法
        responseType: "json", // 返回值类型
        header: {
          "Access-Control-Allow-Origin": "https://mobi.yy.com/"
        }
      })
        .then(res => {
          let yyuserinfo = res.data;
          // 获取script标签内的内容
          let reg = /<script[^>]*>([^<]|<(?!\/script))*<\/script>/gim;
          let aa = yyuserinfo.match(reg);

          console.log(aa);
          //   console.log(yyuserinfo); //  请求成功
        })
        .catch(error => {
          console.log(error); // 请求失败
          this.$message({
            showClose: true,
            message: "很抱歉，查询失败，请自行填写！",
            type: "error"
          });
        });
    }
  }
};
</script>
