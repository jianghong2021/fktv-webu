import client from "./player";

export default class PlayerClient{
    static addMusic(m:MusicMvMeta){
        return client.post('/api/add',m)
    }
}