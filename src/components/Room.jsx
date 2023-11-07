import React from 'react'
import { useParams } from 'react-router-dom'
import Styles from './room.module.css'
import tempImg from '../images/pimg.jpeg'
import tempMyImg from '../images/p_profile.jpeg'
import io from 'socket.io-client'

const SOCKET_SERVER_URL = 'http://localhost:8080'

const PeerData = [
    {
        userName: 'dophin123',
        profile:
            'https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo',
    },
    {
        userName: 'dophin123',
        profile:
            'https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo',
    },
]

const myData = {
    userName: '강대렬',
    profile: tempImg,
    video: tempMyImg,
}

const socket = io(SOCKET_SERVER_URL)

const PeerBox = ({ userName, profile, speaking, video, me }) => {
    return (
        <div
            className={`${Styles.peer__box} ${
                speaking ? Styles.peer__speaking : ''
            }`}
        >
            {me ? <div className={Styles.me}>나</div> : ''}
            <div className={Styles.peer__video}>
                <img src={video} alt="video" />
            </div>
            <div className={Styles.peer__info}>
                <div className={Styles.peer__profile}>
                    <img src={profile} alt="" />
                    <span className={Styles.peer__name}>{userName}</span>
                </div>
            </div>
        </div>
    )
}

const Room = () => {
    // 일단 peerbox 사이즈 임의로 16:9 (400 / 225)
    const { id } = useParams()

    return (
        <div className={Styles.container}>
            <div className={Styles.title}>정보보안기사 스터디</div>
            <div className={Styles.peers}>
                {/* my video */}
                <PeerBox {...myData} me />
                {/* peer video */}
                {PeerData.map((peerInfo, ind) => (
                    <PeerBox
                        {...peerInfo}
                        video={tempImg}
                        speaking={false}
                        key={ind}
                    />
                ))}
            </div>
        </div>
    )
}

export default Room
