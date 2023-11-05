import React from 'react'
import Styles from './header.module.css'
export default function Header() {
    return (
        <div className={Styles.container}>
            <div className={Styles.container__border}></div>
            <div className={Styles.left}>
                <span className={Styles.title}>STORLIVE</span>
            </div>
            <div className={Styles.right}>
                <div className={Styles.profile}>
                    <img src="https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo" alt="" className={Styles.profile__image} />
                    <span className={Styles.name}>User</span>
                </div>
            </div>
        </div>
    )
}
