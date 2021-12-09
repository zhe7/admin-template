import io from './io'

// 登录
export const login = params => io.post('/api/oc/system-user/login', params)

// 登录的二次验证
export const loginVerify = params => io.post('/api/oc/system-user/login-verify', params)

// 退出登录
export const logout = () => io.post('/api/oc/system-user/logout')

// 查询运营用户列表
export const getList = params => io.get('/api/oc/system-user/users', { params })

// 创建运营用户
export const create = params => io.post('/api/oc/system-user/users', params)

// 更新运营用户
export const update = params => io.put(`/api/oc/system-user/users/${params.uid}`, params)

// 生成谷歌秘钥
export const genGA = () => io.get('/api/oc/system-user/google-secret')