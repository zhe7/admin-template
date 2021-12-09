import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'

const instance = axios.create({

})

instance.interceptors.response.use(response => {
    if (response.status === 200 || response.status === 204) {
        const { data, config } = response

        if (data.code === 200) {
            return [undefined, data.data]
        } else if (data.code === 401) {
            ElMessageBox.confirm('请登录').then(() => {
                router.push({
                    path: '/'
                })
            })
            return [data, undefined]
        } else {
            ElMessage.error(data.message)
            return [data, undefined]
        }
    } else {
        return [response.statusText, undefined]
    }
}, function (error) {
    const { message } = error
    ElMessage.error(message)

    return [error, undefined]
})

export default instance
