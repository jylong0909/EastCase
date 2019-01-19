<template>
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
        <div v-for="(cont, idx) in item"
             :key="cont + idx"
             @click="(idx!=='name')?amenddata(item, idx):''">
          {{cont}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
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
      storageArr: []
    }
  },
  methods: {
    click (data) {
      this.dataArr = []
      console.log(data)
      if (data.children) {
        console.log(52151451)

        for (let item of data.children) {
          this.dataArr.push({
            name: item.label,
            inquire: 'F',
            add: 'F'
          })
        }
      } else {
        console.log(2)
        this.dataArr.push({
          name: data.label,
          inquire: 'F',
          add: 'F'
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
      if (item[idx] === 'F') {
        item[idx] = 'T'
      } else {
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
      console.log(this.storageArr)
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
</style>
