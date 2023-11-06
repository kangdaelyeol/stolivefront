import React, {useState} from 'react'
import Styles from './home.module.css'
import Search from "./Search.jsx"
import RoomList from './RoomList.jsx'

const roomAllData = [
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        mainCategory: '스터디',
        subCategory: ['자격증', '공부'],
        roomId: "R_123456"
    },
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        mainCategory: '스터디',
        subCategory: ['자격증', '공부'],
        roomId: "R_1234567"
    },
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        mainCategory: '스터디',
        subCategory: ['자격증', '공부'],
        roomId: "R_123458"
    },
]


export default function Home() {
    const [roomData, setRoomData] = useState(roomAllData);

    // Room 받아오기

    // 대충 가공 해보기 -> 전체 카테고리 / 스터디 ....
    // roomData는 서버에서 구분해서 줘도 되고, 여기서 다 받아온담 가공해서 따로 해도 되고
    
    
    return (
        <div className={Styles.container}>
            <div className={Styles.background}>
                <div className={Styles.main__padding}>
                    <div className={Styles.main}>
                        <Search />
                        <RoomList title="전체 카테고리" roomData={roomData}/>
                        <RoomList title="쓰터디" roomData={roomData}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
