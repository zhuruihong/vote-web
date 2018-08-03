<style lang="less" scoped>
  .container {
    width: 50%;
    margin-left: 20%;
    margin-top: 40px;
  }
  .el-date-editor.el-input {
    width: 216px;
}
</style>
<template>
    <div class="container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动主题" prop="topicName">
          <el-input v-model="ruleForm.topicName"></el-input>
        </el-form-item>
        <el-form-item label="活动状态" prop="topicState">
          <el-select v-model="ruleForm.topicState" placeholder="请选择活动状态">
            <el-option label="开启" value="1"></el-option>
            <el-option label="不开启" value="0"></el-option>
          </el-select>
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

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import THREE from '../../libs/three/three';
import UserApi from '../../api/user';
import Config from '../../config/index'
import axios from 'axios';
const baseUrl = Config.target
import qs from 'qs';
  export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (value.match('[\u4e00-\u9fa5]')) {
          callback();
        } else {
          callback(new Error('不允许输入除汉字、数字及下划线、中划线以外的其他符号'));
          callback();
        }
      };
      return {
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
            { required: true, message: '年龄不能为空'},
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
      };
    },
    methods: {
      querySearch(queryString, cb) {
        return;
      },
      checkNumber(num) {
        if (!/^\+?[1-9][0-9]*$/.test(num)) {
          this.$message.error('请输入正确参数'); 
          return false;
        }
      },
      addTopic () { 
        const that = this;
        const params = this.ruleForm;
        axios.post(baseUrl + '/vote/vote/addTopic', params)
                  .then(function (response) {
                    let res = response.data;
                    if (res.code == '000000') {
                    
                    that.$message.success('添加成功'); 
                    that.$router.push({path: '/quick'});
                  } else {
                    that.$message.error(res.msg);
                  }
                  }).catch(function (error) {
                    console.log(error);
                    that.$message.error(error);
                  });
        
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.voteBgnTime.getTime() >= this.ruleForm.voteEndTime.getTime()) {
                this.$message.error('结束时间不能小于开始时间');
                this.ruleForm.voteEndTime = '';
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
              this.addTopic();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>