<template>
  <div id="left_nav">
<el-menu default-active="1-4-1"   @select="handleSelect"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="message">
   
   <el-menu-item index="首页">
    <i class="fontFamily re-icon-ump-shouye"></i>
    <span slot="title">首页</span>
  </el-menu-item>
  <el-menu-item index="采购管理">
    <i class="fontFamily re-icon-ump-caigouguanli"></i>
    <span slot="title">采购管理</span>
  </el-menu-item>
  <el-menu-item index="销售管理">
    <i class="fontFamily re-icon-ump-xiaoshouguanli"></i>
    <span slot="title">销售管理</span>
  </el-menu-item>
   <el-menu-item index="售后管理">
    <i class="fontFamily re-icon-ump-shouhouguanli"></i>
    <span slot="title">售后管理</span>
  </el-menu-item>
   <el-menu-item index="配送管理">
    <i class="fontFamily re-icon-ump-peisongguanli"></i>
    <span slot="title">配送管理</span>
  </el-menu-item>
  <el-menu-item index="财务管理">
    <i class="fontFamily re-icon-ump-caiwuguanli1"></i>
    <span slot="title">财务管理</span>
  </el-menu-item>
    <el-menu-item index="库存管理">
    <i class="fontFamily re-icon-ump-inventory_management"></i>
    <span slot="title">
        库存管理
    </span>
  </el-menu-item>
  <el-menu-item index="数据中心">
    <i class="fontFamily re-icon-ump-chaorongheshujuzhongxin"></i>
    <span slot="title">数据中心</span>
  </el-menu-item>
    <el-menu-item index="系统管理">
    <i class="fontFamily re-icon-ump-xitongguanli"></i>
    <span slot="title">系统管理</span>
  </el-menu-item>
  
</el-menu>
       
  </div>
</template>

<script>
import { Verification,Login_log} from "@/mock/api";
import icon from '@/common/icon/iconfont.css'
import router from "@/router/index"
import bus from '@/component/HomePage/eventBus.js'
export default {
  props: ["message"],
  name: "left_nav",
  data() {
    return {
      
    };
  },
  beforeMount() {
  
  },
  mounted() {
  },
  methods: {
       handleSelect(key, keyPath) {
         if(keyPath == '首页'){
           keyPath.splice('首页')
           console.log(keyPath)
         this.resetSetItem('watchStorage', JSON.stringify(keyPath));
         }else{
          this.resetSetItem('watchStorage', JSON.stringify(keyPath));
         }
         
        console.log(key, keyPath);
    switch (key) {
        case "首页":
        router.push({ name: "HomePage" }); 
         break;
        case "采购管理":
        router.push({ name: "procure" });
         break;
        case "销售管理":
        router.push({ name: "sales" });
         break;
        case "售后管理":
        router.push({ name: "afterSales" });
         break;
        case "配送管理":
        router.push({ name: "Distribution" });
         break;
        case "财务管理":
        router.push({ name: "Financial" });
         break;
        case "库存管理":
        router.push({ name: "Stock" });
         break;
        case "数据中心":
          router.push({ name: "Data" });
          break;
         case "系统管理":
          router.push({ name: "System" });
          default:
          break;
      }
      },
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }

            
  }
}
</script>
<style>

</style>

<style scoped>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width:205px;
    min-height: 400px;
  }

</style>
