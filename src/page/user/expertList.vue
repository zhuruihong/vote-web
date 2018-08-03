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
   </div>
  <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="expertId" label="ID" width="70"> </el-table-column>
      <el-table-column prop="topicName" label="投票主题名称" width="370"> </el-table-column>
      <el-table-column prop="expertNo" label="专家序号" width="100"> </el-table-column>
      <el-table-column prop="isFlag" :formatter="formatFlag" label="是否投票" width="300"></el-table-column>
      <el-table-column prop="voteTime" label="投票时间" width="300"> </el-table-column>
      <el-table-column prop="voteUrl" label="投票链接"  width="590"> </el-table-column>
  </el-table>
    <div>
       <el-pagination class="pagination-style" 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"  
        layout="sizes,prev, pager, next, jumper"
        :total="total" >
     </el-pagination>
    </div>
   </div>
</template>

<script>
import { Table, TableColumn, Icon, Popover, Tag, Button } from 'element-ui';
import moment from "moment";
import UserApi from '../../api/user';
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
      options: [],
      valueTopic: ''
    }
  },
  methods: {
    change () {
        this.listExpert();
    },
    async initTopicList(){
      this.options[0] = {value:'',label:'全部'};
      const response = await UserApi.getTopicList();
      if (response.code=='000000') {
        for (var i = 0; i <= response.data.length - 1; i++) {
          this.options.push({value:response.data[i].topicId,label:response.data[i].topicName});
        }
      }
    },
    formatFlag: function (row, column, cellValue) {
        if (cellValue === "1"){
            return '已投票';
        }else if (cellValue === "0"){
            return '未投票';
        }
    },
    formatDate(time) {
      var date = new Date(time);
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.listExpert();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.listExpert();
    },
    async listExpert () { 
      const that = this;
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      if (this.valueTopic != '') {
        params.topicId = this.valueTopic;
      } else {
        delete params.topicId;
      }
      const res = await UserApi.listExpert(params);
      if (res.code == '000000') {
        for (var i = res.data.list.length - 1; i >= 0; i--) {
          res.data.list[i].voteBgnTime = this.formatDate(res.data.list[i].voteBgnTime);
          res.data.list[i].voteEndTime = this.formatDate(res.data.list[i].voteEndTime);
        }
        this.tableData = res.data.list;
        this.total = res.data.totalCount;
      } else {
        that.$message.error('系统错误！');
      }
    }
  },
  mounted () {
    this.initTopicList();
    this.listExpert();
  }
}
</script>

<style lang="less" scoped>
  .pagination-style {
    margin: 30px 60px;
    float: right;
  }
</style>
