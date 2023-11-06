import React from 'react'
import Styles from './home.module.css'
import Search from "./Search.jsx"
import Room from './Room.jsx'

const roomData = [
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        mainCategory: '스터디',
        subCategory: ['자격증', '공부'],
    },
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        mainCategory: '스터디',
        subCategory: ['자격증', '공부'],
    },
    {
        title: '정보보안기사 스터디',
        description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
        people: 3,
        mainCategory: '스터디',
        subCategory: ['자격증', '공부'],
    },
]


export default function Home() {
    return (
        <div className={Styles.container}>
            <div className={Styles.background}>
                <div className={Styles.main__padding}>
                    <div className={Styles.main}>
                        <Search />
                        <Room roomData={roomData}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
