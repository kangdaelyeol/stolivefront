// 일단 Welcome, Offer, Answer, Ice 까지만 반환 해보게잉
export const getListeners = (
    myStream,
    roomName,
    peerConnections,
    setPeerConnections,
    iceQueue,
    setIceQueue,
    socket,
    setConnectedList,
) => {
    const onWelcome = async (senderId) => {
        // Welcome -> 처음 온 사람만 보냄
        // senderId -> 처음 온 사람의 Id -> 그 아이디에 대한 peerConnection 처리
        const peerConnection = getRTCPeerConnection(senderId)

        const offer = await peerConnection.createOffer()
        peerConnection.setLocalDescription(offer)
        setPeerConnections((v) => ({ ...v, [senderId]: peerConnection }))
        console.log('await emit offer')
        await new Promise((resolve) => setTimeout(resolve, 1000))
        socket.emit('offer', offer, `${roomName}${senderId}`)
        console.log('sent the offer', roomName)
    }

    const onOffer = async (offer, senderId) => {
        // 받은 id == 상대방의 id

        // 나는 처음와서 roomJoin 보내고 있던 상대는 offer 받음
        const peerConnection = getRTCPeerConnection(senderId)
        console.log('received the offer from', senderId)
        console.log(peerConnections)
        peerConnection.setRemoteDescription(offer)
        const answer = await peerConnection.createAnswer()
        peerConnection.setLocalDescription(answer)
        setPeerConnections((v) => ({ ...v, [senderId]: peerConnection }))
        console.log('sent the answer')
        socket.emit('answer', answer, `${roomName}${senderId}`)
    }

    const onAnswer = (answer, senderName) => {
        console.log('received the answer', answer)
        peerConnections[`${senderName}`].setRemoteDescription(answer)
    }

    const onIce = (ice, senderName) => {
        console.log('received ice candidate')
        if (!peerConnections[`${senderName}`]) {
            setIceQueue((v) => {
                const newIceQueue = [...v]
                newIceQueue.push(ice)
                return newIceQueue
            })
            return
        } else if (iceQueue.length !== 0) {
            const queueLength = iceQueue.length
            for (let i = 0; i < queueLength; i++) {
                peerConnections[`${senderName}`].addIceCandidate(iceQueue[i])
                setIceQueue([])
            }
        }
        peerConnections[`${senderName}`].addIceCandidate(ice)
    }

    const onWillLeave = (senderId) => {
        console.log(senderId, 'leave')
        handleRemoveStream(senderId)
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
        const connectionInfo = {
            senderId: `V_${senderId}`,
            stream: data.stream,
        }

        setConnectedList((list) => {
            return [...list, { ...connectionInfo }]
        })
    }

    function handleRemoveStream(senderId) {
        setPeerConnections((v) => {
            const newPCs = { ...v }
            delete newPCs[senderId]
            return newPCs
        })
        setConnectedList((v) => {
            const newCL = []
            v.forEach((l) => {
                if (l.senderId !== `V_${senderId}`) newCL.push({ ...v })
            })
            return newCL
        })
    }

    // define dependency & listner

    return [onWelcome, onOffer, onAnswer, onIce, onWillLeave]
}


export const setIoListener = (
    myStream,
    roomName,
    peerConnections,
    setPeerConnections,
    iceQueue,
    setIceQueue,
    socket,
    setConnectedList,
    setListeners,
) => {
    if (socket) {
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

        socket.on('welcome', onWelcome)

        socket.on('offer', onOffer)

        socket.on('answer', onAnswer)

        socket.on('ice', onIce)

        socket.on('willleave', onWillLeave)

        setListeners({ onWelcome, onOffer, onAnswer, onIce, onWillLeave })
    }
}