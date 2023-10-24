
export default function(opt:{txt:string,show:boolean}){
    const {txt,show} = opt

    return <div className="notice-layer" style={{display:show?'flex':'none'}}>
        <div>
            {txt}
        </div>
    </div>
}