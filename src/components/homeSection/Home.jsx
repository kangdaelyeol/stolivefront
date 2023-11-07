import React, { useState, useEffect } from 'react'
import Styles from './home.module.css'
import Search from './Search.jsx'
import RoomList from './RoomList.jsx'
import CreateForm from './CreateForm.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'

const REQUEST_URL = 'http://localhost:8000'

const tempRoomData = [
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

export default function Home() {
    const [roomData, setRoomData] = useState([])
    const [isCreate, setIsCreate] = useState(false)
    const [refresh, setRefresh] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    // Room 받아오기
    useEffect(() => {
        setIsLoading(true)
        fetch(`${REQUEST_URL}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((result) => {
                return result.json()
            })
            .then((data) => {
                setIsLoading(false)
                setRoomData([...data])
            })
            .catch((e) => {
                console.log(e)
                setIsLoading(false)
                setRoomData(tempRoomData)
            })
    }, [refresh])
    // 대충 가공 해보기 -> 전체 카테고리 / 스터디 ....
    // roomData는 서버에서 구분해서 줘도 되고, 여기서 다 받아온담 가공해서 따로 해도 되고

    // Event Methods
    const onCreateBtnClick = () => {
        setIsCreate((v) => !v)
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.background}>
                <div className={Styles.main__padding}>
                    <div className={Styles.main}>
                        <Search />
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                <RoomList
                                    title="전체 카테고리"
                                    roomData={roomData}
                                />
                                <RoomList title="쓰터디" roomData={roomData} />
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div onClick={onCreateBtnClick} className={Styles.createbtn}>
                +
            </div>
            {isCreate ? <CreateForm setIsCreate={setIsCreate} /> : ''}
        </div>
    )
}
