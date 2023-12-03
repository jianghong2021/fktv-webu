import client from "./player";

export default class PlayerClient{
    static addMusic(m:MusicMvMeta){
        return client.post('/api/add',m)
    }
    static list(){
        return client.get<MusicMvMeta[]>('/api/list')
    }
    static next(){
        return client.get('/api/next')
    }
    static pause(pause:boolean){
        return client.get('/api/pause?state='+(pause?'0':'1'))
    }
    static volume(volume:number){
        return client.get('/api/mute?volume='+volume)
    }
    static remove(id:number){
        return client.delete('/api/remove?id='+id)
    }
}