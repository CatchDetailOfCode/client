<template>
  <div>
 <el-table border :data="tableData" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index"></el-table-column>
      
      <el-table-column prop="course.name" label="课程名字" ></el-table-column>
      <el-table-column prop="course.code" label="课程代码" ></el-table-column>
      <el-table-column prop="score" label="课程分数" ></el-table-column>
      
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改分数</el-button>
        
      </template>
    </el-table-column>
    </el-table>
    <el-dialog
  title="修改分数"
  :visible.sync="showUpdateScoreDialog"
  width="40%"
  center>
 <el-form label-width="100px" :model="sc1" ref="ruleForm"  >
    
    <el-form-item label="学生名称" >
      <el-input readonly v-model="stuname"></el-input>
    </el-form-item>
    <el-form-item label="课程名字">
      <el-input readonly v-model="sc1.course.name"></el-input>
    </el-form-item>
    <el-form-item label="课程分数" >
     <el-input v-model="sc1.score"></el-input>
    </el-form-item>
    
  </el-form>
  <span slot="footer" class="dialog-footer">
    
    <el-button type="primary" @click="updateScore">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return {
            showUpdateScoreDialog:false,
            tableData:[],
            stuname:'',
            sc1:{
                id:'',
                course:{},
                score:0,
            }
        }
    },
    methods:{
        //跟新该同学的该课程分数 sc
        updateScore(){
            //console.info(this.sc1.score)
          //  console.info('11111',Number.isInteger(this.sc1.score))
            if(Number.isInteger(this.sc1.score-0)){
            this.$ajax.post("/updateScore",
            "scid="+this.sc1.id+"&score="+this.sc1.score)
            .then(response=>{
                if(response.data.flag=="success"){
                    this.showUpdateScoreDialog=false
                    this.queryData()
                }
            })
            .catch(error=>{
                console.error('error is:',error)
            })
            }else{
                this.$message("请输入数字类型的参数")
            }
        },
        //当点击修改分数时触发
        handleClick(sc){
            //查询学生
            //this.$route.params.stuid
           // alert(this.$route.params.stuname)
           // this.sc1 = sc;
            //深
            //this.sc1 = Object.assign(sc)
            //万能转换器
            this.sc1 = JSON.parse(JSON.stringify(sc))
            
            
            this.showUpdateScoreDialog=true
        },
        queryData(){
            console.info('$route is:',this.$route)
            this.$ajax.post("/queryCourseAndScore",
            "stuid="+this.$route.params.stuid)
            .then(response=>{
                this.tableData = response.data
            })
            .catch(error=>{
                console.error('error is:',error)
            })
        }
    },
    mounted(){
        //根据学生的id 查询该同学选择的课程和分数
        this.queryData()
        this.stuname = this.$route.params.stuname
    }
}
</script>

<style>

</style>