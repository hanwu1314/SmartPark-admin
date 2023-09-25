<template>
  <div class="add-enterprise">
    <header class="add-header">
      <div class="left">
        <span class="arrow" @click="$router.back()"
          ><i class="el-icon-arrow-left" />返回</span
        >
        <span>|</span>
        <span>{{ id ? '编辑企业' : '新增企业' }}</span>
      </div>
      <div class="right">管理员</div>
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">企业信息</div>
        <div class="form">
          <el-form
            ref="ruleForm"
            :model="addForm"
            :rules="addRules"
            label-width="100px">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="addForm.name" />
            </el-form-item>
            <el-form-item label="法人" prop="legalPerson">
              <el-input v-model="addForm.legalPerson" />
            </el-form-item>
            <el-form-item label="注册地址" prop="registeredAddress">
              <el-input v-model="addForm.registeredAddress" />
            </el-form-item>
            <el-form-item label="所在行业" prop="industryCode">
              <el-select v-model="addForm.industryCode" @focus="selectFocus">
                <el-option
                  v-for="item in industryList"
                  :key="item.industryCode"
                  :value="item.industryCode"
                  :label="item.industryName" />
              </el-select>
            </el-form-item>
            <el-form-item label="企业联系人" prop="contact">
              <el-input v-model="addForm.contact" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input v-model="addForm.contactNumber" />
            </el-form-item>
            <el-form-item label="营业执照" prop="businessLicenseId">
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="upload"
                :before-upload="beforeUpload">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传png图片，且不超过5M
                </div>
              </el-upload>
              <img :src="addForm.businessLicenseUrl" class="img" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button>重置</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import {
  getIndustryListAPI,
  uploadAPI,
  createEnterpriseAPI,
  getEnterpriseDetailAPI,
  updateEnterpriseAPI
} from '@/services'
export default {
  data() {
    const validatePhone = (rule, value, cb) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        cb()
      } else {
        cb(new Error('请输入正确的手机号'))
      }
    }
    return {
      addForm: {
        /** 企业名称 */
        name: '',
        /** 法人 */
        legalPerson: '',
        /** 注册地址  */
        registeredAddress: '',
        /** 所在行业 */
        industryCode: '',
        /** 企业联系人 */
        contact: '',
        /** 联系人电话 */
        contactNumber: '',
        /** 营业执照url */
        businessLicenseUrl: '',
        /** 营业执照id */
        businessLicenseId: ''
      },
      /** 行业列表 */
      industryList: [],
      addRules: {
        name: [{ required: true, message: '企业名称为必填', trigger: 'blur' }],
        legalPerson: [
          { required: true, message: '法人为必填', trigger: 'blur' }
        ],
        registeredAddress: [
          { required: true, message: '注册地址为必填', trigger: 'blur' }
        ],
        industryCode: [
          { required: true, message: '所在行业为必填', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '企业联系人为必填', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '企业联系人电话为必填', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        businessLicenseId: [
          { required: true, message: '请上传营业执照', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  mounted() {
    // this.getIndustryList()
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    async getDetail() {
      const res = await getEnterpriseDetailAPI(this.id)
      this.addForm = res.data
    },
    async getIndustryList() {
      const res = await getIndustryListAPI()
      this.industryList = res.data
    },
    selectFocus() {
      this.getIndustryList()
    },
    async upload(res) {
      const { file } = res
      const fd = new FormData()
      fd.append('file', file)
      fd.append('type', 'businessLicense')

      const _res = await uploadAPI(fd)
      this.addForm.businessLicenseId = _res.data.id
      this.addForm.businessLicenseUrl = _res.data.url

      this.$refs.ruleForm.validateField('businessLicenseId')
    },
    beforeUpload(file) {
      const isPNG = file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isPNG) {
        this.$message.error('上传合同文件只能是 PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传合同文件大小不能超过5MB!')
      }
      return isPNG && isLt5M
    },
    confirmAdd() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.id) {
            const {
              name,
              id,
              legalPerson,
              registeredAddress,
              industryCode,
              businessLicenseId,
              businessLicenseUrl,
              contact,
              contactNumber
            } = this.addForm
            await updateEnterpriseAPI({
              name,
              id,
              legalPerson,
              registeredAddress,
              industryCode,
              businessLicenseId,
              businessLicenseUrl,
              contact,
              contactNumber
            })
          } else {
            //
            await createEnterpriseAPI(this.addForm)
          }

          this.$message.success(`${this.id ? '更新成功' : '新增成功'}`)
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.add-enterprise {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    font-weight: bold;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }
      .arrow {
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;
      .title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }
      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;
        .el-form {
          display: flex;
          flex-wrap: wrap;
          .el-form-item {
            width: 50%;
          }
        }
      }
    }
  }

  .add-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
  }
  .img {
    width: 150px;
    height: 150px;
    border-radius: 4px;
  }
}
</style>
