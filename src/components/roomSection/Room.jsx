import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Styles from './room.module.css'
import tempImg from '../../images/pimg.jpeg'
import tempMyImg from '../../images/p_profile.jpeg'
import PeerBox from './PeerBox'
import ControlBar from './ControlBar'
import { useIo } from './iohook/useIo'
const SOCKET_SERVER_URL = 'http://localhost:8000'

const tempProfile =
    'https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo'

const myData = {
    userName: '강대렬',
    profile: tempImg,
    video: tempMyImg,
}
// *** Socket io connection ***

export default function Room({ DBService }) {
    const { id } = useParams()
    const roomName = id
    // *** useState ***

    // IO Listener Initialize - when PeerConnections change
    const [myStream, connectedList, controlProps] = useIo(
        SOCKET_SERVER_URL,
        roomName,
        myData.userName,
    )

    // ** useEffect - isExist -> room Info
    useEffect(() => {
        ;(async () => {
            const data = await DBService.getRoomById(roomName)
            console.log(roomName)
            console.log(data)
        })()
    }, [])

    // 일단 peerbox 사이즈 임의로 16:9 (400 / 225)
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>정보보안기사 스터디</div>
            <div className={Styles.peers}>
                {/* my video */}
                <PeerBox {...myData} me myStream={myStream} />
                {/* peer video */}
                {connectedList.map((connection, ind) => (
                    <PeerBox
                        userName={'temp'}
                        profile={tempProfile}
                        video={connection.stream}
                        speaking={false}
                        key={ind}
                    />
                ))}
            </div>
            <ControlBar {...controlProps} />
        </div>
    )
}
