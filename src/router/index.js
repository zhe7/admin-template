import { createRouter, createWebHistory } from "vue-router"
import Layout from '@/views/Layout/index.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login/index.vue'),
    },

    {
        path: '/operators',
        name: 'Operators',
        component: Layout,
        meta: {
            id: 'operators',
            label: '运营人员',
        },
        children: [{
            path: '/operators',
            name: 'OperatorsList',
            meta: {
                id: 'operatorsList',
                label: '人员列表',
            },
            component: () => import('../views/Operators/List/index.vue'),
        }]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router