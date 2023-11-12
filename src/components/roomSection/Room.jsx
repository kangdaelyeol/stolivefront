import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Styles from './room.module.css'
import tempImg from '../../images/pimg.jpeg'
import tempMyImg from '../../images/p_profile.jpeg'
import io from 'socket.io-client'
import { MediaService } from '../../service'
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

    const onWelcome = useCallback(
        async (senderId) => {
            // Welcome -> 처음 온 사람만 보냄
            // senderId -> 처음 온 사람의 Id -> 그 아이디에 대한 peerConnection 처리
            const peerConnection = getRTCPeerConnection(senderId)

            const offer = await peerConnection.createOffer()
            peerConnection.setLocalDescription(offer)
            console.log('sent the offer', roomName)
            setPeerConnections((v) => ({ ...v, [senderId]: peerConnection }))
            socket.emit('offer', offer, `${roomName}${senderId}`)
        },
        [peerConnections],
    )

    const onOffer = useCallback(
        async (offer, senderId) => {
            // 받은 id == 상대방의 id

            // 나는 처음와서 roomJoin 보내고 있던 상대는 offer 받음
            const peerConnection = getRTCPeerConnection(senderId)
            console.log('received the offer from', senderId)
            console.log(peerConnections)
            peerConnection.setRemoteDescription(offer)
            const answer = await peerConnections[`${senderId}`].createAnswer()
            peerConnection.setLocalDescription(answer)
            socket.emit('answer', answer, `${roomName}${senderId}`)
            setPeerConnections((v) => ({ ...v, [senderId]: peerConnection }))
            console.log('sent the answer')
        },
        [peerConnections],
    )

    const onAnswer = useCallback(
        (answer, senderName) => {
            console.log('received the answer', answer)
            peerConnections[`${senderName}`].setRemoteDescription(answer)
        },
        [peerConnections],
    )

    const onIce = useCallback(
        (ice, senderName) => {
            console.log('received ice candidate')
            if (!peerConnections[`${senderName}`]) {
                setIceQueue((v) => [...v.push(ice)])
                return
            } else if (iceQueue.length !== 0) {
                const queueLength = iceQueue.length
                for (let i = 0; i < queueLength; i++) {
                    peerConnections[`${senderName}`].addIceCandidate(
                        iceQueue[i],
                    )
                    setIceQueue([])
                }
            }
            peerConnections[`${senderName}`].addIceCandidate(ice)
        },
        [peerConnections],
    )

    // setIoListener
    const setIoListener = (
        myStream,
        roomName,
        peerConnections,
        setPeerConnections,
        iceQueue,
        setIceQueue,
        socket
    ) => {
        if (socket) {
            socket.on('welcome', onWelcome)

            socket.on('offer', onOffer)

            socket.on('answer', onAnswer)

            socket.on('ice', onIce)

            socket.on('willleave', (senderId) => {
                console.log(senderId, 'leave')
                // handleRemoveStream(senderId)
            })
        }
    }

    function getRTCPeerConnection(senderId) {
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        'stun:stun.l.google.com:19302',
                        'stun:stun1.l.google.com:19302',
                        'stun:stun2.l.google.com:19302',
                        'stun:stun3.l.google.com:19302',
                        'stun:stun4.l.google.com:19302',
                    ],
                },
            ],
        })
        peerConnection.addEventListener('icecandidate', (data) => {
            handleIce(data, senderId)
        })
        peerConnection.addEventListener('addstream', (data) => {
            handleAddStream(data, senderId)
        })
        myStream
            .getTracks()
            .forEach((track) => peerConnection.addTrack(track, myStream))
        return peerConnection
    }

    function handleIce(data, senderId) {
        console.log('sent candidate')
        socket.emit('ice', data.candidate, `${roomName}${senderId}`)
    }

    function handleAddStream(data, senderId) {
        console.log('addStream', senderId, data)
        // console.log('addStream for : ', senderId)
        // const peerFaceBox = document.createElement('div')
        // peerFaceBox.classList.add('peerface', `V_${senderId}`)
        // const peerVideo = document.createElement('video')
        // peerVideo.setAttribute('autoplay', 'true')
        // peerVideo.setAttribute('playsinline', 'true')
        // peerVideo.setAttribute('width', MAX_OFFSET)
        // peerVideo.setAttribute('height', MAX_OFFSET)
        // peerVideo.srcObject = data.stream
        // peerFaceBox.appendChild(peerVideo)
        // streamBox.appendChild(peerFaceBox)
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
                        socket
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
        setIoListener(
            myStream,
            roomName,
            peerConnections,
            setPeerConnections,
            iceQueue,
            setIceQueue,
        )
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
