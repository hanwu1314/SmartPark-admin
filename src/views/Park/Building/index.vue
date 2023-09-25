<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">楼宇名称：</div>
      <el-input
        placeholder="请输入内容"
        @clear="doSearch"
        clearable
        v-model="params.name"
        class="search-main" />
      <el-button type="primary" @click="doSearch">查询</el-button>
      <el-button type="primary" @click="addBuilding">添加楼宇</el-button>
      <el-button type="primary" @click="exportToExcel">导出Execl</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="buildingList">
        <el-table-column type="index" label="序号" />
        <el-table-column label="楼宇名称" prop="name" />
        <el-table-column label="层数" prop="floors" />
        <el-table-column label="在管面积(m²)" prop="area" />
        <el-table-column label="物业费(元/m²)" prop="propertyFeePrice" />
        <el-table-column label="状态" prop="status">
          <template #default="scope">
            {{ formatStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button size="mini" type="text" @click="EditConfirm(row)"
              >编辑</el-button
            >
            <el-button size="mini" type="text" @click="delConfirm(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        @current-change="pageChange" />
    </div>
    <el-dialog
      title="添加楼宇"
      :visible="dialogVisible"
      width="580px"
      @close="closeDialog">
      <div class="form-container">
        <el-form :model="addForm" :rules="addFormRules" ref="addForm">
          <el-form-item label="楼宇名称" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="楼宇层数" prop="floors">
            <el-input v-model="addForm.floors" />
          </el-form-item>
          <el-form-item label="在管面积" prop="area">
            <el-input v-model="addForm.area" />
          </el-form-item>
          <el-form-item label="物业费" prop="propertyFeePrice">
            <el-input v-model="addForm.propertyFeePrice" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmAdd"
          >确 定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { utils, writeFileXLSX } from 'xlsx'
import {
  getBuildingListAPI,
  createBuildingListAPI,
  delBuildingListAPI,
  updateEnterpriseAPI
} from '@/services'
export default {
  name: 'Building',
  data() {
    return {
      buildingList: [], // table列表
      params: {
        // 请求参数
        page: 1,
        pageSize: 10,
        name: ''
      },
      total: 0,
      dialogVisible: false,
      addForm: {
        name: '',
        floors: null,
        area: null,
        propertyFeePrice: null
      },
      addFormRules: {
        name: [{ required: true, message: '请输入楼宇名称', trigger: 'blur' }],
        floors: [
          { required: true, message: '请输入楼宇层数', trigger: 'blur' }
        ],
        area: [{ required: true, message: '请输入楼宇面积', trigger: 'blur' }],
        propertyFeePrice: [
          { required: true, message: '请输入楼宇物业费', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getBuildingList()
  },
  methods: {
    async exportToExcel() {
      const res = await getBuildingListAPI(this.params)
      const tableHeader = [
        'name',
        'floors',
        'area',
        'propertyFeePrice',
        'status'
      ]
      // 处理数据保证
      const sheetData = res.data.rows.map((item) => {
        const _item = {}
        let obj = []
        tableHeader.forEach((key) => {
          obj[key] = item[key]
        })
        return obj
      })
      // 创建一个工作表
      const worksheet = utils.json_to_sheet(sheetData)
      // 创建一个新的工作簿
      const workbook = utils.book_new()
      // 把工作表添加到工作簿
      utils.book_append_sheet(workbook, worksheet, 'Data')
      // 改写表头
      utils.sheet_add_aoa(
        worksheet,
        [['楼宇名称', '层数', '在管面积(㎡)', '物业费(元/㎡)', '状态']],
        { origin: 'A1' }
      )
      writeFileXLSX(workbook, 'SheetJSVueAoO.xlsx')
    },
    async getBuildingList() {
      const res = await getBuildingListAPI(this.params)
      this.buildingList = res.data.rows
      this.total = res.data.total
    },
    formatStatus(status) {
      const statusMap = {
        0: '租赁中',
        1: '闲置中'
      }
      return statusMap[status]
    },
    pageChange(page) {
      this.params.page = page
      this.getBuildingList()
    },
    doSearch() {
      this.params.page = 1
      this.getBuildingList()
    },
    addBuilding() {
      this.dialogVisible = true
      this.addForm = {
        name: '',
        floors: null,
        area: null,
        propertyFeePrice: null
      }
    },
    closeDialog() {
      this.dialogVisible = false
    },
    confirmAdd() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          if (this.addForm.id) {
            await updateEnterpriseAPI(this.addForm)
          } else {
            await createBuildingListAPI(this.addForm)
          }
          this.getBuildingList()
          this.dialogVisible = false
        }
      })
    },
    delConfirm(id) {
      this.$confirm('确认删除当前楼宇吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delBuildingListAPI(id)
          this.getBuildingList()
          this.$message.success('删除成功')
        })
        .catch(() => {})
    },
    EditConfirm(row) {
      this.dialogVisible = true
      let { id, area, floors, name, propertyFeePrice } = row
      this.addForm = {
        id,
        area,
        floors,
        name,
        propertyFeePrice: 3
      }
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
.page-container {
  padding: 4px 0px;
  text-align: right;
}
</style>
