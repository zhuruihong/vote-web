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


   </div>
  <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="projectId" label="ID" width="70"> </el-table-column>
      <el-table-column prop="topicName" label="投票主题名称" width="300"> </el-table-column>
      <el-table-column prop="groupId" label="分组编号" width="100"> </el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="380"> </el-table-column>
      <el-table-column prop="unitCode" label="研发单位编码" width="150"> </el-table-column> 
      <el-table-column prop="unitName" label="研发单位名称" width="320"> </el-table-column>
      <el-table-column prop="crtTm" label="创建时间" width="200"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope" style="float:left">
            <el-button type="warning" round @click="editVoteProject(scope.row)">修改</el-button>
            <el-button type="danger" round @click="rmVoteProject(scope.row)">删除</el-button>
        </template>
  
      </el-table-column>
  </el-table>
    <div>
       <el-pagination class="pagination-style" 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"  
        layout="total,sizes,prev, pager, next, jumper"
        :total="total" >
     </el-pagination>
    </div>
    <div>
      <el-dialog title="修改参评项目" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" label-width="120px" class="demo-ruleForm">
        
        <el-form-item label="投票主题" >
          <el-select v-model="ruleForm.topicId" disabled  placeholder="请选择" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="分组编号" required>
          <el-input v-model="ruleForm.groupId" style="width:160px;"></el-input>
        </el-form-item>
        <!-- <el-form-item label="项目编号" required>
          <el-input v-model="ruleForm.checkInId" style="width:160px;"></el-input>
        </el-form-item> -->
        <el-form-item label="项目名称" required>
          <el-input v-model="ruleForm.projectName" style="width:500px;"></el-input>
        </el-form-item>
        <el-form-item label="研发单位名称" required>
          <el-input v-model="ruleForm.unitName" style="width:500px;"></el-input>
        </el-form-item>
        <el-form-item label="研发单位编号" required>
          <el-input v-model="ruleForm.unitCode" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input v-model="ruleForm.projectCont" style="width:500px;"></el-input>
        </el-form-item>
        </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit()">确 定</el-button>
              </div>
        </el-dialog>
    </div>
   </div>
</template>

<script>
import { Table, TableColumn, Icon, Popover, Tag, Button } from 'element-ui';
import moment from "moment";
import UserApi from '../../api/user';
import axios from 'axios';
import Config from '../../config/index'
const baseUrl = Config.target
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
      valueTopic: '',
      dialogFormVisible: false,
      ruleForm: {
        projectId: '',
        topicId: '',
        groupId: '',
        // checkInId: '',
        projectName: '',
        unitName: '',
        unitCode: '',
        projectCont: ''
      }
    }
  },
  methods: {
    editSubmit(){
      if (this.ruleForm.projectId == null || this.ruleForm.projectId == '') {
          this.$message.error('系统错误！');
          return;
      }
      // if (this.ruleForm.topicId == null || this.ruleForm.topicId == '') {
      //     this.$message.error('请选择项目所属投票主题！');
      //     return;
      // }
      if (this.ruleForm.groupId == null || this.ruleForm.groupId == '') {
          this.$message.error('请输入分组编号！');
          return;
      }
      // if (this.ruleForm.checkInId == null || this.ruleForm.checkInId == '') {
      //     this.$message.error('请输项目编号！');
      //     return;
      // }
      if (this.ruleForm.projectName == null || this.ruleForm.projectName == '') {
          this.$message.error('请输项目名称！');
          return;
      }
      if (this.ruleForm.unitName == null || this.ruleForm.unitName == '') {
          this.$message.error('请输入研发单位名称！');
          return;
      }
      if (this.ruleForm.unitCode == null || this.ruleForm.unitCode == '') {
          this.$message.error('请输入研发单位编码！');
          return;
      }
      const that = this;
      let params = this.ruleForm;
      delete params.topicName;

      axios.post(baseUrl + '/vote/vote/editVoteProject', params)
                  .then(function (response) {
                    let res = response.data;
                    if (res.code == '000000') {                  
                      that.$message.success('操作成功'); 
                      that.dialogFormVisible = false;
                      that.$router.push({path: '/projectList'});
                    } else {
                      that.$message.error(res.msg);
                    }
                  }).catch(function (error) {
                      console.log(error);
                  }); 
    },
    editVoteProject(row) {
      this.dialogFormVisible = true;
      this.ruleForm = row;
    },
    rmVoteProject (row) { 
      const that = this;
      this.$confirm('您确定要删除投《' + row.topicName +'》投票主题下“ ' + row.projectName +' ”参评项目吗, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              axios.delete(baseUrl + '/vote/vote/rmVoteProject?projectId='+ row.projectId)
                .then(function (response) {
                  let res = response.data;
                  if (res.code == '000000') {
                  that.$message.success('操作成功'); 
                  that.listProject();
                } else {
                  that.$message.error(res.msg);
                }
                }).catch(function (error) {
                  console.log(error);
                });
            }).catch(() => {
              return false;         
            });
    },
    change () {
        this.listProject();
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
        pageSize: this.pageSize
      }
      if (this.valueTopic != '') {
        params.topicId = this.valueTopic;
      } else {
        delete params.topicId;
      }
      const res = await UserApi.getProjectList(params);
      if (res.code == '000000') {
        this.tableData = res.data.list;
        this.total = res.data.totalCount;
      } else {
        that.$message.error('系统错误！');
      }
    }
  },
  mounted () {
    this.initTopicList();
    this.listProject();
  }
}
</script>

