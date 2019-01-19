<template>
  <div id="Home" >
    <el-container style="height:100%">
  <el-header style="padding:0">
      <headerVue></headerVue>  
  </el-header>
  <div style="width:100%;position:relative;background: #ececec;">
    <div class="grid-content bgg" style="width:206px;float:left;">
         <i class="fontFamily re-icon-ump-shouye" style="margin-left:24px;margin-top:9px;color:rgb(218, 116, 8);display: inline-block;"></i>
        <span slot="title" style="margin-left:14px;color:#fff">功能导航</span>
        <i class='fontFamily re-icon-ump-goutongye_santiaogang_tiaozhuanxuanzehaizi' @click='btn()' style="float:right;display: inline-block;margin-top: 9px;color:rgb(218, 116, 8);margin-right: 10px;"></i>
    </div>
     <weiZhi style="float:left;"></weiZhi> 
   
</div>
  <el-container>
 <leftVue :message="isCollapse" style="background:#ffffff"></leftVue>  
   <!-- <vue-scroll :ops="ops"> -->
    <el-main class='main' style="background:url(static/img/one.jpg) no-repeat;background-size:100% 100%"> <router-view /></el-main>
   <!-- </vue-scroll> -->
  </el-container>
</el-container>
  </div>
</template>

<script>
import { Verification,Login_log} from "@/mock/api";
import headerVue from '@/component/HomePage/nav/header_vue'
import leftVue from '@/component/HomePage/left_nav/left_nav'
import weiZhi from '@/component/HomePage/weizhi/weizhi_wei'
export default {
  name: "Home",
  components:{
    headerVue,
    leftVue,
    weiZhi
  },
  data() {
    return {
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
          isCollapse: false
    };
  },
  beforeMount() {
  
  },
  mounted() {
 
  },
  methods: {
   btn(){
     this.isCollapse = !this.isCollapse
   }
    
            
  }
}
</script>
<style>
</style>

<style scoped>
    #Home{
      height: 1086px;
      background:#b8c8d7;
    }
    .chart-box{
      width: 100%;
      height:60px;
    }
    .main{
      border: 1px solid black;
      padding:10px;
    
    }
    
  .el-row {

    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .bgg{
       background: #334b63;
  }
  .bg-purple {
      background: #dedede;
  }
  .bg-purple-light {
        background: #dedede;
  }
  .grid-content {
    min-height: 36px;
  }
</style>
