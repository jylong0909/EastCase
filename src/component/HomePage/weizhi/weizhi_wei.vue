
<template>
  <div id="weizhi">
    <el-breadcrumb
    class="bread"
      separator-class="el-icon-arrow-right"
      style="line-height: 35px;
    margin-left: 20px;color:#000"
    >
    <el-breadcrumb-item :to="{ path: '/HomePage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(list,index) in currentPath" :key="index" >{{list}}</el-breadcrumb-item>

      <div class="zhan">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="当前账套:">
            <el-select v-model="form.set_user" placeholder="请选择当前账套">
              <el-option
                v-for="(item, index) in new_arr"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="right_user">
        <div class="userinfo" @click="dialogVisible = true">
          <i class="fontFamily re-icon-ump-kehu" style="margin-right:20px"></i>{{login_user}}
        </div>
      </div>
      <el-dialog title="我的信息" :visible.sync="dialogVisible" width="25%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户编号:">
            <el-input v-model="form.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名称:">
            <el-input v-model="form.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户密码:">
            <el-input v-model="form.pwd" disabled></el-input>
          </el-form-item>
          <el-form-item label="默认账套:">
            <el-input v-model="form.zhang" disabled></el-input>
          </el-form-item>
          <el-form-item label="默认部门:">
            <el-input v-model="form.department" disabled></el-input>
          </el-form-item>
          <el-form-item label="ERP用户:">
            <el-input v-model="form.user" disabled></el-input>
          </el-form-item>
          <el-form-item label="设备码:">
            <el-input v-model="form.equipment" disabled></el-input>
          </el-form-item>
          <el-form-item label="签章密码:">
            <el-input v-model="form.pass" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户签章" prop="descz">
            <!--图片地址给不了没有ip-->
            <img
              src
              alt
              style="position: absolute;width: 100px; height: 100px;"
              id="show"
              v-show="show_one"
            >
            <img
              :src="'./'+newImgUrl"
              id="show_two"
              alt
              style="position: absolute;width: 100px; height: 100px;"
              v-show="show_three"
            >
            <i
              class="el-icon-plus isons"
              style="font-size: 72px;
                  height: 100px;
                  border: 1px dashed;
                  width: 100px;
                  position: absolute;"
            ></i>
            
            <input
              type="file"
              disabled
              @change="onfilechange"
              id="fil"
              style="width:100px;opacity: 0; height: 100px;position: absolute; top: 0;left: 3px;"
            >
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false;one">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </el-breadcrumb>
  </div>
</template>
<script>
import { set_infos,Login_log,UserInfo } from "@/mock/api";
import bus from '@/component/HomePage/eventBus.js'
import router from "@/router/index"
export default {
  name: "weizhi",
  data() {

    return {
      currentPath:[],
      login_user:'',
      rules: {
        imageUrl: [
          {
            required: true,
            message: "请上传图片",
            trigger: "blur"
          }
        ]
      },
      zhang_user: [{ zhang: "" }],
      parentMsg: [],
      dialogVisible: false,
      show_one: true,
      newImgUrl: "",
      imageUrl: "",
      form: {
        name: "",
        username: "",
        pwd: "",
        zhang: "",
        department: "",
        user: "",
        equipment: "",
        pass: ""
      },
      set: "",
      set_val: "",
      form: {
        set_user: ""
      },
      msg: [],
      show_three: false,
      id_arr:[],
      new_arr:[]
    };
  },
  
  created(){
     
  },
 watch:{
  
  },
  // beforeUpdate(){
  //     this.currentPath = JSON.parse(sessionStorage.getItem('luyou'))
  // },
  created(){
    this.userInfo()
    this.user_default();
  },
  mounted() {
    this.login_user = JSON.parse(sessionStorage.getItem('Login'))

     this.currentPath =  JSON.parse(sessionStorage.getItem('watchStorage'))
    window.addEventListener('setItem', ()=> {
        this.currentPath =  JSON.parse(sessionStorage.getItem('watchStorage'))
        console.log(this.currentPath)
      })
  
    //this.data_xun()
  },
  methods: {
   
    item_data(idx,item){
        console.log(idx,item)
         switch (item) {
        case "选项1":
          router.push({ name: "Vip" });
          break;
        case "用户管理":
          router.push({ name: "management" });
          break;
        case "账套管理":
          router.push({ name: "zhang" });
          break;
        default:
      }
    },  
    onfilechange() {
      var _this = this;
      var reads = new FileReader();
      const f = document.getElementById("fil").files[0];
      reads.readAsDataURL(f);
      //console.log(reads)
      var newImg = "";
      reads.onload = function(e) {
        document.getElementById("show").src = this.result;
        _this.imageUrl = reads.result.split(",")[1];
        //上传图片接口
        // update({
        //     image: _this.imageUrl
        //   })
        //   .then(response => {
        //     _this.newImgUrl = response.data.data.path;
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      };
    },
    userInfo() {
      UserInfo()
        .then(
          function(response) {
            console.log(response)
            this.form.name =
              response.data.user_Id == "" ? "无" : response.data.user_Id;
            this.form.username =
              response.data.user_Name == "" ? "无" : response.data.user_Name;
            this.form.pwd =
              response.data.user_Pwd == "" ? "无" : response.data.user_Pwd;
            this.form.zhang =
              response.data.user_DB == "" ? "无" : response.data.user_DB;
            this.form.department =
              response.data.user_Dep == "" ? "无" : response.data.user_Dep;
            this.form.user =
              response.data.user_erpUser == ""
                ? "无"
                : response.data.user_erpUser;
            this.form.equipment =
              response.data.device_Id == "" ? "无" : response.data.device_Id;
            this.form.pass =
              response.data.signaturePWD == ""
                ? "无"
                : response.data.signaturePWD;
            this.zhang_user = response.data.user_Query;
            this.zhang_user.zhang = response.data.user_DB;
            this.parentMsg = this.zhang_user;
            console.log(this.zhang_user)
            this.msg = this.zhang_user
            sessionStorage.setItem("info_Zhang", JSON.stringify(this.parentMsg) );
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    user_default() {
      set_infos()
        .then(
          function(response) {
            console.log(response)
            this.id_arr = response.data.idNameList
            console.log(this.id_arr)
            this.arr_dor()
            // this.form.set_user = response.data.idNameList[0].name;
          }.bind(this)
        )
        .catch(
          function(err) {
            console.log(err);
          }.bind(this)
        );
    },

    arr_dor(){
      this.new_arr=[]
      console.log(this.id_arr)
      console.log(this.msg)
      this.id_arr.forEach((i,idx)=>{
        this.msg.forEach((z,o)=>{
          if(z.query_DB == i.id){
            this.new_arr.push(i.name)
            console.log( this.new_arr)
          }
        })
      })
      console.log( this.new_arr)
      this.id_arr.forEach((x,idx)=>{
        if(this.form.zhang == x.id){
            this.form.set_user = x.name
          }
      })

    },
  }
};
</script>
<style>
.bread .el-breadcrumb__item:last-of-type > i{
  display: none;
}

.el-breadcrumb__inner {
  color: #000;
}
.zhan .el-input__inner {
  color: #000;
}
.zhan .el-form-item__label {
  color: #000;
}
.zhan .el-input__inner {
  height: 36px;
  background: none;
  width: 120px;
  border: none;
}
</style>

<style scoped>
.right_user {
  position: absolute;
  right: 35px;
}
.userinfo {
  color: #000 !important;
  text-align: center !important;
}
.zhan {
  position: absolute;
  right: 80px;
  width: 254px;
  height: 36px;
}
</style>