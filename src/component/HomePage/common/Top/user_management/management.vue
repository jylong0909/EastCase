<template>

  <div id="management">
    <el-row style=" width:100%;float:left;margin-right:20px;margin-bottom:3px;z-index:1;border-radius: 10px;background: linear-gradient(rgba(139, 176, 197, 0.2) 20%, rgba(105, 150, 175, 0.62) 90%);">
      <el-col :span="24" >
      <el-button class="btn_el" icon="fontFamily re-icon-ump-xinzeng1" plain size="medium" @click="add_user()">新增</el-button>
      <!-- save() -->
      <el-button class="btn_el"  icon="fontFamily re-icon-ump-chaxun1" plain size="medium" @click="quilk = true">速查</el-button>
      <el-button class="btn_el" style="height:36px" icon="el-icon-delete" plain size="medium" @click="del_quilk = true" >删除</el-button>
      <el-button class="btn_el"  icon="fontFamily re-icon-ump-kaobei-kong" plain size="medium" @click="c_quilk = true" >拷贝</el-button>
      <el-button class="btn_el"  icon="fontFamily re-icon-ump-baocun" plain size="medium" @click="submitForm('forms')">存盘</el-button>
      <el-button class="btn_el" icon="fontFamily re-icon-ump-guanbi1" plain size="medium" @click="down()">关闭</el-button>
      </el-col>
    </el-row>
     <el-dialog
  title="拷贝个人授权"
  :visible.sync="c_quilk"
  width="425px"
  center>
  <el-form>
    <el-form-item label="检索条件:">
    <el-input v-model="input12"></el-input>
  </el-form-item>
<el-card class="box-card" style="margin-top:10px">
  <el-table
    ref="copyone"
    :data="data_copy"
     style="width:100%;"
    height="300px"
  class="yertlist"
    @row-dblclick = 'copy'
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="user_Id"
      label="编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="user_Name"
      label="名称"
      width="180">
    </el-table-column>
  </el-table>
 
</el-card>
  </el-form>
</el-dialog>
  <el-dialog
  title="删除用户信息"
  :visible.sync="del_quilk"
  width="425px"
  center>
  <el-form>
    <el-form-item label="检索条件:">
    <el-input v-model="input11"></el-input>
  </el-form-item>
<el-card class="box-card" style="margin-top:10px">
  <el-table
    ref="multipleTable"
    :data="del_user"
     height="300px"
      class="yertlist"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="hanChange">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="user_Id"
      label="编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="user_Name"
      label="名称"
      width="150">
    </el-table-column>
  </el-table>
 
</el-card>
 <div style="margin-top: 20px">
    <el-button @click="remove()">确认删除</el-button>
    <el-button @click="del_quilk = false">取消</el-button>
  </div>
  </el-form>
</el-dialog>
    <el-dialog
  title="搜索用户信息"
  :visible.sync="quilk"
  width="425px"
  center>
  <el-form>
    <el-form-item label="检索条件:">
    <el-input v-model="input10"></el-input>
  </el-form-item>
<el-card class="box-card" style="margin-top:10px">
 <el-table
    :data="NewItems"
    style="width: 100%;"
    height="300px"
    class="tbbb yertlist"
    @row-dblclick = 'dblclick'
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="user_Id"
      label="编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="user_Name"
      label="名称"
      width="180">
    </el-table-column>
  </el-table>
</el-card>
  </el-form>
</el-dialog>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark " style="background:rgb(214, 222, 230); border-radius: 10px;
    background: #cbd4dc;line-height:65px; padding-top: 1px; box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);">
          <label class="cha"></label>
          <el-form ref="forms" status-icon :model="forms" label-width="80px" :rules="ruless" style="line-height:40px">
          <div class="left_list">
            <el-form-item label="用户编号:" class="labe_info"  >
              <el-input v-model.trim="forms.name" class="elInpur"></el-input>
            </el-form-item>
            <el-form-item label="用户名称:" class="labe_info">
              <el-input v-model.trim="forms.user" class="elInpur"></el-input>
            </el-form-item>
            <el-form-item label="用户密码:" prop="pass" class="labe_info">
              <el-input v-model.trim="forms.pass" type="password" autocomplete="off" class="elInpur"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPass" class="labe_info">
              <el-input
                v-model.trim="forms.checkPass"
                type="password"
                autocomplete="off"
                class="elInpur"
              ></el-input>
            </el-form-item>
            <el-form-item label="默认账套:" class="labe_info">
              <el-select
                v-model="forms.zhang"
                filterable
                placeholder="请选择默认账套"
                class="inp_true elInpur zhang_item"
                @click="getParentData()"
              >
                <el-option
                  v-for="(k,index) in option_data"
                  :key="index+1"
                  :label="k.query_DB"
                  :value="k.query_DB"
                ></el-option>
              </el-select>
            </el-form-item>
           
            <el-form-item label="默认部门:" class="labe_info">
              <el-select
                v-model="forms.drt"
                filterable
                placeholder="请选择默认部门"
                class="inp_true elInpur"
                @click.native="depart_men()"
              >
                <el-option
                  v-for="(l,index) in men_tData"
                  :key="index"
                  :label="l.name"
                  :value="l.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="默认客户:" class="labe_info">
              <el-select
                v-model="forms.ke"
                filterable
                placeholder="请选择默认客户"
                class="inp_true elInpur"
                @click.native="depart_customer()"
              >
                <el-option
                  v-for="(z,index) in ment_custome"
                  :key="index"
                  :label="z.name"
                  :value="z.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="默认用户:" class="labe_info">
              <el-select
                v-model="forms.yong"
                filterable
                placeholder="请选择默认用户"
                class="inp_true elInpur"
                @click.native="depart_info()"
              >
                <el-option
                  v-for="(x,index) in ment_info"
                  :key="index"
                  :label="x.name"
                  :value="x.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="设备码:" class="labe_info">
              <el-input v-model="forms.she" class="elInpur"></el-input>
            </el-form-item>
            <el-form-item label="签章密码:" class="labe_info">
              <el-input type="password" v-model="forms.qian_pwd" class="elInpur"></el-input>
            </el-form-item>
              </div>

             <div class="right_list">
            <el-form-item label="用户签章:" class="labe_info img_info">
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
                                width: 100px
                                position: absolute;"
              ></i>
              
              <input
                type="file"
                @change="onfilechange"
                id="file_threee"
                style="width:100px;opacity: 0; height: 100px;position: absolute; top: 0;left: 3px;"
              >
            </el-form-item>
            <el-form-item label="二维码:" class="labe_info img_info_er">
              <img
                src
                alt
                style="position: absolute;width: 100px; height: 100px;"
                id="shows"
                v-show ="show_er_one"
              >
              <img
                :src="'./'+newImgUrls"
                id="show_two"
                alt
                style="position: absolute;width: 100px; height: 100px;"
                v-show="show_er_three"
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
                @change="onfilechanges"
                id="ele_img"
                style="width:100px;opacity: 0; height: 100px;position: absolute; top: 0;left: 3px;"
              >
            </el-form-item>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <template> 
      <el-tabs class="tabs_true" type="border-card" style="margin-top:10px;background: transparent;">
  <el-tab-pane>
    <span slot="label"> 查询授权</span>
    <el-table
        :data="true_dt"
        style="width: 100%"
        class="tab tab_infos tab_list list_forms"
        ref="multipleTables"
        height="490px"
        tooltip-effect="dark"
      >
        <el-table-column prop="db_Id" label="查询账套" width="150px"></el-table-column>
        <el-table-column prop="db_Name" label="核算单位" width="150px"></el-table-column>
        <el-table-column prop="db_User" label="销售部门"></el-table-column>
        <el-table-column prop="db_Pwd" label="经营品牌"></el-table-column>
        <el-table-column prop="server_Address" label="销售终端"></el-table-column>
        <el-table-column prop="db_Prot" label="制单用户"></el-table-column>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <el-button size="mini" @click="outerVisible = true,quan()">增加</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </el-tab-pane>
  <el-tab-pane label="功能授权">
 <template>
  <el-form  :model="rulezz" class="ru"> 
   <el-form-item label="授权账套:" prop="region">
          <el-select v-model="rulezz.region" filterable placeholder="请选择账套" @change="zhangtao()"  @click.native="data_zhang()">
            <el-option
              v-for="(z,index) in function_data"
              :key="index+1"
              :label="z.db_Id"
              :value="z.db_Id"
            ></el-option>
          </el-select>
        </el-form-item>
    </el-form>
   <vue-scroll :ops="ops" style="width:11%;height:488px ;
    padding: 0px;
        float: left;
    z-index: 1;border:1px solid #9a9393">
   <el-tree
  :data="data"
  node-key="id"
  :props="defaultProps"
  accordion
  class='menus_warp'
  style="width:300px,height:490px"
  @node-click="handleNodeClick" highlight-current>
</el-tree>
   </vue-scroll>
   <div class="tab_news">
     <table class="tab">
             <!-- <thead class="thead">
              <tr  v-for="(tit, tidx) in titdata"
             :key="tit + tidx">
                <td> {{tit}}</td>
              </tr>
            </thead>  -->
          <tbody class="tbody">
            <tr style="background:#E0EEEE">
                <th v-for="(tit, tidx) in titdata"
                  :key="tit + tidx"> {{tit}}</th>
            </tr>
       <vue-scroll :ops="tdops"> 
            <tr v-for="(item, index) in dataArr"
           :key="index" >
               <td  v-for="(cont, idx) in item"
             :key="cont + idx"
             @click="(idx!=='name')?amenddata(item, idx):''">{{cont=='F'?'':cont}}</td>
             <td>
                <el-button style="width:100%;background:none;border:none;font-size:14px" @click="handleEdits(item,index)">全选</el-button>
             </td>
              </tr>
               </vue-scroll>
            </tbody>
          </table>
   </div>
       
    </template>
  </el-tab-pane>
 
</el-tabs>
    </template>
    <el-dialog title="账套授权" :visible.sync="outerVisible" width="400px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="查询账套:" prop="region">
          <el-select v-model="ruleForm.region" filterable placeholder="请选择账套">
            <el-option
              v-for="(z,index) in option_data"
              :key="index+1"
              :label="z.query_DB"
              :value="z.query_DB"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="核算单位:" prop="region">
          <el-input v-model="ruleForm.accounting" style="width:215px"></el-input>
          <el-button icon="el-icon-more" circle size="small" @click="ation('one')"></el-button>
        </el-form-item>
        <el-form-item label="销售部门:" prop="region">
          <el-input v-model="ruleForm.sales" style="width:215px"></el-input>
          <el-button icon="el-icon-more" circle size="small" @click="ation('two')"></el-button>
        </el-form-item>
        <el-form-item label="经营品牌:" prop="region">
          <el-input v-model="ruleForm.business" style="width:215px"></el-input>
          <el-button icon="el-icon-more" circle size="small" @click="ation('three')"></el-button>
        </el-form-item>
        <el-form-item label="销售终端:" prop="region">
          <el-input v-model="ruleForm.terminals" style="width:215px"></el-input>
          <el-button icon="el-icon-more" circle size="small" @click="ation('four')"></el-button>
        </el-form-item>
        <el-form-item label="制单用户:" prop="region">
          <el-input v-model="ruleForm.voucher" style="width:215px"></el-input>
          <el-button icon="el-icon-more" circle size="small" @click="ation('five')"></el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        width="550px"
        :title="tit_one"
        :before-close="handleClose"
        :visible.sync="innerVisible"
        append-to-body
      >
      
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value3"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :render-content="renderFunc"
          :titles="['可用项目', '已用项目']"
          :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
          @change="handleChange"
          :data="name_data"
        ></el-transfer>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button type="primary" @click="add_list_data(btn_true)">确定</el-button>
          <el-button @click="close()">取 消</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click='true_data()'>确定</el-button>
        <el-button @click="outerVisible = false,quexiao()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import bus from "@/component/HomePage/eventBus.js";
import router from "@/router/index"
import {
  account,
  ment,
  customer,
  de_info,
  User_info,
  authorization,
  accounting,
  making,
  brand,
  terminal,
  Modules,
  user_mangement,
  del_info,
  del_info_mor,
  Modify
} from "@/mock/api";
import { setTimeout } from 'timers';
export default {
  name: "management",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.forms.checkPass !== "") {
          this.$refs.forms.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.forms.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      input12:'',
      function_data:[],
      del_quilk:false,
      input11:'',
      input10:'',
      quilk:false,
      rulezz:{
        region:''
      },
       ops: {
          vuescroll: {},
          scrollPanel: {},
          rail: {
              keepShow:true
          },
          bar: {
              hoverStyle: true,
              onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
              background: '#ccc',
          }
                },
         tdops: {
          vuescroll: {},
          scrollPanel: {},
          rail: {
              keepShow:true
          },
          bar: {
              hoverStyle: true,
              onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
              background: 'red',
          }
                },       
         data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      true_dt:[
       {
          db_Id:'',
          db_Name:'',
          db_User:'',
          db_Pwd:'',
          server_Address:'',
          db_Prot:'',
       }
      ],
      tit_one: "",
      value3: [],
      renderFunc(h, option) {
        return (
          <span>
            {option.index} - {option.label}
          </span>
        );
      },
      btn_true: "",
      outerVisible: false,
      innerVisible: false,
      centerDialogVisible: false,
      show_er_one: true,
      show_er_three: false,
      show_one: true,
      newImgUrl: "",
      newImgUrls: "",
      imageUrl: "",
      imageUrls: "",
      show_three: false,
      ruleForm: {
        region: "",
        accounting: "",
        sales: "",
        business: "",
        terminals: "",
        voucher: ""
      },
      forms: {
        name: "",
        user: "",
        pass: "",
        checkPass: "",
        zhang: "",
        drt: "",
        ke: "",
        yong: "",
        qian: "",
        er: "",
        she: "",
        qian_pwd: ""
      },
      ruless: {
        name: [{ required: true, message: "请输入用户编号", trigger: "blur" }],
         pass: [{ validator: validatePass, trigger: "blur" }],
         checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      rules:{

      },
     
      tableData: [],
      men_tData: [],
      ment_custome: [],
      ment_info: [],
      list_data: [],
      name_data: [],
      movedKeys_data: [],
      key_name: "",
      data_list_type:[],
      root:{},
      
      titdata: ['名称', '查询', '添加','修改','删除','打印','转出','数量','毛利','毛利率','成本','单价','金额','全选'],
      dataArr: [],
      storageArr: [],
      cha_data:[],
      gong_data:[],
      user_quick:[],
      up_index:'',
      multipleSelections:[],
      sel_val:'',
      sel_ke:'',
      valueFromParent:[],
      option_data:[],
      idx_data:'',
      c_quilk:false,
      newDateArr:[],
      newListArr:[],
      newsele_Arr:[],
      new_data_arr:[],
      index_state:true,
      newsel_stor:[],
      zeng_sel:[],
      zeng_sel_stor:[]
    };
  },
  watch:{
   true_dt:{
      handler(newValue, oldValue){
       console.log(newValue)
       this.data_fun(newValue)
    }
   }
  },
    created(){
    this.model()
    this.user()
  },
  mounted() {
  this.option_data= JSON.parse(sessionStorage.getItem('info_Zhang'))
},

   computed: {
 NewItems() {

   var _this = this;
   var NewItems = [];
   this.user_quick.map(function(item) { 
    if (item.user_Id.search(_this.input10) != -1 || item.user_Name.search(_this.input10) != -1) {
     NewItems.push(item);
    }
   });
   return NewItems;
  },
   del_user() {
   var _this = this;
   var del_user = [];
   this.user_quick.map(function(item) { 
    if (item.user_Id.search(_this.input11) != -1 || item.user_Name.search(_this.input11) != -1) {
     del_user.push(item);
    }
   });
   return del_user;
  },
  data_copy() {
   var _this = this;
   var data_copy = [];
   this.user_quick.map(function(item) { 
    if (item.user_Id.search(_this.input12) != -1 || item.user_Name.search(_this.input12) != -1) {
     data_copy.push(item);
    }
   });
   return data_copy;
  }
 },
  methods: {
    copy(row,event,index){
        if(this.forms.user.length==0
           &&this.forms.name.length==0
           &&this.forms.pass.length==0
           &&this.forms.checkPass.length==0){
            this.$message({
                showClose: true,
                message: "必填项用户编号、用户名称、用户密码、确认密码",
                type: "warning"
              });
        }else if(this.forms.user.length==0){
              this.$message({
                showClose: true,
                message: "必填项用户编号、用户名称、用户密码、确认密码",
                type: "warning"
              });
        }else if(this.forms.name.length==0){
              this.$message({
                showClose: true,
                message: "必填项用户编号、用户名称、用户密码、确认密码",
                type: "warning"
              });
        }else if(this.forms.pass.length==0){
              this.$message({
                showClose: true,
                message: "必填项用户编号、用户名称、用户密码、确认密码",
                type: "warning"
              });
        }else if(this.forms.checkPass.length==0){
              this.$message({
                showClose: true,
                message: "必填项用户编号、用户名称、用户密码、确认密码",
                type: "warning"
              });
        }
        else{
          this.c_quilk = false
        // console.log(row)
        // console.log(index.level)
        // console.log(event)
        this.forms.ke = ''
        this.forms.drt = ''
        this.forms.yong = ''
          this.forms.zhang= row.user_DB
          this.forms.she= row.device_Id
          this.forms.qian_pwd= row.signaturePWD
          // this.newImgUrl= row.Signature
           document.getElementById('show').src = ''
           document.getElementById('shows').src = ''
          // this.newImgUrl=''
          // console.log( this.newImgUrl)
          
          if(row.user_Query.length == 0){
             this.$message({
                showClose: true,
                message: "该用户没有查询权限",
                type: "warning"
              });
             this.true_dt =[{
              db_Id:'',
              db_Name:'',
              db_User:'',
              db_Pwd:'',
              server_Address:'',
              db_Prot:'',
          }]
          }else{
            this.true_dt = []
          row.user_Query.forEach((v,b)=>{
             this.true_dt.push({
                  db_Id : v.query_DB,
                  db_User: v.query_Dep== 'null'?'':v.query_Dep,
                  server_Address :v.query_Cust== 'null'?'':v.query_Cust,
                  db_Pwd : v.query_Sup== 'null'?'':v.query_Sup,
                  db_Prot:v.query_User== 'null'?'':v.query_User,
                  db_Name : v.query_CompDep== 'null'?'':v.query_CompDep,
             })
          })
          }
         
          
          this.dataArr = []
          console.log(row.user_Mod)
          if(row.user_Mod.length == 0){
              this.$message({
                showClose: true,
                message: "该用户没有功能权限",
                type: "warning"
              });
          }else{
            this.rulezz.region =row.user_Mod[0].db_ID
          }
          row.user_Mod.forEach((f,g)=>{
             
                console.log(f.db_ID)
                this.dataArr.push({
                  id:f.mod_ID,
                  zhang:f.db_ID,
                  name: f.mod_Name,
                  inquire: f.mod_Query==true?'T':'',
                  add: f.mod_Add==true?'T':'',
                  modify:f.mod_Alter==true?'T':'',
                  delete:f.mod_Del==true?'T':'',
                  print:f.mod_Prt==true?'T':'',
                  roll:f.mod_Out==true?'T':'',
                  num:f.mod_Qty==true?'T':'',
                  gross:f.mod_GP==true?'T':'',
                  gross_profit:f.mod_GPR==true?'T':'',
                  cost:f.mod_Cst==true?'T':'',
                  price:f.mod_Up==true?'T':'',
                  amount:f.mod_Amt==true?'T':'',
            })
          })
         this.storageArr = this.dataArr
          ment({ accountNo: row.user_DB })
          .then(
            function(response) {
            response.data.idNameList.forEach((m,d)=>{
            if(m.id  == row.user_Dep){
              this.forms.drt = String(m.name)
               this.sel_val = row.user_Dep
            }
          })
            }.bind(this)
          )
          .catch(
            function(err) {
              console.log(err);
            }.bind(this)
          );

          customer({ accountNo: row.user_DB, custType: "1" })
          .then(
            function(response) {
               response.data.idNameList.forEach((z,x)=>{
              if(z.id  == row.user_Cust){
                this.forms.ke = String(z.name)
              }
            })
          }.bind(this)
          )
          .catch(
            function(err) {
              console.log(err);
            }.bind(this)
          );


          de_info({ accountNo: row.user_DB, custType: "1" })
          .then(
            function(response) {
              console.log(  response) 
               response.data.idNameList.forEach((z,x)=>{
              if(z.id  == row.user_erpUser){
                this.forms.yong = String(z.name)
                console.log( this.forms.yong)
              }
            })
          }.bind(this)
          )
          .catch(
            function(err) {
              console.log(err);
            }.bind(this)
          );
        }
    },
    zhangtao(){
      if(this.newsele_Arr.length == 0){
        
         this.storageArr.forEach((f,g)=>{
            this.zeng_sel.push({
              db_ID: f.zhang,
                mod_ID:f.id,
                mod_Name:f.name,
                mod_Query:f.inquire== 'T'?true:false,
                mod_Add:f.add== 'T'?true:false,
                mod_Alter:f.modify== 'T'?true:false,
                mod_Del:f.delete== 'T'?true:false,
                mod_Prt:f.print== 'T'?true:false,
                mod_Out:f.roll== 'T'?true:false,
                mod_Qty:f.num== 'T'?true:false,
                mod_GP:f.gross== 'T'?true:false,
                mod_GPR:f.gross_profit== 'T'?true:false,
                mod_Cst:f.cost== 'T'?true:false,
                mod_Up:f.price== 'T'?true:false,
                mod_Amt:f.amount== 'T'?true:false
            })
          })
          this.zeng_deleteRepeat(this.zeng_sel)
           this.dataArr = []
           console.log(this.zeng_sel)
            this.zeng_sel.forEach((f,h)=>{
              if(f.db_ID == this.rulezz.region){
                    this.dataArr.push({
                      id:f.mod_ID,
                      zhang:f.db_ID,
                      name: f.mod_Name,
                      inquire: f.mod_Query==true?'T':'',
                      add: f.mod_Add==true?'T':'',
                      modify:f.mod_Alter==true?'T':'',
                      delete:f.mod_Del==true?'T':'',
                      print:f.mod_Prt==true?'T':'',
                      roll:f.mod_Out==true?'T':'',
                      num:f.mod_Qty==true?'T':'',
                      gross:f.mod_GP==true?'T':'',
                      gross_profit:f.mod_GPR==true?'T':'',
                      cost:f.mod_Cst==true?'T':'',
                      price:f.mod_Up==true?'T':'',
                      amount:f.mod_Amt==true?'T':'',
                }) 
              }
            })
            this.storageArr = this.dataArr
      }else{
        console.log(2)
        
        this.dataArr = []
        this.newsele_Arr.forEach((f,h)=>{
          if(f.db_ID == this.rulezz.region){
                this.dataArr.push({
                  id:f.mod_ID,
                  zhang:f.db_ID,
                  name: f.mod_Name,
                  inquire: f.mod_Query==true?'T':'',
                  add: f.mod_Add==true?'T':'',
                  modify:f.mod_Alter==true?'T':'',
                  delete:f.mod_Del==true?'T':'',
                  print:f.mod_Prt==true?'T':'',
                  roll:f.mod_Out==true?'T':'',
                  num:f.mod_Qty==true?'T':'',
                  gross:f.mod_GP==true?'T':'',
                  gross_profit:f.mod_GPR==true?'T':'',
                  cost:f.mod_Cst==true?'T':'',
                  price:f.mod_Up==true?'T':'',
                  amount:f.mod_Amt==true?'T':'',
            })
             
          }
        })
        this.storageArr = this.dataArr
      }
    },
    data_zhang(){
          if( this.function_data.length == 0){
          this.$message({
                message: "请先进行查询赋权",
                type: "error"
          });
       }
    },
    //查询授权里添加账套 把账套给功能里的账套
    data_fun(data){
        console.log(data)
        this.function_data = []
        data.forEach((g,h)=>{
          console.log(g.db_Id)
           this.function_data.push({
             db_Id:g.db_Id
           })
        })
    },


    // btn_data(){
    //   console.log(this.messAges)
    //   this.option_data = this.messAges
    //   console.log( this.option_data)
    // },
    
    null_fu(data){
      data.forEach((s,a)=>{
        if(s.db_Prot == 'null'){
            s.db_Prot = ''
        }
        if( s.db_Pwd == 'null'){
          s.db_Pwd =''
        }
        if( s.db_Name == 'null'){
          s.db_Name =''
        }
        if( s.db_User == 'null'){
          s.db_User =''
        }
        if( s.server_Address == 'null'){
          s.server_Address =''
        }
      })
    },
    save(){
      this.cha_data = this.arr2jsons(this.true_dt)
      console.log(this.cha_data)
      this.null_fu(this.true_dt)
      console.log(this.true_dt)
      console.log(this.newsele_Arr)
      console.log(this.storageArr)
      this.newsel_stor = []
      this.newsele_Arr.forEach((w,u)=>{
        this.newsel_stor.push({
              id:w.mod_ID,
              zhang:w.db_ID,
              name: w.mod_Name,
              inquire: w.mod_Query==true?'T':'',
              add: w.mod_Add==true?'T':'',
              modify:w.mod_Alter==true?'T':'',
              delete:w.mod_Del==true?'T':'',
              print:w.mod_Prt==true?'T':'',
              roll:w.mod_Out==true?'T':'',
              num:w.mod_Qty==true?'T':'',
              gross:w.mod_GP==true?'T':'',
              gross_profit:w.mod_GPR==true?'T':'',
              cost:w.mod_Cst==true?'T':'',
              price:w.mod_Up==true?'T':'',
              amount:w.mod_Amt==true?'T':'',
        })
      })
      this.gong_data = this.arr2json(this.newsel_stor)
      var save_data_params = new URLSearchParams();
     
      save_data_params.append("user_Id", this.forms.name);
      save_data_params.append("user_Name", this.forms.user);
      save_data_params.append("user_Pwd", this.forms.checkPass);
      save_data_params.append("user_DB", this.forms.zhang);
      save_data_params.append("user_Dep", this.sel_val);
      save_data_params.append("user_Cust", this.sel_ke);
      save_data_params.append("user_erpUser", this.forms.yong)
      save_data_params.append("Device_Id", this.forms.she);
      save_data_params.append("SignaturePWD", this.forms.qian_pwd);
      save_data_params.append("Signature", this.newImgUrl == undefined?'':this.newImgUrl);
      save_data_params.append("query_DB", this.cha_data.db_Id.replace(/;/g,','));
      save_data_params.append("query_Dep", this.cha_data.db_User);
      save_data_params.append("query_Cust", this.cha_data.server_Address);
      save_data_params.append("query_Sup", this.cha_data.db_Pwd);
      save_data_params.append("query_User", this.cha_data.db_Prot);
      save_data_params.append("query_CompDep", this.cha_data.db_Name);

      save_data_params.append("mod_ID", this.gong_data.id);
      save_data_params.append("mod_DB", this.gong_data.zhang);
      save_data_params.append("mod_Name", this.gong_data.name);
      save_data_params.append("mod_Query", this.gong_data.inquire);
      save_data_params.append("mod_Add", this.gong_data.add);
      save_data_params.append("mod_Alter", this.gong_data.modify);
      save_data_params.append("mod_Del", this.gong_data.delete);
      save_data_params.append("mod_Prt", this.gong_data.print);
      save_data_params.append("mod_Out", this.gong_data.roll);
      save_data_params.append("mod_Qty", this.gong_data.num);
      save_data_params.append("mod_Up", this.gong_data.price);
      save_data_params.append("mod_Amt", this.gong_data.amount);
      save_data_params.append("mod_Cst", this.gong_data.cost);
      save_data_params.append("mod_GP", this.gong_data.gross);
      save_data_params.append("mod_GPR", this.gong_data.gross_profit,);
      save_data_params.append("isApp",'T');


      Modify(save_data_params).then((response)=>{
        console.log(response)
         if(response.data.RLO == true){
             this.$message({
                message: "用户修改成功",
                type: "success"
              });
              this.user()
              this.add_user()
          }else{
            this.$message({
                message: "用户修改失败",
                type: "error"
              });
          }
      }).catch((err)=>{
        console.log(err)
         this.$message({
                message: "用户修改失败",
                type: "error"
        });
      })
    },
    down(){
       router.push({ name: "HomePage" });
    },
    add_user(){
      this.true_dt = []
      if(this.true_dt.length == 0){
          this.true_dt.push({
              db_Id:'',
              db_Name:'',
              db_User:'',
              db_Pwd:'',
              server_Address:'',
              db_Prot:'',
          })
      }
      this.idx_data = ''

      this.storageArr = []
      this.forms.name = ''
      this.forms.user = ''
      this.forms.pass = ''
      this.forms.checkPass = ''
      this.forms.zhang = ''
      this.forms.drt = ''
      this.forms.ke = ''
      this.forms.yong = ''
      this.forms.she = ''
      this.forms.qian_pwd = ''
      this.forms.newImgUrl = ''
      this.dataArr = []
      this.ruleForm.region = ''
    },
   hanChange(val) {
      this.multipleSelections = []
      val.forEach(item => {
        console.log(item)
          this.multipleSelections.push(item.user_Id);
      });
      console.log( this.multipleSelections)
      },
    remove(){
       if (this.multipleSelections.length == 0 ) {
                  this.$message({
                    message: "未选择数据",
                    type: "warning"
                  });
        }else {
          if(this.multipleSelections.length == 1){
                var del_fo = new URLSearchParams();
                  del_fo.append("user_Id", this.multipleSelections);
              del_info(del_fo).then((response)=>{
                console.log(response)
                if (response.data.RLO == false) {
                      this.$message({
                        showClose: true,
                        message: "用户信息删除失败",
                        type: "error"
                      });
                    } else {
                      this.$message({
                        showClose: true,
                        message: "用户信息已成功删除",
                        type: "success"
                      });
                      this.del_quilk = false;
                      this.user()
                    }
              }).catch((err)=>{
                console.log(err)
              })
          }else{
            var del_in = new URLSearchParams();
                  del_in.append("user_Ids", this.multipleSelections);
                  del_in.append("isApp", 'T');
              del_info_mor(del_in).then((response)=>{
                console.log(response)
                if (response.data.RLO == false) {
                      this.$message({
                        showClose: true,
                        message: "用户信息删除失败",
                        type: "error"
                      });
                    } else {
                      this.$message({
                        showClose: true,
                        message: "用户信息已成功删除",
                        type: "success"
                      });
                      this.del_quilk = false;
                      this.user()
                    }
              }).catch((err)=>{
                console.log(err)
              })
          }
        }
    },
    //全选
     handleEdits(row, index) {
        this.amenddata(row,'add')
        this.amenddata(row,'amount')
        this.amenddata(row,'cost')
        this.amenddata(row,'delete')
        this.amenddata(row,'gross')
        this.amenddata(row,'gross_profit')
        this.amenddata(row,'inquire')
        this.amenddata(row,'modify')
        this.amenddata(row,'num')
        this.amenddata(row,'price')
        this.amenddata(row,'print')
        this.amenddata(row,'roll')
     },
     quexiao(){
      if(this.true_dt.length == 0){
        this.true_dt.push({
          db_Id:'',
          db_Name:'',
          db_User:'',
          db_Pwd:'',
          server_Address:'',
          db_Prot:'',
      })
      }
     },
    handleDelete(index, row) {
      this.true_dt.push({
          db_Id:'',
          db_Name:'',
          db_User:'',
          db_Pwd:'',
          server_Address:'',
          db_Prot:'',
      })
        console.log(index, row);
        console.log(this.true_dt)
        this.true_dt.splice(index,1)
        console.log(this.true_dt)

      },
    handleEdit(index, row) {
      this.up_index = index.toString()
        console.log(index, row);
        this.outerVisible = true
        this.ruleForm.region = row.db_Id
        this.ruleForm.accounting = row.db_Name 
        this.ruleForm.sales = row.db_User
        this.ruleForm.business = row.db_Pwd
        this.ruleForm.terminals = row.server_Address
        this.ruleForm.voucher = row.db_Prot
      },
      dblclick(row,event,index){
        console.log(row)
        console.log(index.level)
        console.log(event)
        this.forms.ke = ''
        this.forms.drt = ''
        this.forms.yong = ''
        this.idx_data = String(index.level)
          this.quilk = false
          this.forms.name = row.user_Id
          this.forms.user= row.user_Name
          this.forms.checkPass= row.user_Pwd
          this.forms.pass= row.user_Pwd
          this.forms.zhang= row.user_DB
          this.forms.she= row.device_Id
          this.forms.qian_pwd= row.signaturePWD
          // this.newImgUrl= row.Signature
           document.getElementById('show').src = ''
           document.getElementById('shows').src = ''
          this.newImgUrl=''
          // console.log( this.newImgUrl)

            if(row.user_Query.length == 0){
             this.$message({
                showClose: true,
                message: "该用户没有查询权限",
                type: "warning"
              });
          this.true_dt =[{
              db_Id:'',
              db_Name:'',
              db_User:'',
              db_Pwd:'',
              server_Address:'',
              db_Prot:'',
          }]
          }else{
            this.true_dt = []
          row.user_Query.forEach((v,b)=>{
             this.true_dt.push({
                  db_Id : v.query_DB,
                  db_User: v.query_Dep== 'null'?'':v.query_Dep,
                  server_Address :v.query_Cust== 'null'?'':v.query_Cust,
                  db_Pwd : v.query_Sup== 'null'?'':v.query_Sup,
                  db_Prot:v.query_User== 'null'?'':v.query_User,
                  db_Name : v.query_CompDep== 'null'?'':v.query_CompDep,
             })
          })
          }
          console.log(row.user_Mod)
          if(row.user_Mod.length == 0){
              this.$message({
                showClose: true,
                message: "该用户没有功能权限",
                type: "warning"
              });
              
          }else{
            this.rulezz.region =row.user_Mod[0].db_ID
          }
          this.dataArr = []
          console.log( row.user_Mod)
          row.user_Mod.forEach((f,g)=>{
                console.log(f.db_ID)
                this.newsele_Arr.push({
                  mod_ID:f.mod_ID,
                  db_ID:f.db_ID,
                  mod_Name: f.mod_Name,
                  mod_Query: f.mod_Query,
                  mod_Add: f.mod_Add,
                  mod_Alter:f.mod_Alter,
                  mod_Del:f.mod_Del,
                  mod_Prt:f.mod_Prt,
                  mod_Out:f.mod_Out,
                  mod_Qty:f.mod_Qty,
                  mod_GP:f.mod_GP,
                  mod_GPR:f.mod_GPR,
                  mod_Cst:f.mod_Cst,
                  mod_Up:f.mod_Up,
                  mod_Amt:f.mod_Amt,
                })

                if(f.db_ID == this.rulezz.region){
                this.dataArr.push({
                  id:f.mod_ID,
                  zhang:f.db_ID,
                  name: f.mod_Name,
                  inquire: f.mod_Query==true?'T':'',
                  add: f.mod_Add==true?'T':'',
                  modify:f.mod_Alter==true?'T':'',
                  delete:f.mod_Del==true?'T':'',
                  print:f.mod_Prt==true?'T':'',
                  roll:f.mod_Out==true?'T':'',
                  num:f.mod_Qty==true?'T':'',
                  gross:f.mod_GP==true?'T':'',
                  gross_profit:f.mod_GPR==true?'T':'',
                  cost:f.mod_Cst==true?'T':'',
                  price:f.mod_Up==true?'T':'',
                  amount:f.mod_Amt==true?'T':'',
            })
          }
              
          })
         this.storageArr = this.dataArr
          ment({ accountNo: row.user_DB })
          .then(
            function(response) {
            response.data.idNameList.forEach((m,d)=>{
            if(m.id  == row.user_Dep){
              this.forms.drt = String(m.name)
               this.sel_val = row.user_Dep
            }
          })
            }.bind(this)
          )
          .catch(
            function(err) {
              console.log(err);
            }.bind(this)
          );

          customer({ accountNo: row.user_DB, custType: "1" })
          .then(
            function(response) {
               response.data.idNameList.forEach((z,x)=>{
              if(z.id  == row.user_Cust){
                this.forms.ke = String(z.name)
              }
            })
          }.bind(this)
          )
          .catch(
            function(err) {
              console.log(err);
            }.bind(this)
          );


          de_info({ accountNo: row.user_DB, custType: "1" })
          .then(
            function(response) {
              console.log(  response) 
               response.data.idNameList.forEach((z,x)=>{
              if(z.id  == row.user_erpUser){
                this.forms.yong = String(z.name)
                console.log( this.forms.yong)
              }
            })
          }.bind(this)
          )
          .catch(
            function(err) {
              console.log(err);
            }.bind(this)
          );

      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
    user(){
      user_mangement().then((response)=>{
          console.log(response)
          this.user_quick = response.data.Users
      }).catch((err)=>{
          console.log(err)
      })
    },
   arr2json(arr){
    var json={}
    for(var i in arr){
        for(var j in arr[i]){
            if(!json.hasOwnProperty(j)){
                json[j]=[]
            }
            if(arr[i][j] == ''){
                arr[i][j] = 'F'
                json[j].push(arr[i][j])
            }else{
              json[j].push(arr[i][j])
            }
            
        }
    }
    for(var i in json){
          json[i] = json[i].join(',')
        
    }
    return json
},
 arr2jsons(arr){
    var json={}
    for(var i in arr){
        for(var j in arr[i]){
            if(!json.hasOwnProperty(j)){
                json[j]=[]
            }
            if(arr[i][j] == ''){
                arr[i][j] = 'null'
                json[j].push(arr[i][j])
            }else{
              json[j].push(arr[i][j])
            }
            
        }
    }
    for(var i in json){
          json[i] = json[i].join(';')
        
    }
    return json
},
    add_items() {
      if(this.idx_data){
          this.save()
      }else{
        if(this.storageArr.length == 0 ){
            this.$message({
                showClose: true,
                message: "用户信息创建失败！请添加查询授权",
                type: "error"
              });
      }else{
        if(this.true_dt.length == 0){
          his.$message({
                showClose: true,
                message: "用户信息创建失败！请添加功能授权",
                type: "error"
              });
        }else{
  this.cha_data = this.arr2jsons(this.true_dt)
  this.null_fu(this.true_dt)
       this.zeng_sel_stor = []
       console.log(this.zeng_sel)
       console.log(this.zeng_sel_stor)
      this.zeng_sel.forEach((w,u)=>{
        this.zeng_sel_stor.push({
              id:w.mod_ID,
              zhang:w.db_ID,
              name: w.mod_Name,
              inquire: w.mod_Query==true?'T':'',
              add: w.mod_Add==true?'T':'',
              modify:w.mod_Alter==true?'T':'',
              delete:w.mod_Del==true?'T':'',
              print:w.mod_Prt==true?'T':'',
              roll:w.mod_Out==true?'T':'',
              num:w.mod_Qty==true?'T':'',
              gross:w.mod_GP==true?'T':'',
              gross_profit:w.mod_GPR==true?'T':'',
              cost:w.mod_Cst==true?'T':'',
              price:w.mod_Up==true?'T':'',
              amount:w.mod_Amt==true?'T':'',
        })
      })
        this.gong_data = this.arr2json(this.zeng_sel_stor)
      //this.gong_data = this.arr2json(this.storageArr)
       var data_params = new URLSearchParams();
      data_params.append("user_Id", this.forms.name);
      data_params.append("user_Name", this.forms.user);
      data_params.append("user_Pwd", this.forms.checkPass);
      data_params.append("user_DB", this.forms.zhang);
      data_params.append("user_Dep", this.forms.drt);
      data_params.append("user_Cust", this.forms.ke);
      data_params.append("user_erpUser", this.forms.yong);
      data_params.append("Device_Id", this.forms.she);
      data_params.append("SignaturePWD", this.forms.qian_pwd);
      data_params.append("Signature", this.newImgUrl);

      data_params.append("query_DB", this.cha_data.db_Id.replace(/;/g,','));
      data_params.append("query_Dep", this.cha_data.db_User);
      data_params.append("query_Cust", this.cha_data.server_Address);
      data_params.append("query_Sup", this.cha_data.db_Pwd);
      data_params.append("query_User", this.cha_data.db_Prot);
      data_params.append("query_CompDep", this.cha_data.db_Name);

      data_params.append("mod_ID", this.gong_data.id);
      data_params.append("mod_DB", this.gong_data.zhang);
      data_params.append("mod_Name", this.gong_data.name);
      data_params.append("mod_Query", this.gong_data.inquire);
      data_params.append("mod_Add", this.gong_data.add);
      data_params.append("mod_Alter", this.gong_data.modify);
      data_params.append("mod_Del", this.gong_data.delete);
      data_params.append("mod_Prt", this.gong_data.print);
      data_params.append("mod_Out", this.gong_data.roll);
      data_params.append("mod_Qty", this.gong_data.num);
      data_params.append("mod_Up", this.gong_data.price);
      data_params.append("mod_Amt", this.gong_data.amount);
      data_params.append("mod_Cst", this.gong_data.cost);
      data_params.append("mod_GP", this.gong_data.gross);
      data_params.append("mod_GPR", this.gong_data.gross_profit,);
      data_params.append("isApp",'T');


      User_info(data_params)
        .then(response => {
          console.log(response);
          if(response.data.RLO == true){
             this.$message({
                message: "用户创建成功",
                type: "success"
              });
              this.user()
              this.add_user()
          }else{
            this.$message({
                message: "用户创建失败",
                type: "error"
              });
          }
        })
        .catch(err => {
          console.log(err);
           this.$message({
                message: "用户创建失败",
                type: "error"
              });
        });
        }
      }
      }
    },
    getRoot() {
            var temp = this.data_list_type.filter(s => s.mod_Level == "null");
            this.root = {
                id: temp[0].mod_ID,
                label: temp[0].mod_Name,
                children: []
            };
            this.root.children = this.pushChildren(this.root.id);
        },
    pushChildren(level_name) {
            return this.data_list_type.reduce((arr, item) => {
                if (item.mod_Level == level_name) {
                    var temp = {
                        id: item.mod_ID,
                        label: item.mod_Name,
                        children: []
                    };
                    if(this.data_list_type.filter(s=>s.mod_Level == temp.id).length > 0){
                        temp.children = this.pushChildren(temp.id);
                    }
                    arr.push(temp);
                }
                return arr;
            }, []);
        },
    model(){
      Modules().then(response =>{
          console.log(response)
          this.data_list_type = response.data.module
          this.getRoot()
          this.root = this.pushChildren("null")[0]
          this.data =  [this.root]
          console.log(this.data)
      }).catch(err =>{
        console.log(err)
      })
    },
    amenddata (item, idx) {
      console.log(item,idx)
     if (item[idx] === '') {
        item[idx] = 'T'
      } else {
        item[idx] = ''
      }
      if (this.storageArr.length > 0) {
        let state = false
        this.storageArr.forEach(storage => {
          if (storage.name === item.name) {
            storage = item
            state = true
          }
        })
        if (!state) {
          this.storageArr.push(item)
        }
      } else {
        this.storageArr.push(item)
      }
       if(this.newsele_Arr.length == 0){
            this.zeng_sel.forEach((o,z)=>{
            this.storageArr.forEach((k,c)=>{
              if(k.zhang == o.db_ID){
                 if(k.name == o.mod_Name){
                o.db_ID= k.zhang,
                o.mod_ID=k.id,
                o.mod_Name=k.name,
                o.mod_Query=k.inquire== 'T'?true:false,
                o.mod_Add=k.add== 'T'?true:false,
                o.mod_Alter=k.modify== 'T'?true:false,
                o.mod_Del=k.delete== 'T'?true:false,
                o.mod_Prt=k.print== 'T'?true:false,
                o.mod_Out=k.roll== 'T'?true:false,
                o.mod_Qty=k.num== 'T'?true:false,
                o.mod_GP=k.gross== 'T'?true:false,
                o.mod_GPR=k.gross_profit== 'T'?true:false,
                o.mod_Cst=k.cost== 'T'?true:false,
                o.mod_Up=k.price== 'T'?true:false,
                o.mod_Amt=k.amount== 'T'?true:false
                }
        if( o.mod_Name.indexOf(k.name) == -1){
              this.zeng_sel.push({
                db_ID: k.zhang,
                mod_ID:k.id,
                mod_Name:k.name,
                mod_Query:k.inquire== 'T'?true:false,
                mod_Add:k.add== 'T'?true:false,
                mod_Alter:k.modify== 'T'?true:false,
                mod_Del:k.delete== 'T'?true:false,
                mod_Prt:k.print== 'T'?true:false,
                mod_Out:k.roll== 'T'?true:false,
                mod_Qty:k.num== 'T'?true:false,
                mod_GP:k.gross== 'T'?true:false,
                mod_GPR:k.gross_profit== 'T'?true:false,
                mod_Cst:k.cost== 'T'?true:false,
                mod_Up:k.price== 'T'?true:false,
                mod_Amt:k.amount== 'T'?true:false,
              })
        }
        if( k.name.indexOf(o.mod_Name) == -1){
              this.zeng_sel.push({
                db_ID: k.zhang,
                mod_ID:k.id,
                mod_Name:k.name,
                mod_Query:k.inquire== 'T'?true:false,
                mod_Add:k.add== 'T'?true:false,
                mod_Alter:k.modify== 'T'?true:false,
                mod_Del:k.delete== 'T'?true:false,
                mod_Prt:k.print== 'T'?true:false,
                mod_Out:k.roll== 'T'?true:false,
                mod_Qty:k.num== 'T'?true:false,
                mod_GP:k.gross== 'T'?true:false,
                mod_GPR:k.gross_profit== 'T'?true:false,
                mod_Cst:k.cost== 'T'?true:false,
                mod_Up:k.price== 'T'?true:false,
                mod_Amt:k.amount== 'T'?true:false,
              })
            }
            //   var hash = {};
            //   this.newsele_Arr = this.newsele_Arr.reduce(function(item, next) {
            //   hash[next.mod_Name] ? '' : hash[next.mod_Name] = true && item.push(next);
            //   return item
            //  }, [])
             this.zeng_deleteRepeat(this.zeng_sel)
            console.log(this.zeng_sel)
            }else{
              
                 if( o.mod_Name.indexOf(k.name) == -1){
              this.zeng_sel.push({
                db_ID: k.zhang,
                mod_ID:k.id,
                mod_Name:k.name,
                mod_Query:k.inquire== 'T'?true:false,
                mod_Add:k.add== 'T'?true:false,
                mod_Alter:k.modify== 'T'?true:false,
                mod_Del:k.delete== 'T'?true:false,
                mod_Prt:k.print== 'T'?true:false,
                mod_Out:k.roll== 'T'?true:false,
                mod_Qty:k.num== 'T'?true:false,
                mod_GP:k.gross== 'T'?true:false,
                mod_GPR:k.gross_profit== 'T'?true:false,
                mod_Cst:k.cost== 'T'?true:false,
                mod_Up:k.price== 'T'?true:false,
                mod_Amt:k.amount== 'T'?true:false,
              })
        }
        if( k.name.indexOf(o.mod_Name) == -1){
              this.zeng_sel.push({
                db_ID: k.zhang,
                mod_ID:k.id,
                mod_Name:k.name,
                mod_Query:k.inquire== 'T'?true:false,
                mod_Add:k.add== 'T'?true:false,
                mod_Alter:k.modify== 'T'?true:false,
                mod_Del:k.delete== 'T'?true:false,
                mod_Prt:k.print== 'T'?true:false,
                mod_Out:k.roll== 'T'?true:false,
                mod_Qty:k.num== 'T'?true:false,
                mod_GP:k.gross== 'T'?true:false,
                mod_GPR:k.gross_profit== 'T'?true:false,
                mod_Cst:k.cost== 'T'?true:false,
                mod_Up:k.price== 'T'?true:false,
                mod_Amt:k.amount== 'T'?true:false,
              })
        } 
         this.zeng_deleteRepeat(this.zeng_sel)
            }
        })
      })
       }else{
          console.log(this.newsele_Arr)
          console.log(this.storageArr)
           this.newsele_Arr.forEach((o,z)=>{
            this.storageArr.forEach((k,c)=>{
              if(k.zhang == o.db_ID){
                 if(k.name == o.mod_Name){
                o.db_ID= k.zhang,
                o.mod_ID=k.id,
                o.mod_Name=k.name,
                o.mod_Query=k.inquire== 'T'?true:false,
                o.mod_Add=k.add== 'T'?true:false,
                o.mod_Alter=k.modify== 'T'?true:false,
                o.mod_Del=k.delete== 'T'?true:false,
                o.mod_Prt=k.print== 'T'?true:false,
                o.mod_Out=k.roll== 'T'?true:false,
                o.mod_Qty=k.num== 'T'?true:false,
                o.mod_GP=k.gross== 'T'?true:false,
                o.mod_GPR=k.gross_profit== 'T'?true:false,
                o.mod_Cst=k.cost== 'T'?true:false,
                o.mod_Up=k.price== 'T'?true:false,
                o.mod_Amt=k.amount== 'T'?true:false
                }
                 if( o.mod_Name.indexOf(k.name) == -1){
              this.newsele_Arr.push({
                db_ID: k.zhang,
                mod_ID:k.id,
                mod_Name:k.name,
                mod_Query:k.inquire== 'T'?true:false,
                mod_Add:k.add== 'T'?true:false,
                mod_Alter:k.modify== 'T'?true:false,
                mod_Del:k.delete== 'T'?true:false,
                mod_Prt:k.print== 'T'?true:false,
                mod_Out:k.roll== 'T'?true:false,
                mod_Qty:k.num== 'T'?true:false,
                mod_GP:k.gross== 'T'?true:false,
                mod_GPR:k.gross_profit== 'T'?true:false,
                mod_Cst:k.cost== 'T'?true:false,
                mod_Up:k.price== 'T'?true:false,
                mod_Amt:k.amount== 'T'?true:false,
              })
        }
        if( k.name.indexOf(o.mod_Name) == -1){
              this.newsele_Arr.push({
                db_ID: k.zhang,
                mod_ID:k.id,
                mod_Name:k.name,
                mod_Query:k.inquire== 'T'?true:false,
                mod_Add:k.add== 'T'?true:false,
                mod_Alter:k.modify== 'T'?true:false,
                mod_Del:k.delete== 'T'?true:false,
                mod_Prt:k.print== 'T'?true:false,
                mod_Out:k.roll== 'T'?true:false,
                mod_Qty:k.num== 'T'?true:false,
                mod_GP:k.gross== 'T'?true:false,
                mod_GPR:k.gross_profit== 'T'?true:false,
                mod_Cst:k.cost== 'T'?true:false,
                mod_Up:k.price== 'T'?true:false,
                mod_Amt:k.amount== 'T'?true:false,
              })
            }
            //   var hash = {};
            //   this.newsele_Arr = this.newsele_Arr.reduce(function(item, next) {
            //   hash[next.mod_Name] ? '' : hash[next.mod_Name] = true && item.push(next);
            //   return item
            //  }, [])
             this.deleteRepeat(this.newsele_Arr)
            console.log(this.newsele_Arr)
            }else{
              
                 if( o.mod_Name.indexOf(k.name) == -1){
              this.newsele_Arr.push({
                db_ID: k.zhang,
                mod_ID:k.id,
                mod_Name:k.name,
                mod_Query:k.inquire== 'T'?true:false,
                mod_Add:k.add== 'T'?true:false,
                mod_Alter:k.modify== 'T'?true:false,
                mod_Del:k.delete== 'T'?true:false,
                mod_Prt:k.print== 'T'?true:false,
                mod_Out:k.roll== 'T'?true:false,
                mod_Qty:k.num== 'T'?true:false,
                mod_GP:k.gross== 'T'?true:false,
                mod_GPR:k.gross_profit== 'T'?true:false,
                mod_Cst:k.cost== 'T'?true:false,
                mod_Up:k.price== 'T'?true:false,
                mod_Amt:k.amount== 'T'?true:false,
              })
        }
        if( k.name.indexOf(o.mod_Name) == -1){
              this.newsele_Arr.push({
                db_ID: k.zhang,
                mod_ID:k.id,
                mod_Name:k.name,
                mod_Query:k.inquire== 'T'?true:false,
                mod_Add:k.add== 'T'?true:false,
                mod_Alter:k.modify== 'T'?true:false,
                mod_Del:k.delete== 'T'?true:false,
                mod_Prt:k.print== 'T'?true:false,
                mod_Out:k.roll== 'T'?true:false,
                mod_Qty:k.num== 'T'?true:false,
                mod_GP:k.gross== 'T'?true:false,
                mod_GPR:k.gross_profit== 'T'?true:false,
                mod_Cst:k.cost== 'T'?true:false,
                mod_Up:k.price== 'T'?true:false,
                mod_Amt:k.amount== 'T'?true:false,
              })
        }  this.deleteRepeat(this.newsele_Arr)
            }
           
         
         
            
              
        })
      })
        console.log(this.newsele_Arr )
       
       //this.deleteRepeat(this.newsele_Arr)
    }
    },
    zeng_deleteRepeat(arr) {
      for(var i=0;i<arr.length-1;i++){
          var old=arr[i]
          for(var j=i+1;j<arr.length;j++){
              if(old.db_ID==arr[j].db_ID&& old.mod_Add==arr[j].mod_Add
              && old.mod_Alter==arr[j].mod_Alter&& old.mod_Amt==arr[j].mod_Amt&& old.mod_Cst==arr[j].mod_Cst
              && old.mod_Del==arr[j].mod_Del&& old.mod_GP==arr[j].mod_GP&& old.mod_GPR==arr[j].mod_GPR
              && old.mod_ID==arr[j].mod_ID&& old.mod_Name==arr[j].mod_Name&& old.mod_Out==arr[j].mod_Out
              && old.mod_Prt==arr[j].mod_Prt&& old.mod_Qty==arr[j].mod_Qty&& old.mod_Query==arr[j].mod_Query
              && old.mod_Up==arr[j].mod_Up){
                  arr.splice(j,1);
                  j--;
              }
          }
          console.log(arr)
          this.zeng_sel = arr

      }
      
    },
    deleteRepeat(arr) {
      for(var i=0;i<arr.length-1;i++){
          var old=arr[i]
          for(var j=i+1;j<arr.length;j++){
              if(old.db_ID==arr[j].db_ID&& old.mod_Add==arr[j].mod_Add
              && old.mod_Alter==arr[j].mod_Alter&& old.mod_Amt==arr[j].mod_Amt&& old.mod_Cst==arr[j].mod_Cst
              && old.mod_Del==arr[j].mod_Del&& old.mod_GP==arr[j].mod_GP&& old.mod_GPR==arr[j].mod_GPR
              && old.mod_ID==arr[j].mod_ID&& old.mod_Name==arr[j].mod_Name&& old.mod_Out==arr[j].mod_Out
              && old.mod_Prt==arr[j].mod_Prt&& old.mod_Qty==arr[j].mod_Qty&& old.mod_Query==arr[j].mod_Query
              && old.mod_Up==arr[j].mod_Up){
                  arr.splice(j,1);
                  j--;
              }
          }
          console.log(arr)
          this.newsele_Arr = arr

      }
      
    }, 
    handleNodeClick(data){
      console.log(data)
      if(this.rulezz.region == ''){
        this.$message({
          message: "请先选择查询账套,才能授权",
          type: "error"
        });
        return false;
      }else{
      this.dataArr = []
      if (data.children && data.children.length > 0) {
        for (let item of data.children) {
          this.dataArr.push({
            id:item.id,
            zhang:this.rulezz.region,
            name: item.label,
            inquire: '',
            add: '',
            modify:'',
            delete:'',
            print:'',
            roll:'',
            num:'',
            gross:'',
            gross_profit:'',
            cost:'',
            price:'',
            amount:'',
          })
        }
      } else {
        this.dataArr.push({
            id:data.id,
            zhang:this.rulezz.region,
            name: data.label,
            inquire: '',
            add: '',
            modify:'',
            delete:'',
            print:'',
            roll:'',
            num:'',
            gross:'',
            gross_profit:'',
            cost:'',
            price:'',
            amount:'',
        })
      }
      if (this.storageArr.length > 0) {
        for (let a = 0; a < this.dataArr.length; a++) {
          for (let b = 0; b < this.storageArr.length; b++) {
            if (this.dataArr[a].name === this.storageArr[b].name) {
              this.dataArr[a] = this.storageArr[b]
            }
          }
        }
      }
      return false
      }
      
    },

    quan(){
      console.log(this.true_dt[0].db_Id == '')
      if(this.true_dt[0].db_Id == ''){
          this.true_dt = []
      }
      this.ruleForm.region =''
      this.ruleForm.accounting =''
      this.ruleForm.sales=''
      this.ruleForm.business=''
      this.ruleForm.terminals=''
      this.ruleForm.voucher=''
    },
    true_data(){
      this.outerVisible = false
      if(this.up_index){
          this.true_dt[this.up_index].db_Id= this.ruleForm.region 
          this.true_dt[this.up_index].db_Name= this.ruleForm.accounting
          this.true_dt[this.up_index].db_User= this.ruleForm.sales
          this.true_dt[this.up_index].db_Pwd= this.ruleForm.business
          this.true_dt[this.up_index].server_Address= this.ruleForm.terminals
          this.true_dt[this.up_index].db_Prot= this.ruleForm.voucher
         
         this.up_index = ''
      }else{
       const data_list = {
        db_Id:this.ruleForm.region,
        db_Name:this.ruleForm.accounting,
        db_User:this.ruleForm.sales,
        db_Pwd:this.ruleForm.business,
        server_Address:this.ruleForm.terminals,
        db_Prot:this.ruleForm.voucher,
      }
      if(this.true_dt && this.true_dt.length == 0){
          this.true_dt.push(data_list)
      }else{
          var nums = this.true_dt
          // this.true_dt  [{'name':'a'},{'name':'b'}]
          var _this = this
          function checkAdult(num) {
            //_this.ruleForm.region  账户名
            return num.db_Id === _this.ruleForm.region
          }
          if(nums.some(checkAdult)){
               this.$message({
                      message: "该账套已授权,请勿重复授权,可以点编辑进行修改",
                      type: "error"
                    })
          }else{
             this.true_dt.push(data_list)
          }
      }
      
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.name_data = [];
        })
        .catch(_ => {});
    },
    close() {
      this.innerVisible = false;
      this.name_data = [];
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    add_list_data() {
      this.name_data = [];
      this.innerVisible = false;
       if (this.btn_true == "btn_one") {
        if (
          this.value3.length == 0 ||
          this.value3[0].substring(0, 3) == "one"
        ) {
          this.ruleForm.accounting = this.value3.map(i => String(i.replace('one',''))).toString()
          this.value3 = [];
          return false;
        }
      } else if (this.btn_true == "btn_two") {
        if (
          this.value3.length == 0 ||
          this.value3[0].substring(0, 3) == "two"
        ) {
          this.ruleForm.sales = this.value3.map(i => String(i.replace('two',''))).toString()
          this.value3 = [];
        }
      } else if (this.btn_true == "btn_three") {
        if (
          this.value3.length == 0 ||
          this.value3[0].substring(0, 3) == "ree"
        ) {
          this.ruleForm.business = this.value3.map(i => String(i.replace('ree',''))).toString()
          this.value3 = [];
        }
      } else if (this.btn_true == "btn_four") {
        if (
          this.value3.length == 0 ||
          this.value3[0].substring(0, 3) == "fou"
        ) {
          this.ruleForm.terminals = this.value3.map(i => String(i.replace('fou',''))).toString()
          this.value3 = [];
        }
      } else if (this.btn_true == "btn_five") {
        if (
          this.value3.length == 0 ||
          this.value3[0].substring(0, 3) == "fiv"
        ) {
          this.ruleForm.voucher = this.value3.map(i => String(i.replace('fiv',''))).toString()
          this.value3 = [];
        }
      }
    },
    generateData(data, tit_key) {
      this.list_data = [];
      data.forEach((item, index) => {
        this.list_data.push({
          index: index,
          key: tit_key + item.id,
          label: item.name
        });
      });
      return (this.name_data = this.list_data);
    },
    ation(id) {
      if (this.ruleForm.region == "") {
        this.$message({
          message: "请先选择查询账套",
          type: "error"
        });
        return false;
      } else {
        if (id == "one") {
          this.innerVisible = true;
          this.tit_one = "请选择核算单位";
          this.btn_true = "btn_one";
          if (this.ruleForm.accounting == "") {
            this.value3 = [];
          } else {
            this.value3 = this.ruleForm.accounting.split(",").map(i => String(i.replace('','one')));
          }
          accounting({
            accountNo: this.ruleForm.region,
            custType: "6"
          })
            .then(response => {
              this.key_name = "one";
              this.generateData(response.data.idNameList, this.key_name);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (id == "two") {
          this.innerVisible = true;
          this.tit_one = "请选择销售部门";
          this.btn_true = "btn_two";
          if (this.ruleForm.sales == "") {
            this.value3 = [];
          } else {
            this.value3 = this.ruleForm.sales.split(",").map(i => String(i.replace('','two')));
          }
          authorization({
            accountNo: this.ruleForm.region,
            custType: "2"
          })
            .then(response => {
              console.log(response);
              this.key_name = "two";
              this.generateData(response.data.idNameList, this.key_name);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (id == "three") {
          this.innerVisible = true;
          this.tit_one = "请选择经营品牌";
          this.btn_true = "btn_three";
          if (this.ruleForm.business == "") {
            this.value3 = [];
          } else {
            this.value3 = this.ruleForm.business.split(",").map(i => String(i.replace('','ree')));
          }
          brand({
            accountNo: this.ruleForm.region,
            custType:'2'
          })
            .then(response => {
              console.log(response);
              this.key_name = "ree";
              this.generateData(response.data.idNameList, this.key_name);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (id == "four") {
          this.innerVisible = true;
          this.tit_one = "请选择销售终端";
          this.btn_true = "btn_four";
          if (this.ruleForm.terminals == "") {
            this.value3 = [];
          } else {
            this.value3 = this.ruleForm.terminals.split(",").map(i => String(i.replace('','fou')));
          }
          terminal({
            accountNo: this.ruleForm.region,
            custType: "1"
          })
            .then(response => {
              console.log(response);
              this.key_name = "fou";
              this.generateData(response.data.idNameList, this.key_name);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (id == "five") {
          this.innerVisible = true;
          this.tit_one = "请选择制单用户";
          this.btn_true = "btn_five";
          if (this.ruleForm.voucher == "") {
            this.value3 = [];
          } else {
            this.value3 = this.ruleForm.voucher.split(",").map(i => String(i.replace('','fiv')));
          }
          making({
            accountNo: this.ruleForm.region,
          })
            .then(response => {
              console.log(response);
              this.key_name = "fiv";
              this.generateData(response.data.idNameList, this.key_name);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },

    
    depart_info() {
      if (this.forms.zhang == "") {
        this.$message({
          message: "请先选择默认账套",
          type: "warning"
        });
      } else {
        console.log(this.forms.zhang);
        de_info({ accountNo: this.forms.zhang })
          .then(
            function(response) {
              console.log(response);
              this.ment_info = response.data.idNameList;
            }.bind(this)
          )
          .catch(
            function(err) {
              console.log(err);
            }.bind(this)
          );
      }
    },
    depart_customer() {
      if (this.forms.zhang == "") {
        this.$message({
          message: "请先选择默认账套",
          type: "warning"
        });
      } else {
        console.log(this.forms.zhang);
        customer({ accountNo: this.forms.zhang, custType: "1"})
          .then(
            function(response) {
              console.log(response);
              this.ment_custome = response.data.idNameList;
            }.bind(this)
          )
          .catch(
            function(err) {
              console.log(err);
            }.bind(this)
          );
      }
    },
    depart_men() {
      if (this.forms.zhang == "") {
        this.$message({
          message: "请先选择默认账套",
          type: "warning"
        });
      } else {
        console.log(this.forms.zhang);
        ment({ accountNo: this.forms.zhang })
          .then(
            function(response) {
              console.log(response);
              this.men_tData = response.data.idNameList;
            }.bind(this)
          )
          .catch(
            function(err) {
              console.log(err);
            }.bind(this)
          );
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid) {
           this.add_items()
        } else {
           this.$message({
            message: "内容有错误请重新填写",
            type: "warning"
          });
        }
      });
    },
    onfilechange() {
      var _this = this;
      var read = new FileReader();
      const s = document.getElementById("file_threee").value;
      _this.newImgUrl = s;
      const f = document.getElementById("file_threee").files[0];
      read.readAsDataURL(f);
      var newImg = "";
      read.onload = function(e) {
        document.getElementById("show").src = this.result;
        _this.imageUrl = read.result.split(",")[1];
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
    onfilechanges() {
      var _this = this;
      var reads = new FileReader();
      const c = document.getElementById("ele_img").value;
      _this.newImgUrls = c;
      console.log(c);
      const f = document.getElementById("ele_img").files[0];
      reads.readAsDataURL(f);
      var newImg = "";
      reads.onload = function(e) {
        document.getElementById("shows").src = this.result;
        _this.imageUrls = reads.result.split(",")[1];
        //上传图片接口
        // update({
        //     image: _this.imageUrls
        //   })
        //   .then(response => {
        //     _this.newImgUrls = response.data.data.path;
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      };
    }
  }
};
</script>
<style>
.list_forms td > .cell {
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical; 
    /* autoprefixer: on */
    line-height: 20px;
    text-align: center !important;
}
.list_forms td .cell:hover{
            display: inline;
            text-overflow: inherit !important;
            overflow: visible !important;
  } 
.yertlist table thead tr th{
    color: #000 !important;
    background:  #E0EEEE !important
}
.btn_el:focus,.btn_el:hover{
  background: #00C5CD !important;
  color:#fff !important;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item{
  color: #000 !important;
}
 .menus_warp .el-tree-node__content:hover {
    /* background-color: transparent; */
    background: rgba(0, 174, 255, 0.17);
    background-image: linear-gradient(85deg,
      rgba(1, 174, 255, 0.4) 0%,
      rgba(1, 174, 255, 0.22) 50%,
      rgba(1, 174, 255, 0.05) 100%);
  }

  .menus_warp .el-tree-node:focus>.el-tree-node__content {
    /* background-color: transparent; */
    background: rgba(0, 174, 255, 0.17);
    background-image: linear-gradient(85deg,
      rgba(1, 174, 255, 0.4) 0%,
      rgba(1, 174, 255, 0.22) 50%,
      rgba(1, 174, 255, 0.05) 100%);
    color: #1c8cd0  !important;
 
    
  }
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background: rgba(0, 174, 255, 0.17) !important;
    background-image: linear-gradient(85deg,
      rgba(1, 174, 255, 0.4) 0%,
      rgba(1, 174, 255, 0.22) 50%,
      rgba(1, 174, 255, 0.05) 100%) !important;
    color: #1c8cd0  !important;
  }
 .text {
    font-size: 14px;
  }
.el-card__body{
  padding: 0 !important
}
.el-tree-node:focus>.el-tree-node__content{
  background-color: rgb(178, 228, 243) !important;
}
#management .el-table th{
  padding: 10px 0 !important;
}
.tree{
  overflow:auto !important;
  height:200px !important;
  width:190px !important;
  position: relative !important;
}
.el-tree>.el-tree-node{
  width: 100% !important;
  display: inline-block !important;
}
.el-tree{
  background: transparent !important;
  line-height: 45px !important;
  color: #000 !important;
}
.el-tree-node__content{
  height: 45px !important;
   line-height:45px !important;
   display: -webkit-box !important;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
     background:transparent !important;
  border-bottom: 1px solid #bdc7cb  !important;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
         background: #b7deff!important;
    border-bottom: 1px solid #b7deff!important;
    border-right-color: #b7deff!important;
    border-left-color: #b7deff !important;
}
.el-tabs--border-card>.el-tabs__header{
    background:transparent !important;
    border-bottom: 1px solid #b7deff !important;
}


.tab_list th{
      background-color: #E0EEEE   !important;
      padding: 5px 0 !important;
      color:#000 !important;
}
.tab_list tr{
      background-color: transparent !important;
} 
.tab_list td{
      padding: 2px 0 !important;
}
.el-button--mini, .el-button--mini.is-round{
      padding:5px 10px;
}
.transfer-footer {
  margin-left: 20px !important;
  padding: 6px 5px !important;
}
.el-select .el-input__inner {
  cursor: inherit !important;
}
.el-table,
.el-table__expanded-cell {
  background-color: transparent !important;
}
.add {
  float: right !important;
  margin-right: 5px !important;
  margin-top: 5px !important;
} 
#management .el-table td,
#management .el-table th.is-leaf {
  text-align: center !important;
  border-bottom: 1px solid #767677 !important;
  border-right: 1px solid #767677 !important;
}
#management .el-table th > .cell {
  text-align: center !important;
}
#management .tab_list td > .cell {
    /* overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;*/
    text-align: center !important;
}
/* #management .tab_list td .cell:hover{
            display: inline;
            text-overflow: inherit !important;
            overflow: visible !important;
  } */
#management .el-table td .cell > .el-button {
  border: 1px solid #808082 !important;
}
#management .el-table td .cell > .el-button--danger {
  border: 1px solid #f56c6c !important;
}
#management .el-input__inner {
  height: 30px !important;
}
.img_info {
  display: block !important;
  height: 102px !important;
  float: left !important;
}
.img_info_er {
  display: block !important;
  float: left !important;
}
.left_list .el-form-item__label{
  color: #000 !important;
}
.main{
  background: #F4F4F4 !important;
}
.ru .el-form-item{
  margin-bottom:0 !important
}
</style>
<style scoped>
/* #management{
  height: 100%;
  background: #fff !important;
} */
@media screen and (max-height:830px) and (max-height:900px){ 
#management{
  height:720px;
  overflow: auto;
  }
}
@media screen and (max-height:800px){ 
#management{
  height:680px;
  overflow: auto;
  }
}
@media screen and (max-height:760px){ 
#management{
  height:650px;
  overflow: auto;
  }
}
.ru .el-form-item {
  margin-top: -10px;
  padding-bottom:5px
}
.cha {
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 800;
  color: #606266;
  /* border-top:1px solid #887568 */
}
.left_list .labe_info{
  display: inline-block;
}
.right_list .labe_info {
  display: inline-block;
  margin-bottom:0 !important
}

.elInpur 
.tab_list{
padding-top: 1px;
 box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
}
.tabs_true .el-tabs__header{
    background:transparent !important;
        border-bottom: 1px solid #1e1e1f;
}
.hello {
  width: 600px;
  height: 100%;
  float: left;
  display: flex;
}
.menu {
  width: 200px;
  height: 100%;
  border: 1px #000 solid;
}
.tab_news{
  width:88%;
  float: left;
  height: auto;
  margin-left: 5px;
}
/* table */
.tab{
  width:100%;
  height: 400px;
  border:1px solid #8a8181;
    border-spacing: 0px;
  
}



.tab > .tbody tr {
  /* width: 100%;
    display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black; */

  width: 100%; 
  border-bottom:1px solid #8a8181;
  display: table; 
  position: relative;
  overflow: hidden;
}
.tab > .tbody tr td:nth-child(3), .tab>.tbody tr th:nth-child(1){
  width:10%
}
 .tbody tr th{
   height: 40px;
 }
.tab > .tbody .__vuescroll{
  height: 445px !important;
}

.tab > .tbody tr td,.tab > .tbody tr th{
  /* width: 6.58%;
  height: 100%;
  text-align: center;
  border-right: 1px solid red;*/
   width: 6.58%;
  cursor: pointer;
  position: relative;
  font-size:16px;
  text-align: center;
  display: table-cell;
  border-right:1px solid #8a8181;
  overflow: hidden;
  font-size:16px;
}
.tab > .tbody tr td:last-child,.tab > .tbody tr th:last-child{
border-right:none;
}
 .tab > .tbody tr td:nth-child(1){
  display: none;
}
.tab > .tbody tr td:nth-child(2){
  display: none;
}
.left_list{
  width: 75%;
  display: inline-block;
}
.right_list{
  display: inline-block;
}
.elInpur {
  width: 160px;
}
@media screen and (min-width:1700px) and (max-width:1850px){ 
 .elInpur {
      width: 150px;
  }
  .left_list{
    width: 75%;
    display: inline-block;
  }
}

@media screen and (min-width:1740px) and (max-width:1780px){ 
 .elInpur {
      width: 130px;
  }
.left_list{
  width: 70%;
  display: inline-block;
}
}
@media screen and (min-width:1700px) and (max-width:1750px){ 
 .elInpur {
      width: 120px;
  }
.left_list{
  width: 70%;
  display: inline-block;
}
}
@media screen and (min-width:1650px) and (max-width:1700px){ 
 .elInpur {
      width: 115px;
  }
.left_list{
  width: 70%;
  display: inline-block;
}
}
@media screen and (min-width:1500px) and (max-width:1670px){ 
 .elInpur {
      width: 100px;
  }
.left_list{
  width: 70%;
  display: inline-block;
}
}
@media screen and (min-width:1400px) and (max-width:1530px){ 
 .elInpur {
      width: 82px;
  }
.left_list{
  width:70%;
  display: inline-block;
}
}

@media screen and (max-width: 1430px) { /*当屏幕尺寸小于 1400px时，应用下面的CSS样式*/
    .elInpur {
      width: 75px;
    }
    .left_list{
      width:69%;
      display: inline-block;
    }
}
/* @media screen and (min-width:1200px)  and (max-width: 1300px) { 
    .elInpur {
      width: 62px;
    }
    .left_list{
      width:70%;
      display: inline-block;
    }
    #show,#shows{
      width: 80px !important;
      height: 80px !important;
    }
    #show_two{
      width: 80px !important;
      height: 80px !important;
    }
    .img_info  .el-form-item__content i, .img_info_er .el-form-item__content i{
      width: 80px !important;
      height: 80px !important;
    }
    .img_info  .el-form-item__content input, .img_info_er .el-form-item__content input{
        width: 80px !important;
      height: 80px !important;
    }
  .img_info  .el-form-item__content .isons:before, .img_info_er .el-form-item__content .isons:before{
      content: "\e62b" !important;
      text-align: center !important;
      display: block !important;
      line-height: 80px !important;
  }
  .img_info_er label{
    width: 62px !important;
  }
} */
.btn_el{
    color:#fff;
    box-shadow: 0 4px 6px 0 rgba(0,0,0,.12), 0 10px 6px 0 rgba(0,0,0,.04);
    background: #00CED1;
    border: none;
    margin-top: 10px;
}
.img_info  .el-form-item__content .isons:before, .img_info_er .el-form-item__content .isons:before{
      content: "\e62b" !important;
      text-align: center !important;
      display: block !important;
      line-height: 100px !important;
  }
.btn_el:nth-child(1){
  margin-left: 10px;
}

</style>