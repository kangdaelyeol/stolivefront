import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './login.module.css'
import loginPgImg from '../images/login_pg_img.png'
import useLogin from '../hooks/useLogin'
import useLoading from '../hooks/useLoading'

export default function Login({ login, setLogin, MongoService, AuthService }) {
    const navigate = useNavigate()
    const userNameRef = useRef()
    const pwRef = useRef()
    const [inputVal, setInputVal] = useState({
        userName: '',
        password: '',
    })
    useLogin(setLogin)
    const [setIsloading, LoginBtn] = useLoading(
        <input type="submit" className={Styles.login__btn} value="ㅎㄹㅅ" />,
        '100px',
        "login..."
    )

    // ** useEffect: check Login Status by checking and verifying JWT

    const onFormSubmit = async (e) => {
        e.preventDefault()
        setIsloading(true)
        const result = await MongoService.login({ ...inputVal })
        if (!result.status) {
            setIsloading(false)
            return
            // when Login false
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
                            학교 메일 인증으로 편하게 가입하세요!
                        </div>
                        <div className={Styles.signupbtn}>ㅎㄹㅅ 하러 가기</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
