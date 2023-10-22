import { useEffect, useState,useCallback } from 'react'

import './App.css'
import SearchBox from './SearchBox'
import Musics from './Musics'
import Controller from './Controller'
import MusicApi from './service/music'

function App() {
  const [musics, setMusics] = useState(Array<MusicMvMeta>)
  const query = {
    keywords: '刘德华',
    type: 1004,
    limit: 15,
    offset: 1
  }
  const loadAll = async () => {
    const res = await MusicApi.all({
      limit: 15,
      offset: 1,
      type: '全部',
      area: '港台'
    }).catch(err => {
      console.log(err)
    })
    res && setMusics(res.data);
  }
  useEffect(() => {
    loadAll()
  }, [window.location.hash])
  const search = async (s:string) => {
    query.keywords = s;
    const res = await MusicApi.search(query).catch(err=>{
      console.log(err)
    })
    const mvs = res&&res.data.result.mvs?res.data.result.mvs:[]
    mvs.length>0 && setMusics(query.offset==1?mvs:musics.concat(mvs))
  }
  return (
    <div className='warp'>
      <SearchBox search={search}/>
      <Musics musics={musics} />
      <Controller />
    </div>
  )
}
export default App
