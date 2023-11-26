import axios from "axios"
import { getQueryParam } from "../utils/com"
const client = axios.create()
client.interceptors.request.use((conf) => {
    const host = getQueryParam('host')
    conf.baseURL = host?`http://${host}:8849`:''
    return conf
})
client.interceptors.response.use((res) => {
    if (res.data.code == 200) {
        return res.data.data ? res.data : { data: res.data };
    }
    throw Error(res.data ? res.data.msg : '网络异常');
})
export default client