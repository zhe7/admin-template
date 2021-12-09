<template>
    <ElContainer class="layout">
        <ElHeader class="layout-header">
            <div class="header-hd"></div>
            <div class="header-bd"></div>
            <div class="header-ft">
                <ElDropdown trigger="click" @command="handlerCommand">
                    <span class="user-name">折夕</span>
                    <template #dropdown>
                        <ElDropdownMenu>
                            <ElDropdownItem command="logout">退出登录</ElDropdownItem>
                        </ElDropdownMenu>
                    </template>
                </ElDropdown>
            </div>
        </ElHeader>

        <ElContainer class="layout-container">
            <ElAside width="200px">
                <ElMenu class="side-menu" router :default-active="curRoute.path">
                    <ElSubMenu v-for="route in routes" :key="route.id" :index="route.path">
                        <template #title>{{ route.meta.label }}</template>
                        <template v-for="item in route.children" :key="item.id">
                            <ElMenuItem v-if="item.meta.label" :index="item.path">
                                {{ item.meta.label }}
                            </ElMenuItem>
                        </template>
                    </ElSubMenu>
                </ElMenu>
            </ElAside>
            <div style="flex: 1; overflow: auto">
                <ElMain>
                    <router-view />
                </ElMain>
            </div>
        </ElContainer>
    </ElContainer>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { logout } from '@/api/systemUser'

const curRoute = useRoute()
const router = useRouter()

const routes = router.options.routes.filter(item => item.meta && item.meta.label)

const fetchLogout = () => {
    ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            const [err] = await logout()
            if (!err) {
                ElMessage.success('退出成功')
                router.push('/')
            }
        })
        .catch(() => {})
}

const handlerCommand = command => {
    switch (command) {
        case 'logout':
            fetchLogout()
        default:
            break
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
