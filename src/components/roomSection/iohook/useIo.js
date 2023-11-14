import { useState, useEffect } from 'react'
import { getListeners, setIoListener } from './listenerController'
import { MediaService } from './mediaService'
import io from 'socket.io-client'

const mediaServ = new MediaService()

export const useIo = (URL, roomName, userName) => {
    const [myStream, setMyStream] = useState(null)
    const [muted, setMuted] = useState(false)
    const [cameraOff, setCameraOff] = useState(false)
    const [peerConnections, setPeerConnections] = useState({})
    const [connectedList, setConnectedList] = useState([])
    const [cameraOptValues, setCameraOptValues] = useState([])
    const [iceQueue, setIceQueue] = useState([])
    const [socket, setSocket] = useState(null)
    const [listeners, setListeners] = useState({})

    // *** useEffect - GetMedia ***
    useEffect(() => {
        if (!socket) {
            setSocket(io(URL))
            return
        }

        ;(async () => {
            socket.on('connect', async () => {
                console.log('socket connection')
                const [myStream, camerasSelect] = await mediaServ.initCall()
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
                    setListeners,
                )
                socket.emit('join_room', roomName, socket.id, userName)
            })
            socket.on('error', (e) => {
                console.log(e)
            })
        })()
    }, [socket])

    // ** useEffect - when peerConnections change -> need to reset EventListeners to make funcion to refer state changed
    useEffect(() => {
        if (!socket) {
            return
        }

        const [onWelcome, onOffer, onAnswer, onIce, onWillLeave] = getListeners(
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
    }, [peerConnections])

    // handle ControlBar
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
        await mediaServ.getMedia(value)
        Object.keys(peerConnections).forEach((k) => {
            const pc = peerConnections[k]
            if (!pc) {
                return
            }
            const videoTrack = myStream.getVideoTracks()[0]
            const videoSender = pc
                .getSenders()
                .find((sender) => sender.track.kind === 'video')
            videoSender.replaceTrack(videoTrack)
        })
    }
    return [
        myStream,
        connectedList,
        {
            cameraOptValues,
            muted,
            cameraOff,
            handleMuteClick,
            handleCameraClick,
            handleCameraChange,
        },
    ]
}
