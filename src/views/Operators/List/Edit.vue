<template>
    <el-drawer v-model="visible" @closed="close" title="编辑用户" :size="620">
        <el-form size="small" style="width: 600px" label-width="100px" :model="form" ref="$form">
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="谷歌">
                {{ ga }}
                <el-button @click="gen" :loading="genLoading">设置谷歌秘钥</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" :loading="loading" type="primary">确定</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script>
export default {
    name: 'EditOperator',
}
</script>

<script setup>
import { ref } from '@vue/reactivity'
import { ElMessage } from 'element-plus'
import { update, genGA } from '@/api/systemUser'

const props = defineProps({
    modelValue: Boolean,
    item: Object,
})

const emits = defineEmits(['update:modelValue', 'success'])

const $form = ref(null)
const form = ref({
    username: '',
    password: '',
    googleSecret: '',
})

for (let key in form.value) {
    form.value[key] = props.item[key]
}

const loading = ref(false)
const visible = ref(true)
const submit = async () => {
    const o = {
        uid: props.item.uid,
    }
    if (form.value.password) o.password = form.value.password
    if (ga.value) o.googleSecret = ga.value

    loading.value = true
    const [err] = await update(o)
    loading.value = false
    if (!err) {
        ElMessage.success('设置成功')
        visible.value = false
        emits('success')
    }
}

const close = () => {
    emits('update:modelValue')
}

const genLoading = ref(false)
const ga = ref('')
const gen = async () => {
    const [err, res] = await genGA()
    if (!err) {
        ga.value = res
    }
}
</script>
