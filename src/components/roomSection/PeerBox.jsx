import React, { useEffect, useRef } from 'react'
import Styles from './peerBox.module.css'

const VIDEO_WIDTH = 400
const defaultImg = process.env.REACT_APP_BASE_PROFILE

export default function PeerBox({
    userData,
    speaking,
    video,
    me,
    myStream,
    messageBox,
}) {
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
                {messageBox.map((m, i) => {
                    if (m.owner === userData.userName) {
                        return (
                            <div
                                style={{
                                    ...m.position,
                                }}
                                className={Styles.messagebox}
                                key={i}
                            >
                                {m.message}
                            </div>
                        )
                    }
                })}
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
                    <img
                        src={
                            userData?.profile === 'None'
                                ? defaultImg
                                : userData?.profile
                        }
                        alt=""
                    />
                    <span className={Styles.peer__name}>
                        {userData?.userName}
                    </span>
                </div>
            </div>
        </div>
    )
}
