import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Styles from './room.module.css'
import tempImg from '../images/pimg.jpeg'
import tempMyImg from '../images/p_profile.jpeg'
import io from 'socket.io-client'

const SOCKET_SERVER_URL = 'http://localhost:8080'

const VIDEO_WIDTH = 400;

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
// const socket = io(SOCKET_SERVER_URL)

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

const Room = () => {
    // *** useState ***
    const [myStream, setMyStream] = useState(null)
    const [muted, setMuted] = useState(false)
    const [cameraOff, setCameraOff] = useState(false)
    const [roomName, setRoomName] = useState(null)
    const [peerConnection, setPeerConnection] = useState({})
    const [connectedList, setConnectedList] = useState([])
    const [cameraOptValues, setCameraOptValues] = useState([])

    // *** useRef ***
    const cameraSelectRef = useRef()

    // *** useEffect ***
    useEffect(() => {
        ;(async () => {
            let mStream = null
            const camerasSelect = []
            async function getCameras() {
                try {
                    const devices =
                        await navigator.mediaDevices.enumerateDevices()
                    const cameras = devices.filter(
                        (device) => device.kind === 'videoinput',
                    )
                    const currentCamera = mStream?.getVideoTracks()[0]
                    cameras.forEach((camera) => {
                        const option = {}
                        option.value = camera.deviceId
                        option.name = camera.label
                        if (currentCamera.label === camera.label) {
                            option.selected = true
                        }
                        camerasSelect.push(option)
                    })
                } catch (e) {
                    console.log(e)
                }
                setCameraOptValues([...camerasSelect])
                // mStream -> video srcObject속성에 들어갈 스트림
                setMyStream(mStream)
            }

            async function getMedia(deviceId) {
                const initialConstrains = {
                    audio: true,
                    video: { facingMode: 'user' },
                }
                const cameraConstraints = {
                    audio: true,
                    video: { deviceId: { exact: deviceId } },
                }
                try {
                    mStream = await navigator.mediaDevices.getUserMedia(
                        deviceId ? cameraConstraints : initialConstrains,
                    )

                    if (!deviceId) {
                        await getCameras()
                    }
                } catch (e) {
                    console.log('no getMedia', e)
                }
            }
            async function initCall() {
                // getMedia -> set mystream
                await getMedia()
                // roomName = window.location.pathname.split('/')[2]
                // socket.emit('join_room', roomName, socket.id, username)
            }
            await initCall()
        })()
    }, [])

    const handleMuteClick = () => setMuted((v) => !v)
    const handleCameraClick = () => setCameraOff((v) => !v)

    const { id } = useParams()

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

export default Room
