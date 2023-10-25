
export default function (opt:{search:(m?:boolean)=>void,setQueryKeywords:(s:string)=>void}) {
    const {search,setQueryKeywords} = opt
    const onChange = (s:string)=>{
        if(!s){
            return
        }
        setQueryKeywords(s)
    }
    return <div className="search-box">
        <div>
            <input type="text" placeholder="输入关键词搜索" onInput={(e)=>onChange(String(e.target.value).trim())}/>
            <img src="/search.png" alt="search" onClick={()=>search(false)}/>
        </div>
    </div>
}