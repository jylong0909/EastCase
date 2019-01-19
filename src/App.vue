<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide(){
      return {
        reload:this.reload
      }
    },
  data () {
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  height: initial;
  width: 100%;

}
@media screen and (max-width: 1400px) { /*当屏幕尺寸小于 x时，应用下面的CSS样式*/
  
  #app {
    overflow: auto;
    height: initial;
    width: 100%;
    min-width: 1200px;

  }
}

</style>
