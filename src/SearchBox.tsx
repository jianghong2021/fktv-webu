import { useState } from "react"

export default function (opt:{search:(s:string)=>void}) {
    const {search} = opt
    const [keywords,setKeywords] = useState('')
    return <div className="search-box">
        <div>
            <input type="text" onInput={(e)=>setKeywords(String(e.target.value).trim())} onBlur={()=>search(keywords)}/>
            <img src="/search.png" alt="search" onClick={()=>search(keywords)}/>
        </div>
    </div>
}