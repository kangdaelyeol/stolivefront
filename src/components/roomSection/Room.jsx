import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Styles from './room.module.css'
import tempImg from '../../images/pimg.jpeg'
import tempMyImg from '../../images/p_profile.jpeg'
import io from 'socket.io-client'
import { MediaService } from '../../service'
import { getListeners } from './listenerController'
const SOCKET_SERVER_URL = 'http://localhost:8000'
const MediaServ = new MediaService()

const VIDEO_WIDTH = 400

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
// *** Socket io connection ***

const PeerBox = ({
    userName,
    profile,
    speaking,
    video,
    me,
    message,
    myStream,
}) => {
    const videoRef = useRef()
    useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.srcObject = myStream
    }, [myStream])
    return (
        <div
            className={`${Styles.peer__box} ${
                speaking ? Styles.peer__speaking : ''
            }`}
        >
            {me ? <div className={Styles.me}>나</div> : ''}
            <div className={Styles.peer__video}>
                {me ? (
                    <>
                        <video
                            ref={videoRef}
                            width={VIDEO_WIDTH}
                            autoPlay
                            playsInline
                            className={Styles.myface}
                        ></video>
                    </>
                ) : (
                    <img src={video} alt="video" />
                )}
                {/* {message? <Message /> : ""} */}
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

export default function Room() {
    const { id } = useParams()
    const roomName = id
    // *** useState ***
    const [myStream, setMyStream] = useState(null)
    const [muted, setMuted] = useState(false)
    const [cameraOff, setCameraOff] = useState(false)
    // const [roomName, setRoomName] = useState(null)
    const [peerConnections, setPeerConnections] = useState({})
    const [connectedList, setConnectedList] = useState([])
    const [cameraOptValues, setCameraOptValues] = useState([])
    const [iceQueue, setIceQueue] = useState([])
    const [socket, setSocket] = useState(null)
    const [listeners, setListeners] = useState({})

    // *** useRef ***
    const cameraSelectRef = useRef()

    // IO Listener Initialize - when PeerConnections change

    // setIoListener
    const setIoListener = (
        myStream,
        roomName,
        peerConnections,
        setPeerConnections,
        iceQueue,
        setIceQueue,
        socket,
    ) => {
        if (socket) {
            const [onWelcome, onOffer, onAnswer, onIce] = getListeners(
                myStream,
                roomName,
                peerConnections,
                setPeerConnections,
                iceQueue,
                setIceQueue,
                socket,
            )

            socket.on('welcome', onWelcome)

            socket.on('offer', onOffer)

            socket.on('answer', onAnswer)

            socket.on('ice', onIce)

            setListeners({ onWelcome, onOffer, onAnswer, onIce })

            socket.on('willleave', (senderId) => {
                console.log(senderId, 'leave')
                // handleRemoveStream(senderId)
            })
        }
    }

    // *** useEffect - GetMedia ***
    useEffect(() => {
        if (!socket) {
            setSocket(io(SOCKET_SERVER_URL))
        } else {
            ;(async () => {
                socket.on('connect', async () => {
                    console.log('socket connection')
                    const [myStream, camerasSelect] = await MediaServ.initCall()
                    setMyStream(myStream)
                    setCameraOptValues([...camerasSelect])
                    setIoListener(
                        myStream,
                        roomName,
                        peerConnections,
                        setPeerConnections,
                        iceQueue,
                        setIceQueue,
                        socket,
                    )
                    socket.emit('join_room', id, socket.id, myData.userName)
                })
                socket.on('error', (e) => {
                    console.log(e)
                })
            })()
        }
    }, [socket])

    useEffect(() => {
        if (socket) {
            console.log("changed peerConnections -> reset Listeners", peerConnections)
            const [onWelcome, onOffer, onAnswer, onIce] = getListeners(
                myStream,
                roomName,
                peerConnections,
                setPeerConnections,
                iceQueue,
                setIceQueue,
                socket,
            )
            socket.off('welcome', listeners.onWelcome)
            socket.off('offer', listeners.onOffer)
            socket.off('answer', listeners.onAnswer)
            socket.off('ice', listeners.onIce)

            socket.on('welcome', onWelcome)

            socket.on('offer', onOffer)

            socket.on('answer', onAnswer)

            socket.on('ice', onIce)

            setListeners({ onWelcome, onOffer, onAnswer, onIce })

        }
    }, [peerConnections])

    const handleMuteClick = () => setMuted((v) => !v)
    const handleCameraClick = () => setCameraOff((v) => !v)

    // 일단 peerbox 사이즈 임의로 16:9 (400 / 225)
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>정보보안기사 스터디</div>
            <div className={Styles.peers}>
                {/* my video */}
                <PeerBox {...myData} me myStream={myStream} />
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
            <div className="controlbar">
                <button onClick={handleMuteClick} className="controlbtn">
                    Mute
                </button>
                <button onClick={handleCameraClick} className="controlbtn">
                    Turn Camera Off
                </button>
                <select
                    ref={cameraSelectRef}
                    name="cameras"
                    id="cameras"
                    className={Styles.cameras}
                >
                    {cameraOptValues.map((label, k) => (
                        <option value={label.value} key={k}>
                            {label.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
