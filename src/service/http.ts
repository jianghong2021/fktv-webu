import axios from "axios"
const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE
})
client.interceptors.response.use((res) => {
    if (res.data.code == 200) {
        return res.data.data ? res.data : { data: res.data };
    }
    throw Error(res.data ? res.data.msg : '网络异常');
})
export default client