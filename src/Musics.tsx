import MusicApi from "./service/music";
import PlayerClient from "./service/player-client";
import { SEARCH_TYPE } from "./utils/com";
import './assets/music.css'
import videoImg from './assets/video.svg'
import addImg from './assets/add.svg'
// eslint-disable-next-line react-refresh/only-export-components
export default function (arg: { mType: SEARCH_TYPE, mvCount: number, musics: MusicMvMeta[], search: (m?: boolean) => void, setLoading: (a: boolean) => void, showNotice: (t: string) => void }) {
    const { mType, mvCount, musics, search, setLoading, showNotice } = arg
    const timeFormat = (t: number) => {
        const s = Math.round(t / 1000);
        return Math.floor(s / 60) + ':' + (s % 60)
    }
    const addMusic = async (m: MusicMvMeta, mv = true) => {
        setLoading(true)
        try {
            // 单曲
            if (mv===false) {

                const res = await MusicApi.getSongsUrl(m.id)
                if (res && res.data[0]) {
                    m.cover = ''
                    m.url = res.data[0].url
                    m.isVideo = mv
                    await PlayerClient.addMusic(m)
                    showNotice('添加成功')
                } else {
                    showNotice('无可用资源')
                }
            } else {
                const res = await MusicApi.getUrl(m.id)
                if (res) {
                    m.cover = ''
                    m.isVideo = mv
                    m.url = res.data.url
                    await PlayerClient.addMusic(m)
                    showNotice('添加成功')
                } else {
                    showNotice('无可用资源')
                }
            }

        } catch (error) {
            showNotice('添加失败，请稍后再试')
        }
        setLoading(false)
    }
    const getNames = (ar: ArtistsMeta[]) => {
        return ar.map(u => u.name)
    }
    return <div style={{ paddingBottom: '6rem' }}>
        <div className={"music-list " + (mType == SEARCH_TYPE.Single ? 'single' : 'mv')}>
            {mType == SEARCH_TYPE.MV && musics.map((m, i) => <div className="music-list-item" key={i} style={{ backgroundImage: `url(${m.cover})` }} onClick={() => addMusic(m)}>
                <p className="time">
                    <span>{timeFormat(m.duration)}</span>
                </p>
                <div className="title-box">
                    <p className="name">{m.artistName}</p>
                    <p className="title">{m.name}</p>
                </div>

            </div>)}
            {mType == SEARCH_TYPE.Single && musics.map((m, i) => <div className="music-list-item" key={i}>
                <div className="title-box">
                    <p className="title">{m.name}</p>
                    <p className="name">{getNames(m.artists).join('/')}</p>
                    <p className="time">
                        <span>{timeFormat(m.duration)}</span>
                        {m.mvid ? <img src={videoImg} alt="mv" /> : null}
                    </p>
                </div>
                <div className="contr">
                    <img src={addImg} alt="add" onClick={() => addMusic(m, false)} />
                </div>
            </div>)}
            {musics.length == 0 ? <p className="empty-block">什么也没有</p> : null}
        </div>

        <p className="load-more" style={{ display: mvCount > musics.length ? 'block' : 'none' }}>
            <span onClick={() => search(true)}>点击加载</span>
        </p>
    </div>
}