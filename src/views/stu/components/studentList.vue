<template>
 <div>
  <!--查询输入-->
  <el-form :inline="true" :model="searchForm" class="demo-form-inline" >
  <el-form-item label="学生姓名">
    <el-input v-model="searchForm.name" placeholder="姓名"></el-input>
  </el-form-item>
  <el-form-item label="学生性别">
    <el-select v-model="searchForm.sex" placeholder="性别">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="选择学校">
        <el-select clearable v-model="searchForm.schid" placeholder="选择学校">
           <el-option v-for="sch in schs" :key="sch.id" :label="sch.name" :value="sch.id"></el-option>
        </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="query()">查询</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="warning" @click="reset()">重置</el-button>
  </el-form-item>
    <el-form-item>
    <el-button type="success" @click="importExel()">导出Exel</el-button>
  </el-form-item>
</el-form>
<!--显示学生信息的表格-->
<el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column
      label="头像" width="80px">
      <template slot-scope="scope">
        <el-image :src="scope.row.pic?'http://localhost:8081/image/'+scope.row.pic.savepath:mypic"></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="学生姓名" width="130"></el-table-column>
    <el-table-column prop="sex" label="性别" width="70"></el-table-column>
    <el-table-column prop="age" label="年龄" width="120"></el-table-column>
    <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
    <el-table-column prop="sch.name" label="所在学校" ></el-table-column>
    <el-table-column prop="sch.city" label="所属城市" ></el-table-column>
    <el-table-column label="操作">
      <!--修改和删除的按钮-->
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleUpdate(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--修改的表单-->
  <el-dialog title="修改的学生信息" :visible.sync="dialogFormVisible" width="400px" >
  <el-form :model="updateForm" ref="ruleForm" :rules="rules">
    <el-form-item label="编号" :label-width="formLabelWidth">
      <el-input v-model="updateForm.id" autocomplete="off" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
      <el-input v-model="updateForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
      <el-input v-model="updateForm.age" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
      <el-select v-model="updateForm.sex" >
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
      <el-input v-model="updateForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="选择学校">
        <el-select clearable v-model="updateForm.schid" placeholder="选择学校">
           <el-option v-for="sch in schs" :key="sch.id" :label="sch.name" :value="sch.id"></el-option>
        </el-select>
  </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmUpdate()">确 定</el-button>
  </div>
</el-dialog>
<!--分页组件-->
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[5, 6, 7, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>  
</template>
<script>
export default {  
  data(){
     var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!parseInt(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else if(value>60){
              callback(new Error("必须小于60周岁"));
            }else{
              callback()
            }
          }
        }, 1000);
      };
    return {
        mypic:require('@/assets/logo.png'),
        searchForm:{
          name:'',
          sex:'',
          schid:""
        },
        schs:[],
        tableData:[],
        dialogFormVisible: false,
        updateForm:{
          id:0,
          name:'',
          age:0,
          sex:'',
          email:'',
          schid:""
        },
        formLabelWidth: '80px',
        total:0,
        current:1,
        pageSize:5,
        rules:{
          name: [
            { required: true, message: '请输入学生姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          age: [
            {validator: checkAge,required: true,trigger:'blur'}
          ],
          sex: [
            {required: true, message: '请选择学生性别', trigger: 'change'}
          ],
          email: [
            {required: true, message: '请输入学生邮箱', trigger: 'blur'},
            {type: "email", message:"请输入正确的邮箱地址", trigger:['blur','change']}
          ]
        },
      }
  },
  methods:{
    reset(){
      this.searchForm.name=''
      this.searchForm.sex=''
      this.searchForm.schid=''
      this.queryAllStu()
    },
    query() {
        this.queryAllStu()
      },
      //一定要用post请求
      queryAllStu(){
        this.$ajax.post("/"+this.current+"/"+this.pageSize,this.searchForm).then(res=>{
          this.tableData = res.data.data.list
          this.total = res.data.data.total
          this.current = res.data.data.pageNum
          this.pageSize = res.data.data.pageSize
        })
      },
      //删除行数据
      handleDelete(row){
        this.$confirm('确认要删除这项记录吗?','提示',{type:"warning"}).then(()=>{
          //点击确定后确定删除
          const totalPage = Math.ceil((this.total-1)/this.pageSize)
          this.current = this.current > totalPage ? totalPage : this.current
          this.current = this.current < 1 ? 1 : this.current
          this.$ajax.delete("/"+row.id).then(res=>{
              if(res.data.code==200){
                 this.$info('删除成功!')
              }
          this.queryAllStu()
        })
        }).catch(()=>{
          //点击取消后不删除
          this.$info("取消操作!",'warning')
        })
      },
      //修改的按钮
      handleUpdate(row){
        this.updateForm.name = row.name
        this.updateForm.id = row.id
        this.updateForm.age = row.age
        this.updateForm.sex = row.sex
        this.updateForm.email = row.email
        this.dialogFormVisible = true 
      },
      //需要添加校验
      confirmUpdate(){      
        this.$refs.ruleForm.validate((valid)=>{
          if(!valid){
            this.$info('请检查表单是否填写正确!','warning')
          }else{
                this.$ajax.put("",this.updateForm).then(res=>{
            if(res.data.code==200){
              this.$info("修改成功!")
              this.queryAllStu()
            }else{
              this.$info("修改失败!",'warning')
            }
                })
          }
        })
        this.dialogFormVisible = false
        
      },
      handleSizeChange(pageSize){
        this.pageSize = pageSize
        this.queryAllStu()
      },
      handleCurrentChange(current){
        this.current = current
        this.queryAllStu()
      },
      importExel(){
        window.location.href="http://localhost:8081/stu/exportExel"
      },
      queryAllSchs(){
        this.$ajax.get("/queryAllSchs").then(res=>{        
            this.schs = res.data.data         
        })
      }   
  },
  mounted(){
    this.queryAllStu()
    this.queryAllSchs()
  }
}
</script>

<style scoped>

</style>