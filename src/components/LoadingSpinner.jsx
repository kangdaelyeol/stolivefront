import React from 'react'
import Styles from './loadingSpinner.module.css'

export default function LoadingSpinner({ size, message }) {
    return (
        <div
            className={Styles.loading__container}
            style={size && { height: size || '', width: size || '' }}
        >
            <div className={`${Styles.loading__part1} ${Styles.common}`}> </div>
            <div className={`${Styles.loading__part2} ${Styles.common}`}> </div>
            <div className={`${Styles.loading__part3} ${Styles.common}`}> </div>
            <div className={`${Styles.loading__part4} ${Styles.common}`}> </div>
            <span
                style={{
                    fontSize: size ? `calc(${size} / 4` : '',
                }}
            >
                {message || `Loading`}
            </span>
        </div>
    )
}
