<template>
  <div id="Home">
    <el-row :gutter="20">
  <el-col :span="3" style="background:#545c64">
    <div class="grid-content bg-purple lefsss">
     <div class="left_img">
              <img src="static/img/logo.png" alt="" class="el_img">
      </div>
    </div></el-col>
  <el-col :span="21"><div class="grid-content bg-purple">
     <div class="nav_top">
            <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo nav_menu"
  mode="horizontal"
  width='100%'
  text-color="#fff"
  @select="handleSelect"
  background-color="#545c64"
  hover-text-color="#f3782a"
  active-text-color="#ffd04b">
  <el-submenu index="会员">
      <template slot="title"><a class="button"> <i class="fontFamily re-icon-ump-huiyuan" style="font-size: 16px;padding-right: 5px;"></i>会员</a></template>
       <el-menu-item index="选项1">选项1</el-menu-item>
  </el-submenu>
  <el-submenu index="客户">
    <template slot="title"><a class="button"> <i class="fontFamily re-icon-ump-kehu" style="font-size: 16px;padding-right: 5px;"></i>客户</a></template>
    <el-menu-item index="选项1">选项1</el-menu-item>
    <el-menu-item index="选项2">选项2</el-menu-item>
    <el-menu-item index="选项3">选项3</el-menu-item>
    <el-submenu index="选项4">
      <template slot="title">选项4</template>
      <el-menu-item index="选项1">选项1</el-menu-item>
      <el-menu-item index="选项2">选项2</el-menu-item>
      <el-menu-item index="选项3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
   <el-submenu index="报价">
       <template slot="title"><a class="button"><i class="fontFamily re-icon-ump-baojia" style="font-size: 16px;padding-right: 5px;"></i>报价</a></template>
  </el-submenu>
    <el-submenu index="生产">
       <template slot="title"><a class="button"><i class="fontFamily re-icon-ump-shengchan" style="font-size: 16px;padding-right: 5px;"></i>生产</a></template>
  </el-submenu>
    <el-submenu index="订单">
       <template slot="title"><a class="button"><i class="fontFamily re-icon-ump-order" style="font-size: 16px;padding-right: 5px;"></i>订单</a></template>
  </el-submenu>
    <el-submenu index="销售">
       <template slot="title"><a class="button"><i class="fontFamily re-icon-ump-xiaoshou" style="font-size: 16px;padding-right: 5px;"></i>销售</a></template>
        <!-- <el-menu-item index="销售报表">销售报表</el-menu-item> -->
        <el-menu-item index="选项2">选项2</el-menu-item>
  </el-submenu>
    <el-submenu index="库存">
       <template slot="title"><a class="button"><i class="fontFamily re-icon-ump-kucun" style="font-size: 16px;padding-right: 5px;"></i>库存</a></template>
  </el-submenu>
    <el-submenu index="采购">
       <template slot="title"><a class="button"><i class="fontFamily re-icon-ump-purchase" style="font-size: 16px;padding-right: 5px;"></i>采购</a></template>
  </el-submenu>
    <el-submenu index="财务">
       <template slot="title"><a class="button"><i class="fontFamily re-icon-ump-caiwu" style="font-size: 16px;padding-right: 5px;"></i>财务</a></template>
  </el-submenu>
    <el-submenu index="物流">
       <template slot="title"><a class="button"><i class="fontFamily re-icon-ump-wuliu" style="font-size: 16px;padding-right: 5px;"></i>物流</a></template>
  </el-submenu>
    <el-submenu index="售后">
       <template slot="title"><a class="button"><i class="fontFamily re-icon-ump-tiexinshouhou" style="font-size: 16px;padding-right: 5px;"></i>售后</a></template>
  </el-submenu>
    <el-submenu index="分析">
       <template slot="title"><a class="button"><i class="fontFamily re-icon-ump-fenxi" style="font-size: 16px;padding-right: 5px;"></i>分析</a></template>
        <el-menu-item index="应收分析">应收分析</el-menu-item>
        <el-menu-item index="销售分析">销售分析</el-menu-item>
  </el-submenu>
    <el-submenu index="系统">
       <template slot="title"><a class="button"><i class="fontFamily re-icon-ump-xitong" style="font-size: 16px;padding-right: 5px;"></i>系统</a></template>
        <el-menu-item index="用户管理">用户管理</el-menu-item>
        <el-menu-item index="账套管理">账套管理</el-menu-item>
  </el-submenu>
 
</el-menu>

          </div>
    </div></el-col>
</el-row>


  </div>
</template>

<script>
 
import { Verification} from "@/mock/api";
import router from "@/router/index"
import bus from '@/component/HomePage/eventBus.js'
export default {
  name: "app",
  data() {
    return {
        activeIndex2: '1',
       breads:[],
    };
  },
  computed:{

  },
  beforeMount() {
  
  },
  mounted() {
 
  },
 
  methods: {
     handleSelect(key, keyPath) {
       this.resetSetItem('watchStorage', JSON.stringify(keyPath));
    switch (key) {
        case "选项1":
          router.push({ name: "Vip" });
          break;
        case "用户管理":
          router.push({ name: "management" });
          break;
        case "销售分析":
          router.push({ name: "Sales" });
          break;
        case "账套管理":
          router.push({ name: "zhang" });
          break;
        case "应收分析":
          router.push({ name: "analysis" });
          break;
        default:
      }
      }
    
            
  }
}
</script>
<style>
.el-submenu__title i{
  color: #b6fffc !important;
}


.disabled .el-upload--picture-card {
    display: none !important;
}

.el-dialog__header{
    padding:10px 0px 0px 0px !important;
    text-align: center !important;
}
.el-input.is-disabled .el-input__inner {
    border-color: #9da0a7 !important;
    color: #0e0e0e !important;
    float: left !important;
    width: 250px !important;
}
 

.el-menu--horizontal>.el-submenu:hover .el-submenu__title{
    color:rgb(255, 208, 75)!important;
    /* border-bottom-color: rgb(255, 208, 75) !important; */
}
.button:hover::after{
    left: 1% !important;
    right: 1% !important;
    opacity: 1 !important;
    -webkit-transition: all .8s  !important;
    -o-transition: all .8s  !important;
    -ms-transition: all .8s;transition: all .8s !important;

}
.button::after{
    content: ""  !important;
    display: block  !important;
    position: absolute  !important;
    left: 50%  !important;
    right: 50%  !important;
    bottom: -3px  !important;
    height: 3px  !important;
    opacity: 0  !important;
    background-color:rgb(255, 208, 75)   !important;
    transition: all 0.8s ease 0s  !important;

    /* content: ""  !important;
    width: 0  !important;
    height: 5px  !important;
    background: #34c9dd  !important;
    position: absolute  !important;
    bottom: 0  !important;
    left: 0  !important;
    transition: all 0.5s ease 0s  !important; */
}
.nav_menu  .el-menu-item.is-hover {
    border-bottom-color: rgb(255, 208, 75) !important;
}

.nav_menu .el-submenu__title{
    padding: 0 15px !important;
}
.nav_menu .el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
        min-width: 110px !important;
}
.nav_menu .el-submenu .el-menu-item{
    min-width: 110px !important;
}
</style>

<style scoped>

.button{
    width: 50px; 
    height: 63px;
    display: inline-block;
}
.el-menu--horizontal>.el-submenu{
  width: 7.68%;
  text-align: center;
}

.el-menu--horizontal>.el-submenu:nth-child(1){
      margin-left: 1px;
}

.nav_top{
  width: 100%;
    height: 60px;
    float: left;
}

.left_img{
    float: left;
}

.el_img{
    width: 100%;
    height: 100%;
}
.el-row {
    margin-bottom: 20px;
   background: #545c64;
       margin-left:0 !important;; 
   margin-right: 0 !important; 
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .bg-purple-dark {
    /* background: #99a9bf; */
  }
  .bg-purple {
    background: #545c64;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 60px;
   
  }
  .row-bg {
    background-color: #f9fafc;
  }
  .lefsss{
        width: 170px;
    margin-left: 16px;
    margin-top: 7px;
  }
  @media screen and (min-width:1800px) and (max-width:1920px){ /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
        .el-col-3{
          width: 10.5% !important;
        }
        .el-col-21{
          width: 89.5% !important;
        }
  }
  @media screen and (min-width:1400px) and (max-width:1600px){ /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
        .el-col-3{
          width: 14% !important;
        }
        .el-col-21{
          width: 86% !important;
        }
  }
  @media screen and (max-width: 1400px) { /*当屏幕尺寸小于 1400px时，应用下面的CSS样式*/
   .el-col-3{
          width: 15% !important;
        }
        .el-col-21{
          width: 85% !important;
        }
}
</style>
