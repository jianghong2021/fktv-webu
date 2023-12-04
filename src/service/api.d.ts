interface ArtistsMeta {
    id: number
    name: string
}
interface MusicMvMeta {
    id: number
    cover?: string
    name: string
    playCount: number
    artistId: number
    duration: number
    artistName?: string
    artists: ArtistsMeta[]
    url: string
    mvid?: number
    isVideo: boolean
    freeTrialInfo: {
        start: number|null
        end: number|null
    }
}

interface MvAllQuery {
    area?: '全部' | '内地' | '港台' | '欧美' | '日本' | '韩国'
    type?: '全部' | '官方版' | '原生' | '现场版' | '网易出品'
    order?: '上升最快' | '最热' | '最新'
    limit: number
    offset: number
}
interface MvSearchQuery {
    keywords: string
    type: number
    limit: number
    offset: number
}

interface HotsWords {
    first: string
    second: number
    iconType: number
}