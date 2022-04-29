import { v4 as uuidv4 } from 'uuid';
export const getUUID = (() => {
    // 获得本地uuid
    let uuid_token = localStorage.getItem("UUID_TOKEN")
        // 如果没有就生成一个并存储到本地
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem("UUID_TOKEN", uuid_token)
    }
    // 返回随机游客身份ID
    return uuid_token
})