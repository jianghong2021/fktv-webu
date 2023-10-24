
export default function Loading(opt:{loading:boolean}){
    const {loading} = opt
    return <div className="loading-screen" style={{display:loading?'flex':'none'}}>
        <img src="/loading.svg" alt="loading"/>
    </div>
}