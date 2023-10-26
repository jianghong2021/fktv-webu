import { useEffect, useState } from 'react'

import './App.css'
import SearchBox from './SearchBox'
import Musics from './Musics'
import Controller from './Controller'
import MusicApi from './service/music'
// import { Category } from './componments/Category'
import Loading from './componments/Loading'
import Notice from './componments/Notice'

function App() {
  const [musics, setMusics] = useState(Array<MusicMvMeta>)
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState({ txt: '', show: false })
  const [mvCount, setmvCount] = useState(0)
  const [query,setQuery] = useState({
    keywords: '刘德华',
    type: 1,
    limit: 30,
    offset: 1
  })
  let closeNoticeTimer: any;
  const showNotice = (txt: string) => {
    clearTimeout(closeNoticeTimer)
    setNotice({
      txt: txt,
      show: true
    })
    closeNoticeTimer = setTimeout(() => {
      setNotice({
        txt: '',
        show: false
      })
    }, 1500)
  }
  let loadAllState = false
  const loadAll = async () => {
    if (loadAllState) {
      return
    }
    setLoading(true)
    const res = await MusicApi.all({
      limit: 30,
      offset: 1,
      type: '全部',
      area: '港台'
    }).catch(() => {
      showNotice('加载失败，请稍后试')
    })
    setLoading(false)
    res && setMusics(res.data);
  }
  useEffect(() => {
    loadAll()
    return () => {
      loadAllState = true
    }
  }, [window.location.hash])
  const search = async (more?: boolean) => {
    if(more){
      query.offset++
    }else{
      query.offset = 1
    }

    setQuery(query)
    setLoading(true)
    const res = await MusicApi.search(query).catch((e) => {
      showNotice('搜索失败，请稍后再试')
      console.log(e)
    })
    setLoading(false)
    if (!res) {
      return
    }
    setmvCount(res.data.result.mvCount)
    const mvs = res && res.data.result.mvs ? res.data.result.mvs : []
    if (more) {
      
      setMusics(musics.concat(mvs))
    } else {
      setMusics(mvs)
    }
  }
  const setQueryKeywords = (s: string) => {
    query.keywords = s
    setQuery(query)
   
  }
  // const setQueryType = (t: number) => {
  //   query.type = t;
  // }
  return (
    <div className='warp'>
      <Notice txt={notice.txt} show={notice.show} />
      <Loading loading={loading} />
      <SearchBox search={search} setQueryKeywords={setQueryKeywords} />
      {/* <Category setQueryType={setQueryType}/> */}
      <Musics mvCount={mvCount} musics={musics} setLoading={setLoading} showNotice={showNotice} search={search} />
      <Controller setLoading={setLoading} showNotice={showNotice} />
    </div>
  )
}
export default App
