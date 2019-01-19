<template>
  <div id="Login" style="margin:0;z-index:-2;background-color: #1c77ac;background-image: url(static/img/light.png); background-repeat: no-repeat;background-position: center top;
      overflow: hidden;"> 
     <div id="mainBody" >
      <div id="cloud1" class="cloud" style='background: url(static/img/cloud.png) no-repeat;'></div>
      <div id="cloud2" class="cloud"  style='background: url(static/img/cloud.png) no-repeat;'></div>
    </div>  
      <div class="login_box" style='background: url(static/img/loginbg3.png) no-repeat center center;'>
        
          <div class="box">
            
          <div class="one">
            <div class="one_one">
              
            </div>
          </div>
          <div class="login_info">
            <span class="logo_span"><img src='static/img/logo.png' alt=""></span>
            <!-- <span class='info'> <br>Information Processing Platform</span> -->
            <span style="float:left"></span>
          </div>
          <div class="two">
            <div class="one_one two_one" style=" opacity:1;">
              <img src="static/img/login.jpg" alt="" style="height:100%;width:40%">
              <div class="fron">
                  <p class="please">信息系统管理平台 　　<p class="information">Information Processing Platform</p></p>
                  <!-- <p class="please">信息系统管理平台</p> -->
                 <div>
                    <img src="static/img/me.jpg" alt=""><span>用户名:</span><input type="text" v-model.trim="username">
                 </div>
                 <div>
                    <img src="static/img/key.jpg" alt=""><span>密　码:</span><input type="password" v-model.trim="password">
                 </div> 
                  <div><img src="static/img/yan.jpg" alt=""><span>验证码:</span><input type="text"  @keyup.enter="Login" style="width:120px" v-model.trim="yanzheng"><a href="javascript:void(0)" @click="Lans()" class="img_a"><img :src="img_logins" alt="验证码" ></a></div>
                  <button class="log" @click="Login()">登　录</button>
              </div>
            </div>
          </div>
        </div>
      </div>
       
  </div>
</template>

<script>
    $(function(){
      var offset1 = 450;
      var offset2 = 0;
      var offsetbg = 0;
      var $main =  $("#mainBody");
      var mainwidth =$main.outerWidth();
      var $cloud2 = $("#cloud2");
      var $body =   $("#Login");
      var $cloud1 =  $("#cloud1")
    /// 飘动
    setInterval(function flutter() {
        if (offset1 >= mainwidth) {
            offset1 =  -580;
        }
        if (offset2 >= mainwidth) {
		      	offset2 =  -580;
        }
        offset1 += 1.1;
		    offset2 += 1;
        $cloud1.css("background-position", offset1 + "px 100px")
	    	$cloud2.css("background-position", offset2 + "px 560px")
    }, 70);
	setInterval(function bg() {
        if (offsetbg >= mainwidth) {
            offsetbg =  -580;
        }
        offsetbg += 0.9;
        $body.css("background-position", -offsetbg + "px 0")
    }, 90 );
    })


import Vue from "vue";
import layer from "vue-layer";
import { Verification,Login_log} from "@/mock/api";
import { setTimeout } from 'timers';
import axios from 'axios'
Vue.prototype.$layer = layer(Vue);
export default {
  inject:['reload'],
  name: "app",
  data() {
    return {
      img_logins:  `../IdentityServlet.do?ts= ${new Date().getTime()}`,
      username: "",
      password: "",
      yanzheng: ""
    };
  },
  beforeMount() {
    //this.login_mount()
  },
  mounted() {

  },
  methods: {
          getCookie(name){
          var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
          if (arr = document.cookie.match(reg)) {
            return (arr[2])
          } else {
            return null
          }
        },
      setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        console.info(document.cookie);
      },
      Lans(){
          this.img_logins = `../IdentityServlet.do?ts= ${new Date().getTime()}`
        },
    toLogin(){
        Login_log({
              "userId": this.username,
              "passWord": this.password,
              "loginImage": this.yanzheng
            }).then(function(response){
              console.log(response)
         
              document.write(response.data)
              document.close()
              sessionStorage.setItem("Login", JSON.stringify(this.username) );
              //console.log(getCookie('JSESSIONID'))
              //this.setCookie('token',this.getCookie('JSESSIONID'),5)
              // this.$layer.msg('登录成功!', {
              //             icon: 1,
              //     });
              // this.$router.push('/HomePage');
            }.bind(this)).catch(function(error){
             // console.log(error)
            }.bind(this))
        },
    Login() {
      if(this.username == ''){
                  this.$layer.msg('用户名不能为空!', {
                          icon: 1,
                      });
                  return false;
              }else if(this.password == ''){
                this.$layer.msg('密码不能为空!', {
                          icon: 1,
                      });
                return false;
              }else if(this.yanzheng == ''){
                this.$layer.msg('验证码不能为空', {
                          icon: 1,
                      });
                return false;
              }
              else{
               this.toLogin();
                 //this.$router.push('/HomePage');
              }
            },
  }
}
</script>

<style scoped>
.information{
  line-height: 0px;
  margin-left: 40px;
  font-family: fantasy;
  font-size: 18px;
  color: #ccc;
}
.img_a {
  width: 100px;
  height: 30px;
  display: inline-block;
  margin-right: 55px;
  float: right;
  margin-top: 13px;
}
.img_a img {
  width: 100px !important;
  height: 26px !important;
  float: right !important;
  margin: 0px 0px 0px 0px !important;
}
.please {
      width: 165px;
      height: 25px;
      font-size: 20px;
      font-family: fantasy;
      display: block;
      /* margin: 20px 10px; */
      color: #926e4e;
      font-weight: 900;
      box-shadow: 4px 7px 21px #ccc;
}
.log {
  width:30%;
  margin-left:35%;
  height: 35px;
  cursor: pointer;
  border: 1px #3083ff solid;
  border-radius: 4px;
  background-color: #3487ff;
  box-shadow: 0 5px 8px 0 rgba(24, 95, 255, 0.1);
  color: #fff;
  text-align: center;
  font-weight: lighter;
  background-image: linear-gradient(0deg, #398bff, #3083ff);
  font-size: 18px;
 
}
.fron {
  width: 55%;
  float: right;
  height: 100%;
  margin-left: 10px;
  transform: skew(-10deg);
}
.fron img {
  width: 20px;
  height: 20px;
  display: inline-block;
  float: left;
  margin-left: 10px;
  margin-top: 15px;
  margin-right: 6px;
}
.fron div {
  width: 100%;
  height: 50px;
}
.fron span {
  display: inline-block;
  line-height: 50px;
  float: left;
}
.fron input {
  margin-left: 10px;
  margin-top: 13px;
  width: 230px;
  height: 20px;
}

.login_info {
  width: 750px;
  height: 80px;
  position: absolute;
  top: 57px;
}
.info {
  float: left;
  font-size: 22px;
  font-family: monospace;
  line-height: 20px;
  margin-left: 80px;
  transform:rotate(-8deg);
  display: inline-block;
}
.logo_span {
  width: 210px;
  height: 70px;
  float: left;
  display: inline-block;
}
.logo_span img {
  width: 160px;
  height: 50px;
  margin-top: 17px;
}
.box {
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -350px;
  margin-top: -230px;
}
.one {
  width: 700px;
  height: 300px;
  background: #ccc;
  opacity: 0.6;
  margin: 124px auto;
  transform: skew(8deg) rotate(-8deg);
}
.one_one {
  width: 680px;
  height: 280px;
  background: #ffffff;
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 1;
}
.two {
  position: absolute;
  top: 100px;
  width: 700px;
  height: 300px;
  background: rgba(255, 255, 255, 0.2);
  margin: 25px auto;
  transform: skew(10deg);
}
.two_one {
}
#mainBody {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
}
.cloud {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
 
  z-index: 1;
  opacity: 0.5;
}
#cloud2 {
  z-index: 2;
}
#Login {
  width: 100%;
  height: 1000px;
}
/* .login_box {
  width: 700px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -350px;
  margin-top: -200px;
  background: url("../../img/loginbg3.png")
} */
.login_box {
  width: 100%;
  height: 700px;
  overflow: hidden;
  position: absolute;
  top: 70px;
}
</style>
