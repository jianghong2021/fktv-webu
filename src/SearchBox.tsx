import { useState } from "react"

export default function (opt:{search:(s:string)=>void}) {
    const {search} = opt
    const [keywords,setKeywords] = useState('')
    return <div className="search-box">
        <div>
            <input type="text" placeholder="输入关键词搜索" onInput={(e)=>setKeywords(String(e.target.value).trim())}/>
            <img src="/search.png" alt="search" onClick={()=>search(keywords)}/>
        </div>
    </div>
}