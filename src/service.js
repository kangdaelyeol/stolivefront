class HttpReq {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    postFetchReq = async (reqURL, body) => {
        try {
            const result = await fetch(`${this.baseURL}/${reqURL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : null,
            })
            const json = await result.json()
            return json
        } catch (e) {
            console.log(e)
            return false
        }
    }
}

export class dbService {
    constructor(baseURL) {
        this.baseURL = baseURL
        this.http = new HttpReq(baseURL)
    }

    getRooms = async () => {
        const rooms = await this.http.postFetchReq('search')
        console.log(rooms)
        return rooms
    }

    createRoom = async (data) => {
        const result = await this.http.postFetchReq('create', { data })
        console.log(result)
        return result
    }

    getRoomById = async (roomid) => {

        const result = await this.http.postFetchReq('roominfo',{roomid})
        return result;
    }
}

export class MediaService {
    constructor() {
        this.myStream = null
        this.camerasSelect = []
    }
    initCall = async () => {
        return await this.getMedia()
    }
    getMedia = async (deviceId) => {
        const initialConstrains = {
            audio: true,
            video: { facingMode: 'user' },
        }
        const cameraConstraints = {
            audio: true,
            video: { deviceId: { exact: deviceId } },
        }
        try {
            this.myStream = await navigator.mediaDevices.getUserMedia(
                deviceId ? cameraConstraints : initialConstrains,
            )

            if (!deviceId) {
                await this.getCameras()
            }
            
        } catch (e) {
            console.log('no getMedia', e)
            return e
        }
        return [this.myStream, this.camerasSelect]
    }

    getCameras = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const cameras = devices.filter(
                (device) => device.kind === 'videoinput',
            )
            const currentCamera = this.myStream?.getVideoTracks()[0]
            cameras.forEach((camera) => {
                const option = {}
                option.value = camera.deviceId
                option.name = camera.label
                if (currentCamera.label === camera.label) {
                    option.selected = true
                }
                this.camerasSelect.push(option)
            })
        } catch (e) {
            console.log(e)
            return e
        }
    }
}
