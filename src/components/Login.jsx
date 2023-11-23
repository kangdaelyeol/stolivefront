import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './login.module.css'
import useLoading from '../hooks/useLoading'

const loginPgImg = process.env.REACT_APP_BASE_LOGIN
export default function Login({ login, setLogin, DBService }) {
    const navigate = useNavigate()
    const userNameRef = useRef()
    const pwRef = useRef()
    const [inputVal, setInputVal] = useState({
        userName: '',
        password: '',
    })
    useEffect(() => {
        login.status && navigate('/home')
    })
    const [setIsloading, LoginBtn] = useLoading(
        <input type="submit" className={Styles.login__btn} value="Login" />,
        '100px',
        'login...',
    )

    const onSignupClick = (e) => {
        navigate('/signup')
    }

    // ** useEffect: check Login Status by checking and verifying JWT

    const onFormSubmit = async (e) => {
        e.preventDefault()
        setIsloading(true)
        const result = await DBService.login({ ...inputVal })
        if (!result.status) {
            setIsloading(false)
            return alert('사용자 정보가 일치하지 않습니다.')
        }

        setLogin({
            status: true,
            data: { ...result.data },
        })
        setIsloading(false)

        localStorage.setItem('JWT', result.jwt)
        navigate('/home')
    }

    const onInputChange = (e) => {
        const userNameVal = userNameRef.current.value
        const pwVal = pwRef.current.value
        setInputVal({ userName: userNameVal, password: pwVal })
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.left}>
                <img className={Styles.bgimg} src={loginPgImg} alt="" />
            </div>
            <div className={Styles.right}>
                <div className={Styles.login__container}>
                    <div className={Styles.title}>로그인</div>
                    <form
                        onSubmit={onFormSubmit}
                        className={Styles.login__form}
                    >
                        <input
                            type="text"
                            className={Styles.login__input}
                            placeholder="아이디"
                            ref={userNameRef}
                            value={inputVal.userName}
                            onChange={onInputChange}
                        />
                        <input
                            type="text"
                            className={Styles.login__input}
                            placeholder="비밀번호"
                            ref={pwRef}
                            value={inputVal.password}
                            onChange={onInputChange}
                        />
                        <LoginBtn />
                    </form>
                </div>
                <div className={Styles.alert}>
                    <div className={Styles.alert__left}>
                        <div className={Styles.alert__icon}>!</div>
                    </div>
                    <div className={Styles.alert__right}>
                        <div className={Styles.alert__title}>
                            아직 회원이 아니신가요? <br />
                            가입하세요!
                        </div>
                        <div
                            onClick={onSignupClick}
                            className={Styles.signupbtn}
                        >
                            가입 하러가기
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
