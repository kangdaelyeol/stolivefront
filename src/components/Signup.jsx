import React, { useEffect, useRef, useState } from 'react'
import Styles from './signup.module.css'

export default function Signup() {
    // ** useState to change form Value
    const [formVal, setFormVal] = useState({
        userName: '',
        nickName: '',
        pw: '',
        pw2: '',
        hb: '',
        age: '',
    })
    // ** useEffect to check isLogin
    useEffect(() => {
        // check login process
    }, [])

    // ** useRef - refer to form input
    const userNameRef = useRef()
    const nickNameRef = useRef()
    const pwRef = useRef()
    const pw2Ref = useRef()
    const emailRef = useRef()
    const hbRef = useRef()
    const ageRef = useRef()

    const onFormSubmit = (e) => {
        e.preventDefault()
    }
    console.log(formVal)
    const onFormChange = (e) => {
        const inputName = e.currentTarget.name
        const inputVal = e.currentTarget.value;
        setFormVal(v => {
          return {
            ...v,
            [inputName] : inputVal
          }
        })
    }
    return (
        <div className={Styles.container}>
            <div className={Styles.wrapper}>
                <div className={Styles.title}>회원가입</div>
                <form onSubmit={onFormSubmit} className={Styles.signup__form}>
                    <input
                        type="text"
                        name="userName"
                        value={formVal.userName}
                        className={Styles.signup__input}
                        placeholder="아이디"
                        onChange={onFormChange}
                    />
                    <input
                        type="text"
                        name="nickName"
                        className={Styles.signup__input}
                        placeholder="닉네임"
                        onChange={onFormChange}
                    />
                    <input
                        type="password"
                        name="pw"
                        className={Styles.signup__input}
                        placeholder="비밀번호"
                        onChange={onFormChange}
                    />
                    <input
                        type="password"
                        name="pw2"
                        className={Styles.signup__input}
                        placeholder="비밀번호 확인"
                        onChange={onFormChange}
                    />
                    <input
                        type="email"
                        name="email"
                        className={Styles.signup__input}
                        placeholder="이메일"
                        onChange={onFormChange}
                    />
                    <div className={Styles.input__bottom}>
                        <input
                            type="text"
                            name="hb"
                            className={Styles.signup__input}
                            placeholder="학번"
                            onChange={onFormChange}
                        />
                        <input
                            type="text"
                            name="age"
                            className={Styles.signup__input}
                            placeholder="나이"
                            onChange={onFormChange}
                        />
                    </div>
                    <div className={Styles.btnbox}>
                        <input
                            type="submit"
                            className={`${Styles.signupbtn} ${Styles.btn}`}
                            value="ㅎㄹㅅ"
                        />
                        <div className={`${Styles.clearbtn} ${Styles.btn}`}>
                            초기화
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
