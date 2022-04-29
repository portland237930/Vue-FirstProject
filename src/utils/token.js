// 设置令牌
export const setToken = (token) => {
        localStorage.setItem("TOKEN", token);
    }
    // 获得令牌
export const getToken = () => {
        return localStorage.getItem("TOKEN");
    }
    // 移除令牌
export const removeToken = () => {
    localStorage.removeItem("TOKEN");
}