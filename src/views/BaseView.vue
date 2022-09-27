<!--这是是页面的主体布局-->
<template>
<el-container class="home">
  <el-header>
    <div class="title">
      <span>学生管理系统</span>
    </div>
    <!--头像-->
    <div class="avatar">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <!--更多的下拉菜单-->
      <el-dropdown>
    <span class="el-dropdown-link">
      更多<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>用户信息</el-dropdown-item>
      <el-dropdown-item>退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </el-header>
  <el-container>
    <el-aside width="200px">
       
    <el-menu
      router
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>学生管理系统</span>
        </template>
        
        <el-submenu index="1-4">
          <template slot="title">学生模块</template>
          <el-menu-item index="/stu">
             <i class="el-icon-user"></i>学生列表
          </el-menu-item>
        </el-submenu>
        <el-submenu index="1-5">
          <template slot="title">学校模块</template>
          <el-menu-item index="/countsch">
             <i class="el-icon-user"></i>统计学校人数
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-container>
      <el-main><router-view/></el-main>
      <el-footer>版权所有</el-footer>
    </el-container>
  </el-container>
</el-container>

  
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    
  },
  mounted(){

  }
}
</script>
<style  lang="less" scoped>
.home{
  background-color: aliceblue;
  height:100vh;

  .el-header{
  background-color: #232f41;
  display: flex;
  align-items: center;
  .title{
    span{
      color: #FFF;
      font-size: 24px;
    }
    
  }
  .el-dropdown{
      position: absolute;
      right: 40px;
      span{
        color: #FFF;
      }
    }
    .avatar{
      position: absolute;
      right: 100px;

    }
 }
  .el-aside{
    background-color: #314255;
  }
  .el-main{
    background-color: #DDD;
  }


}



</style>

