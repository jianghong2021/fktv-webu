import client from "./http";
export default class MusicApi {
    static search(q: MvSearchQuery) {
        return client.get<{ result: { mvCount: number, mvs?: MusicMvMeta[] } }>('/cloudsearch', { params: q })
    }
    static async all(q: MvAllQuery) {
        return client.get<MusicMvMeta[]>('/mv/all', { params: q })
    }
}