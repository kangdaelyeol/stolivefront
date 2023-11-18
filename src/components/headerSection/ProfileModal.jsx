import React from 'react'
import { useNavigate } from 'react-router-dom'
import pImg from '../../images/pimg.jpeg'
import Styles from './profileModal.module.css'

export default function ProfileModal({ user, setModal, setLogin }) {
    const navigate = useNavigate()
    const onExitClick = () => {
        setModal(false)
    }
    const onLogoutClick = () => {
        localStorage.removeItem('JWT')
        navigate('/login')
        setModal(false)
        setLogin({
            status: false,
        })
    }
    return (
        <div className={Styles.container}>
            <div onClick={onExitClick} className={Styles.exitbtn}>
                X
            </div>
            <div className={Styles.email}>{user.email}</div>
            <div className={Styles.profile}>
                <img
                    src={user.profile === 'None' ? pImg : user.profile}
                    alt="profile"
                />
                <div className={Styles.profileedit}>e</div>
            </div>
            <div className={Styles.hello}>안녕하세요, {user.nickName}님.</div>
            <div className={Styles.managebtn}>Storilve 계정 관리</div>
            <div className={Styles.btnbox}>
                <div className={`${Styles.leftbtn} ${Styles.btn}`}>
                    <div className={Styles.icon}>+</div>
                    <span>계정 추가</span>
                </div>
                <div
                    onClick={onLogoutClick}
                    className={`${Styles.rightbtn} ${Styles.btn}`}
                >
                    <div className={Styles.icon}>X</div>
                    <span>로그아웃</span>
                </div>
            </div>
            <div className={Styles.description}>
                개인정보처리방침 / 서비스 약관
            </div>
        </div>
    )
}
