<!-- eslint-disable no-undef -->
<script setup lang="ts">
  import { User, Lock, Warning } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { useRouter } from 'vue-router'
  import { getTime } from '@/composable/useTime'
  // 登录表单数据
  const refLoginForm = ref(null)
  const loginForm = ref({
    username: 'admin',
    password: '111111'
  })

  const userStore = useUserStore()
  const router = useRouter()
  // 登录回调
  const login = () => {
    refLoginForm.value.validate((isValid: boolean) => {
      if (isValid) {
        // 校验通过
        userStore.userLogin(loginForm.value).then(
          () => {
            // 登录成功
            ElNotification({
              type: 'success',
              message: '登录成功，欢迎回来',
              title: `Hi ${timeMessage.value}`
            })
            router.push({ name: 'home' })
          },
          // 登录失败
          error => {
            ElNotification({
              type: 'error',
              message: error.message
            })
          }
        )
      } else {
        ElMessage({
          type: 'warning',
          message: '账户或密码格式有误'
        })
      }
    })
  }
  // 获取当前时间区域
  const timeMessage = ref('')
  timeMessage.value = getTime()
  // 登录表单校验
  const rules = ref({
    username: [
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      { min: 5, max: 10, message: '长度为 6 到 10 ', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { min: 6, max: 10, message: '长度为 6 到 10', trigger: 'blur' }
    ]
  })
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="refLoginForm">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              show-password
              :prefix-icon="Lock"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
  .login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    .login_form {
      position: relative;
      top: 30vh;
      width: 80%;
      background: url('@/assets/images/login_form.png') no-repeat;
      background-size: cover;
      padding: 40px;
      h1 {
        font-size: 40px;
        color: #fff;
      }
      h2 {
        font-size: 20px;
        color: #fff;
        margin: 20px 0;
      }
      .login_btn {
        width: 100%;
      }
    }
  }
</style>
