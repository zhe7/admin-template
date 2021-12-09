<template>
    <div class="cell">
        <div class="primary"></div>

        <div>
            <el-button @click="showCreate" size="small" plain type="primary">新增</el-button>
        </div>
    </div>

    <el-table :data="list" v-loading="loading" size="small" style="margin-top: 20px; width: 100%">
        <el-table-column type="index" width="50px"></el-table-column>
        <el-table-column label="账号" prop="username" min-width="100px"></el-table-column>
        <el-table-column label="谷歌绑定" min-width="100px">
            <template #default="{ row }">
                <el-icon v-if="row.googleSecret" size="20" color="#409EFF"><check /></el-icon>
                <el-icon v-else size="20"><close /></el-icon>
            </template>
        </el-table-column>
        <el-table-column label="禁止" min-width="100px">
            <template #default="{ row }">
                <el-switch
                    v-model="row.disabled"
                    :loading="row._loading"
                    @change="changeDisabled(row)"
                />
            </template>
        </el-table-column>
        <el-table-column label="注册时间" prop="_ceatedAt" min-width="120px"></el-table-column>
        <el-table-column label="操作" min-width="150px">
            <template #default="{ row }">
                <el-button @click="showEdit(row)" size="small" type="text">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="cell" style="margin-top: 20px">
        <div class="primary"></div>
        <div>
            <el-pagination
                background
                :total="count"
                :page-size="form.pageSize"
                v-model:currentPage="form.page"
                @current-change="fetchList"
                layout="total, prev, pager, next"
            />
        </div>
    </div>

    <Create v-if="createVisible" v-model="createVisible" @success="fetchList()" />
    <Edit v-if="editVisible" v-model="editVisible" :item="editItem" @success="fetchList()" />
</template>

<script>
export default {
    name: 'OperatorsList',
}
</script>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { Check, Close } from '@element-plus/icons'
import { getList, update } from '@/api/systemUser'

import Create from './Create.vue'
import Edit from './Edit.vue'

const form = ref({
    page: 1,
    pageSize: 10,
})

const loading = ref(false)
const list = ref([])
const count = ref(0)

const fetchList = async () => {
    loading.value = true
    const [err, res] = await getList(form.value)
    loading.value = false
    if (!err) {
        res.list.forEach(item => {
            item._ceatedAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
            console.log(typeof item.disabled)
        })
        list.value = res.list
        count.value = res.count
    }
}

fetchList()

const changeDisabled = async row => {
    // 此时的disabled已经是switch改变后的值了
    const { uid, disabled } = row

    row._loading = true
    const [err] = await update({
        uid,
        disabled,
    })
    row._loading = false

    if (!err) {
        ElMessage.success('设置成功')
    } else {
        row.disabled = !disabled
    }
}

const createVisible = ref(false)
const showCreate = () => {
    createVisible.value = true
}

const editItem = ref(null)
const editVisible = ref(false)
const showEdit = item => {
    editItem.value = item
    editVisible.value = true
}
</script>
