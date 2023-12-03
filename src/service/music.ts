import client from "./http";
export default class MusicApi {
    static search(q: MvSearchQuery) {
        const query = { ...q }
        return client.get<{ result: { songCount?: number, mvCount?: number, mvs?: MusicMvMeta[], songs: MusicMvMeta[] } }>('/search', { params: query })
    }
    static all(q: MvAllQuery) {
        return client.get<MusicMvMeta[]>('/mv/all', { params: q })
    }
    static getUrl(id: number) {
        return client.get<{ url: string }>('/mv/url?id=' + id)
    }
    static hots() {
        return client.get<{ result: { hots: HotsWords[] } }>('/search/hot')
    }
    static check(id: number) {
        return client.get('/check/music?id=' + id)
    }
    static getSongsUrl(id: number) {
        return client.get<MusicMvMeta[]>('/song/url?level=exhigh&id=' + id)
    }
}