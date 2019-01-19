
<template>
    <div id="financial">
         <el-select v-model="region" filterable placeholder="请选择账套" @change='sel()'>
            <el-option value='DB_15' label='DB_15'></el-option>
            <el-option value='DB_18' label='DB_18'></el-option>
            <el-option value='DB_16' label='DB_16'></el-option>
            <el-option value='DB_17' label='DB_17'></el-option>
          </el-select>
          <br>
          <br>
          <br>
          <br>
  <div class="hello">
    <div class="menu">
      <el-tree :data="menuData"
               :props="Props"
               @node-click="click"></el-tree>
    </div>
    <div class="view">
      <div class="viewtit">
        <div v-for="(tit, tidx) in titdata"
             :key="tit + tidx">
          {{tit}}
        </div>
      </div>
      <div class="viewdata"
           v-for="(item, index) in dataArr"
           :key="index">
        <div  v-for="(cont, idx) in item"
             :key="cont + idx"
             @click="amenddata(item, idx)" >
          {{cont}}
        </div>
      </div>
    </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
      <el-button type="primary" @click="onsumit()">提交</el-button>
      <p>{{datassss}}</p>
    </div>
</template>
<script>
export default {
  name: "financial",
   data () {
    return {
      region:'',
      menuData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      Props: {
        children: 'children',
        label: 'label'
      },
      titdata: ['名称', '查询', '添加'],
      dataArr: [],
      storageArr: [],
       datassss:[
     
     
       {
      name:'三级 2-1-1',inquire: 'F', add: 'F',region:'DB_16'
      },
       {
      name:'三级 2-2-1',inquire: 'F', add: 'F',region:'DB_16'
      },
       {
      name:'三级 3-2-1',inquire: 'F', add: 'F',region:'DB_15'
      },
      ],
    }
  },
  methods: {
    //data 为获取数据  把data里的数据分配到下拉框里，切换下拉框对应出现数据一一对应。
   // 下拉框里选的哪个，表格里对应出现哪个的数据
    //例：
    //  下拉框里是 -》 DB_18
    // 表格里是这些数据:{
      // name:一级1,inquire: 'F', add: 'F',region='DB_18'
      // },
      //  {
      // name:一级2,inquire: 'F', add: 'F',region='DB_18'
      // },
      //可以对应修改表格内容，
    // 然后在存起来存到新的数组里





    //data :[
      // {
      // name:一级1,inquire: 'F', add: 'F',region='DB_18'
      // },
      //  {
      // name:一级2,inquire: 'F', add: 'F',region='DB_18'
      // },
      //  {
      // name:一级3,inquire: 'F', add: 'F',region='DB_17'
      // },
      //  {
      // name:一级2,inquire: 'F', add: 'F',region='DB_16'
      // },]
      //  {
      // name:一级3,inquire: 'F', add: 'F',region='DB_16'
      // },
      //  {
      // name:一级3,inquire: 'F', add: 'F',region='DB_15'
      // },
      //]
sel(){
	//if(this.a){
    console.log(this.storageArr)
		  console.log(this.datassss)
		this.dataArr = []
		this.datassss.forEach((i,z)=>{
		if(this.region == i.region){
			this.a = false
			this.dataArr.push({
            name: i.name,
            region:i.region,
            inquire: i.inquire,
            add: i.add
			})
			}
    })
    this.storageArr = this.dataArr
},

    onsumit(){
      console.log(this.datassss)
    },
    click (data) {
      
      this.dataArr = []
      if (data.children) {
        for (let item of data.children) {
          this.dataArr.push({
            name: item.label,
            region:this.region,
            inquire: 'F',
            add: 'F',
            
          })
        }
      } else {
        this.dataArr.push({
          name: data.label,
          region:this.region,
          inquire: 'F',
          add: 'F',
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
    },
    amenddata (item, idx) {
      if (idx !== 'name' && item[idx] === 'F') {
        item[idx] = 'T'
      } else if (idx !== 'name') {
        item[idx] = 'F'
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
   
    console.log(this.datassss)
      this.datassss.forEach((o,z)=>{
		  this.storageArr.forEach((x,c)=>{
          // if(x.region == o.region){
          //   var hash = {};
          // this.datassss = this.datassss.reduce(function(item, next) {
          //     hash[next.name] ? '' : hash[next.name] = true && item.push(next);
          //     return item
          // }, [])
          // }
          if(x.name == o.name){
            // console.log(x.name)
            o.name = x.name,
            o.region = x.region,
            o.inquire = x.inquire,
            o.add = x.add
          }
          if( o.name.indexOf(x.name) == -1){
            // console.log(2)
            console.log('push')
            // console.log(x.name)
              this.datassss.push({
                name:x.name,
                region:x.region,
                inquire: x.inquire,
                add: x.add,
              })
        }
         if( x.name.indexOf(o.name) == -1){
              this.datassss.push({
                name:o.name,
                region:o.region,
                inquire: o.inquire,
                add: o.add,
              })
				}
		})
			
    })
      console.log(this.datassss)
      // var hash = {};
	    // this.datassss = this.datassss.reduce(function(item, next) {
	    //     hash[next.name] ? '' : hash[next.name] = true && item.push(next);
	    //     return item
      // }, [])
      this.deleteRepeat(this.datassss)
    },
   deleteRepeat(arr) {
                for(var i=0;i<arr.length-1;i++){
                    var old=arr[i]
                    for(var j=i+1;j<arr.length;j++){
                        if(old.name==arr[j].name && old.region==arr[j].region&& old.inquire==arr[j].inquire
                        && old.add==arr[j].add
                        ){
                            arr.splice(j,1);
                            j--;
                        }
                    }
                }
                // console.log(arr)

                // return arr;
                this.datassss = arr
            }
           
  }
}
</script>

<style scoped>
.hello {
  width: 100%;
  height: 100%;
  display: flex;
}
.menu {
  width: 200px;
  height: 100%;
  border: 1px #000 solid;
}
.view {
  flex: 1;
  border: 1px #000 solid;
  height: 100%;
}
.viewtit,
.viewdata {
  width: 100%;
  display: flex;
}
.viewtit div,
.viewdata div {
  flex: 1;
  text-align: center;
}
.viewdata div:hover {
  background: #6495ed;
}
.viewdata div:nth-child(2){
  display: none;
}

</style>
