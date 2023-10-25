
export function getQueryParam(k:string){
    const q = window.location.search.replace('?','')
    const temp = q.split('&');
    for(const p of temp){
        const ps = p.split('=')
        if(ps[0]==k){
            return ps[1]
        }
    }
    return undefined
}