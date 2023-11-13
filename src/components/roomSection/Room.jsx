import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Styles from './room.module.css'
import tempImg from '../../images/pimg.jpeg'
import tempMyImg from '../../images/p_profile.jpeg'
import io from 'socket.io-client'
import { MediaService, dbService } from '../../service'
import { getListeners } from './listenerController'
import PeerBox from './PeerBox'
import ControlBar from './ControlBar'
const SOCKET_SERVER_URL = 'http://localhost:8000'
const MediaServ = new MediaService()

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
        setConnectedList,
    ) => {
        if (socket) {
            const [onWelcome, onOffer, onAnswer, onIce, onWillLeave] =
                getListeners(
                    myStream,
                    roomName,
                    peerConnections,
                    setPeerConnections,
                    iceQueue,
                    setIceQueue,
                    socket,
                    setConnectedList,
                )

            socket.on('welcome', onWelcome)

            socket.on('offer', onOffer)

            socket.on('answer', onAnswer)

            socket.on('ice', onIce)

            socket.on('willleave', onWillLeave)

            setListeners({ onWelcome, onOffer, onAnswer, onIce, onWillLeave })
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
                        setConnectedList,
                    )
                    socket.emit('join_room', id, socket.id, myData.userName)
                })
                socket.on('error', (e) => {
                    console.log(e)
                })
            })()
        }
    }, [socket])

    // ** useEffect - when peerConnections change -> need to reset EventListeners to make funcion to refer state changed
    useEffect(() => {
        if (socket) {
            console.log(
                'changed peerConnections -> reset Listeners',
                peerConnections,
            )
            const [onWelcome, onOffer, onAnswer, onIce, onWillLeave] =
                getListeners(
                    myStream,
                    roomName,
                    peerConnections,
                    setPeerConnections,
                    iceQueue,
                    setIceQueue,
                    socket,
                    setConnectedList,
                )
            socket.off('welcome', listeners.onWelcome)
            socket.off('offer', listeners.onOffer)
            socket.off('answer', listeners.onAnswer)
            socket.off('ice', listeners.onIce)
            socket.off('willLeave', listeners.onWillLeave)

            socket.on('welcome', onWelcome)
            socket.on('offer', onOffer)
            socket.on('answer', onAnswer)
            socket.on('ice', onIce)
            socket.on('willLeave', onWillLeave)
            setListeners({ onWelcome, onOffer, onAnswer, onIce, onWillLeave })
        }
    }, [peerConnections])

    // ** useEffect - isExist -> room Info
    useEffect(() => {
        ;(async () => {
            const result = await DBService.getRoomById(roomName)
            const data = await result.json();
            console.log(roomName)
            console.log(data)
            
        })()
    }, [])
    const handleMuteClick = () => {
        myStream
            .getAudioTracks()
            .forEach((track) => (track.enabled = !track.enabled))
        setMuted((v) => !v)
    }

    const handleCameraClick = () => {
        myStream
            .getVideoTracks()
            .forEach((track) => (track.enabled = !track.enabled))
        setCameraOff((v) => !v)
    }

    const handleCameraChange = async (value) => {
        await MediaServ.getMedia(value)
        Object.keys(peerConnections).forEach((k) => {
            const pc = peerConnections[k]
            if (pc) {
                const videoTrack = myStream.getVideoTracks()[0]
                const videoSender = pc
                    .getSenders()
                    .find((sender) => sender.track.kind === 'video')
                videoSender.replaceTrack(videoTrack)
            }
        })
    }

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
            <ControlBar
                cameraOptValues={cameraOptValues}
                handleCameraChange={handleCameraChange}
                handleCameraClick={handleCameraClick}
                handleMuteClick={handleMuteClick}
                muted={muted}
                cameraOff={cameraOff}
            />
        </div>
    )
}
