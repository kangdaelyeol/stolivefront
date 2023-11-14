import React from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './header.module.css'

const profileURL =
    'https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo'

export default function Header() {
    const navigate = useNavigate()
    const onTitleClick = (e) => {
        navigate('/')
    }
    return (
        <div className={Styles.container}>
            <div className={Styles.header__border}>
                <div className={Styles.border}> </div>
            </div>
            <div className={Styles.header__display}>
                <div className={Styles.left} onClick={onTitleClick}>
                    <span className={Styles.title}>STORLIVE</span>
                </div>
                <div className={Styles.right}>
                    <div className={Styles.profile}>
                        <img
                            src={profileURL}
                            alt=""
                            className={Styles.profile__image}
                        />
                        <span className={Styles.name}>User</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
