<template>
  <div class="login_body">
    <div class="color"></div>
    <div class="color"></div>
    <div class="color"></div>
    <div class="box">
      <div class="square" style="--i: 0"></div>
      <div class="square" style="--i: 1"></div>
      <div class="square" style="--i: 2"></div>
      <div class="square" style="--i: 3"></div>
      <div class="square" style="--i: 4"></div>
      <div class="container">
        <el-form
          class="form"
          status-icon
          :rules="rules"
          label-width="80px"
          label-position="right"
          ref="form"
          :model="form">
          <h2>智慧园区 - 登录</h2>
          <el-form-item class="inputBox" label="账号" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="remember">
            <el-checkbox v-model="remember">记住我</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_btn" @click="loginHandler"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <div class="textBtn">
          <span class="desc">测试账号:</span
          ><button @click="setAdmin_btn">admin</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const REMEMBER_KEY = REMEMBER_KEY
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      remember: false,
      rules: {
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const formStr = localStorage.getItem(REMEMBER_KEY)
    if (formStr) {
      const formObj = JSON.parse(formStr)
      this.form = formObj
      this.remember = true
    }
  },
  methods: {
    loginHandler() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.remember) {
            localStorage.setItem(REMEMBER_KEY, JSON.stringify(this.form))
          } else {
            localStorage.removeItem(REMEMBER_KEY)
          }
          await this.$store.dispatch('user/asyncLogin', this.form)
          this.$router.push('/')
          this.$message({
            type: 'success',
            message: '登录成功'
          })
        }
      })
    },
    setAdmin_btn() {
      this.form.username = 'admin'
      this.form.password = 'admin123'
    }
  }
}
</script>

<style scoped lang="scss">
.login_body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);

  .color {
    position: absolute;
    filter: blur(150px);

    &:nth-child(1) {
      top: -350px;
      width: 600px;
      height: 600px;
      background-color: #ff359b;
    }

    &:nth-child(2) {
      bottom: 50px;
      left: 100px;
      width: 500px;
      height: 500px;
      background-color: #fffd87;
    }

    &:nth-child(3) {
      bottom: 50px;
      right: 100px;
      width: 300px;
      height: 300px;
      background-color: #00d2ff;
    }
  }

  .box {
    position: relative;

    .square {
      position: absolute;
      backdrop-filter: blur(5px);
      box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      animation: animate 10s linear infinite;
      animation-delay: calc(-1s * var(--i));

      &:nth-child(1) {
        top: -50px;
        right: -60px;
        width: 100px;
        height: 100px;
      }

      &:nth-child(2) {
        top: 150px;
        left: -80px;
        width: 100px;
        height: 100px;
        z-index: 2;
      }

      &:nth-child(3) {
        bottom: 50px;
        right: -60px;
        width: 80px;
        height: 80px;
        z-index: 2;
      }

      &:nth-child(4) {
        bottom: -80px;
        left: 100px;
        width: 50px;
        height: 50px;
      }

      &:nth-child(5) {
        top: -80px;
        left: 140px;
        width: 60px;
        height: 60px;
      }
    }
  }

  .container {
    position: relative;
    width: 400px;
    min-height: 400px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    .form {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 40px;

      h2 {
        position: relative;
        color: #444;
        font-size: 24px;
        letter-spacing: 1px;
        margin-bottom: 40px;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 80px;
          height: 4px;
          background-color: #444;
        }
      }
    }
  }
}

@keyframes animate {
  0%,
  100% {
    transform: translateY(-40px);
  }

  50% {
    transform: translateY(40px);
  }
}

.login_btn {
  width: 100%;
}

.textBtn {
  position: absolute;
  bottom: 20px;

  .desc {
    margin-right: 10px;
  }

  button {
    cursor: pointer;
  }
}
</style>
