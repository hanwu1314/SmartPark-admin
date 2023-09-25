<template>
  <div class="rule-container">
    <div class="create-container">
      <el-button type="primary" @click="addRule">增加停车计费规则</el-button>
      <el-button @click="exportExcel">导出Excel</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="ruleList" style="width: 100%">
        <el-table-column type="index" label="序号" />
        <el-table-column label="计费规则编号" prop="ruleNumber" />
        <el-table-column label="计费规则名称" prop="ruleName" />
        <el-table-column label="免费时长(分钟)" prop="freeDuration" />
        <el-table-column label="收费上线(元)" prop="chargeCeiling" />
        <el-table-column label="计费方式">
          <template #default="scope">
            {{ formChargeType(scope.row.chargeType) }}
          </template>
        </el-table-column>
        <el-table-column label="计费规则" prop="ruleNameView" />
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="{ row }">
            <el-button size="mini" type="text" @click="editRule(row.id)"
              >编辑</el-button
            >
            <el-button size="mini" type="text" @click="delRule(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="params.pageSize"
        @current-change="pageChange" />
    </div>

    <el-dialog
      width="680px"
      title="新增规则"
      :visible="dialogVisible"
      @close="closeDialog"
      @open="openDialog">
      <div class="form-container"></div>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSubmit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getRuleListAPI } from '@/services'
import { utils, writeFileXLSX } from 'xlsx'
export default {
  name: 'Building',
  data() {
    return {
      ruleList: [],
      params: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      dialogVisible: false,
      addForm: {
        ruleNumber: '', // 计费规则编号
        ruleName: '', // 计费规则名称
        chargeType: 'duration', // 计费规则类型 duration / turn / partition
        chargeCeiling: null,
        freeDuration: null,
        // 时长计费独有字段
        durationTime: null, // 时长计费单位时间
        durationPrice: null, // 时长计费单位价格
        durationType: 'hour',
        // 按次收费独有字段
        turnPrice: null,
        // 分段计费独有字段
        partitionFrameTime: null, // 段内时间
        partitionFramePrice: null, // 段内费用
        partitionIncreaseTime: null, // 超出时间
        partitionIncreasePrice: null // 超出费为收费价钱
      },
      addFormRules: {
        ruleNumber: [
          {
            required: true,
            message: '请输入规则编号',
            trigger: 'blur'
          }
        ],
        ruleName: [
          {
            required: true,
            message: '请输入规则名称',
            trigger: 'blur'
          }
        ],
        chargeType: [
          {
            required: true,
            message: '请选择收费类型',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async exportExcel() {
      const workbook = utils.book_new()
      const res = await getRuleListAPI(this.params)

      // 定义表头映射关系
      const headerMapping = {
        ruleNumber: '计费规则编号',
        ruleName: '计费规则名称',
        freeDuration: '免费时长(分钟)',
        chargeCeiling: '收费上线(元)',
        chargeType: '计费方式',
        ruleNameView: '计费规则'
      }
      const sheetData = res.data.rows.map((item) => {
        const rowData = {}
        Object.keys(headerMapping).forEach((key) => {
          rowData[key] =
            key === 'chargeType' ? this.formChargeType(item[key]) : item[key]
        })
        return rowData
      })
      const worksheet = utils.json_to_sheet(sheetData)
      // 把工作表添加到工作簿  Data为工作表名称
      utils.book_append_sheet(workbook, worksheet, 'Data')
      // 添加表头
      const headerRow = Object.values(headerMapping)
      utils.sheet_add_aoa(worksheet, [headerRow], { origin: 'A1' })
      // 导出方法进行导出
      writeFileXLSX(workbook, 'SheetJSVueAoO.xlsx')
    },
    async getList() {
      const res = await getRuleListAPI(this.params)
      this.ruleList = res.data.rows
      this.total = res.data.total
    },
    pageChange(page) {
      this.params.page = page
      this.getList()
    },
    formChargeType(chargeType) {
      const MAP = {
        duration: '时长收费',
        turn: '按次收费',
        partition: '分段收费'
      }
      return MAP[chargeType]
    },
    closeDialog() {
      this.dialogVisible = false
    },
    openDialog() {
      console.log('打开的回调函数')
    },
    addRule() {
      this.dialogVisible = true
      console.log('添加规则')
    },
    confirmSubmit() {
      console.log('确定')
    },
    editRule(id) {
      console.log('编辑：', id)
    },
    delRule(id) {
      console.log('删除：', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-container {
  padding: 20px;
  background-color: #fff;
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
