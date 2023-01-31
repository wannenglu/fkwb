<template>
  <div id="app">
    <div class="header">
      <h2>初心战队文本生成器</h2>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="常规文本" name="first">
        <div class="formdiv">
          <el-form ref="form" :model="form" label-width="80px">
            <div class="demo-input-suffix">
              <div class="formp">反馈时间：</div>
              <div class="block">
                <el-date-picker
                  v-model="form.fktime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy年MM月dd日"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="demo-input-suffix">
              <div class="formp">疑似违规YY号：</div>
              <div class="block">
                <!-- <el-input placeholder="请输入疑似违规YY号" v-model="form.yynumber" clearable>
              </el-input> -->
                <el-input
                  placeholder="请输入疑似违规YY号"
                  v-model="form.yynumber"
                  clearable
                  @blur="searchpd"
                >
                </el-input>
              </div>
            </div>
            <div class="demo-input-suffix">
              <div class="formp">其余YY号：</div>
              <div class="block">
                <el-input
                  placeholder="请输入其余YY号"
                  v-model="form.otheryynumber"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <div class="demo-input-suffix">
              <div class="formp">疑似违规频道号：</div>
              <div class="block">
                <el-input
                  placeholder="请输入疑似违规频道号"
                  v-model="form.pdnumber"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <div class="demo-input-suffix">
              <div class="formp">疑似违规描述：</div>
              <div class="block">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  placeholder="请输入疑似违规描述"
                  v-model="form.wgms"
                >
                </el-input>
              </div>
            </div>
            <div class="demo-input-suffix">
              <div class="formp">反馈人YY号：</div>
              <div class="block">
                <el-select
                  v-model="form.fkyynumber"
                  filterable
                  placeholder="请选择反馈人YY号"
                  clearable
                  @change="changeOption"
                >
                  <el-option
                    v-for="item in form.userdata"
                    :key="item.id"
                    :label="item.number"
                    :value="item.number"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="demo-input-suffix">
              <div class="formp">反馈人信息：</div>
              <div class="block">
                <el-select
                  v-model="form.fkyyvalue"
                  filterable
                  placeholder="请选择反馈人信息"
                  clearable
                  @change="changeOption2"
                >
                  <el-option
                    v-for="item in form.userdata"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <el-button type="primary" @click="onSubmit">立即生成</el-button>
            </div>

            <div class="wbmain">
              <div class="fkwbdiv">
                <div class="copy1">
                  <el-button type="primary" @click="copy1">复制</el-button>
                </div>
                <p class="fkwbp">反馈文本</p>
                <div class="block">
                  <el-input
                    id="fkwb"
                    type="textarea"
                    :autosize="{ minRows: 16 }"
                    placeholder=""
                    v-model="form.fkwb"
                  >
                  </el-input>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="疑问文本" name="second">
        <div class="formdiv">
          <el-form ref="form2" :model="form2" label-width="80px">
            <div class="demo-input-suffix">
              <div class="formp">反馈文本：</div>
              <div class="block">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 16 }"
                  placeholder="请粘贴反馈文本"
                  v-model="form2.cgwb"
                >
                </el-input>
              </div>
            </div>
            <div class="demo-input-suffix">
              <div class="formp">官方昵称：</div>
              <div class="block">
                <el-input
                  placeholder="请输入官方昵称"
                  v-model="form2.gfname"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <div class="demo-input-suffix">
              <div class="formp">官方处理结果：</div>
              <div class="block">
                <el-input
                  placeholder="请输入官方处理结果"
                  v-model="form2.gfcljg"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <div class="demo-input-suffix">
              <div class="formp">疑问点：</div>
              <div class="block">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  placeholder="请输入疑问点"
                  v-model="form2.ywd"
                >
                </el-input>
              </div>
            </div>
            <div>
              <el-button type="primary" @click="onSubmit2">立即生成</el-button>
            </div>
            <div class="wbmain">
              <div class="fkwbdiv">
                <div class="copy1">
                  <el-button type="primary" @click="copy2">复制</el-button>
                </div>
                <p class="fkwbp">疑问文本</p>
                <div class="block">
                  <el-input
                    id="fkwb2"
                    type="textarea"
                    :autosize="{ minRows: 16 }"
                    placeholder=""
                    v-model="form2.fkwb2"
                  >
                  </el-input>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="beian">
      <p>YY志愿者联盟-初心战队 © 版权所有</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      form: {
        yynumber: "", //  疑似违规YY号
        fktime: "", //  反馈时间
        otheryynumber: "", // 其余YY号
        pdnumber: "", //  疑似违规频道号
        wgms: "", //  疑似违规描述
        fkyynumber: "", //  反馈人YY号
        fkyyvalue: "", // 反馈人信息
        userdata: [], //  人员
        fkwb: "" //  反馈文本
      },
      activeName: "first",
      form2: {
        cgwb: "", //  反馈文本
        gfname: "", //  官方昵称
        gfcljg: "不处理", //  处理结果
        ywd: "", // 疑问点
        fkwb2: "" // 疑问反馈文本
      }
    };
  },
  created() {
    this.getjson();
    this.initDate();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getjson: function() {
      this.axios({
        url: "./static/user.json", //  请求地址
        method: "get", //  请求方法
        responseType: "json" // 返回值类型
      })
        .then(res => {
          this.form.userdata = res.data;
          console.log(res); //  请求成功
        })
        .catch(error => {
          console.log(error); // 请求失败
        });
    },
    // searchpd: function () {
    //   axios
    //     .get("https://mobi.yy.com/u/h5/profile/"+this.form.yynumber)
    //     .then((response) => {
    //       let yyuserinfo = response.data
    //       this.form.pdnumber = yyuserinfo.wiki.roomId;
    //       // console.log(response.data);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
    searchpd: function() {
      this.axios({
        url: process.env.API_HOST + "/u/h5/profile/" + this.form.yynumber, // 请求地址
        method: "get", //  请求方法
        responseType: "json", // 返回值类型
        header: {
          "Access-Control-Allow-Origin": "https://mobi.yy.com/"
        }
      })
        .then(res => {
          let yyuserinfo = res.data;
          if (yyuserinfo.wiki.roomId != undefined) {
            this.form.pdnumber = yyuserinfo.wiki.roomId;

            this.$message({
              showClose: true,
              message: "已自动填充频道ID，请仔细核对！",
              type: "success"
            });
          } else {
            this.form.pdnumber = "";

            this.$message({
              showClose: true,
              message: "未查询到绑定的频道ID，请自行填写！"
            });
          }

          console.log(res); //  请求成功
        })
        .catch(error => {
          console.log(error); // 请求失败
          this.$message({
            showClose: true,
            message: "很抱歉，查询失败，请自行填写！",
            type: "error"
          });
        });
    },

    changeOption: function() {
      // console.log(this.form.fkyynumber);
      let fkyynumber_data = this.form.fkyynumber;
      let obj = {};
      obj = this.form.userdata.find(item => {
        return item.number === fkyynumber_data;
      });
      this.form.fkyyvalue = obj.name;
    },
    changeOption2: function() {
      // console.log(this.form.fkyynumber);
      let fkyyvalue_data = this.form.fkyyvalue;
      let obj = {};
      obj = this.form.userdata.find(item => {
        return item.name === fkyyvalue_data;
      });
      this.form.fkyynumber = obj.number;
    },
    getCurrentData() {
      return (
        new Date().getFullYear() +
        "年" +
        (new Date().getMonth() + 1) +
        "月" +
        new Date().getDate() +
        "日"
      );
    },
    initDate() {
      // console.log(this.getCurrentData());
      this.form.fktime = this.getCurrentData();
    },
    onSubmit: function() {
      // console.log(this.form);
      let form = this.form;
      if (this.form.yynumber == "") {
        form.yynumber = "无";
      }
      if (this.form.otheryynumber == "") {
        form.otheryynumber = "无";
      }
      if (this.form.pdnumber == "") {
        form.pdnumber = "无";
      }
      this.form.fkwb =
        "反馈时间" +
        "\r\n" +
        form.fktime +
        "\r\n" +
        "疑似违规YY号" +
        "\r\n" +
        form.yynumber +
        "\r\n" +
        "其余YY号" +
        "\r\n" +
        form.otheryynumber +
        "\r\n" +
        "疑似违规频道号" +
        "\r\n" +
        form.pdnumber +
        "\r\n" +
        "疑似违规类型" +
        "\r\n" +
        "直播" +
        "\r\n" +
        "疑似违规描述" +
        "\r\n" +
        form.wgms +
        "\r\n" +
        "反馈人YY号" +
        "\r\n" +
        form.fkyynumber +
        "\r\n" +
        "反馈人信息" +
        "\r\n" +
        form.fkyyvalue;
    },
    copy1: function() {
      const input = document.getElementById("fkwb");
      input.setAttribute("code", 1);
      input.select();
      document.execCommand("Copy");
      this.$message({
        showClose: true,
        message: "复制成功！",
        type: "success"
      });
    },
    onSubmit2: function() {
      let form2 = this.form2;
      this.form2.fkwb2 =
        form2.cgwb +
        "\r\n" +
        "官方处理结果" +
        "\r\n" +
        "官方-" +
        form2.gfname +
        " " +
        form2.gfcljg +
        "\r\n" +
        "疑问点" +
        "\r\n" +
        form2.ywd;
    },
    copy2: function() {
      const input = document.getElementById("fkwb2");
      input.setAttribute("code", 1);
      input.select();
      document.execCommand("Copy");
      this.$message({
        showClose: true,
        message: "复制成功！",
        type: "success"
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
