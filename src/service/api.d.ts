interface ArtistsMeta {
    "id": number
    "name": string
}
interface MusicMvMeta {
    "id": number
    "cover": string
    "name": string
    "playCount": number
    "artistId": number
    "duration": number
    "artists": ArtistsMeta[]
}

interface MvAllQuery {
    area?: '全部' | '内地' | '港台' | '欧美' | '日本' | '韩国'
    type?: '全部' | '官方版' | '原生' | '现场版' | '网易出品'
    order?: '上升最快' | '最热' | '最新'
    limit: number
    offset: number
}
enum SEARCH_TYPE {
    1 = '单曲', 10 = '专辑', 100 = '歌手', 1000 = '歌单', 1002 = '用户', 1004 = 'MV', 1006 = '歌词', 1009 = '电台', 1014 = '视频', 1018 = '综合', 2000 = '声音'
}
interface MvSearchQuery {
    keywords: string
    type: number
    limit: number
    offset: number
}