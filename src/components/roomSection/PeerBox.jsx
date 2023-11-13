import React, {useEffect, useRef} from "react"
import Styles from "./peerBox.module.css"
const VIDEO_WIDTH = 400

export default function PeerBox({
  userName,
  profile,
  speaking,
  video,
  me,
  message,
  myStream,
}){
  const videoRef = useRef()
  useEffect(() => {
      if (!videoRef.current) return
      videoRef.current.srcObject = myStream
  }, [myStream])

  useEffect(() => {
      if (!me && videoRef.current) {
          videoRef.current.srcObject = video
      }
  }, [video])
  return (
      <div
          className={`${Styles.peer__box} ${
              speaking ? Styles.peer__speaking : ''
          }`}
      >
          {me ? <div className={Styles.me}>나</div> : ''}
          <div className={Styles.peer__video}>
              {me ? (
                  <>
                      <video
                          ref={videoRef}
                          width={VIDEO_WIDTH}
                          autoPlay
                          playsInline
                          className={Styles.myface}
                      ></video>
                  </>
              ) : (
                  <>
                      <video
                          ref={videoRef}
                          width={VIDEO_WIDTH}
                          autoPlay
                          playsInline
                          className={Styles.myface}
                      ></video>
                  </>
              )}
              {/* {message? <Message /> : ""} */}
          </div>
          <div className={Styles.peer__info}>
              <div className={Styles.peer__profile}>
                  <img src={profile} alt="" />
                  <span className={Styles.peer__name}>{userName}</span>
              </div>
          </div>
      </div>
  )
}