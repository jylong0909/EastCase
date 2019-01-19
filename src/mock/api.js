import Promise from 'es6-promise'
Promise.polyfill()
import axios from 'axios'
import Qs from 'qs'


// let display = 'oa.ydshce.com:8080'

// var instance3 = axios.create({
//   baseURL: 'http://' + display
// })

// export const faceIp = ipFace
export const UserInfo = params => {
  return axios.get(`/InfManagePlatform/LoginUserInf.action`)
}

export const Verification = params => {
  return axios.get(`/InfManagePlatform/IdentityServlet.do?ts= ${new Date().getTime()}`)
}
// export const Login_log = params => {
//   return instance3.get(`/InfManagePlatform/LoginAction.action` {params:params})
// }
export const Login_log = params => {
  return axios.post(`/InfManagePlatform/LoginAction.action`, Qs.stringify(params))
}
//获取默认账套
export const account = params => {
  return axios.get(`/InfManagePlatform/AccountDBqueryAccountDB.action` )
}
//编辑账套信息、
export const def_info = params => {
  return axios.post(`/InfManagePlatform/AccountDBupdateAccountDB.action`,params)
}
//获取默认部门
export const ment = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryDepartment.action` , {'params':params})
}

//获取默认客户
export const customer  = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryCustomer.action` , {'params':params})
}

//获取默认用户
export const de_info  = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryErpUser.action` , {'params':params})
}

export const set_infos = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryAccountDB.action`,  {'params':params})
}
export const Database = params => {
  return axios.post(`/InfManagePlatform/AccountDBConnectionTest.action`,params)
}
export const Database_info = params => {
  return axios.post(`/InfManagePlatform/AccountDBinsertAccountDB.action`,params)
}
//删除账套信息
export const Delete_info = params => {
  return axios.delete(`/InfManagePlatform/AccountDBdeleteAccountDB.action`,{ 'params': params})
}
//多选删除
export const Delete_infos = params => {
  return axios.post(`/InfManagePlatform/AccountDBdeleteAccountDB.action`,params)
}
//用户管理
export const user_mangement = params => {
  return axios.get(`/InfManagePlatform/UsergetUsers.action`)
}
//新增用户管理
export const User_info = params => {
  return axios.post(`/InfManagePlatform/UseraddUser.action`,params)
}
//删除用户信息
export const del_info = params => {
  return axios.post(`/InfManagePlatform/UserdelUser.action`,params)
}
//删除多个用户信息
export const del_info_mor = params => {
  return axios.post(`/InfManagePlatform/UserdelUsers.action`,params)
}
//编辑修改用户信息

export const Modify = params => {
  return axios.post(`/InfManagePlatform/UserupdateUser.action`,params)
}


//功能授权
//销售部门
export const authorization = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryDepartment.action`,{'params':params})
}
//核算单位
export const accounting = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryCompDep.action`,{'params':params})
}
//制单用户
export const making  = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryErpUser.action`,{'params':params})
}
//经营品牌
export const brand = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryCustomer.action`,{'params':params})
}
//销售终端
export const  terminal = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryCustomer.action`,{'params':params})
}
//获取模块列表
export const  Modules = params => {
  return axios.get(`/InfManagePlatform/ModuleListgetModules.action`,{'params':params})
}
//销售报表  制表

export const  report_data = params => {
  return axios.post(`/InfManagePlatform/Report.action`,params)
}
//品号
export const  order_no = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryPrdt.action`,{'params':params})
}
//销售渠道

export const  sa_qu_api = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryArea.action`,{'params':params})
}
//销售人员
export const  sa_info_api = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryEmployee.action`,{'params':params})
}
//货品中类
export const  goo_ku_api = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryprdIndx.action`,{'params':params})
}
//货品库区
export const  goo_in_api = params => {
  return axios.get(`/InfManagePlatform/QueryErpInfqueryprdWh.action`,{'params':params})
}