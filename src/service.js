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

// class mediaService {
//     constructor() {}
//     getCameras = async () => {
//         try {
//             const devices = await navigator.mediaDevices.enumerateDevices()
//             const cameras = devices.filter(
//                 (device) => device.kind === 'videoinput',
//             )
//             const currentCamera = myStream.getVideoTracks()[0]
//             cameras.forEach((camera) => {
//                 const option = document.createElement('option')
//                 option.value = camera.deviceId
//                 option.innerText = camera.label
//                 if (currentCamera.label === camera.label) {
//                     option.selected = true
//                 }
//                 camerasSelect.appendChild(option)
//             })
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }
