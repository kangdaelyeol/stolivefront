import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './profileEdit.module.css'
import useLogin from '../hooks/useLogin'
import tempProfile from '../images/pimg.jpeg'

export default function ProfileEdit({ setLogin, DBService, user }) {
    // *** useState ***
    const [formVal, setFormVal] = useState({
        nickName: '',
        pw: '',
        pw2: '',
        hb: '',
        age: '',
        email: '',
    })

    const [profileUrl, setProfileUrl] = useState('None')

    // *** useNavigate ***
    const navigate = useNavigate()

    // *** useEffect(Custem Hook) ***
    useLogin(setLogin, '/edit')
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
        setProfileUrl(user.profile)
    }, [user])

    // *** useRef ***
    const profileRef = useRef()

    // *** EventHandlers
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
        const submitData = { ...formVal, profile: profileUrl }
        delete submitData.pw2

        const result = await DBService.updateUser(submitData)
        console.log(result)
        switch (result.status) {
            case true:
                // when created
                // jwt 갱신
                localStorage.setItem('JWT', result.jwt)
                // login state 갱신
                setLogin((v) => {
                    return { status: true, data: { ...v } }
                })
                navigate('/home')
                break
            case false:
                // when error
                alert(` 홀리싯`)
                console.log(result.data)
                break
            default:
                throw new Error('홀리싯 Mongoose Error')
        }
    }

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

    const onProfileChange = async (e) => {
        const files = e.currentTarget?.files
        console.log(files)
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append('avatar', files[i])
        }

        const resultUrl = await DBService.uploadProfile(formData)
        setProfileUrl(resultUrl)
    }
    return (
        <div className={Styles.container}>
            <div className={Styles.wrapper}>
                <div className={Styles.title}>회원정보 수정</div>
                <div className={Styles.profilebox}>
                    <form encType="multipart/form-data">
                        <input
                            type="file"
                            accept="image/*"
                            className={Styles.imginput}
                            ref={profileRef}
                            onChange={onProfileChange}
                        />
                    </form>
                    <div onClick={onProfileClick} className={Styles.profilebox}>
                        <div className={Styles.editform}>수정</div>
                        <img
                            src={
                                profileUrl === 'None' ? tempProfile : profileUrl
                            }
                            alt="profileImg"
                        />
                    </div>
                </div>
                <div className={Styles.form__container}>
                    <form
                        onSubmit={onFormSubmit}
                        className={Styles.signup__form}
                    >
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
