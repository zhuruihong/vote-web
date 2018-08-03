<style scoped lang="less">
.console-topbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  clear: both;
  height: 50px;
  font-size: 12px;
  width: 100%;
  .el-col {
    background: #0F7C4B;
    height: 50px;
    color: #fff;
    font-size: 14px;
    line-height: 50px;
    .topbar-home {
      position: relative;
      display: block;
      width: 50px;
      background: #0087b4;
      font-size: 48px;
      color: #FFF;
      text-align: center;
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      float: left;
      &:before {
        content: '';
        position: absolute;
        width: 50px;
        height: 50px;
        left: 0px;
        top: 0px;
        display: inline-block;
        background: no-repeat center center;
        background-size: cover;
      }
    }
    .topbar-home-link {
      display: inline-block;
      height: 50px;
      box-sizing: border-box;
      padding: 0 20px;
      color: #fff;
      font-size: 14px;
      line-height: 50px;
      border-right: 1px solid #0F7C4B;
    }
    .topbar-info {
      float: right;
      width: 100px;
      line-height: 50px;
      padding: 0 10px;
      height: 50px;
      display: block;
      z-index: 2;
      background: #0F7C4B;
      color: #fff;
      font-size: 14px;
      border-left: 1px solid #0F7C4B;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      .user-name {
        display: block;
        width: 100%;
        color: #fff;
        font-size: 14px;
      }
      .el-dropdown-menu {
        padding: 0 !important;
        .el-dropdown-menu__item {
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
<template>
  <el-row class="console-topbar" type="flex">
    <el-col :xs="12" :sm="12" :md="12" :lg="12">
      
      <a href="javascript:void(0);" target="_self" class="topbar-home-link">
        <span>投票系统管理控制台</span>
      </a>
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="12">
      <el-dropdown trigger="click" class="topbar-info" @command="handleCommand" >
        <a href="javascript:void(0)" class="user-name">{{loginInfo.userName}}
        <i class="el-icon-caret-bottom el-icon--right"></i>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="signOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
  import { Row, Col, Dropdown, Icon, DropdownMenu, DropdownItem } from 'element-ui';
  import UserApi from '../../api/user';
  export default {
    components: {
      ElRow: Row,
      ElCol: Col,
      ElDropdown: Dropdown,
      ElDropdownMenu: DropdownMenu,
      ElDropdownItem: DropdownItem,
      Icon: Icon
    },
    data () {
      return {
        loginInfo : JSON.parse(window.localStorage.getItem('loginInfo'))
      }
    },
    methods: {
      async goLogout () { // 注销
        let loginInfo = JSON.parse(window.localStorage.getItem('loginInfo'));
        const params = {
          userId: loginInfo.userId,
          token: loginInfo.token
        }
        const res = await UserApi.goLogout(params);
        //console.log('注销：' , JSON.stringify(res))
      },
      handleCommand(command) { // 点击菜单项触发的事件回调
        const that = this;
        if(command == 'signOut') { // 退出登录
          that.goLogout();
          window.localStorage.clear();
          that.$router.push({path: that.$conf.route.login});
        }
      }
    }
  }
</script>
