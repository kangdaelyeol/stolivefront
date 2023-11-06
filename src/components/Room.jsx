import React from 'react'
import { useParams } from 'react-router-dom'
import Styles from './room.module.css'

const Room = () => {

    // 일단 peerbox 사이즈 임의로 16:9 (400 / 225)
    const { id } = useParams()

    return (
        <div className={Styles.container}>
            <div className={Styles.title}>정보보안기사 스터디</div>
            <div className={Styles.peers}>
                <div className={Styles.peer__box}>
                    <div className={Styles.peer__video}></div>
                    <div className={Styles.peer__info}>
                        <div className={Styles.peer__profile}>
                            <img
                                src="https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo"
                                alt=""
                            />
                            <span className={Styles.peer__name}>doplhin123</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room
