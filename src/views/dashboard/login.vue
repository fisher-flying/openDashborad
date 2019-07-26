<template>
  <div class="login-wrapper">
      <div class="head hidden-xs hidden-sm ">
        <div class="dead_top">
          <div class="container">
              <div class="row">
                  <div class="col-md-6">
                    <a href="/"><img src="assets/images/logo.png"></a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>水利社用户认证中心</span>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <el-main>
        <div class="container">
          <div class="m-login">
            <div class="demo-ruleForm login-container">
              <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-form">
                <el-form-item prop="account">
                  <span>用户名</span>
                  <el-input type="text" v-model="loginForm.account" auto-complete="off"> </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <span>密码</span>
                  <el-input type="password" v-model="loginForm.password" auto-complete="off" @keyup.enter.native="submitForm('loginForm')"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" :loading="isLoading" @click="submitForm('loginForm')" class="el-button-primary">登录</el-button>
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="remPassword">记住密码</el-checkbox>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-main>
      <div class="foot">
        <div class="container"> 
          <el-row :gutter="24">
            <el-col :span="4" class="form-group">
              <div class="foot-logo"><a href="/"><img src="assets/images/logo.png" class="img-responsive"></a></div>
            </el-col>
            <el-col :span="20" class="form-group">
              <div class="fnav"><a href=""> </a></div>
              <div class="fcopy">
                  <p>邮编：100038　地址：北京市海淀区玉渊潭南路1号D座（木樨地） 电话:010-68317638（办公室）,68367658（营销中心）,68545874（科水图书销售中心）  </p>
                  <p>传真:010-68353010（办公室）,68331835（营销中心）,68545873（科水图书销售中心）京ICP备12040861号-1 　营业执照 　网络出版服务许可证 　出版物经营许可证   </p>
              </div>
            </el-col>
        </el-row>
        </div>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from "axios";
import Cookies from 'js-cookie';

export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      isLoading: false,
      remPassword: true,
      loginForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  mounted(){
    this.getCookie();
  },
  methods: {
    submitForm(from) {
      const self = this;
      if (self.remPassword == true){
        self.setCookie(self.loginForm.account,self.loginForm.password,7)
      }else{
        self.clearCookie();
      }
      this.$refs[from].validate(valid => {
        if (valid) {
          this.isLoading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.isLoading = false;
              this.$router.push({ path: "/overview" });
            })
            .catch(error => {
              this.isLoading = false;
              this.$message({
                type: "error",
                message: error.message
              });
            });
        } else {
          console.log("submit error");
          return false;
        }
      });
    },
    setCookie(name,pwd,exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime + 24 * 60 * 60 * 1000 * exdays);
      Cookies.set("username",name,exdate.toGMTString());
      Cookies.set("password",pwd,exdate.toGMTString());
    },
    getCookie(){
      this.loginForm.account = Cookies.get("username");
      this.loginForm.password = Cookies.get("password");
    },
    clearCookie(){
      Cookies.set("username","",-1);
      Cookies.set("password","",-1);
    }
  }
};
</script>
