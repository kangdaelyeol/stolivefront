export default class RTCProcessService {
    constructor(
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
    ) {
        this.myStream = myStream
        this.roomName = roomName
        this.peerConnections = peerConnections
        this.setPeerConnections = setPeerConnections
        this.iceQueue = iceQueue
        this.setIceQueue = setIceQueue
        this.socket = socket
        this.setConnectedList = setConnectedList
        this.myData = myData
        this.attachMessage = attachMessage
    }

    onMessage = (message) => {
        this.attachMessage(message)
    }

    onWelcome = async (senderId, userdata) => {
        const userData = JSON.parse(userdata)
        // Welcome -> 처음 온 사람만 보냄
        // senderId -> 처음 온 사람의 Id -> 그 아이디에 대한 peerConnection 처리
        const peerConnection = this.getRTCPeerConnection(senderId, userData)

        const offer = await peerConnection.createOffer()
        peerConnection.setLocalDescription(offer)
        this.setPeerConnections((v) => ({
            ...v,
            [senderId]: peerConnection,
        }))
        console.log('myData', this.myData)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.socket.emit(
            'offer',
            offer,
            `${this.roomName}${senderId}`,
            JSON.stringify(this.myData),
        )
    }

    onOffer = async (offer, senderId, userdata) => {
        const userData = JSON.parse(userdata)
        // 받은 id == 상대방의 id
        console.log('onOfferData:', userData)
        // 나는 처음와서 roomJoin 보내고 있던 상대는 offer 받음
        const peerConnection = this.getRTCPeerConnection(senderId, userData)
        console.log('received the offer from', senderId)

        peerConnection.setRemoteDescription(offer)
        const answer = await peerConnection.createAnswer()
        peerConnection.setLocalDescription(answer)
        this.setPeerConnections((v) => ({ ...v, [senderId]: peerConnection }))
        console.log('sent the answer')
        this.socket.emit('answer', answer, `${this.roomName}${senderId}`)
    }

    onAnswer = (answer, senderName) => {
        this.peerConnections[`${senderName}`].setRemoteDescription(answer)
    }

    onIce = (ice, senderName) => {
        if (!this.peerConnections[`${senderName}`]) {
            this.setIceQueue((v) => {
                const newIceQueue = [...v]
                newIceQueue.push(ice)
                return newIceQueue
            })
            return
        } else if (this.iceQueue.length !== 0) {
            const queueLength = this.iceQueue.length
            for (let i = 0; i < queueLength; i++) {
                this.peerConnections[`${senderName}`].addIceCandidate(
                    this.iceQueue[i],
                )
                this.setIceQueue([])
            }
        }
        this.peerConnections[`${senderName}`].addIceCandidate(ice)
    }

    onWillLeave = (senderId) => {
        console.log(senderId, 'leave')
        this.handleRemoveStream(senderId)
    }

    getRTCPeerConnection = (senderId, userData) => {
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
            this.handleIce(data, senderId)
        })
        peerConnection.addEventListener('addstream', (data) => {
            this.handleAddStream(data, senderId, userData)
        })
        this.myStream
            .getTracks()
            .forEach((track) => peerConnection.addTrack(track, this.myStream))
        return peerConnection
    }

    handleIce(data, senderId) {
        console.log('sent candidate')
        this.socket.emit('ice', data.candidate, `${this.roomName}${senderId}`)
    }

    handleAddStream(data, senderId, userData) {
        console.log('addStream', senderId, data)
        const connectionInfo = {
            senderId: `V_${senderId}`,
            stream: data.stream,
            userData,
        }

        this.setConnectedList((list) => {
            return [...list, { ...connectionInfo }]
        })
    }

    handleRemoveStream(senderId) {
        this.setPeerConnections((v) => {
            console.log('peerconnections:', v)
            const newPCs = { ...v }
            delete newPCs[senderId]
            return newPCs
        })
        this.setConnectedList((v) => {
            console.log('connectedLists:', v)
            const newCL = []
            v.forEach((l) => {
                if (l.senderId !== `V_${senderId}`) newCL.push({ ...l })
            })
            return newCL
        })
    }

    getListeners = () => {
        return [
            this.onWelcome,
            this.onOffer,
            this.onAnswer,
            this.onIce,
            this.onWillLeave,
            this.onMessage,
        ]
    }
}
