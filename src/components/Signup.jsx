import React, { useEffect, useRef, useState } from 'react'
import Styles from './signup.module.css'
import useLogin from '../hooks/useLogin'



export default function Signup({ DBService, setLogin }) {
    // ** useState to change form Value
    const [formVal, setFormVal] = useState({
        userName: '1',
        nickName: '1',
        pw: '1',
        pw2: '1',
        hb: '1',
        age: '1',
        email: '1@1.1',
    })

    useLogin(setLogin, "/home")

    const onResetBtnClick = () => {
        setFormVal({
            userName: '',
            nickName: '',
            email: '',
            pw: '',
            pw2: '',
            hb: '',
            age: '',
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()
        // when pw doesn't match
        if (formVal.pw !== formVal.pw2) {
            return
        }
        // when typeof age, hb isn't Number
        if (isNaN(Number(formVal.hb)) || isNaN(Number(formVal.age))) {
            alert('학번 이름 잘 써줘용')
            return
        }
        const submitData = { ...formVal }
        delete submitData.pw2

        const result = await DBService.createUser(submitData)
        console.log(result)
        switch (result.status) {
            case true:
                // when created
                // session정보 갱신 -> 바로 로그인
                break
            case false:
                // when error
                const dpKeywords = Object.keys(result.data.keyPattern).join(' ')
                alert(`${dpKeywords} 홀리싯`)
                break
            default:
                throw new Error('홀리싯 Mongoose Error')
        }
    }
    console.log(formVal)
    const onFormChange = (e) => {
        const inputName = e.currentTarget.name
        const inputVal = e.currentTarget.value
        setFormVal((v) => {
            return {
                ...v,
                [inputName]: inputVal,
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
                        value={formVal.nickName}
                        className={Styles.signup__input}
                        placeholder="닉네임"
                        onChange={onFormChange}
                    />
                    <input
                        type="password"
                        name="pw"
                        value={formVal.pw}
                        className={Styles.signup__input}
                        placeholder="비밀번호"
                        onChange={onFormChange}
                    />
                    <input
                        type="password"
                        name="pw2"
                        value={formVal.pw2}
                        className={Styles.signup__input}
                        placeholder="비밀번호 확인"
                        onChange={onFormChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formVal.email}
                        className={Styles.signup__input}
                        placeholder="이메일"
                        onChange={onFormChange}
                    />
                    <div className={Styles.input__bottom}>
                        <input
                            type="text"
                            name="hb"
                            value={formVal.hb}
                            className={Styles.signup__input}
                            placeholder="학번"
                            onChange={onFormChange}
                        />
                        <input
                            type="text"
                            name="age"
                            value={formVal.age}
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
                        <div
                            onClick={onResetBtnClick}
                            className={`${Styles.clearbtn} ${Styles.btn}`}
                        >
                            초기화
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
