import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './home.module.css'
import Search from './Search.jsx'
import RoomList from './RoomList.jsx'
import CreateForm from './CreateForm.jsx'
import LoadingSpinner from '../LoadingSpinner.jsx'
import useGetRooms from '../../hooks/useGetRooms.js'
import tempRoomData from '../../tempRoomData.js'

export default function Home({ DBService }) {
    const [isCreate, setIsCreate] = useState(false)
    const [category, setCategory] = useState('스터디')
    const [cRoomData, setCRoomData] = useState([])
    const navigate = useNavigate()
    const [roomData, isLoading, setRefresh] = useGetRooms(
        DBService,
        tempRoomData,
    )
    // 대충 가공 해보기 -> 전체 카테고리 / 스터디 ....
    // roomData는 서버에서 구분해서 줘도 되고, 여기서 다 받아온담 가공해서 따로 해도 되고
    useEffect(() => {
        if (!roomData) return
        const filteredData = roomData.filter((v) => v.category === category)
        setCRoomData(filteredData)
    }, [category, roomData])
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
                        <Search category={category} setCategory={setCategory} />
                        {isLoading ? (
                            <div className={Styles.loadingcontainer}>
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <>
                                <RoomList
                                    title="전체 카테고리"
                                    roomData={roomData}
                                />
                                <RoomList
                                    title={category}
                                    roomData={cRoomData}
                                />
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
