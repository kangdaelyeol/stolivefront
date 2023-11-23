import React, { useRef, useState } from 'react'
import Styles from './createForm.module.css'

export default function CreateForm({ setIsCreate, createRoom }) {
    // States
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        subCategory: '',
    })

    const titleRef = useRef()
    const desRef = useRef()
    const categoryRef = useRef()
    const subCategoryRef = useRef()

    // Event methods
    const onEscapeClick = () => {
        setIsCreate(false)
    }

    const onFormChange = () => {
        const title = titleRef.current.value
        const description = desRef.current.value
        const category = categoryRef.current.value
        const subCategory = subCategoryRef.current.value
        setFormData({
            title,
            description,
            category,
            subCategory,
        })
    }

    const onFormSubmit = (e) => {
        // create Room
        e.preventDefault()
        const { title, description } = formData
        if (title.trim() === '' || description.trim() === '') {
            return alert('Title / Description - 필수 항목 입니다!')
        }
        setIsCreate(false)
        createRoom({
            ...formData,
            title: title.trim(),
            description: description.trim(),
        })
    }

    return (
        <div className={Styles.create}>
            <div className={Styles.create__container}>
                <div onClick={onEscapeClick} className={Styles.create__escape}>
                    X
                </div>
                <div className={Styles.create__title}>방 만들기</div>
                <form
                    action=""
                    className={Styles.create__form}
                    onSubmit={onFormSubmit}
                >
                    <div className={Styles.input__container}>
                        <span>Title</span>
                        <input
                            ref={titleRef}
                            name="title"
                            type="text"
                            className={Styles.title}
                            onChange={onFormChange}
                            value={formData.title}
                        />
                    </div>
                    <div className={Styles.input__container}>
                        <span>Description</span>
                        <input
                            ref={desRef}
                            name="description"
                            type="text"
                            className={Styles.description}
                            onChange={onFormChange}
                            value={formData.description}
                        />
                    </div>
                    <div className={Styles.input__container}>
                        <span>Category</span>
                        <select
                            ref={categoryRef}
                            name="category"
                            className={Styles.category}
                            id="category"
                            onChange={onFormChange}
                            value={formData.category}
                        >
                            <option value="스터디">스터디</option>
                            <option value="혼밥">혼밥</option>
                            <option value="운동">운동</option>
                            <option value="고민상담">고민상담</option>
                        </select>
                    </div>
                    <div className={Styles.input__container}>
                        <span>SubCategory</span>
                        <input
                            ref={subCategoryRef}
                            name="subCategory"
                            type="text"
                            className={Styles.subcategory}
                            onChange={onFormChange}
                            value={formData.subCategory}
                            placeholder="# 또는 띄어쓰기로 여러개 설정 할 수 있어요!"
                        />
                    </div>
                    <button className={Styles.submit}>Create</button>
                </form>
            </div>
        </div>
    )
}
