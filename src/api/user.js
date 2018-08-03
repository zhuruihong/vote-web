import fetch from './fetch/index';


/**
 * 封装基础ajax请求
 * @param {any}
 */
class UserApi {
  /**
   * 登录界面
   * @param {username} 用户名
   * @param {password} 密码
   * @return {登录信息}
   */
  goLogin = (params) => fetch('POST', '/vote/vote/login', params);

  goLogout = (params) => fetch('POST', '/vote/vote/logout', params);

  listTopic = (params) => fetch('GET', '/vote/vote/listTopic', params);

  addTopic = (params) => fetch('POST', '/vote/vote/addTopic',params);

  listExpert = (params) => fetch('GET', '/vote/vote/getExpertList',params);

  getTopicList = (params) => fetch('GET', '/vote/vote/getTopicList',params);

  getProjectList = (params) => fetch('GET', '/vote/vote/getProjectList',params);

  getVoteResult = (params) => fetch('GET', '/vote/vote/getVoteResult',params);

  getVoteInfoList = (params) => fetch('GET', '/vote/vote/getVoteInfoList',params);
}

// 实例化再导出
export default new UserApi();
