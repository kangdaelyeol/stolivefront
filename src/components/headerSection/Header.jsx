import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Styles from './header.module.css'
import pImg from '../../images/pimg.jpeg'
import ProfileModal from './ProfileModal'

export default function Header({ login, setLogin }) {
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const onTitleClick = () => {
        navigate('/home')
    }

    const onProfileClick = () => {
        setModal((v) => !v)
    }
    useEffect(() => {
        setModal(false)
    }, [location])
    const profileUrl = login.status
        ? login.data.profile === 'None'
            ? pImg
            : login.data.profile
        : pImg

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
                    {modal && login.status ? (
                        <ProfileModal
                            user={login.data}
                            setModal={setModal}
                            setLogin={setLogin}
                        />
                    ) : (
                        ''
                    )}
                    <div className={Styles.profile} onClick={onProfileClick}>
                        <img
                            src={profileUrl}
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
