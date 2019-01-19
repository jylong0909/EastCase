
<template>
    <div id="after">
         444444444444444444
         <button @click="two()">one</button>
         <button @click="two()">two</button>
    </div>
</template>
<script>
export default {
  name: "after",
 
  data() {
    return {
      one:'assd'
    };
  },
  mounted() {
   
  },
  methods: {
    two(a){
      if(this.one == 'assd'){
        alert(1)
      }else{
        alert(2)
      }
    }
  }
};
</script>
<style scoped>

</style>









