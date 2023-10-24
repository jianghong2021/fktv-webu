import { useState } from "react";

export default function () {
    const [showList, setShowList] = useState(false);
    const onShowList = () => {
        setShowList(!showList);
    }
    const list = [1, 2, 3, 5, 0]
    return <>
        <div className="controller">
            <span className={showList ? 'active' : ''} onClick={onShowList}>歌单</span>
            <span>切歌</span>
            <span>静音</span>
        </div>
        <div className={(!showList ? 'my-list-hide' : '') + ' my-list'}>
            {list.map((i) => <div key={i}>
                <span>海阔天空</span>
                <img src="/delete.png" alt="delete" />
            </div>)}

        </div>
    </>
}