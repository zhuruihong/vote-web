<style lang="less" scoped>

</style>
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="topicId" label="ID" width="70"> </el-table-column>
      <el-table-column prop="topicName" label="投票主题名称" width="300"> </el-table-column>
      <el-table-column prop="stateName" label="投票状态" width="170"> </el-table-column>
      <el-table-column prop="voteBgnTime" :formatter="formatDate" label="投票开始时间" width="180"> </el-table-column>
      <el-table-column prop="voteEndTime" :formatter="formatDate" label="投票结束时间" width="180"> </el-table-column>
      <el-table-column prop="expertNumBe" :formatter="formatVoteExpert" label="是否已经创建投票专家"> </el-table-column>
      <el-table-column prop="expertNumBe" label="计划投票专家"> </el-table-column>
      <el-table-column label="操作" width="240">
        <template scope="scope" style="float:left">
          <el-row>
            <el-button type="success" v-if="!(scope.row.expertNumBe > 0)" round @click="handleClick(1,scope.row)">创建投票专家</el-button>
            <el-button type="danger" v-if="scope.row.expertNumBe > 0" round @click="handleClick(2,scope.row)">重新创建投票专家</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

  <template>
    <el-dialog title="选择投票专家人数" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <span style="font-size: 18px;color: #48576a;margin: 30px 10px;">{{form.topicName}}</span>
    <el-form-item label="计划投票专家人数" required>
          <el-input-number v-model="form.count" :min="1" :max="1000" label="计划投票专家人数"></el-input-number>
        </el-form-item>
   </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="createExpertVote()">确 定</el-button>
  </div>
</el-dialog>
  </template>
  </div>
</template>

<script>
import { Card, Steps, Step, Button } from 'element-ui';
import moment from "moment";
import UserApi from '../../api/user';
import axios from 'axios';
import Config from '../../config/index'
const baseUrl = Config.target
export default {
  components: {
    ElCard: Card,
    ElSteps: Steps,
    ElStep: Step,
    ElButton: Button
  },
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        count: 1,
        topicId: '',
        topicName: ''
      },
      formLabelWidth: '120px',
      flagNum: ''
    }
  },
  methods: {
    formatVoteExpert(row, column, cellValue) {
      return cellValue > 0 ? "是" : "否";
    },
    formatDate(row, column, cellValue) {
      var date = new Date(cellValue);
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    createExpertVote(){
      const that = this;
      this.dialogFormVisible = false;
      window.open(baseUrl + '/vote/vote/createExpert?topicId=' + this.form.topicId + '&count=' + this.form.count + '&flag=' + this.flagNum);
      setTimeout(function() {  that.listTopic(); }, 3000);  
      setTimeout(function() {  that.listTopic(); }, 5000); 
      setTimeout(function() {  that.listTopic(); }, 10000);  
      setTimeout(function() {  that.listTopic(); }, 20000); 
    },
    cancel(){
      this.dialogFormVisible = false;
      this.$message({
            type: 'info',
            message: '已取消操作'
          });  
      
    },
    handleClick(flag,row){
      this.form.topicName = row.topicName;
      this.form.topicId = row.topicId;
      this.form.count = 1;
      if (flag == 1) {
        this.dialogFormVisible = true;
        this.flagNum = 0;
      } else if (flag == 2) {
        this.flagNum = 1;
        this.$confirm('此操作将重新创建投票专家,并导致上次创建的专家及其二维码失效, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = true;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      }
    },
    async listTopic () { 
      const that = this;
      const res = await UserApi.getTopicList();
      if (res.code == '000000') {
        this.tableData = res.data;
      } else {
        that.$message.error('系统错误！');
      }
    }
  },
  mounted () {
    this.listTopic();
  }
}
</script>
