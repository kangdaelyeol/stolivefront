import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './home.module.css'
import Search from './Search.jsx'
import RoomList from './RoomList.jsx'
import CreateForm from './CreateForm.jsx'
import LoadingSpinner from '../LoadingSpinner.jsx'
import useGetRooms from '../../hooks/useGetRooms.js'

const tempRoomData = [
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        category: '스터디',
        subCategory: ['자격증', '공부'],
        roomId: 'R_123456',
    },
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        category: '스터디',
        subCategory: ['자격증', '공부'],
        roomId: 'R_1234567',
    },
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        category: '스터디',
        subCategory: ['자격증', '공부'],
        roomId: 'R_123458',
    },
]

export default function Home({ login, DBService }) {
    const [isCreate, setIsCreate] = useState(false)

    const navigate = useNavigate()
    const [roomData, isLoading, setRefresh] = useGetRooms(DBService)

    // 대충 가공 해보기 -> 전체 카테고리 / 스터디 ....
    // roomData는 서버에서 구분해서 줘도 되고, 여기서 다 받아온담 가공해서 따로 해도 되고

    // Event Methods
    const onCreateBtnClick = () => {
        setIsCreate((v) => !v)
    }

    const onRefreshBtnClick = () => {
        setRefresh((v) => !v)
    }

    const createRoom = (data) => {
        const submitData = {
            ...data,
            userName: 'usreName',
        }
        console.log(submitData)
        DBService.createRoom(submitData).then((result) => {
            console.log(result)
            const { roomId } = result
            if (roomId) navigate(`/room/${roomId}`)
        })
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
            <div
                onClick={onCreateBtnClick}
                className={`${Styles.createbtn} ${Styles.fixedbtn}`}
            >
                +
            </div>
            <div
                onClick={onRefreshBtnClick}
                className={`${Styles.refreshbtn} ${Styles.fixedbtn}`}
            >
                R
            </div>
            {isCreate ? (
                <CreateForm setIsCreate={setIsCreate} createRoom={createRoom} />
            ) : (
                ''
            )}
        </div>
    )
}
