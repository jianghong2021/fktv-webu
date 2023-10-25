import MusicApi from "./service/music";
import PlayerClient from "./service/player-client";

export default function (arg: { mvCount: number, musics: MusicMvMeta[], search: (m?: boolean) => void, setLoading: (a: boolean) => void, showNotice: (t: string) => void }) {
    const { mvCount, musics, search, setLoading, showNotice } = arg;
    const timeFormat = (t: number) => {
        const s = Math.round(t / 1000);
        return Math.floor(s / 60) + ':' + (s % 60)
    }
    const addMusic = async (m: MusicMvMeta) => {
        setLoading(true)
        try {

            const res = await MusicApi.getUrl(m.id).catch(() => {

            })
            if (res) {
                m.url = res.data.url
                await PlayerClient.addMusic(m)
                showNotice('添加成功')
            } else {
                showNotice('获取资源失败')
            }

        } catch (error) {
            showNotice('添加失败，请稍后再试')
        }
        setLoading(false)
    }
    return <div style={{paddingBottom: '6rem'}}>
        <div className="music-list">
        {musics.map((m, i) => <div className="music-list-item" key={i} style={{ backgroundImage: `url(${m.cover})` }} onClick={() => addMusic(m)}>
            <p className="time">
                <span>{timeFormat(m.duration)}</span>
            </p>
            <div className="title-box">
                <p className="name">{m.artistName}</p>
                <p className="title">{m.name}</p>
            </div>

        </div>)}

        </div>
        <p className="load-more" style={{ display: mvCount > musics.length ? 'block' : 'none' }}>
            <span onClick={() => search(true)}>点击加载</span>
        </p>
    </div>
}