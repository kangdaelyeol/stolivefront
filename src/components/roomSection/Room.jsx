import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Styles from './room.module.css'
import PeerBox from './PeerBox'
import ControlBar from './ControlBar'
import { useIo } from './iohook/useIo'

const tempProfile =
    'https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo'

// *** Socket io connection ***

export default function Room({ DBService, userData }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const roomName = id
    // *** useState ***

    // IO Listener Initialize - when PeerConnections change
    const [myStream, connectedList, controlProps] = useIo(
        process.env.REACT_APP_BASE_URL,
        roomName,
        userData,
    )

    // ** useEffect - isExist -> room Info
    useEffect(() => {
        if (!DBService || !roomName || userData) return navigate('/home')
        ;(async () => {
            const data = await DBService.getRoomById(roomName)
            console.log(roomName)
            console.log(data)
        })()
    }, [DBService, roomName, navigate, userData])

    // 일단 peerbox 사이즈 임의로 16:9 (400 / 225)
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>정보보안기사 스터디</div>
            <div className={Styles.peers}>
                {/* my video */}
                <PeerBox userData={userData} me myStream={myStream} />
                {/* peer video */}
                {connectedList.map((connection, ind) => (
                    <PeerBox
                        userData={connection.userData}
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
