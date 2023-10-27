
export function getQueryParam(k: string) {
    const q = window.location.search.replace('?', '')
    const temp = q.split('&');
    for (const p of temp) {
        const ps = p.split('=')
        if (ps[0] == k) {
            return ps[1]
        }
    }
    return undefined
}
/*
enum SEARCH_TYPE {
    1 = '单曲', 10 = '专辑', 100 = '歌手', 1000 = '歌单', 1002 = '用户', 1004 = 'MV', 1006 = '歌词', 1009 = '电台', 1014 = '视频', 1018 = '综合', 2000 = '声音'
}
*/
export enum SEARCH_TYPE {
    Single = 1, Album = 10, Singer = 100, MV = 1004, Video = 1014
}