<template>
    <el-drawer v-model="visible" @closed="close" title="新增用户" :size="620">
        <el-form
            size="small"
            style="width: 600px"
            label-width="100px"
            :model="form"
            :rules="rules"
            ref="$form"
        >
            <el-form-item label="登录账号" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" :loading="loading" type="primary">确定</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script>
export default {
    name: 'CreateOperator',
}
</script>

<script setup>
import { ref } from '@vue/reactivity'
import { ElMessage } from 'element-plus'
import { create } from '@/api/systemUser'

const props = defineProps({
    modelValue: Boolean,
})

const emits = defineEmits(['update:modelValue', 'success'])

const $form = ref(null)
const form = ref({
    username: '',
    password: '',
    disabled: false,
})
const rules = {
    username: { required: true, message: '请输入账号' },
    password: { required: true, message: '请输入密码' },
}

const loading = ref(false)
const visible = ref(true)
const submit = () => {
    $form.value.validate(async valid => {
        if (valid) {
            loading.value = true
            const [err] = await create(form.value)
            loading.value = false
            if (!err) {
                ElMessage.success('创建成功')
                visible.value = false
                emits('success')
            }
        }
    })
}

const close = () => {
    emits('update:modelValue')
}
</script>
