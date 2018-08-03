import Config from '../config/index';

const Login = r => require.ensure([], () => r(require('../page/user/login')), 'login');
const Layout = r => require.ensure([], () => r(require('../page/layout')), 'layout');

// 快速入门
const Quick = r => require.ensure([], () => r(require('../page/quick/quick')), 'quick');

const AddTopic = r => require.ensure([], () => r(require('../page/quick/addTopic')), 'addTopic');

// 用户中心 -- 用户管理
const ExpertList = r => require.ensure([], () => r(require('../page/user/expertList')), 'expertList');

const ExpertAdd = r => require.ensure([], () => r(require('../page/user/expertAdd')), 'expertAdd');

const ProjectList = r => require.ensure([], () => r(require('../page/project/projectList')), 'projectList');

const AddProject = r => require.ensure([], () => r(require('../page/project/addProject')), 'addProject');

const VoteResult = r => require.ensure([], () => r(require('../page/quick/voteResult')), 'addProject');

const VoteDtlList = r => require.ensure([], () => r(require('../page/quick/VoteDtlList')), 'voteDtlList');

export default [{
  path: Config.route.login,
  name: 'Login',
  component: Login
}, {
  path: '/',
  name: 'Layout',
  component: Layout,
  children: [{ // 
    path: '/quick',
    name: 'Quick',
    component: Quick,
    meta: {
      bcrumd: ['投票主题','主题列表']
    }
  },  { 
    path: '/addTopic',
    name: 'AddTopic',
    component: AddTopic,
    meta: {
      bcrumd: ['投票主题','新增主题']
    }
  },  { // 用户中心 -- 用户管理
    path: '/expertList',
    name: 'ExpertList',
    component: ExpertList,
    meta: {
      bcrumd: ['专家管理', '专家列表']
    }
  },  { // 
    path: '/expertAdd',
    name: 'ExpertAdd',
    component: ExpertAdd,
    meta: {
      bcrumd: ['专家管理', '新增专家']
    }
  },  { // 
    path: '/projectList',
    name: 'ProjectList',
    component: ProjectList,
    meta: {
      bcrumd: ['参评项目', '项目列表']
    }
  },  { // 
    path: '/addProject',
    name: 'AddProject',
    component: AddProject,
    meta: {
      bcrumd: ['参评项目', '新增项目']
    }
  },  { // 
    path: '/voteResult',
    name: 'VoteResult',
    component: VoteResult,
    meta: {
      bcrumd: ['投票主题', '投票结果']
    }
  },  { // 
    path: '/voteDtlList',
    name: 'VoteDtlList',
    component: VoteDtlList,
    meta: {
      bcrumd: ['投票主题', '投票明细']
    }
  }]
}, {
  path: '*',
  redirect: Config.route.login,
  name: 'Login',
  component: Login
}]
