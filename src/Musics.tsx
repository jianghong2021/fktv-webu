
export default function(){
    const musics = [0,2,1,2,2]
    return <div className="music-list">
        {musics.map(()=><div className="music-list-item" style={{backgroundImage:'url(http://p1.music.126.net/S8InCa4o-pFJszhUvI-NPQ==/3247957351196805.jp)'}}>
            <p className="time">
                <span>02:12</span>
            </p>
            <p className="title">海阔天空</p>
        </div>)}
    </div>
}