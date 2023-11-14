import React, { useRef, useState, useEffect } from 'react'
import Styles from './login.module.css'
import loginPgImg from '../images/login_pg_img.png'

export default function Login() {
    const [inputVal, setInputVal] = useState({
        username: '',
        password: '',
    })

    // ** useRef: refer to username, pw
    const userNameRef = useRef()
    const pwRef = useRef()

    // ** useEffect: check isLogin
    useEffect(() => {
        // login Check Process
    }, [])

    const onFormSubmit = (e) => {
        e.preventDefault()
       
    }

    const onInputChange = (e) => {
      const userNameVal = userNameRef.current.value
      const pwVal = pwRef.current.value
      setInputVal({ username: userNameVal, password: pwVal })
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
                            value={inputVal.username}
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
                        <input
                            type="submit"
                            className={Styles.login__btn}
                            value="ㅎㄹㅅ"
                        />
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
