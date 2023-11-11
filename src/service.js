export class dbService {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    getRooms = async () => {
        try {
            const result = await fetch(`${this.baseURL}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const json = await result.json()
            return json
        } catch (e) {
            console.log(e)
            return false
        }
    }

    createRoom = async (data) => {
        try {
            const result = await fetch(`${this.baseURL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data,
                }),
            })
            const json = await result.json()
            console.log(json)
            return json
        } catch (e) {
            console.log(e)
            return false
        }
    }
}

export class MediaService {
    constructor() {}
    initCall = async () => {
        let myStream = null
        const camerasSelect = []
        async function getCameras() {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices()
                const cameras = devices.filter(
                    (device) => device.kind === 'videoinput',
                )
                const currentCamera = myStream?.getVideoTracks()[0]
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
                return e
            }
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
                myStream = await navigator.mediaDevices.getUserMedia(
                    deviceId ? cameraConstraints : initialConstrains,
                )

                if (!deviceId) {
                    await getCameras()
                }
            } catch (e) {
                console.log('no getMedia', e)
                return e
            }
            return [myStream, camerasSelect]
        }

        return await getMedia()
    }
}
