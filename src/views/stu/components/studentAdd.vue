<template>
<div>
    <el-form ref="ruleForm" :model="addForm" label-width="60px" :rules="rules">
      <el-form-item label="选择头像">
      <el-upload
        class="upload-demo"
        action="http://localhost:8081/stu/addPic"
        :on-success="handleSuccess"
        :file-list="fileList"
        list-type="picture"
        name="pic">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="addForm.sex" placeholder="请选择学生性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model="addForm.age"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>

      <el-form-item label="学校">
        <el-select clearable v-model="addForm.schid" placeholder="选择学校">
           <el-option v-for="sch in schs" :key="sch.id" :label="sch.name" :value="sch.id"></el-option>
        </el-select>
  </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addStu()">添加学生</el-button>
        <el-button>取消</el-button>
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
    return {
      fileList:[],
      addForm: {
        name:'',
        sex:'',
        age:'',
        email:'',
        schid:'',
        savepath:'',
        uploadtime:'',
        realname:''
        // ss:[], //savepath s
        // us:[], //updatetime s
        // rs:[], //realtime s
      },
      schs:[],
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
        addStu() {      
            this.$refs.ruleForm.validate((valid)=>{
              if(!valid){
                this.$info("请检查表单填写是否正确!","warning")
              }else{
                 this.$ajax.post("",this.addForm).then(res=>{
                if(res.data.code==200){
                    this.$info("添加成功!")
                    this.$refs.ruleForm.resetFields()
                    this.addForm.savepath=''
                    this.addForm.uploadtime=''
                    this.addForm.realname=''
                    this.fileList=[]
                }else{
                    this.$info("添加失败!","warning")
                }
            })
              }
            })
      },
      queryAllSchs(){
        this.$ajax.get("/queryAllSchs").then(res=>{
          this.schs = res.data.data
        })

      },
      handleSuccess(response,file,fileList){
        console.info('response is:',response)
        this.addForm.savepath=response.data.savepath
        this.addForm.uploadtime = this.formatDate(response.data.uploadtime)
        this.addForm.realname=response.data.realname
    },
    	formatDate(oldDate) {
      // 方式1 转换为'yyyy-MM-dd HH:mm:ss'
      function add0(num) { return num < 10 ? '0' + num : num } // 个位数的值在前面补0
      const date = new Date(oldDate)
      const Y = date.getFullYear()
      const M = date.getMonth() + 1
      const D = date.getDate()
      const h = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()

      const dateString = Y + '-' + add0(M) + '-' + add0(D) + ' ' + add0(h) + ':' + add0(m) + ':' + add0(s)
      return dateString
    },

    },
    mounted(){
      this.queryAllSchs()

    }
}
</script>
<style scoped>

</style>