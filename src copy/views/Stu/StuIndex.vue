<template>
<div>
  <el-card class="box-card">
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="学生列表" name="first">
            <stu-list></stu-list>
        </el-tab-pane>
        <el-tab-pane label="学生添加" name="second">
            <stu-add></stu-add>
        </el-tab-pane>
        
    </el-tabs>
  </el-card>
</div>
</template>

<script>
import StuList from './components/StuList.vue'
import StuAdd from './components/StuAdd.vue'
export default {
    components:{StuList,StuAdd},
    data(){
        return{
            activeName:'first'
        }
    },
    methods:{

    },
    mounted(){

    }

}
</script>

<style>

</style>