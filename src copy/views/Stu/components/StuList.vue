<template>
  <div>
    <el-form  :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="学生姓名">
        <el-input  v-model="searchForm.name" placeholder="学生姓名"></el-input>
      </el-form-item>
      <el-form-item label="选择学校">
        <el-select clearable v-model="searchForm.schid" placeholder="选择学校">
           <el-option v-for="sch in schs" :key="sch.id" :label="sch.name" :value="sch.id"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="选择生日">
         <el-date-picker
          v-model="searchForm.birth1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
    </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryByCondition">查询</el-button>
        <el-button type="success" @click="export2Excel">导出到EXCEL</el-button>
      </el-form-item>
    </el-form>
    <el-table border :data="tableData" style="width: 100%"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" :index="calcIndex"></el-table-column>
      <el-table-column
      label="头像">
      <template slot-scope="scope">
        <el-image :src="scope.row.pic?'http://localhost:8088/stu'+scope.row.pic.savepath:mypic"></el-image>
      </template>
    </el-table-column>
      <el-table-column prop="name" label="学生名字" ></el-table-column>
      <el-table-column prop="age" label="学生年龄" ></el-table-column>
      <el-table-column prop="birth" label="学生生日" ></el-table-column>
      <el-table-column prop="email" label="学生邮箱" ></el-table-column>
      <el-table-column prop="sch.name" label="所在学校" ></el-table-column>
      <el-table-column prop="sch.phone" label="学校电话" ></el-table-column>
      <el-table-column prop="sch.info" label="详细地址" ></el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">选课详情</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">学生信息</el-button>
        
      </template>
    </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchForm.pageNumber"
      :page-sizes="[5,6,7,8,10,9]"
      :page-size="searchForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
    methods: {
      handleClick(stu){
        this.$router.push({path:`/courseinfo/${stu.id}/${stu.name}`})
      },
      //当复选框改变状态时触发
      handleSelectionChange(value){
        this.selections = value
      console.info('selections is:',this.selections)
      },
      //导出到EXCEL中的请求
      export2Excel(){
        if(this.selections&& this.selections.length>0){
          let ids="";
          //获得全选的数据
          this.selections.forEach(stu=>{
            ids+=stu.id+","
          })
          //ids=1,2,4,
          ids=ids.substring(0,ids.length-1);
          window.location.href="http://localhost:8088/stu/export2Excel?ids="+ids;
        }else{
          this.$message("请至少选择一条记录!")
        }
      },
      queryByCondition(){
        this.searchForm.pageNumber=1
        this.queryAllStu()
      },
      //计算序号的
      calcIndex(v){
        return this.start + v +1
      },
      //当每页的记录数发生变化时触发
      handleSizeChange(v){
        this.searchForm.pageSize=v
        this.queryAllStu()
      },
      //当当前页发生变化时触发
      handleCurrentChange(v){
        this.searchForm.pageNumber=v
        this.queryAllStu()
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      queryAllStu(){
        this.$ajax.post("/stu/queryStus",
       this.searchForm).then(res=>{
            //
            this.tableData = res.data.data.rows
            this.total = res.data.data.total
            this.start = res.data.data.start
        })
      },
      queryAllSchs(){
          this.$ajax.get('/stu/queryAllSchs').then(res=>{
              this.schs = res.data.data
          })
      }
    },
    data() {
      return {
        selections:[],
        mypic:require('@/assets/logo.png'),
        start:0,
        tableData: [],
        schs:[],
        total:0,
        searchForm:{
          birth1:[],
          name:'',
          schid:'',
          pageSize:5,
          pageNumber:1,
          
        }
      }
    },
    created(){
      this.queryAllSchs()
      this.queryAllStu()
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  } 

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>