import { useState } from "react"

export function Category(opt:{setQueryType:(t:number)=>void}) {
    const {setQueryType} = opt
    const ar = [
        {
            title: '单曲',
            value: 1,
        },
        {
            title: 'MV',
            value: 1004,
        }
    ]
    const [value,setValue] = useState(1)
    const onchange = (v:string)=>{
        setValue(Number(v))
        setQueryType(Number(v))
    }
    return <div className="category-box">
        {ar.map(d => <label htmlFor={`category-${d.value}`}>
            <input type="radio" name="category" id={`category-${d.value}`} value={d.value} checked={value==d.value} onChange={(e)=>{onchange(e.target.value)}}/>
            {d.title}
        </label>)}

    </div>
}