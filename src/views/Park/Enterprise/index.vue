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
      <el-table style="width: 100%" :data="list">
        <el-table-column type="index" label="序号" />
        <el-table-column label="企业名称" width="320" prop="name" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column label="联系电话" prop="contactNumber" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="mini" type="text" @click="addRent"
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
      title="提示"
      :visible="dialogVisible"
      width="30%"
      @close="closeDialog">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getEnterpriseAPI, delExterpriseAPI } from '@/services'
export default {
  data() {
    return {
      list: [],
      params: {
        name: '',
        page: 1,
        pageSize: 2
      },
      total: 0,
      dialogVisible: true
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    async getlist() {
      const res = await getEnterpriseAPI(this.params)
      this.list = res.data.rows
      this.total = res.data.total
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
    addRent() {
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
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
