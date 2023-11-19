import React, { useState, useRef, useEffect } from 'react'
import Styles from './profileEdit.module.css'
import useLogin from '../hooks/useLogin'

export default function ProfileEdit({ setLogin, MongoService, user }) {
    console.log(user)
    useLogin(setLogin)
    const [formVal, setFormVal] = useState({
        userName: '',
        nickName: '',
        pw: '',
        pw2: '',
        hb: '',
        age: '',
        email: '',
    })

    useEffect(() => {
        if (!user) return
        setFormVal({
            userName: user.userName,
            nickName: user.nickName,
            pw: '',
            pw2: '',
            hb: user.hb,
            age: user.age,
            email: user.email,
        })
    }, [user])
    const profileRef = useRef()
    const onProfileClick = (e) => {
        profileRef.current.click()
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

        const result = await MongoService.createUser(submitData)
        console.log(result)
        switch (result.type) {
            case 'success':
                // when created
                // session정보 갱신 -> 바로 로그인
                break
            case 'error':
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
                <div className={Styles.title}>회원정보 수정</div>
                <div className={Styles.profile}>
                    <div className={Styles.profile__title}>프로필 사진</div>
                    <input
                        type="file"
                        accept="image/*"
                        className={Styles.imginput}
                        ref={profileRef}
                    />
                    <div onClick={onProfileClick} className={Styles.profilebox}>
                        <img src="profile" alt="profileImg" />
                    </div>
                </div>
                <div className={Styles.form__container}>
                    <form
                        onSubmit={onFormSubmit}
                        className={Styles.signup__form}
                    >
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
