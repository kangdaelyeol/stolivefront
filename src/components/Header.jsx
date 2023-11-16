import React from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './header.module.css'

const profileURL =
    'https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo'

export default function Header({ login }) {
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
                            src={login.status ? login.data.profile : profileURL}
                            alt=""
                            className={Styles.profile__image}
                        />
                        <span className={Styles.name}>
                            {login.status ? login.data.nickName : 'Guest'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
