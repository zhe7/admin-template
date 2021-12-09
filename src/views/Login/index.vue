<template>
    <div class="login">
        <div class="login-mask"></div>

        <div class="login-content">
            <div class="page-title">管理后台</div>
            <div class="login-wrapper">
                <el-form :model="form" :rules="rules" ref="$form">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" placeholder="请输入账号" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="form.password"
                            type="password"
                            placeholder="请输入密码"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            @click="submit"
                            :loading="btnLoading"
                            style="width: 100%"
                            type="primary"
                            >登 入</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
}
</script>

<script setup>
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { login, loginVerify } from '@/api/systemUser'
import router from '../../router'

const btnLoading = ref(false)
const $form = ref(null)
const form = ref({
    username: '',
    password: '',
})

const rules = {
    username: [{ required: true, message: '请输入账号' }],
    password: [{ required: true, message: '请输入密码' }],
}

const submitSecond = async (token, code) => {
    btnLoading.value = true
    const [err, res] = await loginVerify({
        code,
        token,
    })
    btnLoading.value = false
    if (!err) {
        ElMessage.success('登入成功')
        router.push('/users')
    }
}

const submit = () => {
    $form.value.validate(async valid => {
        if (valid) {
            btnLoading.value = true
            const [err, res] = await login(form.value)
            btnLoading.value = false

            if (!err) {
                ElMessageBox.prompt('请输入谷歌验证码').then(({ value }) => {
                    submitSecond(res.token, value)
                })
            }
        }
    })
}
</script>

<style lang="scss">
@import './index.scss';
</style>
