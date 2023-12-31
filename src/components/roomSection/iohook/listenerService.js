import RTCProcessService from './RTCProcess'

export default class ListenerService {
    setProps = (
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
        myData,
        attachMessage,
    ) => {
        this.myStream = myStream
        this.roomName = roomName
        this.peerConnections = peerConnections
        this.setPeerConnections = setPeerConnections
        this.iceQueue = iceQueue
        this.setIceQueue = setIceQueue
        this.socket = socket
        this.setConnectedList = setConnectedList
        this.listeners = listeners
        this.setListeners = setListeners
        this.attachMessage = attachMessage
        this.RTCService = new RTCProcessService(
            myStream,
            roomName,
            peerConnections,
            setPeerConnections,
            iceQueue,
            setIceQueue,
            socket,
            setConnectedList,
            myData,
            attachMessage,
            // except for lister, setListener
        )
    }
    // ** setIoListener **
    setIoListener = () => {
        if (!this.socket) return
        const [onWelcome, onOffer, onAnswer, onIce, onWillLeave, onMessage] =
            this.RTCService.getListeners()
        this.socket.on('welcome', onWelcome)
        this.socket.on('offer', onOffer)
        this.socket.on('answer', onAnswer)
        this.socket.on('ice', onIce)
        this.socket.on('willleave', onWillLeave)
        this.socket.on('message', onMessage)

        this.setListeners({
            onWelcome,
            onOffer,
            onAnswer,
            onIce,
            onWillLeave,
            onMessage,
        })
    }

    // ** resetIoListner **
    resetIolistener = () => {
        this.socket.off('welcome', this.listeners.onWelcome)
        this.socket.off('offer', this.listeners.onOffer)
        this.socket.off('answer', this.listeners.onAnswer)
        this.socket.off('ice', this.listeners.onIce)
        this.socket.off('willLeave', this.listeners.onWillLeave)
        this.socket.off('message', this.listeners.onMessage)
        this.setIoListener()
    }
}
