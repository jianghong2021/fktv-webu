import axios from "axios"
import { getQueryParam } from "../utils/com"
const client = axios.create()
client.interceptors.request.use((conf)=>{
    const host = getQueryParam('host')
    conf.baseURL = host?`http://${host}:8848/`:''
    return conf
})
client.interceptors.response.use((res) => {
    
    if (res.status == 200) {
        try {
            return res.data
        } catch (e) {
            
            return res.data
        }
    }
    throw Error(res.data ? res.data.msg : '网络异常');
})
export default client