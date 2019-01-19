<template>
  <div id="analysis">
<el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item label="报表种类:">
    <el-select v-model="formInline.region" filterable placeholder="请选择报表种类" @change='chang_sel()'>
      <el-option v-for="(k,index) in list_report"
                  :key="index+1"
                  :label="k.mod_Name"
                  :value="k.mod_ID"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
  </el-form-item>
   <el-form-item label="日期:">
    <el-date-picker
      v-model="formInline.date1"
      type="daterange"
      align="right"
      unlink-panels
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="分类汇总否:">
    <el-select v-model="formInline.fen" placeholder="请选择是否分类汇总">
      <el-option label="是" value="T"></el-option>
      <el-option label="否" value="F"></el-option>
    </el-select>
  </el-form-item>
</el-form><br>  
<el-row>
  <el-button type="primary" @click="outerVisible = true">条件</el-button>
  <el-button type="success" @click.prevent="export_Excel()">转出</el-button>
  <el-button type="info" @click.prevent="dayin()" >打印</el-button>
  <el-button type="warning" @click.prevent='outerVisible = false,tab()'>制表</el-button>
  <el-button type="danger" @click="closes()">关闭</el-button>
</el-row>
  <div class="inner_table" id="printTest">
          <h4>条件:{{name_tiao}}</h4>
          <h4>时间：{{formInline.date1}}</h4>
          <table>
            <thead >
              <tr >
                <th  v-for="(col ,index) in cols" :key="index" class="thead_trrrr" >{{col}}</th>
              </tr>
            </thead>
        
            <tbody v-loading="loading2"
              element-loading-text="加载中">
            <vue-scroll :ops="ops"  id="box_tr">
              <tr v-if="data_if">
                <td style="height:200px;line-height:200px">暂无数据</td>
              </tr>
               <!-- <tr v-for="(item,index) in tableData3" :key="index" id="box_tr">  -->
                <!-- <td >{{item.affiliateName}}</td>   账套 -->
                <!-- <td v-if="one">{{item.compDepName == null?false:item.compDepName}}</td> 单位  -->
                <!-- <td v-if="item.brandName?true:false">{{item.brandName == null?'':item.brandName}}</td> 销售品牌 -->
                <!-- <td v-if="item.salesChannelName?true:false">{{item.salesChannelName == null?'':item.salesChannelName}}</td> 销售渠道 -->
                <!-- <td v-if="item.salesDepartmentName?true:false">{{item.salesDepartmentName == null?'':item.salesDepartmentName}}</td> 销售部门 -->
                <!-- <td v-if="item.sellingOperationName?true:false">{{item.sellingOperationName == null?'':item.sellingOperationName}}</td> 销售业务 -->
                <!-- <td v-if="item.salesTerminalName?true:false">{{item.salesTerminalName == null?'':item.salesTerminalName}}</td> 销售终端 -->
                <!-- <td >{{item.biln_DD== null?'':item.biln_DD}}</td> 应收年月 -->
                <!-- <td>{{item.sAmtn_ARPJ== null?'':item.sAmtn_ARPJ | keepTwoNum}}</td> 未结金额  -->
              <!-- </tr> -->

                
               <!-- <td v-if="item.prdNo?true:false">{{item.prdNo}}</td>--> <!-- 货品编号 -->
                <!--<td v-if="item.prdIndx?true:false">{{item.prdIndx}}</td>--> <!-- 货品中类 -->
               <!-- <td v-if="item.saAmtn?true:false">{{item.saAmtn}}</td>--> <!--  销售金额-->
               <!-- <td v-if="item.sbsAmatn?true:false">{{item.sbsAmatn}}</td>--> <!-- 退返金额 -->
                <!--<td v-if="item.sbAmtn?true:false">{{item.sbAmtn}}</td> --><!-- 退货金额 -->
                <!--<td v-if="item.ssAmtn?true:false">{{item.ssAmtn}}</td>--> <!-- 销售返点 -->
                <!--<td v-if="item.sdAmtn?true:false">{{item.sdAmtn}}</td>--> <!-- 销售折让 -->
               <!-- <td v-if="item.snAmtn?true:false">{{item.snAmtn}}</td> --><!-- 净销售额 -->
             <!--   <td v-if="item.saCst?true:false">{{item.saCst}}</td>--> <!-- 销售成本 -->
              <!--  <td v-if="item.sbCst?true:false">{{item.sbCst}}</td>--> <!-- 退货成本 -->
              <!--  <td v-if="item.snCst?true:false">{{item.snCst}}</td> --><!-- 净销成本 -->
              <!--  <td  v-if="item.gP?true:false">{{item.gP}}</td> --><!-- 销售毛利 -->
              <!-- <td  v-if="item.gPM?true:false">{{item.gPM}}</td> 毛利率 -->
               </vue-scroll>
            </tbody>
           
          </table>
  </div>
 <el-dialog title="条件列表" :visible.sync="outerVisible"  >
    <el-table
    :data="total_Arr"
    class="tab_list_le"
     ref="multipleTable"
      tooltip-effect="dark"
    height="250"
    border
    @selection-change="handleSelectionChange"
    style="width: 100%">
     <el-table-column
      type="selection"
       fixed
      width="55">
    </el-table-column>
    <el-table-column
      fixed
      prop="query_DB"
      label="账套"
     >
    </el-table-column>
    <el-table-column
      prop="bilNo"
      label="单号"
      >
    </el-table-column>
    <el-table-column
      prop="custNo"
      label="客户编号">
    </el-table-column>
    <el-table-column
      prop="custName"
      label="客户名称">
    </el-table-column>
    <el-table-column
      prop="custPhone"
      label="客户电话">
    </el-table-column>
    <el-table-column
      prop="custAddress"
      label="客户地址">
    </el-table-column>
     <el-table-column
      prop="prdMark"
      label="色号">
    </el-table-column>
     <el-table-column
      prop="prdNO"
      label="品号">
    </el-table-column>


    <el-table-column
      prop="inputNo"
      label="转入单号">
    </el-table-column>
    <el-table-column
      prop="cust_OS_NO"
      label="客户订单">
    </el-table-column>
    <el-table-column
      prop="rem"
      label="备注信息">
    </el-table-column>
    <el-table-column
      prop="query_CompDep"
      label="核算单位">
    </el-table-column>
    <el-table-column
      prop="query_Dep"
      label="ERP部门">
    </el-table-column>
    <el-table-column
      prop="query_Sup"
      label="ERP厂商">
    </el-table-column>
    <el-table-column
      prop="query_Cust"
      label="ERP终端">
    </el-table-column>
    <el-table-column
      prop="query_User"
      label="ERP用户">
    </el-table-column>
    <el-table-column
      prop="chk_User"
      label="ERP审核人"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="area"
      label="销售渠道">
    </el-table-column>
    <el-table-column
      prop="employee"
      label="销售人员">
    </el-table-column>
    <el-table-column
      prop="prdWh"
      label="货品库区">
    </el-table-column>
    <el-table-column
      prop="prdIndx"
      label="货品中类">
    </el-table-column>
       
     <el-table-column label="操作" width="150px"  fixed="right">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table> 
    <el-dialog
      width="30%"
      class="tiaojian"
      title="查询条件"
      :visible.sync="innerVisible"
      append-to-body>

  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="查询账套" prop="query">
    <!-- <el-input v-model="ruleForm.name"></el-input> -->
    <el-select v-model="ruleForm.query" placeholder="请选择账套" filterable>
       <el-option
                  v-for="(l,index) in query_Arr"
                  :key="index"
                  :label="l.query_DB"
                  :value="l.query_DB"
                ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="单号" prop="order">
    <el-input v-model="ruleForm.order"></el-input>
  </el-form-item>
   <el-form-item label="品号" prop="no">
   <el-select v-model="ruleForm.no" placeholder="请选择品号"
    multiple
    collapse-tags filterable   @click.native="order_click()">
       <el-option
          v-for="(k,index) in order_Arr"
          :key="index"
          :label="k.name"
          :value="k.id"
        ></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="色号" prop="col_no">
    <el-input v-model="ruleForm.col_no"></el-input>
  </el-form-item>
    <el-form-item label="客户名称" prop="info_na">
    <el-input v-model="ruleForm.info_na"></el-input>
  </el-form-item>
    <el-form-item label="客户电话" prop="info_car">
    <el-input v-model.number="ruleForm.info_car"></el-input>
  </el-form-item>
    <el-form-item label="客户地址" prop="info_home">
    <el-input v-model="ruleForm.info_home"></el-input>
  </el-form-item>
    <el-form-item label="客户编号" prop="info_num">
    <el-input v-model="ruleForm.info_num"></el-input>
  </el-form-item>
  <el-form-item label="客户订单" prop="info_order">
    <el-input v-model="ruleForm.info_order"></el-input>
  </el-form-item>
  <el-form-item label="备注信息" prop="note">
    <el-input v-model="ruleForm.note"></el-input>
  </el-form-item>
  <el-form-item label="转入单号" prop="into_no">
    <el-input v-model="ruleForm.into_no"></el-input>
  </el-form-item>
  <el-form-item label="核算单位" prop="accon">
    <el-select v-model="ruleForm.accon" multiple
    collapse-tags placeholder="请选择核算单位" filterable   @click.native="accon_click()" >
       <el-option
          v-for="(z,index) in accon_Arr"
          :key="index"
          :label="z.name"
          :value="z.id"
        ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="ERP部门" prop="erp_bu">
    <el-select v-model="ruleForm.erp_bu" multiple
    collapse-tags placeholder="请选择ERP部门" filterable   @click.native="erp_bu_click()">
      <el-option
          v-for="(x,index) in erp_bu_Arr"
          :key="index"
          :label="x.name"
          :value="x.id"
        ></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="ERP厂商" prop="erp_chang">
    <el-select v-model="ruleForm.erp_chang" multiple
    collapse-tags placeholder="请选择ERP厂商" filterable   @click.native="erp_chang_click()">
      <el-option
          v-for="(c,index) in erp_chang_Arr"
          :key="index"
          :label="c.name"
          :value="c.id"
        ></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="ERP终端" prop="erp_zhong">
    <el-select v-model="ruleForm.erp_zhong" multiple
    collapse-tags placeholder="请选择ERP终端" filterable   @click.native="erp_zhong_click()">
      <el-option
          v-for="(v,index) in erp_zhong_Arr"
          :key="index"
          :label="v.name"
          :value="v.id"
        ></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="ERP用户" prop="erp_yong">
    <el-select v-model="ruleForm.erp_yong" multiple
    collapse-tags placeholder="请选择ERP用户" filterable   @click.native="erp_yong_click()">
      <el-option
          v-for="(b,index) in erp_yong_Arr"
          :key="index"
          :label="b.name"
          :value="b.id"
        ></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="ERP审核人" prop="erp_shen">
    <el-select v-model="ruleForm.erp_shen" multiple
    collapse-tags placeholder="请选择ERP审核人" filterable   @click.native="erp_yong_click()">
      <el-option
          v-for="(n,index) in erp_yong_Arr"
          :key="index"
          :label="n.name"
          :value="n.id"
        ></el-option>
    </el-select>
  </el-form-item>
     <el-form-item label="销售渠道" prop="sa_qu">
    <el-select v-model="ruleForm.sa_qu" multiple
    collapse-tags placeholder="请选择销售渠道" filterable   @click.native="sa_qu_click()">
      <el-option
          v-for="(m,index) in sa_qu_Arr"
          :key="index"
          :label="m.name"
          :value="m.id"
        ></el-option>
    </el-select>
  </el-form-item>
     <el-form-item label="销售人员" prop="sa_info">
    <el-select v-model="ruleForm.sa_info" multiple
    collapse-tags placeholder="请选择销售人员" filterable   @click.native="sa_info_click()">
      <el-option
          v-for="(a,index) in sa_info_Arr"
          :key="index"
          :label="a.name"
          :value="a.id"
        ></el-option>
    </el-select>
  </el-form-item>
     <el-form-item label="货品库区" prop="goo_in">
    <el-select v-model="ruleForm.goo_in" multiple
    collapse-tags placeholder="请选择货品库区" filterable   @click.native="goo_in_click()">
        <el-option
          v-for="(d,index) in goo_in_Arr"
          :key="index"
          :label="d.name"
          :value="d.id"
        ></el-option>
    </el-select>
  </el-form-item>
     <el-form-item label="货品中类" prop="goo_ku">
    <el-select v-model="ruleForm.goo_ku" multiple
    collapse-tags placeholder="请选择货品中类" filterable   @click.native="goo_ku_click()">
      <el-option
          v-for="(s,index) in goo_ku_Arr"
          :key="index"
          :label="s.name"
          :value="s.id"
        ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
    <el-button @click="innerVisible = false">取 消</el-button>
  </el-form-item>
</el-form>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="innerVisible = true,add()">添 加</el-button>
      <el-button @click="outerVisible = false">确 定</el-button>
    </div>
  </el-dialog>



  </div>
</template>
<script>
import printJS from 'print-js'
import { 
  Modules,
  report_data,
  order_no,
  accounting,
  authorization,
  brand,terminal,
  making,
  sa_qu_api,
  sa_info_api,
  goo_ku_api,
  goo_in_api
} from "@/mock/api";
import router from "@/router/index"
import { setTimeout } from 'timers';
export default {
  name: "sales",
  
  data() {
    var validateMobilePhone = (rule, value, callback) => {
          if (value !== '') { 
            var reg=/^1[3456789]\d{9}$/;
            if(!reg.test(value)){
              callback(new Error('请输入有效的手机号码'));
            }
          }
          callback();
      }
    return {
      one:true,
      ops: {
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
      rules: {
        
          info_car: [
            { validator: validateMobilePhone, trigger: 'blur' }
          ],
        },
        loading2: false,
         pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        formInline: {
          region: '',
          date1:'',
          fen:'F'
        },
        data_if:false,
        list_report:[],
        outerVisible: false,
        innerVisible: false,
        cols:[],
        ruleForm: {
          query:'',
          order:'',
          no:[],
          col_no:'',
          info_na:'',
          info_car:'',
          info_home:'',
          info_num:'',
          info_order:'',
          note:'',
          into_no:'',
          accon:[],
          erp_bu:[],
          erp_chang:[],
          erp_zhong:[],
          erp_yong:[],
          erp_shen:[],
          sa_qu:[],
          sa_info:[],
          goo_ku:[],
          goo_in:[],
        },
        query_Arr:[],
        order_Arr:[],
        accon_Arr:[],
        erp_bu_Arr:[],
        erp_chang_Arr:[],
        erp_zhong_Arr:[],
        erp_yong_Arr:[],
        sa_qu_Arr:[],
        sa_info_Arr:[],
        goo_ku_Arr:[],
        goo_in_Arr:[],
        total_Arr:[],
        index_idx:'',
        heade_Arr:[],
        table_list:[],
        name_tiao:'',
        newtab:[]
     };
  },
 
    created(){
        this.report()
        this.query_Arr = JSON.parse(sessionStorage.getItem('info_Zhang'))
  },
  mounted(){
      
  },
  filters:{
    keepTwoNum:function(value){
      
      let realVal = String(value).replace(/^(.*\..{4}).*$/,"$1");
      return realVal
    }
  },
  methods:{
    showdelete(val){

    },
    chang_sel(){
          this.list_report.forEach((r,t)=>{
              if(this.formInline.region == r.mod_ID){
              this.name_tiao = r.mod_Name
              }
            })
    },
    closes(){
        router.push({ name: "HomePage" });
    },
    //打印
    dayin(){
    const style = `@page {  margin: 0 } @media print {
      h4{display:block}
   
      .inner_table table{border:1px solid #000;border-spacing: 0px;text-align:center; border-collapse: collapse;width:90%;height:80px;margin-top:20px;}
      .inner_table table thead{width:100%;}
      .inner_table table thead tr{width:100%;
    display: flex;}
      .thead_trrrr{
          -webkit-box-flex: 1;flex: 1;border-collapse: collapse; 
       font-size:20px;border-right:1px solid #000;border-bottom:1px solid #000;
        }
        .inner_table table tbody tr{
          width:100%;
          display: flex
        }
        .inner_table table tbody tr td{
          font-size:18px;
          text-align:center;
          border-right:1px solid #000;border-bottom:1px solid #000;
        }
        }
        .inner_table table tbody tr td{
              text-align: right;
              -webkit-box-flex: 1;flex: 1;border-collapse: collapse; 
          }
          .inner_table table tbody tr td:nth-child(1){
          text-align: center;
          }
          .inner_table table tbody tr td:nth-child(2){
            text-align: center;
          }
 
    `
      printJS({
        printable: 'printTest',//要打印内容的id
        type: 'html',
        style:style,
        scanStyles: false
      })
    },
//表格数据转Excel
formatJson (filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
},
export_Excel () {
  this.$confirm('确定要导出表格数据么？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    require.ensure([], () => {
     
      const { export_json_to_excel } = require('../../../../../vendor/Export2Excel')
     const tHeader =['账套','单位名称','销售品牌','销售渠道','销售部门','销售业务','销售终端','应收年月','未结金额']
      const filterVal =['affiliateName','compDepName','brandName','salesChannelName','salesDepartmentName','sellingOperationName',
      'salesTerminalName','biln_DD','sAmtn_ARPJ']
      const list = this.table_list
      const data = this.formatJson(filterVal, list)
      export_json_to_excel(tHeader, data,  `销售报表-条件:${this.name_tiao}-时间:${this.formInline.date1}`)
    })
  }).catch(() => {})
},
 arr2json(arr){
    var json={}
    for(var i in arr){
        for(var j in arr[i]){
            if(!json.hasOwnProperty(j)){
                json[j]=[]
            }
            if(arr[i][j] == ''){
                arr[i][j] = 'All'
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
    tab(){
      if(this.formInline.region == ''&&this.formInline.date1==''){
          this.$message({
                showClose: true,
                message: "请先选择报表种类和日期",
                type: "warning"
              });
      }else if(this.formInline.region == ''){
        this.$message({
                showClose: true,
                message: "请先选择报表种类",
                type: "warning"
              });
      }else if(this.formInline.date1 == ''){
          this.$message({
                showClose: true,
                message: "请先选择日期",
                type: "warning"
              });
      }else{
        console.log(this.total_Arr)
      if(this.total_Arr.length == 0){
        const Array = []
        this.query_Arr.forEach((f,g)=>{
          console.log(f.query_DB)
          Array.push({
            query_DB:f.query_DB,
            bilNo:'',
            custNo:'',
            custName:'',
            custPhone:'',
            custAddress:'',
            inputNo:'',
            cust_OS_NO:'',
            rem:'',
            prdMark:'',
            query_CompDep:'',
            query_Dep:'',
            query_Sup:'',
            query_Cust:'',
            query_User:'',
            chk_User:'',
            area:'',
            employee:'',
            prdNO:'',
            prdIndx:'',
            prdWh:''
          })
          console.log(Array)
        })
        this.loading2 = true
      const tiao_pa = this.arr2json(Array)
      var tab_param = new URLSearchParams();
    //  tab_param.append("reprotNo",'SATGS');
     tab_param.append("reprotNo",this.formInline.region);
     tab_param.append("beginDate", this.formInline.date1[0]);
     tab_param.append("endDate", this.formInline.date1[1]);
     tab_param.append("reporyBusiness",'ARP');
     tab_param.append("isGroupSum",this.formInline.fen);
     tab_param.append("query_DB", tiao_pa.query_DB.split(';').join(','));
     if(tiao_pa.bilNo.substr(0,3) == 'All'){
        tab_param.append("bilNo",' ; ')
     }else{
        tab_param.append("bilNo", tiao_pa.bilNo)
     }
     if(tiao_pa.custNo.substr(0,3) == 'All'){
        tab_param.append("custNo", ' ; ');
     }else{
       tab_param.append("custNo", tiao_pa.custNo);
     }
    if(tiao_pa.custName.substr(0,3) == 'All'){
         tab_param.append("custName", ' ; ')
     }else{
      tab_param.append("custName", tiao_pa.custName)
     }
     if(tiao_pa.custPhone.substr(0,3) == 'All'){
           tab_param.append("custPhone", ' ; ')
     }else{
       tab_param.append("custPhone", tiao_pa.custPhone)
     }
      if(tiao_pa.custAddress.substr(0,3) == 'All'){ 
          tab_param.append("custAddress", ' ; ')
     }else{
       tab_param.append("custAddress", tiao_pa.custAddress)
     }
     if(tiao_pa.inputNo.substr(0,3) == 'All'){
          tab_param.append("inputNo", ' ; ')
     }else{
       tab_param.append("inputNo", tiao_pa.inputNo)
     }
     if(tiao_pa.cust_OS_NO.substr(0,3) == 'All'){
          tab_param.append("cust_OS_NO", ' ; ')
     }else{
      tab_param.append("cust_OS_NO", tiao_pa.cust_OS_NO)
     }
     if(tiao_pa.rem.substr(0,3) == 'All'){
          tab_param.append("rem", ' ; ')
     }else{
      tab_param.append("rem", tiao_pa.rem)
     }
     if(tiao_pa.prdMark.substr(0,3) == 'All'){
         tab_param.append("prdMark", ' ; ')
     }else{
     tab_param.append("prdMark", tiao_pa.prdMark)
     }
    // tab_param.append("bilNo", tiao_pa.bilNo);//''
    // tab_param.append("custNo", tiao_pa.custNo);//''
     //tab_param.append("custName", tiao_pa.custName);//''
     //tab_param.append("custPhone", tiao_pa.custPhone);//''
      // tab_param.append("custAddress", tiao_pa.custAddress);//''
      // tab_param.append("inputNo", tiao_pa.inputNo);//''
     //tab_param.append("cust_OS_NO", tiao_pa.cust_OS_NO); // ''
     //tab_param.append("rem", tiao_pa.rem); //''
     //tab_param.append("prdMark", tiao_pa.prdMark); //''
     tab_param.append("query_CompDep", tiao_pa.query_CompDep);  
     tab_param.append("query_Dep", tiao_pa.query_Dep);
     tab_param.append("query_Sup", tiao_pa.query_Sup);
     tab_param.append("query_Cust", tiao_pa.query_Cust);
     tab_param.append("query_User", tiao_pa.query_User);
     tab_param.append("area", tiao_pa.area);
     tab_param.append("employee", tiao_pa.employee);
     tab_param.append("prdNO", tiao_pa.prdNO);
     tab_param.append("prdIndx", tiao_pa.prdIndx);
     tab_param.append("prdWh", tiao_pa.prdWh);
     tab_param.append("chk_User", tiao_pa.chk_User);
      report_data(tab_param)
      .then((response)=>{
        console.log(response)
        this.cols = [...new Set(response.data.Head.split(','))]
        if(response.data.data.length==''){
          this.loading2 = false
          this.data_if = true
          this.table_list  = []
       
        }else{
           this.data_if = false
           this.table_list = response.data.data
          this.data_list = response.data.data
          this.newtab = []
          console.log(this.cols)
          this.tab_data(response.data.Head,this.data_list)

          this.loading2 = false
        }
      }).catch((err)=>{
        console.log(err)
      })
      }else{
        this.loading2 = true
      const tiao_pa = this.arr2json(this.total_Arr)
      var tab_param = new URLSearchParams();
     tab_param.append("reprotNo",this.formInline.region);
     tab_param.append("beginDate", this.formInline.date1[0]);
     tab_param.append("endDate", this.formInline.date1[1]);
     tab_param.append("reporyBusiness",'ARP');
     tab_param.append("isGroupSum",this.formInline.fen);
     tab_param.append("query_DB", tiao_pa.query_DB.split(';').join(','));
     if(tiao_pa.bilNo.substr(0,3) == 'All'){
        tab_param.append("bilNo",' ; ')
     }else{
        tab_param.append("bilNo", tiao_pa.bilNo)
     }
     if(tiao_pa.custNo.substr(0,3) == 'All'){
        tab_param.append("custNo", ' ; ');
     }else{
       tab_param.append("custNo", tiao_pa.custNo);
     }
    if(tiao_pa.custName.substr(0,3) == 'All'){
         tab_param.append("custName", ' ; ')
     }else{
      tab_param.append("custName", tiao_pa.custName)
     }
     if(tiao_pa.custPhone.substr(0,3) == 'All'){
           tab_param.append("custPhone", ' ; ')
     }else{
       tab_param.append("custPhone", tiao_pa.custPhone)
     }
      if(tiao_pa.custAddress.substr(0,3) == 'All'){ 
          tab_param.append("custAddress", ' ; ')
     }else{
       tab_param.append("custAddress", tiao_pa.custAddress)
     }
     if(tiao_pa.inputNo.substr(0,3) == 'All'){
          tab_param.append("inputNo", ' ; ')
     }else{
       tab_param.append("inputNo", tiao_pa.inputNo)
     }
     if(tiao_pa.cust_OS_NO.substr(0,3) == 'All'){
          tab_param.append("cust_OS_NO", ' ; ')
     }else{
      tab_param.append("cust_OS_NO", tiao_pa.cust_OS_NO)
     }
     if(tiao_pa.rem.substr(0,3) == 'All'){
          tab_param.append("rem", ' ; ')
     }else{
      tab_param.append("rem", tiao_pa.rem)
     }
     if(tiao_pa.prdMark.substr(0,3) == 'All'){
         tab_param.append("prdMark", ' ; ')
     }else{
     tab_param.append("prdMark", tiao_pa.prdMark)
     }
    // tab_param.append("bilNo", tiao_pa.bilNo);//''
    // tab_param.append("custNo", tiao_pa.custNo);//''
     //tab_param.append("custName", tiao_pa.custName);//''
     //tab_param.append("custPhone", tiao_pa.custPhone);//''
      // tab_param.append("custAddress", tiao_pa.custAddress);//''
      // tab_param.append("inputNo", tiao_pa.inputNo);//''
     //tab_param.append("cust_OS_NO", tiao_pa.cust_OS_NO); // ''
     //tab_param.append("rem", tiao_pa.rem); //''
     //tab_param.append("prdMark", tiao_pa.prdMark); //''
     tab_param.append("query_CompDep", tiao_pa.query_CompDep);  
     tab_param.append("query_Dep", tiao_pa.query_Dep);
     tab_param.append("query_Sup", tiao_pa.query_Sup);
     tab_param.append("query_Cust", tiao_pa.query_Cust);
     tab_param.append("query_User", tiao_pa.query_User);
     tab_param.append("area", tiao_pa.area);
     tab_param.append("employee", tiao_pa.employee);
     tab_param.append("prdNO", tiao_pa.prdNO);
     tab_param.append("prdIndx", tiao_pa.prdIndx);
     tab_param.append("prdWh", tiao_pa.prdWh);
     tab_param.append("chk_User", tiao_pa.chk_User);

      report_data(tab_param)
      .then((response)=>{
        console.log(response)
        this.cols = [...new Set(response.data.Head.split(','))]
        console.log(this.cols)
        if(response.data.data.length==''){
          this.loading2 = false
          this.data_if = true
          this.table_list  = []
        }else{
           this.data_if = false
          this.table_list = response.data.data
          this.data_list = response.data.data
           this.tab_data(response.data.Head,this.data_list)
          this.loading2 = false
         
        }
      }).catch((err)=>{
        console.log(err)
      })
      }
      }
    },
    tab_data(head,arr){
       var box = document.getElementsByClassName('__view')[0]
          if( head == '账套名称,应收年月,未结金额,未结金额'){
               box.innerHTML=''
            arr.forEach((g,h)=>{
             console.log(g.biln_DD)
              var catr = document.createElement('tr')
              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              console.log(catr)
               box.appendChild(catr)
            })
          }
         if(head == '账套名称,渠道名称,应收年月,未结金额'){
              box.innerHTML=''
            arr.forEach((g,h)=>{
              var catr = document.createElement('tr')

              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.salesChannelName == null?'':g.salesChannelName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         }
         if(head == '账套名称,部门名称,应收年月,未结金额'){
              box.innerHTML=''
           arr.forEach((g,h)=>{
              var catr = document.createElement('tr')

              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.salesDepartmentName == null?'':g.salesDepartmentName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         }
         if(head == '账套名称,终端名称,应收年月,未结金额'){
              box.innerHTML=''
          arr.forEach((g,h)=>{
              var catr = document.createElement('tr')

              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.salesTerminalName == null?'':g.salesTerminalName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         }
          if(head == '账套名称,单位名称,应收年月,未结金额'){
              box.innerHTML=''
            arr.forEach((g,h)=>{
              var catr = document.createElement('tr')

              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.compDepName == null?'':g.compDepName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         }

         if(head == '账套名称,单位名称,渠道名称,应收年月,未结金额'){
              box.innerHTML=''
            arr.forEach((g,h)=>{
              var catr = document.createElement('tr')

              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.compDepName == null?'':g.compDepName}</td> 
                     <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.salesChannelName == null?'':g.salesChannelName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         }
          if(head == '账套名称,单位名称,渠道名称,终端名称,应收年月,未结金额'){
              box.innerHTML=''
            arr.forEach((g,h)=>{
              var catr = document.createElement('tr')

              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.compDepName == null?'':g.compDepName}</td> 
                     <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.salesChannelName == null?'':g.salesChannelName}</td> 
                     <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.salesTerminalName == null?'':g.salesTerminalName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         }
         if(head == '账套名称,单位名称,部门名称,应收年月,未结金额'){
              box.innerHTML=''
            arr.forEach((g,h)=>{
              var catr = document.createElement('tr')
              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.compDepName == null?'':g.compDepName}</td> 
                     <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.salesDepartmentName == null?'':g.salesDepartmentName}</td> 
                 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         } if(head == '账套名称,单位名称,部门名称,终端名称,应收年月,未结金额'){
              box.innerHTML=''
            arr.forEach((g,h)=>{
              var catr = document.createElement('tr')

              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.compDepName == null?'':g.compDepName}</td> 
                    
                       <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.salesDepartmentName == null?'':g.salesDepartmentName}</td> 
                     <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.salesTerminalName == null?'':g.salesTerminalName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         }if(head == '账套名称,单位名称,终端名称,应收年月,未结金额'){
              box.innerHTML=''
            arr.forEach((g,h)=>{
              var catr = document.createElement('tr')

              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.compDepName == null?'':g.compDepName}</td> 
                    
                     <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.salesTerminalName == null?'':g.salesTerminalName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         }if(head == '账套名称,单位名称,业务名称,应收年月,未结金额'){
              box.innerHTML=''
            arr.forEach((g,h)=>{
              var catr = document.createElement('tr')

              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.compDepName == null?'':g.compDepName}</td> 
                    
                     <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.sellingOperationName == null?'':g.sellingOperationName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         }
         if(head == '账套名称,单位名称,业务名称,终端名称,应收年月,未结金额'){
              box.innerHTML=''
            arr.forEach((g,h)=>{
              var catr = document.createElement('tr')

              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.compDepName == null?'':g.compDepName}</td> 
                    
                     <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.sellingOperationName == null?'':g.sellingOperationName}</td> 
                       <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.salesTerminalName == null?'':g.salesTerminalName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         }
         if(head == '账套名称,业务名称,应收年月,未结金额'){
              box.innerHTML=''
            arr.forEach((g,h)=>{
              var catr = document.createElement('tr')

              catr.style.width= '100%'
              catr.style.display= 'flex';
              catr.className = 'odd'
              catr.innerHTML=`
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.affiliateName}</td> 
                    <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.sellingOperationName == null?'':g.sellingOperationName}</td> 
                  <td style='text-align: center;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${g.biln_DD == null?'':g.biln_DD}</td> 
                  <td style='text-align: right;-webkit-box-flex: 1;flex: 1;border-collapse: collapse; font-size: 14px;
                    font-family: seri'>${String(g.sAmtn_ARPJ).replace(/^(.*\..{4}).*$/,"$1")}</td> 
              `
              box.appendChild(catr)
            })
         }
    },


    add(){
          this.ruleForm.query=''
          this.ruleForm.order=''
          this.ruleForm.info_num=''
          this.ruleForm.info_na=''
          this.ruleForm.info_car=''
          this.ruleForm.info_home=''
          this.ruleForm.into_no=''
          this.ruleForm.info_order=''
          this.ruleForm.note=''
          this.ruleForm.col_no=''
          this.ruleForm.accon=[]
          this.ruleForm.erp_bu=[]
          this.ruleForm.erp_chang=[]
          this.ruleForm.erp_zhong=[]
          this.ruleForm.erp_yong=[]
          this.ruleForm.erp_shen=[]
          this.ruleForm.sa_qu=[]
          this.ruleForm.sa_info=[]
          this.ruleForm.no=[]
          this.ruleForm.goo_ku=[]
          this.ruleForm.goo_in=[]
    },
     handleEdit(index, row) {
       this.index_idx = String(index)
        console.log(index, row);
        this.innerVisible = true
        this.ruleForm.query=row.query_DB
        this.ruleForm.order=row.bilNo
          this.ruleForm.info_num=row.custNo
          this.ruleForm.info_na=row.custName
          this.ruleForm.info_car=row.custPhone
          this.ruleForm.info_home=row.custAddress
          this.ruleForm.into_no=row.inputNo
          this.ruleForm.info_order=row.cust_OS_NO
          this.ruleForm.note=row.rem
          this.ruleForm.col_no=row.prdMark
          this.ruleForm.accon=row.query_CompDep.length==0?row.query_CompDep:row.query_CompDep.split(',')
          this.ruleForm.erp_bu=row.query_Dep.length==0?row.query_Dep:row.query_Dep.split(',')
          this.ruleForm.erp_chang=row.query_Sup.length==0?row.query_Sup:row.query_Sup.split(',')
          this.ruleForm.erp_zhong=row.query_Cust.length==0?row.query_Cust:row.query_Cust.split(',')
          this.ruleForm.erp_yong=row.query_User.length==0?row.query_User:row.query_User.split(',')
          this.ruleForm.erp_shen=row.chk_User.length==0?row.chk_User:row.chk_User.split(',')
          this.ruleForm.sa_qu=row.area.length==0?row.area:row.area.split(',')
          this.ruleForm.sa_info=row.employee.length==0?row.employee:row.employee.split(',')
          this.ruleForm.no=row.prdNO.length==0?row.prdNO:row.prdNO.split(',')
          this.ruleForm.goo_ku=row.prdIndx.length==0?row.prdIndx:row.prdIndx.split(',')
          this.ruleForm.goo_in=row.prdWh.length==0?row.prdWh:row.prdWh.split(',')
      },
      //删除条件
      handleDelete(index, row) {
        console.log(index, row);
        this.total_Arr.splice(index,1)
        this.query_Arr.push({
          query_DB:row.query_DB
        })
      },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.innerVisible = false
            if(this.index_idx){
              console.log( this.total_Arr[this.index_idx])
              
              this.total_Arr[this.index_idx].query_DB=this.ruleForm.query,
              this.total_Arr[this.index_idx].bilNo=this.ruleForm.order,
              this.total_Arr[this.index_idx].custNo=this.ruleForm.info_num,
              this.total_Arr[this.index_idx].custName=this.ruleForm.info_na,
              this.total_Arr[this.index_idx].custPhone=this.ruleForm.info_car,
              this.total_Arr[this.index_idx].custAddress=this.ruleForm.info_home,
              this.total_Arr[this.index_idx].inputNo=this.ruleForm.into_no,
              this.total_Arr[this.index_idx].cust_OS_NO=this.ruleForm.info_order,
              this.total_Arr[this.index_idx].rem=this.ruleForm.note,
              this.total_Arr[this.index_idx].prdMark=this.ruleForm.col_no,
              this.total_Arr[this.index_idx].query_CompDep=this.ruleForm.accon.toString(),
              this.total_Arr[this.index_idx].query_Dep=this.ruleForm.erp_bu.toString(),
              this.total_Arr[this.index_idx].query_Sup=this.ruleForm.erp_chang.toString(),
              this.total_Arr[this.index_idx].query_Cust=this.ruleForm.erp_zhong.toString(),
              this.total_Arr[this.index_idx].query_User=this.ruleForm.erp_yong.toString(),
              this.total_Arr[this.index_idx].chk_User=this.ruleForm.erp_shen.toString(),
              this.total_Arr[this.index_idx].area=this.ruleForm.sa_qu.toString(),
              this.total_Arr[this.index_idx].employee=this.ruleForm.sa_info.toString(),
              this.total_Arr[this.index_idx].prdNO=this.ruleForm.no.toString(),
              this.total_Arr[this.index_idx].prdIndx=this.ruleForm.goo_ku.toString(),
              this.total_Arr[this.index_idx].prdWh=this.ruleForm.goo_in.toString()
            }else{
              
              const data_list_tab = {
                 query_DB:this.ruleForm.query,
                  bilNo:this.ruleForm.order,
                  custNo:this.ruleForm.info_num,
                  custName:this.ruleForm.info_na,
                  custPhone:this.ruleForm.info_car,
                  custAddress:this.ruleForm.info_home,
                  inputNo:this.ruleForm.into_no,
                  cust_OS_NO:this.ruleForm.info_order,
                  rem:this.ruleForm.note,
                  prdMark:this.ruleForm.col_no,
                  query_CompDep:this.ruleForm.accon.toString(),
                  query_Dep:this.ruleForm.erp_bu.toString(),
                  query_Sup:this.ruleForm.erp_chang.toString(),
                  query_Cust:this.ruleForm.erp_zhong.toString(),
                  query_User:this.ruleForm.erp_yong.toString(),
                  chk_User:this.ruleForm.erp_shen.toString(),
                  area:this.ruleForm.sa_qu.toString(),
                  employee:this.ruleForm.sa_info.toString(),
                  prdNO:this.ruleForm.no.toString(),
                  prdIndx:this.ruleForm.goo_ku.toString(),
                  prdWh:this.ruleForm.goo_in.toString()
              }
                this.total_Arr.push(data_list_tab)
                console.log(this.ruleForm.query)
                console.log(this.query_Arr)
                // this.query_Arr = this.query_Arr.splice(this.query_Arr.indexOf(this.ruleForm.query),1)
                var _this = this
              this.query_Arr = this.query_Arr.filter(function(item){ return item.query_DB != _this.ruleForm.query});
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //货品库区
    goo_in_click(){
        if(this.ruleForm.query == ''){
                  this.$message({
                    showClose: true,
                    message: "请先选择账套",
                    type: "warning"
                  });
              }else{
                goo_in_api({
                accountNo:this.ruleForm.query,
                  }).then((response)=>{
                    console.log(response)
                    this.goo_in_Arr = response.data.idNameList
                  }).catch((err)=>{
                    console.log(err)
                  })
        }
    },
    //货品中类
    goo_ku_click(){
        if(this.ruleForm.query == ''){
                  this.$message({
                    showClose: true,
                    message: "请先选择账套",
                    type: "warning"
                  });
              }else{
                goo_ku_api({
                accountNo:this.ruleForm.query,
                  }).then((response)=>{
                    console.log(response)
                    this.goo_ku_Arr = response.data.idNameList
                  }).catch((err)=>{
                    console.log(err)
                  })
        }
    },
    //销售人员
    sa_info_click(){
        if(this.ruleForm.query == ''){
                  this.$message({
                    showClose: true,
                    message: "请先选择账套",
                    type: "warning"
                  });
              }else{
                sa_info_api({
                accountNo:this.ruleForm.query,
                  }).then((response)=>{
                    console.log(response)
                    this.sa_info_Arr = response.data.idNameList
                  }).catch((err)=>{
                    console.log(err)
                  })
              }
    },
    //销售渠道
    sa_qu_click(){
      if(this.ruleForm.query == ''){
                  this.$message({
                    showClose: true,
                    message: "请先选择账套",
                    type: "warning"
                  });
              }else{
                sa_qu_api({
                accountNo:this.ruleForm.query,
                  }).then((response)=>{
                    console.log(response)
                    this.sa_qu_Arr = response.data.idNameList
                  }).catch((err)=>{
                    console.log(err)
                  })
              }
    },
    //用户
    erp_yong_click(){
      if(this.ruleForm.query == ''){
                  this.$message({
                    showClose: true,
                    message: "请先选择账套",
                    type: "warning"
                  });
              }else{
                making({
                accountNo:this.ruleForm.query,
                custType:'1'
                  }).then((response)=>{
                    console.log(response)
                    this.erp_yong_Arr = response.data.idNameList
                  }).catch((err)=>{
                    console.log(err)
                  })
              }
    },
    //终端
    erp_zhong_click(){
      if(this.ruleForm.query == ''){
                  this.$message({
                    showClose: true,
                    message: "请先选择账套",
                    type: "warning"
                  });
              }else{
                terminal({
                accountNo:this.ruleForm.query,
                custType:'1'
                  }).then((response)=>{
                    console.log(response)
                    this.erp_zhong_Arr = response.data.idNameList
                  }).catch((err)=>{
                    console.log(err)
                  })
              }
    },
       //厂商
    erp_chang_click(){
        if(this.ruleForm.query == ''){
                  this.$message({
                    showClose: true,
                    message: "请先选择账套",
                    type: "warning"
                  });
              }else{
                brand({
                accountNo:this.ruleForm.query,
                custType:'2'
                  }).then((response)=>{
                    console.log(response)
                    this.erp_chang_Arr = response.data.idNameList
                  }).catch((err)=>{
                    console.log(err)
                  })
              }
    },

    //部门下拉
    erp_bu_click(){
         if(this.ruleForm.query == ''){
                  this.$message({
                    showClose: true,
                    message: "请先选择账套",
                    type: "warning"
                  });
              }else{
                authorization({
                accountNo:this.ruleForm.query,
                custType: "2"
                  }).then((response)=>{
                    console.log(response)
                    this.erp_bu_Arr = response.data.idNameList
                  }).catch((err)=>{
                    console.log(err)
                  })
              }
    },
    //核算单位下拉
    accon_click(){
      if(this.ruleForm.query == ''){
              this.$message({
                showClose: true,
                message: "请先选择账套",
                type: "warning"
              });
          }else{
            accounting({
            accountNo:this.ruleForm.query,
              }).then((response)=>{
                console.log(response)
                this.accon_Arr = response.data.idNameList
              }).catch((err)=>{
                console.log(err)
              })
          }
    },
    //品号下拉
    order_click(){
          console.log(this.ruleForm.query)
          if(this.ruleForm.query == ''){
              this.$message({
                showClose: true,
                message: "请先选择账套",
                type: "warning"
              });
          }else{
            order_no({
            accountNo:this.ruleForm.query
              }).then((response)=>{
                console.log(response)
                this.order_Arr = response.data.idNameList
              }).catch((err)=>{
                console.log(err)
              })
          }
        },
       
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      report(){
        Modules().then((response)=>{
            console.log(response)
            var list_data = response.data.module
            list_data.forEach((i,idx)=>{
                if(i.mod_Level == 'spmarp'){
                    this.list_report.push({
                        mod_Name:i.mod_Name.replace('机构','销售'),
                        mod_ID:i.mod_ID,
                    })
                    // console.log( this.list_report)
                }
            })
            
        }).catch((err)=>{
            console.log(err)
        })
      },
     
  }
};
</script>
<style>
.odd:nth-child(odd){
 background: rgba(1, 174, 255, 0.17) !important; 
}
.odd:nth-child(even) {
  background: rgba(1, 174, 255, 0.08) !important; 
}
.inner_table table tbody .el-loading-mask{
   background: none !important;
}
.tab_list_le  td>.cell{
  text-align: center
}
.tab_list_le  th>.cell{
  text-align: center
}
.tiaojian .el-dialog__body{
    padding:20px 10px !important;
}
.tiaojian .el-form{
    height: 600px;
}
.tiaojian .el-form .el-form-item{
        width: 49%;
        display: inline-block;
        line-height: 30px;
        margin-bottom: 18px;
}
.tiaojian .el-form .el-form-item:nth-child(11){
    width:99%;
    display: block;
}
.tiaojian .el-form .el-form-item:last-child{
    width:100%;
    display: block;
}
.tiaojian .el-form .el-form-item:last-child .el-form-item__content{
   margin-left:0 !important;
   text-align: center;
   margin-top: 20px
}
.tiaojian .el-form .el-form-item label{
    line-height: 30px;
}
.tiaojian .el-form .el-form-item .el-form-item__content{
    line-height: 30px;
}
.tiaojian .el-form .el-form-item .el-input__inner{
    height: 30px;
    line-height: 30px;
}
.tiaojian .el-form .el-form-item .el-input__icon{
    line-height: 30px;
}
</style>
<style scoped  media="print">
.inner_table {
   -webkit-print-color-adjust: exact;
  width:100%;
  height: 100%;
  margin-top: 30px;
  display: flex !important;
}

.inner_table table {
  color: #000;
   width:100%;
  text-align: center;
  flex: 1;
  height: 100%;
  position: relative;
  height: 550px;
  overflow: hidden;
      border-spacing: 0px;
  border-collapse: collapse;
}
.inner_table table thead,.inner_table table thead tr{
      width: 100%;
    display: flex;
}
.inner_table table thead,.inner_table table thead tr{
      width: 100%;
    display: flex;
}

.inner_table table tbody{
  position: absolute;
  width: 100%;
  overflow: auto;
  height: 500px;
}
.inner_table table tbody tr{
    width: 100%;
    display: flex;

}
.inner_table table thead tr th,  .inner_table table tbody td{
  flex: 1;
  text-align: center;
border-collapse:collapse;
}
 .inner_table table tbody td{
    text-align: text;
 }

 .inner_table table tbody td:last-child{
   text-align: right;
 }
 h4{
   display: none;
 }
 
  /* .inner_table table tr{
    float: left;
    position: relative;
    overflow: hidden;
    border-collapse:collapse;
  }
.btn_calss button:nth-child(2){
  margin-left: 10px;
}

.inner_table td {
  height: 30px !important;
}
*/

.inner_table td{
   font-family: SimHei;
    font-size: 14px;
}
.inner_table th {
  font-family: SimHei;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
} 

.inner_table thead {
 background:rgba(33, 33, 33, 0.4);
  font-weight: bold;
  color: #6b3c3c;
} 
.inner_table thead {
 background:rgba(33, 33, 33, 0.4);
}
.inner_table tbody tr:nth-child(odd) {
    background: rgba(1, 174, 255, 0.17);
  }

.inner_table tbody tr:nth-child(even) {
    background: rgba(1, 174, 255, 0.08);
} 

</style>