import React, { useState } from 'react'
import Styles from './messageBar.module.css'

export default function MessageBar({emitMessage}) {
    const [active, setActive] = useState(false)
    const [message, setMessage] = useState('')
    const onMessageActive = () => {
        setActive((v) => !v)
    }

    const onMessageSubmit = (e) => {
        e.preventDefault()
        emitMessage(message)
        setMessage('')
        // active Message
    }
    const onMessageChange = (e) => {
        setMessage(e.currentTarget.value)
    }

    return (
        <div
            className={`${Styles.container} ${
                active && Styles.container__active
            }`}
        >
            <div onClick={onMessageActive} className={Styles.activebtn}>
                {' '}
            </div>
            {active && (
                <div className={Styles.active__container}>
                    <form onSubmit={onMessageSubmit} className={Styles.mform}>
                        <input
                            onChange={onMessageChange}
                            type="text"
                            className={Styles.minput}
                            value={message}
                            placeholder='Message'
                        />
                    </form>
                </div>
            )}
        </div>
    )
}
