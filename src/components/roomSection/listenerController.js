// 일단 Welcome, Offer, Answer, Ice 까지만 반환 해보게잉
export const getListeners = (
    myStream,
    roomName,
    peerConnections,
    setPeerConnections,
    iceQueue,
    setIceQueue,
    socket,
) => {
    const onWelcome = async (senderId) => {
        // Welcome -> 처음 온 사람만 보냄
        // senderId -> 처음 온 사람의 Id -> 그 아이디에 대한 peerConnection 처리
        const peerConnection = getRTCPeerConnection(senderId)

        const offer = await peerConnection.createOffer()
        peerConnection.setLocalDescription(offer)
        console.log('sent the offer', roomName)
        setPeerConnections((v) => ({ ...v, [senderId]: peerConnection }))
        socket.emit('offer', offer, `${roomName}${senderId}`)
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
        socket.emit('answer', answer, `${roomName}${senderId}`)
        setPeerConnections((v) => ({ ...v, [senderId]: peerConnection }))
        console.log('sent the answer')
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

    // define dependency & listner

    return [onWelcome, onOffer, onAnswer, onIce]
}
