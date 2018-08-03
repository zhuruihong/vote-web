<style lang="less" scoped>
  .pagination-style {
    margin: 30px 60px;
    float: right;
  }
  .upload-demo{
    display:inline;
  }
  #sheetjs-input {margin-left: 0;
    margin-top: 5px;
    margin-bottom: 10px;}
</style>
<template>
  <div>
   <div style="margin:20px">
    <span>投票主题</span>
      <el-select v-model="valueTopic" placeholder="请选择" style="width:360px;">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>


   </div>
    <div style="margin:20px;margin-bottom:20px;">
      <span>批量新增参评项目</span>
      <input type="file" multiple="false" id="sheetjs-input" label="选取文件" accept="xls,xlsx" @change="readUpload" />
      <span class="upload-demo" style="color:red">只能上传xls/xlsx文件，且不超过5MB</span>
      <el-button type="success" class="upload-demo" @click="submitBatchProject">上传到服务器</el-button>
      <el-button type="warning" class="upload-demo" @click="downloadFile">下载导入文件模板</el-button>
      </el-upload>
    </div>
    <div style="margin:20px;">
      <span>新增参评项目</span>
      <el-button type="primary" class="upload-demo" @click="submitProject">单个参评项目录入</el-button>
    </div>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="groupId" label="分组编号" width="170"> </el-table-column>
        <el-table-column prop="unitCode" label="研发单位编码" width="120"> </el-table-column>
        <el-table-column prop="projectName" label="项目名称"> </el-table-column>
        <el-table-column prop="unitName" label="研发单位名称"> </el-table-column>
        <el-table-column prop="projectCont" label="备注" width="300"> </el-table-column>
      </el-table>
    </template>



    <div>
      <el-dialog title="参评项目新增" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="投票主题" required >
          <el-select v-model="ruleForm.topicId" placeholder="请选择" style="width:360px;">
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
        <el-form-item label="研发单位编码" required>
          <el-input v-model="ruleForm.unitCode" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" required>
          <el-input v-model="ruleForm.projectName" style="width:500px;"></el-input>
        </el-form-item>
        <el-form-item label="研发单位名称" required>
          <el-input v-model="ruleForm.unitName" style="width:500px;"></el-input>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input v-model="ruleForm.projectCont" style="width:500px;"></el-input>
        </el-form-item>
        </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit()">确 定</el-button>
              </div>
        </el-dialog>
    </div>


   </div>
</template>

<script>
import { Table, TableColumn, Icon, Popover, Tag, Button } from 'element-ui';
import moment from "moment";
import UserApi from '../../api/user';
import XLSX from 'xlsx';
import Config from '../../config/index'
const baseUrl = Config.target
import axios from 'axios';

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
      options: [],
      valueTopic: '',
      dialogFormVisible: false,
      ruleForm: {
        topicId: '',
        groupId: '',
        checkInId: '',
        projectName: '',
        unitName: '',
        unitCode: '',
        projectCont: ''
      }
    }
  },
  methods: {
    addSubmit(){
      if (this.ruleForm.topicId == null || this.ruleForm.topicId == '') {
          this.$message.error('请选择项目所属投票主题！');
          return;
      }
      if (this.ruleForm.groupId == null || this.ruleForm.groupId == '') {
          this.$message.error('请输入分组编号！');
          return;
      }
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
      axios.post(baseUrl + '/vote/vote/addVoteProject', that.ruleForm)
                  .then(function (response) {
                    let res = response.data;
                    if (res.code == '000000') {                  
                      that.$message.success('操作成功'); 
                      that.$router.push({path: '/projectList'});
                    } else {
                      that.$message.error(res.msg);
                    }
                  }).catch(function (error) {
                      console.log(error);
                  }); 
    },
    submitProject(){
      this.dialogFormVisible =true;

    },
    submitBatchProject() {
      if (this.valueTopic == null || this.valueTopic == '') {
        this.$message.error('请选择项目所属投票主题！');
        return;
      }
      if (this.tableData.length < 1) {
        this.$message.error('请上传与模板相同的xls/xlsx 项目表格！');
        return;
      }
      let data = this.tableData;
      for (var i = data.length - 1; i >= 0; i--) {
        data[i].topicId = this.valueTopic;
      }
      const that = this;
      let obj = {};
      obj = this.options.find((item)=>{
          return item.value === this.valueTopic;
      });
      this.$confirm('您确定批量导入这 ' + data.length +' 个参评项目到《 '+ obj.label +' 》主题吗, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              axios.post(baseUrl + '/vote/vote/submitProjectList', data)
                  .then(function (response) {
                    let res = response.data;
                    if (res.code == '000000') {                  
                      that.$message.success('操作成功'); 
                      that.$router.push({path: '/projectList'});
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
    downloadFile(){
      window.open(baseUrl + '/vote/vote/downloadTemplate'); 
    },
    readUpload() {
      const that = this;
      that.onchange(that);
    },
    onchange(that) {
      var file;
      var files = document.getElementById('sheetjs-input').files;
      var self = this;
      if (!files || files.length == 0) return;
      file = files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        // 数据预处理
        var binary = "";
        var bytes = new Uint8Array(e.target.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        /* 读取 workbook */
        var wb = XLSX.read(binary, {
          type: 'binary'
        });
        /* 选择第一个sheet */
        var wsname = wb.SheetNames[0];
        var ws = wb.Sheets[wsname];
        /* excel转换json数组,加上{header:1}是普通数组，不写是对象数组 */
        self.data = XLSX.utils.sheet_to_json(ws);
        var temp = JSON.stringify(self.data);
        temp = temp.replace(new RegExp(/(分组编号)/g),'groupId').replace(new RegExp(/(研发单位编码)/g),'unitCode').
        replace(new RegExp(/(项目名称)/g),'projectName').replace(new RegExp(/(研发单位名称)/g),'unitName').
        replace(new RegExp(/(备注)/g),'projectCont');
        that.tableData = JSON.parse(temp);
      };
      reader.readAsArrayBuffer(file);

    },

    async initTopicList(){
      const response = await UserApi.getTopicList();
      if (response.code=='000000') {
        for (var i = 0; i <= response.data.length - 1; i++) {
          this.options.push({value:response.data[i].topicId,label:response.data[i].topicName});
        }
      }
    }
  },
  mounted () {
    this.initTopicList();
  }
}
</script>

