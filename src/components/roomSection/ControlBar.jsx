import React, { useRef } from 'react'
import Styles from './controlBar.module.css'
export default function ControlBar({
    cameraOptValues,
    handleMuteClick,
    handleCameraClick,
    handleCameraChange,
    muted,
    cameraOff,
}) {
    const cameraSelectRef = useRef()


    const onCameraChange = async (e) => {
        const value = e.currentTarget.value
        await handleCameraChange(value)
    }

    return (
        <div className={Styles.controlbar}>
            <button onClick={handleMuteClick} className={Styles.controlbtn}>
                {muted ? 'UnMute' : 'Mute'}
            </button>
            <button onClick={handleCameraClick} className={Styles.controlbtn}>
                {cameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
            </button>
            <select
                ref={cameraSelectRef}
                onChange={async (e) => {
                    await onCameraChange(e)
                }}
                name="cameras"
                id="cameras"
                className={Styles.cameras}
            >
                {cameraOptValues.map((label, k) => (
                    <option value={label.value} key={k}>
                        {label.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
