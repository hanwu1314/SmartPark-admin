<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <el-input
        v-model="params.name"
        clearable
        placeholder="请输入内容"
        @clear="clearSearch"
        class="search-main" />
      <el-button type="primary" @click="doSearch">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/addEnterPrise')"
        >添加企业</el-button
      >
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="list" @expand-change="expandChange">
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-table :data="row.rentList">
              <el-table-column
                label="租赁楼宇"
                width="320"
                prop="buildingName" />
              <el-table-column label="租赁起始时间" prop="startTime" />
              <el-table-column label="合同状态">
                <template #default="scope">
                  <el-tag :type="formatInfoType(scope.row.status)">
                    {{ formatStatus(scope.row.status) }}</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template #default="scope">
                  <el-button
                    size="mini"
                    :disabled="scope.row.status === 3"
                    type="text"
                    @click="outRent(scope.row.id)"
                    >退租</el-button
                  >
                  <el-button
                    size="mini"
                    :disabled="scope.row.status !== 3"
                    type="text"
                    @click="delRent(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" />
        <el-table-column label="企业名称" width="320" prop="name" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column label="联系电话" prop="contactNumber" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="mini" type="text" @click="addRent(row.id)"
              >添加合同</el-button
            >
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text" @click="editEnterprise(row.id)"
              >编辑</el-button
            >
            <el-button size="mini" type="text" @click="delEnterprise(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        :total="total"
        :page-size="params.pageSize"
        @current-change="pageChange"
        layout="total, prev, pager, next" />
    </div>
    <el-dialog
      title="添加合同"
      :visible="dialogVisible"
      width="580px"
      @close="closeDialog"
      @open="openDialog">
      <div class="form-container">
        <el-form
          ref="addForm"
          :model="rentForm"
          :rules="rentRules"
          label-position="top">
          <el-form-item label="租赁楼宇" prop="buildingId">
            <el-select v-model="rentForm.buildingId" placeholder="请选择">
              <el-option
                v-for="item in buildingList"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="租赁起止日期" prop="rentTime">
            <el-date-picker
              v-model="rentForm.rentTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd" />
          </el-form-item>
          <el-form-item label="租赁合同" prop="contractId">
            <el-upload action="#" :http-request="uploadHandle">
              <el-button size="small" type="primary" plain
                >上传合同文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                支持扩展名：.doc .docx .pdf, 文件大小不超过5M
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSubmit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEnterpriseAPI,
  delExterpriseAPI,
  uploadAPI,
  getBuildingRentListAPI,
  createRentAPI,
  outRentAPI,
  getRentListAPI,
  delRentListAPI
} from '@/services'
export default {
  data() {
    return {
      list: [],
      params: {
        name: '',
        page: 1,
        pageSize: 10
      },
      total: 0,
      dialogVisible: false,
      rentForm: {
        /**楼宇id */
        buildingId: null,
        /**合同id */
        contractId: null,
        /**合同Url */
        contractUrl: '',
        /**企业名称 */
        enterpriseId: null,
        /**合同类型 */
        type: 0,
        /**合同时间 */
        rentTime: []
      },
      rentRules: {
        buildingId: [
          { required: true, message: '请选择楼宇', trigger: 'change' }
        ],
        rentTime: [
          { required: true, message: '请选择租赁日期', trigger: 'change' }
        ],
        contractId: [{ required: true, message: '请上传合同文件' }]
      },
      /**楼宇列表 */
      buildingList: []
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    async outRent(id) {
      this.$confirm('确认退租吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await outRentAPI(id)
          this.$message({
            type: 'success',
            message: '退租成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    formatInfoType(status) {
      const MAP = {
        0: 'warning',
        1: 'success',
        2: 'info',
        3: 'danger'
      }
      return MAP[status]
    },
    formatStatus(status) {
      const MAP = {
        0: '待生效',
        1: '生效中',
        2: '已到期',
        3: '已退租'
      }
      return MAP[status]
    },
    async expandChange(row, rows) {
      const item = rows.find((item) => item.id === row.id)
      if (item) {
        const res = await getRentListAPI(row.id)
        row.rentList = res.data
      }
    },

    async getlist() {
      const res = await getEnterpriseAPI(this.params)
      this.list = res.data.rows.map((item) => {
        return {
          ...item,
          rentList: [] // 合同列表
        }
      })
      this.total = res.data.total
    },
    async getBuildList() {
      const res = await getBuildingRentListAPI()
      this.buildingList = res.data
    },
    pageChange(page) {
      this.params.page = page
      this.getlist()
    },
    doSearch() {
      this.params.page = 1
      this.getlist()
    },
    clearSearch() {
      this.getlist()
    },
    editEnterprise(id) {
      this.$router.push({
        path: '/addEnterprise',
        query: {
          id
        }
      })
    },
    delEnterprise(id) {
      this.$confirm('确认删除企业吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delExterpriseAPI(id)
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addRent(id) {
      this.dialogVisible = true
      this.rentForm.enterpriseId = id
    },
    async delRent(id) {
      const res = await delRentListAPI(id)
      this.$message({
        type: 'success',
        message: res.msg
      })
    },
    closeDialog() {
      this.dialogVisible = false
    },
    openDialog() {
      this.getBuildList()
    },
    async uploadHandle(fileData) {
      const { file } = fileData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'contract')

      const res = await uploadAPI(formData)
      const { id, url } = res.data

      this.rentForm.contractId = id
      this.rentForm.contractUrl = url

      this.$refs.addForm.validate('contractID')
    },
    confirmSubmit() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          const { buildingId, contractId, contractUrl, type, enterpriseId } =
            this.rentForm
          const rentData = {
            buildingId,
            startTime: this.rentForm.rentTime[0],
            endTime: this.rentForm.rentTime[1],
            contractId,
            contractUrl,
            type,
            enterpriseId
          }
          createRentAPI(rentData)
          this.dialogVisible = false
          this.$refs.addForm.resetFields()

          this.$message({
            type: 'success',
            message: '添加合同成功'
          })

          this.rentForm = {
            buildingId: null,
            contractId: null,
            contractUrl: '',
            enterpriseId: null,
            type: 0,
            rentTime: []
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.department-container {
  padding: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, 0.9);
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
.create-container {
  margin: 10px 0px;
}
.page-container {
  padding: 4px 0px;
  text-align: right;
}
.form-container {
  padding: 0px 80px;
}
</style>
