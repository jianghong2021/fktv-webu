import { useState } from 'react'

import './App.css'
import SearchBox from './SearchBox'
import Musics from './Musics'
import Controller from './Controller'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='warp'>
      <SearchBox/>
      <Musics/>
      <Controller/>
    </div>
  )
}
export default App
