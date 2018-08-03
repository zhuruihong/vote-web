<style lang="less" scoped>
  .pagination-style {
    margin: 30px 60px;
    float: right;
  }
  .el-pagination__total {
    margin: 2px 10px;
}
.buttonClass{
      padding: 6px 4px;
      line-height: -1;
}
.w_btn{
  text-align: center;
  border-radius:10px;
  cursor: pointer;
  margin:2px;
}
</style>
<template>


  <div>


    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="topicId" label="ID" width="70"> </el-table-column>
      <el-table-column prop="topicName" label="投票主题名称" width="260"> </el-table-column>
      <el-table-column prop="stateName" label="投票状态" width="100"> </el-table-column>
      <el-table-column prop="voteBgnTime" label="投票开始时间" width="170"> </el-table-column>
      <el-table-column prop="voteEndTime" label="投票结束时间" width="170"> </el-table-column>
      <el-table-column prop="validNum1" label="一等奖可投票"> </el-table-column>
      <el-table-column prop="validNum2" label="二等奖可投票"> </el-table-column>
      <el-table-column prop="validNum3" label="三等奖可投票"> </el-table-column>
      <el-table-column prop="awardNum1" label="一等奖名额"> </el-table-column>
      <el-table-column prop="awardNum2" label="二等奖名额"> </el-table-column>
      <el-table-column prop="awardNum3" label="三等奖名额"> </el-table-column>
      <el-table-column prop="expertNumBe" label="计划投票专家"> </el-table-column>
      <el-table-column prop="expertNumFact" label="实际投票专家"> </el-table-column>
      <el-table-column label="操作" width="240">
        <template scope="scope" style="float:left">
            <span class='w_btn' @click="handleClick(1, scope.row)" >启用</span>
            <span class='w_btn' @click="handleClick(2, scope.row)" >停用</span>
            <span class='w_btn' @click="handleClick(3, scope.row)" >开始计票</span>
            <span class='w_btn' @click="handleClick(4, scope.row)" >修改</span>
            <span class='w_btn' @click="handleClick(5, scope.row)" >删除</span>
        </template>
  
      </el-table-column>
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


<el-dialog title="投票活动修改" :visible.sync="dialogFormVisible">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动主题" prop="topicName">
          <el-input v-model="ruleForm.topicName"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" required>
          <el-col :span="11">
            <el-form-item prop="voteBgnTime">
              <el-date-picker
                v-model="ruleForm.voteBgnTime"
                type="datetime"
                placeholder="选择投票开始日期时间"
                default-time="12:00:00">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" required>
          <el-col :span="11">
            <el-form-item prop="voteEndTime">
              <el-date-picker
                v-model="ruleForm.voteEndTime"
                type="datetime"
                placeholder="选择投票截至日期时间"
                default-time="12:00:00">
              </el-date-picker>
            </el-form-item>
          </el-col>
          
        </el-form-item>
        <el-form-item label="有效票数" required prop="validNum1">
          <span style="font-size: 14px;color: #48576a;margin: 5px;">一等奖</span>
          <el-input-number v-model="ruleForm.validNum1" :min="1" :max="1000" label="一等奖可投票数"></el-input-number>
        </el-form-item>
        <el-form-item required prop="validNum2">
          <span style="font-size: 14px;color: #48576a;margin: 5px;">二等奖</span>
          <el-input-number v-model="ruleForm.validNum2" :min="1" :max="1000" label="二等奖可投票数"></el-input-number>
        </el-form-item>
        <el-form-item required prop="validNum3">
          <span style="font-size: 14px;color: #48576a;margin: 5px;">三等奖</span>
          <el-input-number v-model="ruleForm.validNum3" :min="1" :max="1000" label="三等奖可投票数"></el-input-number>
        </el-form-item>
        <el-form-item label="获奖名额" required prop="awardNum1">
          <span style="font-size: 14px;color: #48576a;margin: 5px;">一等奖</span>
          <el-input-number v-model="ruleForm.awardNum1" :min="1" :max="1000" label="一等奖名额"></el-input-number>
        </el-form-item>
        <el-form-item required prop="awardNum2">
          <span style="font-size: 14px;color: #48576a;margin: 5px;">二等奖</span>
          <el-input-number v-model="ruleForm.awardNum2" :min="1" :max="1000" label="二等奖名额"></el-input-number>
        </el-form-item>
        <el-form-item required prop="awardNum3">
          <span style="font-size: 14px;color: #48576a;margin: 5px;">三等奖</span>
          <el-input-number v-model="ruleForm.awardNum3" :min="1" :max="1000" label="三等奖名额"></el-input-number>
        </el-form-item>
        <el-form-item label="票数比率" required prop="ratio1">
          <span style="font-size: 14px;color: #48576a;margin: 5px;">一等奖</span>
            <el-input v-model.number="ruleForm.ratio1" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item required prop="ratio2">
          <span style="font-size: 14px;color: #48576a;margin: 5px;">二等奖</span>
            <el-input v-model.number="ruleForm.ratio2" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item required prop="ratio3">
          <span style="font-size: 14px;color: #48576a;margin: 5px;">三等奖</span>
            <el-input v-model.number="ruleForm.ratio3" style="width:180px;"></el-input>
        </el-form-item>
        </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editTopicSubmit()">确 定</el-button>
              </div>
        </el-dialog>
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
    var validateName = (rule, value, callback) => {
      if (value.match('[\u4e00-\u9fa5]')) {
        callback();
      } else {
        callback(new Error('不允许输入除汉字、数字及下划线、中划线以外的其他符号'));
        callback();
      }
    };
    return {
      active: 1,
      tableData: [],
      total:0,
      pageNo:1,
      pageSize:10,
        dialogFormVisible: false,
        ruleForm: {
          topicName: '',
          topicState: '',
          voteBgnTime: '',
          voteEndTime: '',
          validNum1: '',
          validNum2: '',
          validNum3: '',
          awardNum1: '',
          awardNum2: '',
          awardNum3: '',
          ratio1: '',
          ratio2: '',
          ratio3: ''
        },
        rules: {
          topicName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' },
            { validator: validateName, trigger: 'blur' }
          ],
          topicState: [
            { required: true, message: '请选择投票活动状态', trigger: 'change' }
          ],
          voteBgnTime: [
            { type: 'date', required: true, message: '请选择投票开始日期时间', trigger: 'change' }
          ],
          voteEndTime: [
            { type: 'date', required: true, message: '请选择投票结束日期时间', trigger: 'change' }
          ],
          ratio1: [
            { required: true, message: '请输入一名得奖比率'},
            { type: 'number', message: '年龄必须为数字值'}
          ],
          ratio2: [
            { required: true, message: '请输入二名得奖比率'},
            { type: 'number', message: '年龄必须为数字值'}
          ],
          ratio3: [
            { required: true, message: '请输入三名得奖比率'},
            { type: 'number', message: '年龄必须为数字值'}
          ]
        }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.listTopic();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.listTopic();
    },
    editTopic (params) { 
        const that = this;
        axios.post(baseUrl + '/vote/vote/editTopic', params)
                  .then(function (response) {
                    let res = response.data;
                    if (res.code == '000000') {
                    
                    that.$message.success('操作成功'); 
                    that.listTopic();
                  } else {
                    that.$message.error(res.msg);
                  }
                  }).catch(function (error) {
                    console.log(error);
                  });
      },
      rmTopic (params) { 
        const that = this;
        axios.delete(baseUrl + '/vote/vote/rmTopic?topicId='+ params.topicId)
                  .then(function (response) {
                    let res = response.data;
                    if (res.code == '000000') {
                    
                    that.$message.success('操作成功'); 
                    that.listTopic();
                  } else {
                    that.$message.error(res.msg);
                  }
                  }).catch(function (error) {
                    console.log(error);
                  });
        
      },
    editTopicSubmit(){
      if (!this.ruleForm.topicName.match('[\u4e00-\u9fa5]')) {
        // this.$message.error('不允许输入除汉字、数字及下划线、中划线以外的其他符号');
        return false;
      }
      if (this.ruleForm.ratio1 > 1) {
        this.$message.error('一名比率不能超过1');
        this.ruleForm.ratio1 = '';
        return false;
      }
      if (this.ruleForm.ratio2 > 1) {
        this.$message.error('二名比率不能超过1');
        this.ruleForm.ratio2 = '';
        return false;
      }
      if (this.ruleForm.ratio3 > 1) {
        this.$message.error('三名比率不能超过1');
        this.ruleForm.ratio3 = '';
        return false;
      }
      const that = this;
      const params = this.ruleForm;
      delete params.topicState ;
      axios.post(baseUrl + '/vote/vote/editTopic', params)
                .then(function (response) {
                  let res = response.data;
                  if (res.code == '000000') {
                  that.$message.success('修改成功'); 
                  that.dialogFormVisible = false;
                  that.listTopic();
                } else {
                  that.$message.error(res.msg);
                }
                }).catch(function (error) {
                  console.log(error);
                });
    },
    countTopicVote(topicId){
      const that = this;
      axios.get(baseUrl + '/vote/vote/analysisVote?topicId='+ topicId)
            .then(function (response) {
                let res = response.data;
                if (res.code == '000000') {
                that.$message.success('计票完成！'); 
                that.listTopic();
              } else {
                // that.$message.error(res.msg);
                that.$alert(res.msg, '提示', {
                  confirmButtonText: '确定',
                  type: 'error'
                });
              }
            }).catch(function (error) {
              console.log(error);
            });
    },
    handleClick(c,row){
      const that = this;
      //console.log(c + "****" + JSON.stringify(row))
      const params = {
        topicId: row.topicId,
        topicState: row.topicState
      }
      if (c == 1) {
        if (row.topicState == 1) {
            that.$message.error(row.topicName + ' 投票主题已经开启！');
        } else if(row.topicState == 0){
            params.topicState = 1;
            this.$confirm('此操作将开启《' + row.topicName + '》 投票主题, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.editTopic(params);
            }).catch(() => {
              return false;         
            });    
        }
      } else if (c == 2) {
        if (row.topicState == 0) {
            that.$message.error(row.topicName + ' 投票主题还未开启！');
        } else if(row.topicState == 1){
            params.topicState = 0;
            this.$confirm('此操作将关闭《' + row.topicName + '》 投票主题, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.editTopic(params);
            }).catch(() => {
              return false;         
            }); 
        }
      } else if (c == 3) {
        this.$confirm('确定统计《' + row.topicName + '》 的投票数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.countTopicVote(row.topicId);
            }).catch(() => {
              return false;         
            }); 
      } else if (c == 4) {
        const topicInfo = JSON.parse(JSON.stringify(row));
        this.$confirm('确定修改投票主题, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.ruleForm = topicInfo;
              if (topicInfo.topicState == 0) {
                this.ruleForm.topicState = "未开启";
              } else if(topicInfo.topicState == 1) {
                this.ruleForm.topicState = "开启";
              }
              this.dialogFormVisible = true;
            }).catch(() => {
              return false;         
            }); 
        
      } else if (c == 5) {
            this.$confirm('此操作将删除《' + row.topicName + '》 投票主题, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              console.log(params)
              this.rmTopic(params);
            }).catch(() => {
              return false;         
            }); 
      } 
    },
    formatDate(time) {
      var date = new Date(time);
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    async listTopic () { 
      const that = this;
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      const res = await UserApi.listTopic(params);
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
    this.listTopic();
  }
}
</script>
