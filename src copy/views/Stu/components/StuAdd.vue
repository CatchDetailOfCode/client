<template>
  <div>
  <el-form label-width="100px" :model="stu" :rules="rules" ref="ruleForm"  >
    <el-form-item label="选择头像">
      <el-upload
        class="upload-demo"
        action="http://localhost:8088/stu/stu/addPic"
        :on-success="handleSuccess"
        :file-list="fileList"
        list-type="picture"
        name="pic">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="学生名称" prop="name">
      <el-input v-model="stu.name"></el-input>
    </el-form-item>
    <el-form-item label="学生年龄" prop="age">
      <el-input v-model="stu.age"></el-input>
    </el-form-item>
    <el-form-item label="学生生日" prop="birth">
    <el-date-picker type="date" placeholder="选择日期" 
    v-model="stu.birth" value-format="yyyy-MM-dd"
     style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="学生邮箱" prop="email">
      <el-input v-model="stu.email"></el-input>
    </el-form-item>
    <el-form-item label="所在学校" prop="schid">
      <el-select v-model="stu.schid" placeholder="请选择学校">
        <el-option v-for="(item,index) in schs" :label="item.name" 
        :value="item.id" :key="index"></el-option>
        
      </el-select>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="addStu()">立即创建</el-button>
     
    </el-form-item>
  </el-form>
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
    return{
      
      fileList:[],
      schs:[],
      stu:{
        name:'',
        age:0,
        birth:'',
        email:'',
        schid:'',
        ss:[], //savepath s
        us:[], //uploadtime s
        rs:[]  //realname s
      },
       rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          schid: [
            { required: true, message: '请选择学校', trigger: 'change' }
          ],
          
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]

        }
    }
  },
  methods:{
    addStu(){
      this.$refs.ruleForm.validate((valid) => {
          if (!valid) {
            alert('请检查表单填写是否正确');
          } else {
            this.$ajax.post('/stu/addStu',this.stu).then(msg=>{
              if(msg.data.code==200){
                  this.$message("添加成功!")
                  this.$refs.ruleForm.resetFields()
                  this.stu.ss=[]
                  this.stu.us=[]
                  this.stu.rs=[]
                  this.fileList=[]
              }
            }).catch(error=>{
              console.log('error is:',error)
            })
          }
        })
     
    },
    handleSuccess(response,file,fileList){
        console.info('response is:',response)
        this.stu.ss.push(response.data.savepath)
        this.stu.us.push(response.data.uploadtime)
        this.stu.rs.push(response.data.realname)
    },
    queryAllSchs(){
      this.$ajax.post('/stu/queryAllSchs').then(msg=>{
        this.schs = msg.data.data
      }).catch(error=>{
        console.log('error is:',error)
      })
    }
  },
  mounted(){
    this.queryAllSchs()
  }
}
</script>

<style>

</style>