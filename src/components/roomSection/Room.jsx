import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Styles from './room.module.css'
import PeerBox from './PeerBox'
import ControlBar from './ControlBar'
import MessageBar from './MessageBar'
import { useIo } from './iohook/useIo'

const tempProfile =
    'https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo'

const genMessage = (message, userName) => {
    // width 400, height 225
    const Width = 400
    const Height = 225
    const mId = 'm' + Date.now()
    const position = {}
    const x = Math.floor(Math.random() * Width)
    const y = Math.floor(Math.random() * Height)
    if (x >= Width / 2) position.right = x / 2 + 'px'
    else position.left = x + 'px'
    if (y >= Height / 2) position.bottom = y / 2 + 'px'
    else position.top = y + 'px'

    return { mId, owner: userName, message, position }
}

// *** Socket io connection ***

export default function Room({ DBService, userData }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const roomId = id

    // Message Section
    const [messageBox, setMessageBox] = useState([])

    const attachMessage = (message) => {
        const mId = message.mId
        setMessageBox((v) => {
            return[...v, message ]
        })

        console.log(mId)

        setTimeout(() => {
            setMessageBox((v) => {
                console.log(v)
                const nm = v.filter(m => m.mId !== mId)
                console.log(nm)
                return nm
            })
        }, 2000)
    }

    const emitMessage = (message) => {
        const m = genMessage(message, userData.userName)
        
        socket.emit('message', roomId, m, () => {
            attachMessage(m)
        })
    }
    // Message Section - end

    // IO Listener Initialize - when PeerConnections change
    const [myStream, connectedList, controlProps, socket] = useIo(
        process.env.REACT_APP_BASE_URL,
        roomId,
        userData,
        attachMessage
    )
    // ** useEffect - isExist -> room Info
    useEffect(() => {
        if (!DBService || !roomId || !userData) return navigate('/home')
        ;(async () => {
            const data = await DBService.getRoomById(roomId)
            console.log(roomId)
            console.log(data)
        })()
    }, [DBService, roomId, navigate, userData])

    // 일단 peerbox 사이즈 임의로 16:9 (400 / 225)
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>정보보안기사 스터디</div>
            <div className={Styles.peers}>
                {/* my video */}
                <PeerBox userData={userData} me myStream={myStream} messageBox={messageBox} />
                {/* peer video */}
                {connectedList.map((connection, ind) => (
                    <PeerBox
                        userData={connection.userData}
                        profile={tempProfile}
                        video={connection.stream}
                        speaking={false}
                        key={ind}
                        messageBox={messageBox}
                    />
                ))}
            </div>
            <ControlBar {...controlProps} />
            <MessageBar emitMessage={emitMessage} />
        </div>
    )
}
