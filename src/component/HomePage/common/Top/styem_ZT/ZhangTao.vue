<template>
  <div id="zhangtao">
    <el-row style="float:left;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="检索条件:" class="search">
          <el-input
            v-model="formInline.user"
            placeholder="请输入检索内容"
            @keyup.enter.native="onSubmit()"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" icon="el-icon-search" size="medium">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="float:right;margin-right:20px;">
      <el-button
        type="primary"
        icon="el-icon-edit"
        plain
        size="medium"
        @click="dialogVisible = true,addItem()"
      >增加</el-button>
      <el-button type="danger" icon="el-icon-delete" size="medium" @click='more_del()'>多选删除</el-button>
    </el-row>

    <el-dialog :title="tit" :visible.sync="dialogVisible" width="25%" class="zhangtao">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm dia"
      >
        <el-form-item label="ID值" prop="id">
          <el-input v-model="ruleForm.id" placeholder="请输入ID值"></el-input>
        </el-form-item>
        <el-form-item label="数据库名" prop="data_name">
          <el-input v-model="ruleForm.data_name" placeholder="请输入数据库名称"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="user">
          <el-input v-model="ruleForm.user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="IP_address">
          <el-input v-model="ruleForm.IP_address" placeholder="请输入IP地址(192.168.1.1)"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port_num">
          <el-input v-model="ruleForm.port_num" placeholder="请输入端口号"></el-input>
        </el-form-item>
        <el-form-item label="数据库类型" prop="data_type">
          <el-select v-model="ruleForm.data_type" placeholder="请选择数据类型">
            <el-option label="SQLServe2005" value="SQLServe2005"></el-option>
            <el-option label="SQLServe2008" value="SQLServe2008"></el-option>
            <el-option label="SQLServe2012" value="SQLServe2012"></el-option>
            <el-option label="SQLServe2014" value="SQLServe2014"></el-option>
            <el-option label="SQLServe2016" value="SQLServe2016"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="btn_item" >
          <el-button type="primary" @click="submitForm('ruleForm')">{{text}}</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <template>
      <el-table
        :data="tableData"
        v-loading="loading2"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
        style="width: 100%;background:none;top: 20px;"
        class="form_tab data_tab"
        ref="multipleTable"
        height="780px"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="db_Id" label="ID值" width="200px"></el-table-column>
        <el-table-column prop="db_Name" label="数据库名"></el-table-column>
        <el-table-column prop="db_User" label="用户" width="100px"></el-table-column>
        <el-table-column prop="db_Pwd" label="密码" width="100px"></el-table-column>
        <el-table-column prop="server_Address" label="IP地址" width="200px"></el-table-column>
        <el-table-column prop="db_Prot" label="端口号" width="150px"></el-table-column>
        <el-table-column prop="db_Type" label="数据库类型" width="200px"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- <padding :owner="type"  @ZhangDataList="ZhangData"></padding>  -->
  </div>
</template>
<script>
import {
  account,
  Database,
  Database_info,
  def_info,
  Delete_info,
Delete_infos
} from "@/mock/api";
import padding from "@/component/HomePage/common/paging/paging";

export default {
  inject: ["reload"],
  name: "zhangtao",
  components: {
    padding
  },
  data() {
    return {
       loading2: false,
      tit: "添加账套管理信息",
      update_id: "",
      type: "ZhangTao",
      multipleSelections: [],
      dialogVisible: false,
      conn: true,
      text: "立即创建",
      tableData: [{}],
      ruleForm: {
        id: "",
        user: "",
        pwd: "",
        IP_address: "",
        port_num: "",
        data_type: "",
        data_name: ""
      },
      rules: {
        id: [{ required: true, message: "请输入ID值", trigger: "blur" }],
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        IP_address: [
          { required: true, message: "请输入ip地址", trigger: "blur" }
        ],
        port_num: [
          { required: true, message: "请输入端口号", trigger: "blur" }
        ],
        data_type: [
          { required: true, message: "请选择数据库类型", trigger: "change" }
        ],
        data_name: [
          { required: true, message: "请输入数据库名", trigger: "blur" }
        ]
      },
      formInline: {
        user: "",
        region: ""
      },
      Newitems: [],
      search_data: [],
      old_id: ""
    };
  },
  mounted() {
    this.ZhangData();
  },
  methods: {
    addItem() {
      this.update_id = "";
      this.ruleForm.id = "";
      this.ruleForm.data_name = "";
      this.ruleForm.pwd = "";
      this.ruleForm.port_num = "";
      this.ruleForm.IP_address = "";
      this.ruleForm.data_type = "";
      this.ruleForm.user = "";
    },
    onSubmit() {
      var this_is = this;
      if (this_is.formInline.user == "") {
        this.ZhangData();
      } else {
        var search = this.formInline.user;
        var searchVal = ""; //搜索后的数据
        if (search) {
          searchVal = this.search_data.filter(function(product) {
            return Object.keys(product).some(function(key) {
              //搜索所有的内容
              return (
                String(product[key])
                  
                  .indexOf(search) > -1
              );
              //只搜索问题内容（某一个key）
              return (
                String(product["questions"])
                  .indexOf(search) > -1
              );
            });
          });
        
        }
      }
    },
    handleEdit(index, row) {
      this.tit = "修改账套管理信息";
      this.text = "保存";
      this.update_id = String(index);
      console.log(this.update_id);
      this.dialogVisible = true;
      this.old_id = row.db_Id;
      this.ruleForm.id = row.db_Id;
      this.ruleForm.data_name = row.db_Name;
      this.ruleForm.pwd = row.db_Pwd;
      this.ruleForm.port_num = row.db_Prot;
      this.ruleForm.IP_address = row.server_Address;
      this.ruleForm.data_type = row.db_Type;
      this.ruleForm.user = row.db_User;
      this.ruleForm.conn = row.connectionTest;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.update_id) {
            var param_info = new URLSearchParams();
            param_info.append("db_Id", this.ruleForm.id);
            param_info.append("db_Name", this.ruleForm.data_name);
            param_info.append("db_Pwd", this.ruleForm.pwd);
            param_info.append("db_Prot", this.ruleForm.port_num);
            param_info.append("server_Address", this.ruleForm.IP_address);
            param_info.append("db_Type", this.ruleForm.data_type);
            param_info.append("db_User", this.ruleForm.user);
            Database(param_info)
              .then(
                function(response) {
                  console.log(response);
                  this.$message({
                    showClose: true,
                    message: "数据库连接成功，开始修改信息",
                    type: "success"
                  });
                  if (response.data.RLO == true) {
                    this.info_conn_Modify(response.data.RLO);
                  } else {
                    this.$message({
                      showClose: true,
                      message: "数据库不存在此账套",
                      type: "error"
                    });
                  }
                }.bind(this)
              )
              .catch(
                function(error) {
                  console.log(error);
                  this.$message({
                    showClose: true,
                    message: "数据库连接失败",
                    type: "error"
                  });
                }.bind(this)
              );
          } else {
            var params = new URLSearchParams();
            params.append("db_Id", this.ruleForm.id);
            params.append("db_Name", this.ruleForm.data_name);
            params.append("db_Pwd", this.ruleForm.pwd);
            params.append("db_Prot", this.ruleForm.port_num);
            params.append("server_Address", this.ruleForm.IP_address);
            params.append("db_Type", this.ruleForm.data_type);
            params.append("db_User", this.ruleForm.user);
            Database(params)
              .then(
                function(response) {
                  console.log(response.data.RLO);
                  if (response.data.RLO == true) {
                    this.$message({
                      showClose: true,
                      message: "数据库连接成功，开始创建信息",
                      type: "success"
                    });
                    this.info_conn(response.data.RLO);
                  } else {
                    this.$message({
                      showClose: true,
                      message: "数据库不存在此账套",
                      type: "error"
                    });
                  }
                }.bind(this)
              )
              .catch(
                function(err) {
                  console.log(err);
                  this.$message({
                    showClose: true,
                    message: "数据库连接失败",
                    type: "error"
                  });
                }.bind(this)
              );
          }
        } else {
          this.$message({
            showClose: true,
            message: "内容有错误，请检查重新填写",
            type: "error"
          });
          return false;
        }
      });
    },
    info_conn_Modify(RLO) {
      this.conn = RLO;
      var para_Modify = new URLSearchParams();
      para_Modify.append("db_Id", this.ruleForm.id);
      para_Modify.append("db_Name", this.ruleForm.data_name);
      para_Modify.append("db_Pwd", this.ruleForm.pwd);
      para_Modify.append("db_Prot", this.ruleForm.port_num);
      para_Modify.append("server_Address", this.ruleForm.IP_address);
      para_Modify.append("db_Type", this.ruleForm.data_type);
      para_Modify.append("db_User", this.ruleForm.user);
      para_Modify.append("connectionTest", this.conn);
      para_Modify.append("oldDb_Id", this.old_id);
      def_info(para_Modify)
        .then(
          function(response) {
            console.log(response);
            if (response.data.RLO == false) {
              this.$message({
                showClose: true,
                message: "数据已存在此账套，请勿添加",
                type: "error"
              });
            } else {
              
              this.$message({
                showClose: true,
                message: "账套信息修改成功",
                type: "success"
              });
              this.dialogVisible = false;
              this.reload();
            }
          }.bind(this)
        )
        .catch(
          function(err) {
            console.log(err);
          }.bind(this)
        );
    },
    info_conn(RLO) {
      this.conn = RLO;
      var param = new URLSearchParams();
      param.append("db_Id", this.ruleForm.id);
      param.append("db_Name", this.ruleForm.data_name);
      param.append("db_Pwd", this.ruleForm.pwd);
      param.append("db_Prot", this.ruleForm.port_num);
      param.append("server_Address", this.ruleForm.IP_address);
      param.append("db_Type", this.ruleForm.data_type);
      param.append("db_User", this.ruleForm.user);
      param.append("connectionTest", this.conn);
      Database_info(param)
        .then(
          function(response) {
            console.log(response);
            if (response.data.RLO == false) {
              this.$message({
                showClose: true,
                message: "数据已存在此账套,请勿创建",
                type: "error"
              });
            } else {
              this.$message({
                showClose: true,
                message: "账套信息已成功创建",
                type: "success"
              });
              this.dialogVisible = false;
              this.reload();
            }
          }.bind(this)
        )
        .catch(
          function(err) {
            console.log(err);
          }.bind(this)
        );
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var params = new URLSearchParams();
        params.append("db_Id", row.db_Id);
        params.append("db_Name", row.db_Name);
        params.append("db_Pwd", row.db_Pwd);
        params.append("db_Prot", row.db_Prot);
        params.append("server_Address", row.server_Address);
        params.append("db_Type", row.db_Type);
        params.append("db_User", row.db_User);
        Database(params)
          .then(
            function(response) {
              console.log(response.data.RLO);
              //  console.log(response.data.RLO == ture)
              if (response.data.RLO == true) {
                this.$message({
                  showClose: true,
                  message: "数据库连接成功，开始删除账套信息",
                  type: "success"
                });
                this.del_conn(response.data.RLO, row.db_Id);
              } else {
                this.$message({
                  showClose: true,
                  message: "数据库不存在此账套",
                  type: "error"
                });
              }
            }.bind(this)
          )
          .catch(
            function(err) {
              console.log(err);
              this.$message({
                showClose: true,
                message: "数据库连接失败",
                type: "error"
              });
            }.bind(this)
          );
      }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
    },
    del_conn(Test_conn, id) {
      Delete_info({
        delDb_ID: id,
        connectionTest: Test_conn
      })
        .then(response => {
          if (response.data.RLO == false) {
            this.$message({
              showClose: true,
              message: "账套信息删除失败",
              type: "error"
            });
          } else {
             this.$message({
                  showClose: true,
                  message: "账套信息已成功删除",
                  type: "success"
                });
             this.dialogVisible = false;
                this.reload()
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelectionChange(val) {
      console.log(val)
       this.multipleSelections = []
      val.forEach(item => {
              this.multipleSelections.push(item.db_Id);
      });
    },
      more_del(){
        if (this.multipleSelections.length == 0) {
                  this.$message({
                    message: "未选择数据",
                    type: "warning"
                  });
        }else {
          this.$confirm("确认批量删除?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
                 var del_par = new URLSearchParams();
                  del_par.append("delDb_ID", this.multipleSelections);
                  del_par.append("connectionTest",true);
              Delete_infos(del_par)
               .then(function(response){
                  if (response.data.RLO == false) {
                      this.$message({
                        showClose: true,
                        message: "账套信息删除失败",
                        type: "error"
                      });
                    } else {
                      this.$message({
                        showClose: true,
                        message: "账套信息已成功删除",
                        type: "success"
                      });
                      this.dialogVisible = false;
                      this.reload()
                    }
               }.bind(this)).catch(function(err){
                 console.log(err)
               }.bind(this))
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        }
      },
  
    ZhangData() {
      this.loading2 = true
      account()
        .then(
          function(response) {
            console.log(response);
            setTimeout(() => {
                this.loading2 = false
                this.tableData = response.data.queryList;
                this.search_data = response.data.queryList;
            }, 800);
          }.bind(this)
        )
        .catch(
          function(err) {
            console.log(err);
          }.bind(this)
        );
    }
  }
};
</script>
<style>
.btn_item .el-form-item__content{
  float: none !important;
  text-align: center !important;
}
.dia .el-form-item {
    margin-bottom: 22px !important;
}
.search label {
  float: left !important;
  color: #000 !important;
  font-size: 15px !important;
  font-weight: 600 !important;
}
.search .el-input__inner {
  height: 35px !important;
  line-height: 35px !important;
}
.data_tab tr td {
  padding: 3px 0px !important;
  color: #000 !important;
  background-color: transparent !important;
}
.data_tab {
  background-color: transparent !important;
}
.data_tab tr {
  background-color: transparent !important; 
}
.data_tab tr:nth-child(odd) {
  background-color: #eaeaea !important; 
}
.data_tab tr:nth-child(even) {
  background-color: #fbfbfb !important; 
}
.data_tab th {
  padding: 10px 0px !important;
  color: #000 !important;
  background-color: #E0EEEE !important;
}
.data_tab .el-table__header {
  width: 100% !important;
}
.data_tab .el-table__body {
  width: 100% !important;
}
 .data_tab .el-table__header-wrapper {
  background: transparent !important;
}
.data_tab td,
.data_tab th.is-leaf {
  border-bottom: 1px solid #767677 !important;
  border-right: 1px solid #767677 !important;
}
.data_tab th > .cell {
  text-align: center !important;
}
.data_tab td > .cell {
  text-align: left !important;
}
.data_tab td:nth-child(7) > .cell {
  text-align: right !important;
}
.data_tab td:last-child > .cell {
  text-align: center !important;
}
.data_tab td .cell > .el-button {
  border: 1px solid #808082 !important;
}
.data_tab td .cell > .el-button--danger {
  border: 1px solid #f56c6c !important;
}
</style>

<style scoped>
</style>