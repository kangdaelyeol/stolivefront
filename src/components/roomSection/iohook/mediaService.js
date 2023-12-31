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
