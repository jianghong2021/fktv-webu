
export default function(arg:{musics:MusicMvMeta[]}){
    const {musics} = arg;
    const timeFormat = (t:number)=>{
        const s = Math.round(t/1000);
        return Math.floor(s/60)+':'+(s%60)
    }
    return <div className="music-list">
        {musics.map((m)=><div className="music-list-item" key={m.id} style={{backgroundImage:`url(${m.cover})`}}>
            <p className="time">
                <span>{timeFormat(m.duration)}</span>
            </p>
            <p className="title">{m.name}</p>
        </div>)}
    </div>
}