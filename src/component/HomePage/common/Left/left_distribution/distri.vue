<template>
    <div id="Distribution">
    </div>
</template>
<script>

export default {   
    name: "Distribution",
	data() {
		return {
	         tableData: [{
        	id:'1',
			date: '2016-05-02',
			name: '王小虎',
			address: '上海市普陀区金沙江路 1518 弄',
			edit:false
        }, {
        	id:'2',
			date: '2016-05-04',
			name: '王小虎',
			address: '上海市普陀区金沙江路 1517 弄',
			edit:false
        }, {
        	id:'3',
			date: '2016-05-01',
			name: '王小虎',
			address: '上海市普陀区金沙江路 1519 弄',
			edit:false
        }, {
        	id:'4',
			date: '2016-05-03',
			name: '王小虎',
			address: '上海市普陀区金沙江路 1516 弄',
			edit:false
        }]
	    }
	},
	mounted() {
	},
	methods: {
    confirmEdit(index,row){
			row.edit = false;
			this.$message({
				message: '该地址已经成功修改',
				type: 'success'
			})
		}

		
    }
}

 
</script>
<style scoped>

</style>