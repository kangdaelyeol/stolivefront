import { useState, useEffect } from 'react'
import { MediaService } from './mediaService'
import ListenerService from './listenerService'
import io from 'socket.io-client'
import MediaControlService from './mediaControlService'
import { useNavigate } from 'react-router-dom'

const mediaServ = new MediaService()
const listenerService = new ListenerService()
const mediaControlService = new MediaControlService(mediaServ)

export const useIo = (baseURL, roomName, userData) => {
    const [myStream, setMyStream] = useState(null)
    const [muted, setMuted] = useState(false)
    const [cameraOff, setCameraOff] = useState(false)
    const [peerConnections, setPeerConnections] = useState({})
    const [connectedList, setConnectedList] = useState([])
    const [cameraOptValues, setCameraOptValues] = useState([])
    const [iceQueue, setIceQueue] = useState([])
    const [socket, setSocket] = useState(null)
    const [listeners, setListeners] = useState({})
    const navigate = useNavigate()
    if (!userData) {
        navigate('/login')
    }

    mediaControlService.setProps(
        myStream,
        peerConnections,
        setMuted,
        setCameraOff,
    )

    // get control methods for media controlling
    const [handleMuteClick, handleCameraClick, handleCameraChange] =
        mediaControlService.getController()

    // *** useEffect - GetMedia ***
    useEffect(() => {
        if (!socket) {
            setSocket(io(baseURL))
            return
        }

        ;(async () => {
            socket.on('connect', async () => {
                console.log('socket connection')
                const [myStream, camerasSelect] = await mediaServ.initCall()
                listenerService.setProps(
                    myStream,
                    roomName,
                    peerConnections,
                    setPeerConnections,
                    iceQueue,
                    setIceQueue,
                    socket,
                    setConnectedList,
                    listeners,
                    setListeners,
                    userData,
                )
                setMyStream(myStream)
                setCameraOptValues([...camerasSelect])
                listenerService.setIoListener()
                socket.emit('join_room', roomName, socket.id, userData)
            })
            socket.on('error', (e) => {
                console.log(e)
            })
        })()
    }, [socket])

    // ** useEffect - when peerConnections change -> need to reset EventListeners to make funcion to refer state changed
    useEffect(() => {
        if (!socket) return
        listenerService.setProps(
            myStream,
            roomName,
            peerConnections,
            setPeerConnections,
            iceQueue,
            setIceQueue,
            socket,
            setConnectedList,
            listeners,
            setListeners,
        )
        listenerService.resetIolistener()
    }, [peerConnections])

    return [
        myStream,
        connectedList,
        // for ControlBar Component
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
