<style lang="less" scoped>
  .pagination-style {
    margin: 30px 60px;
    float: right;
  }
  .pagination-style span {
    margin-top: 0.5px;
  }
  .upload-demo{
    display:inline;
  }
  .vote-details{
    display:inline;
    margin-left:40px;
    padding:0px;
    height:60px;
  }
  .vote-details img{
    width:18px;
    position: relative;
    left: 0px;
    top: -2px;
  }
  .vote-details span{
    position: relative;
    left: -17px;
    top: 8px;
    font-size:2px;
  }

</style>
<template>
  <div>
   <div style="margin:20px">
    <span>投票主题</span>
    <el-select v-model="valueTopic" placeholder="请选择" v-on:change="change()" style="width:360px;">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span style="margin-left:100px;">投票序号</span>
    <el-select v-model="valueExpert" placeholder="请选择" v-on:change="change2()" style="width:360px;">
      <el-option
        v-for="item in expertOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <el-button type="primary" style="margin-left:60px;" @click="exportVoteResultDownload()">导出查询结果</el-button>
    <a href="" download="投票明细结果.xlsx" id="hf"></a>
   </div>
  <el-table :data="tableData" border style="width: 100%;" class="tableHeight">
      <el-table-column type="index" label="序号" width="70"> </el-table-column>
      <el-table-column prop="groupId" label="分组编号" width="120"> </el-table-column>
      <el-table-column prop="projectName" label="项目名称"> </el-table-column>
      <el-table-column prop="tranSq" label="投票时间" width="570"> </el-table-column>
      <el-table-column prop="result" label="投票情况" width="100">
        <template scope="scope" style="float:inline">
          <img src="../../images/v1.png" v-if="scope.row.result=='1'">
          <img src="../../images/v2.png" v-if="scope.row.result=='2'">
          <img src="../../images/v3.png" v-if="scope.row.result=='3'">
        </template>
      </el-table-column>

  </el-table>
   
    
   </div>
</template>

<script>
import { Table, TableColumn, Icon, Popover, Tag, Button } from 'element-ui';
import moment from "moment";
import UserApi from '../../api/user';
import ExcelExport from '../../config/excel-export';
import axios from 'axios';
import Config from '../../config/index';
const baseUrl = Config.target;
export default {
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElIcon: Icon,
    ElPopover: Popover,
    ElTag: Tag,
    ElButton: Button
  },
  data () {
    return {
      tableData: [],
      total:0,
      pageNo:1,
      pageSize:10,
      total:0,
      options: [],
      expertOptions: [],
      valueTopic: '',
      valueExpert: ''
    }
  },
  methods: {
    exportVoteResultDownload(){
      const that = this;
      var data = [];
      data.push({index:'序号',groupId:'分组编号',projectId:'项目ID',voteId:'投票序号',expertNo:'专家ID',topicId:'主题投票ID',projectName:'项目名称',tranSq:'投票时间',result:'投票情况'});
      var resultList = this.tableData;
      for (var i = 0; i < resultList.length; i++) {
        resultList[i].index = i+1;
      }
      Array.prototype.push.apply(data,resultList);
      ExcelExport.downloadFile(data);            
      that.$message.success('操作成功');  
    },
    change () {
        this.valueExpert = '';
        this.listExpert();
        this.change2();
    },
    change2 () {
        this.listProject();
    },
    async initTopicList(){
      const response = await UserApi.getTopicList();
      if (response.code=='000000') {
        for (var i = 0; i <= response.data.length - 1; i++) {
          this.options.push({value:response.data[i].topicId,label:response.data[i].topicName});
        }
      }
      this.valueTopic = this.options[0].value;
      //this.listExpert();
      //this.listProject();
    },
    formatDate(time) {
      var date = new Date(time);
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    async listExpert () { 
      const that = this;
      const params1 = {topicId:''};
      if (this.valueTopic != '') {
        params1.topicId = this.valueTopic;
      }
      const res = await UserApi.listExpert(params1);
      if (res.code == '000000') {
        this.expertOptions = [];
        this.expertOptions.push({value:'',label:'选择专家'});
        for (var i =  0; i < res.data.list.length; i++) {
          this.expertOptions.push({value:res.data.list[i].expertId,label:(res.data.list[i].expertNo +(res.data.list[i].isFlag == '1' ? '--已投票' : '--未投票'))})
        }
      } else {
        that.$message.error('系统错误！');
      }
    },
    async listProject () { 
      const that = this;
      const params = {
        topicId:this.valueTopic,
        expertId:this.valueExpert
      }
      if (this.valueTopic == '') {
        params.topicId = this.options[0].value;
      }
      const res = await UserApi.getVoteInfoList(params);
      if (res.code == '000000') {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].tranSq = that.formatDate(res.data[i].tranSq);
        }
        that.tableData = res.data;
      } else {
        that.$message.error('系统错误！');
      }
    }
  },
  mounted () {
    this.initTopicList();
  }
}
</script>

