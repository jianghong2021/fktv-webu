import client from "./http";
export default class MusicApi {
    static search(q: MvSearchQuery) {
        return client.get<{ result: { mvCount: number, mvs?: MusicMvMeta[] } }>('/search', { params: q })
    }
    static all(q: MvAllQuery) {
        return client.get<MusicMvMeta[]>('/mv/all', { params: q })
    }
    static getUrl(id:number){
        return client.get<{url:string}>('/mv/url?id='+id)
    }
}