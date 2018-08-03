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

    <el-button type="primary" style="margin-left:60px;" @click="exportVoteResultDownload()">导出排名</el-button>
    <a href="" download="投票结果.xlsx" id="hf"></a>
    <el-button type="success" style="margin-left:60px;" @click="show()">投影展示</el-button>
   </div>
  <el-table :data="tableData" border style="width: 100%;" class="tableHeight">
      <el-table-column prop="index" label="序号" width="70"> </el-table-column>
      <el-table-column prop="result" label="排名" width="70">
        <template scope="scope" style="float:inline">
          <img src="../../images/v1.png" v-if="scope.row.result=='1'">
          <img src="../../images/v2.png" v-if="scope.row.result=='2'">
          <img src="../../images/v3.png" v-if="scope.row.result=='3'">
        </template>
      </el-table-column>
      <el-table-column prop="groupId" label="分组编号" width="120"> </el-table-column>
      <el-table-column prop="unitCode" label="研发单位编码" width="150"> </el-table-column>
      <el-table-column prop="unitName" label="研发单位名称" width="400"> </el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="570"> </el-table-column>
      <el-table-column label="投票情况" width="340">
        <template scope="scope" style="float:left;">
            <div class="vote-details">
              <img src="../../images/a.png">
              <span>{{scope.row.result1}}</span>
            </div>
            <div class="vote-details">
              <img src="../../images/b.png">
              <span>{{scope.row.result2}}</span>
            </div>
            <div class="vote-details">
              <img src="../../images/c.png">
              <span>{{scope.row.result3}}</span>
            </div>
        </template>
      </el-table-column>
  </el-table>
    <div>
       <el-pagination class="pagination-style" 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="pageSize"  
        layout="total,sizes,prev, pager, next, jumper"
        :total="total" >
     </el-pagination>
    </div>
    
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
      valueTopic: ''
    }
  },
  methods: {
    show(){
      var topicName = '';
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].value == this.valueTopic) {
          topicName = this.options[i].label;
        }
      }
      window.open(Config.target + '/mobile/voteresult/index.html?topicId=' + this.valueTopic + '&topicName=' + topicName);
    },
    exportVoteResultDownload(){
      const that = this;
      const params = {
        topicId: this.valueTopic
      }
      if (this.valueTopic == '') {
        params.topicId = this.options[0].value;
      }
      axios.get(baseUrl + '/vote/vote/getVoteResult?topicId='+ params.topicId)
        .then(function (response) {
          let res = response.data;
          if (res.code == '000000') {   
            if (res.data.list.length == 0) {
              that.$message.error("还没有投票结果！");
            }  
            var data = [];
            data.push({index:'序号',result:'名次',groupId:'分组编号',unitCode:'研发单位编码',projectName:'项目名称',unitName:'研发单位名称',result1:'第一名票数',result2:'第二名票数',result3:'第三名票数'});
            var resultList = res.data.list;
            for (var i = 0; i < resultList.length; i++) {
              resultList[i].index = i+1;
            }
            Array.prototype.push.apply(data,resultList);
            ExcelExport.downloadFile(data);            
            that.$message.success('操作成功'); 
          } else {
            that.$message.error(res.msg);
          }
        }).catch(function (error) {
            console.log(error);
        }); 
    },
    change () {
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
      this.listProject();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.listProject();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.listProject();
    },
    async listProject () { 
      const that = this;
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        topicId:this.valueTopic
      }
      if (this.valueTopic == '') {
        params.topicId = this.options[0].value;
      }
      const res = await UserApi.getVoteResult(params);
      if (res.code == '000000') {
        that.tableData = res.data.list;
        for (var i =  0; i < this.tableData.length; i++) {
          that.tableData[i].index = i + 1 + (that.pageNo - 1) * that.pageSize;
        };
        that.total = res.data.totalCount;
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

