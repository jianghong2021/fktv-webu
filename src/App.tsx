import { useEffect, useState,useCallback } from 'react'

import './App.css'
import SearchBox from './SearchBox'
import Musics from './Musics'
import Controller from './Controller'
import MusicApi from './service/music'
import { Category } from './componments/Category'
import Loading from './componments/Loading'
import Notice from './componments/Notice'

function App() {
  const [musics, setMusics] = useState(Array<MusicMvMeta>)
  const [loading,setLoading] = useState(false)
  const [notice,setNotice] = useState({txt:'',show:false})
  const query = {
    keywords: '刘德华',
    type: 1004,
    limit: 30,
    offset: 1
  }
  let closeNoticeTimer:any;
  const showNotice = (txt:string)=>{
    clearTimeout(closeNoticeTimer)
    setNotice({
      txt:txt,
      show:true
    })
    closeNoticeTimer = setTimeout(()=>{
      setNotice({
        txt:'',
        show:false
      })
    },2000)
  }
  let loadAllState = false
  const loadAll = async () => {
    if(loadAllState){
      return
    }
    setLoading(true)
    const res = await MusicApi.all({
      limit: 30,
      offset: 1,
      type: '全部',
      area: '港台'
    }).catch(err => {
      showNotice('加载失败，请稍后试')
    })
    setLoading(false)
    res && setMusics(res.data);
  }
  useEffect(() => {
    loadAll()
    return ()=>{
      loadAllState = true
    }
  }, [window.location.hash])

  const search = async (s:string) => {
    query.keywords = s;
    setLoading(true)
    const res = await MusicApi.search(query).catch(err=>{
      showNotice('搜索失败，请稍后再试')
    })
    setLoading(false)
    const mvs = res&&res.data.result.mvs?res.data.result.mvs:[]
    mvs.length>0 && setMusics(query.offset==1?mvs:musics.concat(mvs))
  }
  const setQueryType = (t:number)=>{
    query.type = t;
  }
  return (
    <div className='warp'>
      <Notice txt={notice.txt} show={notice.show}/>
      <Loading loading={loading}/>
      <SearchBox search={search}/>
      <Category setQueryType={setQueryType}/>
      <Musics musics={musics} setLoading={setLoading} showNotice={showNotice}/>
      <Controller />
    </div>
  )
}
export default App
