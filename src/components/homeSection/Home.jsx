import React, { useState, useRef } from 'react'
import Styles from './home.module.css'
import Search from './Search.jsx'
import RoomList from './RoomList.jsx'

const roomAllData = [
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        mainCategory: '스터디',
        subCategory: ['자격증', '공부'],
        roomId: 'R_123456',
    },
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        mainCategory: '스터디',
        subCategory: ['자격증', '공부'],
        roomId: 'R_1234567',
    },
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        mainCategory: '스터디',
        subCategory: ['자격증', '공부'],
        roomId: 'R_123458',
    },
]

const CreateForm = ({setIsCreate}) => {

    // States
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        subCategory: ""
    })
    const titleRef = useRef();
    const desRef = useRef()
    const categoryRef = useRef()
    const subCategoryRef = useRef()
    
    // Event methods
    const onEscapeClick = () => {
        setIsCreate(false);
    }
    return (
        <div className={Styles.create}>
            <div className={Styles.create__container}>
                <div onClick={onEscapeClick} className={Styles.create__escape}>X</div>
                <div className={Styles.create__title}>방 만들기</div>
                <form action="" className={Styles.create__form}>
                    <div className={Styles.input__container}>
                        <span>Title</span>
                        <input ref={titleRef} name='title' type="text" className={Styles.title}/>
                    </div>
                    <div className={Styles.input__container}>
                        <span>Description</span>
                        <input ref={desRef} name='description' type="text" className={Styles.description} />
                    </div>
                    <div className={Styles.input__container}>
                        <span>Category</span>
                        <select ref={categoryRef} name="category" className={Styles.category} id="category">
                            <option value="study">스터디</option>
                            <option value="bob">혼밥</option>
                            <option value="workout">운동</option>
                            <option value="problem">고민상담</option>
                        </select>
                    </div>
                    <div className={Styles.input__container}>
                        <span>SubCategory</span>
                        <input ref={subCategoryRef} name='subCategory' type="text" className={Styles.subcategory} />
                    </div>
                    <button className={Styles.submit}>호리싯</button>
                </form>
            </div>
        </div>
    )
}

export default function Home() {
    const [roomData, setRoomData] = useState(roomAllData)
    const [isCreate, setIsCreate] = useState(false)

    // Room 받아오기

    // 대충 가공 해보기 -> 전체 카테고리 / 스터디 ....
    // roomData는 서버에서 구분해서 줘도 되고, 여기서 다 받아온담 가공해서 따로 해도 되고
    const onCreateBtnClick = () => {
        setIsCreate((v) => !v)
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.background}>
                <div className={Styles.main__padding}>
                    <div className={Styles.main}>
                        <Search />
                        <RoomList title="전체 카테고리" roomData={roomData} />
                        <RoomList title="쓰터디" roomData={roomData} />
                    </div>
                </div>
            </div>
            <div onClick={onCreateBtnClick} className={Styles.createbtn}>
                +
            </div>
            {/* {isCreate ? <CreateForm /> : ''} */}
            <CreateForm setIsCreate={setIsCreate} />
        </div>
    )
}
