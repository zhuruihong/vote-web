<style lang="less">
.console-sidebar {
  .el-submenu__title {
    font-size: 12px;
    height: 46px;
    line-height: 46px;
  }
  .el-submenu {
    background: #37424f;
    border-bottom: 1px solid #414d5c;
  }
  .el-submenu__icon-arrow {
    right: 40px;
    margin-top: -4px;
  }
  .el-icon-message {
    font-size: 12px;
  }
  .el-menu-item {
    font-size: 12px;
    height: 42px;
    line-height: 42px;
    &.is-active {
      border-right: none;
      color: #fff;
      background: #0F7C4B !important;
      &:hover {
        background: #0F7C4B !important;
      }
    }
  }
}
</style>
<style scoped lang="less">
  .console-sidebar {
    position: fixed;
    top: 50px;
    bottom: 0px;
    background-color: #293038;
    z-index: 102;
    overflow-x: hidden;
    overflow-y: auto;
    height: auto;
    width: 180px;
    .sidebar-content {
      width: 200px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      background: #293038;
      .sidebar-fold {
        height: 30px;
        width: 140px;
        background: #394555;
        color: #aeb9c2;
        text-align: left;
        padding: 0 20px;
        line-height: 30px !important;
        user-select: none;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
      }
    }
  }
</style>
<template>
  <div class="console-sidebar">
    <el-menu :unique-opened='true' :router='true' theme="dark" :default-active="defaultActive" class="sidebar-content">
      <div class="sidebar-fold">版本1.0.0</div>


      <el-submenu index="topic">
        <template slot="title">
          <i class="el-icon-message"></i>
          投票主题
        </template>
          <el-menu-item index="/quick"><i class="el-icon-document"></i>主题列表</el-menu-item>
          <el-menu-item index="/addTopic"><i class="el-icon-document"></i>新增主题</el-menu-item>
          <el-menu-item index="/voteResult"><i class="el-icon-document"></i>投票结果</el-menu-item>
          <el-menu-item index="/voteDtlList"><i class="el-icon-document"></i>投票明细</el-menu-item>
        </el-submenu>

 

    <el-submenu index="project">
        <template slot="title">
          <i class="el-icon-message"></i>
          参评项目
        </template>
        <el-menu-item index="/projectList"><i class="el-icon-document"></i>项目列表</el-menu-item>
        <el-menu-item index="/addProject"><i class="el-icon-document"></i>新增项目</el-menu-item>
      </el-submenu>

     <el-submenu index="expert">
        <template slot="title">
          <i class="el-icon-message"></i>
          专家管理
        </template>
        <el-menu-item index="/expertList"><i class="el-icon-document"></i>专家列表</el-menu-item>
        <el-menu-item index="/expertAdd"><i class="el-icon-document"></i>新增专家</el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>
<script>
  import { Menu, Submenu, MenuItem, Icon } from 'element-ui';
  export default {
    components: {
      ElMenu: Menu,
      ElSubmenu: Submenu,
      ElMenuItem: MenuItem,
      Icon: Icon
    },
    computed: {
			defaultActive: function() {
        const that = this;
				return that.$route.meta && that.$route.meta.activePath || this.$route.path;
			}
		}
  }
</script>
