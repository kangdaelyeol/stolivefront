import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './profileEdit.module.css'
import LoadingSpinner from './LoadingSpinner'
const tempProfile =
    'http://res.cloudinary.com/dlhshpa8q/image/upload/v1700764828/KakaoTalk_Photo_2023-11-24-03-39-30_s8zpkk.png'
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

    // formData to req Cloudinary when profile is decided clearly
    const [formData, setFormData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // *** useNavigate ***
    const navigate = useNavigate()

    // *** useEffect(Custem Hook) ***
    useEffect(() => {
        if (!user) return navigate('/login')
        setFormVal({
            nickName: user.nickName,
            pw: '',
            pw2: '',
            hb: user.hb,
            age: user.age,
            email: user.email,
        })
        setProfileUrl(user?.profile)
    }, [user, navigate])

    // ** useEffect - when profile is changed
    useEffect(() => {
        return async () => {
            if (!user) return navigate('/login')
            if (user.profile === profileUrl) return
            const result = await DBService.deleteTempProfile(profileUrl)
            console.log(result)
        }
    }, [profileUrl, navigate, DBService, user])

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
        setIsLoading(true)
        const submitData = {
            ...formVal,
            profile: profileUrl,
            userName: user.userName,
        }
        delete submitData.pw2
        const { status, data, jwt } = await DBService.updateUser({
            userData: submitData,
            formData,
        })
        console.log('updatedDAta', data)
        switch (status) {
            case true:
                // when created
                // jwt 갱신
                localStorage.setItem('JWT', jwt)
                // login state 갱신
                setLogin({ status, data })
                navigate('/home')
                break
            case false:
                // when error
                alert(`홀리싯`)
                console.log(data)
                break
            default:
                throw new Error('홀리싯 Mongoose Error')
        }
        setIsLoading(false)
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
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append('avatar', files[i])
        }
        const result = await DBService.uploadTempProfile(formData)
        setProfileUrl(process.env.REACT_APP_BASE_URL + result.data)
        setFormData(result.formData)
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.wrapper}>
                {isLoading && (
                    <div className={Styles.loading}>
                        <LoadingSpinner message={'Loading'} />
                    </div>
                )}

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
                        <div className={Styles.editform}>Edit</div>
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
                            value={formVal?.nickName}
                            className={Styles.signup__input}
                            placeholder="닉네임"
                            onChange={onFormChange}
                        />
                        <input
                            type="password"
                            name="pw"
                            value={formVal?.pw}
                            className={Styles.signup__input}
                            placeholder="비밀번호"
                            onChange={onFormChange}
                        />
                        <input
                            type="password"
                            name="pw2"
                            value={formVal?.pw2}
                            className={Styles.signup__input}
                            placeholder="비밀번호 확인"
                            onChange={onFormChange}
                        />
                        <input
                            type="email"
                            name="email"
                            value={formVal?.email}
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
                                value="Update"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
