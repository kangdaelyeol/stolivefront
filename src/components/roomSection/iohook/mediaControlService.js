export default class MediaControlService {
    constructor(mediaServ) {
        this.mediaServ = mediaServ
    }

    setProps = (myStream, peerConnections, setMuted, setCameraOff) => {
      this.myStream = myStream
      this.peerConnections = peerConnections
      this.setMuted = setMuted
      this.setCameraOff = setCameraOff
    }

    // handle ControlBar
    handleMuteClick = () => {
        this.myStream
            .getAudioTracks()
            .forEach((track) => (track.enabled = !track.enabled))
        this.setMuted((v) => !v)
    }

    handleCameraClick = () => {
        this.myStream
            .getVideoTracks()
            .forEach((track) => (track.enabled = !track.enabled))
        this.setCameraOff((v) => !v)
    }

    handleCameraChange = async (value) => {
        await this.mediaServ.getMedia(value)
        Object.keys(this.peerConnections).forEach((k) => {
            const pc = this.peerConnections[k]
            if (!pc) {
                return
            }
            const videoTrack = this.myStream.getVideoTracks()[0]
            const videoSender = pc
                .getSenders()
                .find((sender) => sender.track.kind === 'video')
            videoSender.replaceTrack(videoTrack)
        })
    }

    getController = () => {
      return [this.handleMuteClick, this.handleCameraClick, this.handleCameraChange]
    }
}
