
<template>
    <div id="pagging" class="paging pagingStyle">
        <div class="paging_item" @click="firstPage">首页</div>
    <el-pagination
      @size-change="handleSizeChange"
       class='el_item'
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="page_size"
      :pager-count="5"
      layout="total,prev, pager, next, jumper"
      :total="total_count">
    </el-pagination>
    <!-- <div class="paging_item pucho_item" @click="puchoPage">尾页</div> -->
     </div>
</template>
<script>
import {account} from '@/mock/api'
export default {
  name: "pagging",
  props: ["owner"],
  components: {
  },
  data() {
    return {
         currentPage: 1,
         page_size: 7,
         total_count:10,
         data_list:[]
    };
  },
  mounted() {
    this.getDataInfolist()
  },
    watch: {
    searchParam: {
      handler(newValue, oldValue) {
        this.getDataInfolist(this.searchParam);
        this.currentPage = 1;
      }
    }
    },
  methods: {

      firstPage() {
      this.currentPage = 1;
    },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`); 
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        if(this.owner == 'ZhangTao'){
            console.log(1)
            this.getDataInfolist(val);
        }
      },
      getDataInfolist(param){
           if (param == "") {
                return;
            }
            if (this.owner == "ZhangTao") {
                this.page_size = 7;
               
            }
      }

  }
};
</script>
<style>
      .paging .el-input__inner {
        width: 50px;
        text-align: center;
        height: 30px !important;
        line-height: 30px !important;
        border-radius: 1px !important;
          border: #000 1px solid !important;
        background: #fff !important;
        font-family: MicrosoftYaHei !important;
        font-size: 14px !important;
        font-weight: normal !important;
        font-stretch: normal !important;
        letter-spacing: 0px !important;
        color: black !important;
      
        cursor: auto !important;
      }
      .paging .el-input {
        margin-left: 15px;
        margin-right: 15px;
      }
      .paging .el-pagination__jump {
        width: 150px;
        color: #000 !important;
        float: left;
        margin-right: 10px !important;
        margin-left: 10px !important;
      }
      .paging .el-pagination__total {
        height: 30px !important;
        line-height: 30px !important;
        color: #000 !important;
      }
      .paging .el-icon-arrow-left {
        display: none !important;
      }
      .paging .el-icon-arrow-right {
        display: none !important;
      }
      .paging .btn-prev:before {
        content: "上一页";
        cursor: pointer;
      }
      
      .paging .btn-next:before {
        content: "下一页";
        cursor: pointer ;
      }
      .paging .btn-next {
        float: left !important;
        height: 30px !important;
        line-height: 30px !important;
        border-radius: 1px !important;
        border: solid 1px #000 !important;
        background: #fff !important;
        font-family: MicrosoftYaHei !important;
        font-size: 14px !important;
        font-weight: normal !important;
        font-stretch: normal !important;
        letter-spacing: 0px !important;
        margin-right: 14px !important;
        padding: 0 10px !important;
        cursor: pointer;
        color: #000 !important ;
      }
      
      .paging .btn-prev {
        float: left !important;
        height: 30px !important;
        line-height: 30px !important;
        border-radius: 1px !important;
        border: solid 1px #000 !important;
        background:#fff !important;
        font-family: MicrosoftYaHei !important;
        font-size: 14px !important;
        font-weight: normal !important;
        font-stretch: normal !important;
        letter-spacing: 0px !important;
        margin-right: 14px !important;
        padding: 0 10px !important;
        cursor: pointer;
        color: #000 !important;
      }
      .paging .btn-prev:hover,
      .btn-next:hover {
        border-color: #000;
        background-color: #000;
        color: #fff;
        cursor: pointer;
      }
      
      .paging .el-pagination {
        padding: 0;
      }
      
      .paging .el-pager {
        float: left;
      }
      .paging .el_item {
        float: left;
        cursor: pointer;
      }
      .paging .el_item li {
        float: left;
        height: 30px;
        line-height: 30px;
        border-radius: 1px;
        border: solid 1px #000;
        background:#fff;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-right: 14px;
        padding: 0 10px;
        cursor: pointer !important;
        color: #000 !important;
      }
      .paging .el-pager li.active {
        border-color: rgba(217, 159, 0, 0.4);
        background-color: #000;
        color: #fff !important;
        cursor: default;
      }
      .paging .el-pager li:hover {
        background-color: #000;
        color: #fff !important;
        cursor: default;
      }
    
        .paging .el-pager li.active+li{
            border-left: 1px solid #000;
          }
      .paging .el-pagination__total {
        float: right;
      }
      .paging .el-pagination button:disabled {
        background: #fff;
        border: solid 1px #000;
        color: #000;
        /* cursor: not-allowed; */
        cursor: pointer;
      }
      </style>
        <style scoped>
      .pucho_item {
        position: absolute;
        right: 232px;
      }
      .paging {
        position: absolute;
        right:0px;
        bottom: 15px;
      }
      .paging .paging_item {
        float: left;
        height: 30px;
        line-height: 30px;
        border-radius: 1px;
        border: solid 1px black;
        background: #fff;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-right: 14px;
        padding: 0 12px;
        cursor: pointer;
        color: #000;
      }
      .paging .paging_item:last-child {
        margin-right: 0;
      }
      .paging .paging_item.active,
      .paging .paging_item:hover {
        background-color:#000;
        color: #fff;
      }
      .paging .this_page {
        width: 80px;
        cursor: auto;
        text-align: center;
      }
      .paging .noBorder {
        border: 0;
        background: transparent;
        letter-spacing: 8px;
        padding: 0;
        margin-right: 5px;
      }
      </style>