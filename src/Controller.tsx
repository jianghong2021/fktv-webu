import { useState } from "react";
import PlayerClient from "./service/player-client";

export default function (opt:{setLoading:(l:boolean)=>void,showNotice:(t:string)=>void}) {
    let doing = false
    const {setLoading,showNotice} = opt
    const [showList, setShowList] = useState(false);
    const onShowList = () => {
        !showList&&loadList()
        setShowList(!showList);
        
    }
    const [list,setList] = useState(Array<MusicMvMeta>)
    const loadList = ()=>{
        PlayerClient.list().then(res=>{
            setList(res.data);
        }).catch((e)=>{
            showNotice('加载失败')
        })
    }

    const nextSong = ()=>{
        if(doing){
            return
        }
        doing = true
        PlayerClient.next().then(()=>{
            showNotice('操作成功')
        }).catch(()=>{
            showNotice('操作失败')
        }).finally(()=>{
            doing = false
        })
    }

    const removeSong = (m:MusicMvMeta)=>{
        if(doing){
            return
        }
        doing = true
        PlayerClient.remove(m.id).then(()=>{
            showNotice('操作成功')
            loadList()
        }).catch(()=>{
            showNotice('操作失败')
        }).finally(()=>{
            doing = false
        })
    }

    const [pause,setPause] = useState(false)
    const pausePlayer = ()=>{
        if(doing){
            return
        }
        doing = true
        PlayerClient.pause().then(()=>{
            setPause(!pause)
            showNotice('操作成功')
        }).catch(()=>{
            showNotice('操作失败')
        }).finally(()=>{
            doing = false
        })
    }

    return <>
        <div className="controller">
            <span className={showList ? 'active' : ''} onClick={onShowList}>歌单</span>
            <span onClick={nextSong}>切歌</span>
            <span className={pause ? 'active' : ''} onClick={pausePlayer}>暂停</span>
        </div>
        <div className={(!showList ? 'my-list-hide' : '') + ' my-list'}>
            {list.map(m => <div key={m.id}>
                <span>{m.name}</span>
                <img src="/delete.png" alt="delete" onClick={()=>removeSong(m)}/>
            </div>)}

        </div>
    </>
}