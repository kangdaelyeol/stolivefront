import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './roomList.module.css'

const CategoryBox = ({ value, main }) => {
    return (
        <div
            className={Styles.category__box}
            style={{
                backgroundColor: main ? '#d23030' : '#0088d1',
            }}
        >
            {value}
        </div>
    )
}

const RoomBox = ({
    title,
    description,
    users,
    category,
    subCategory,
    roomId,
}) => {
    const navigate = useNavigate()
    const onBoxClick = (e) => {
        navigate(`/room/${roomId}`)
    }
    return (
        <div className={Styles.room__box} onClick={onBoxClick}>
            <div className={Styles.box__top}>
                <div className={Styles.box__top__people}>
                    {users.length}명 참여중
                </div>
            </div>
            <div className={Styles.box__middle}>
                <div className={Styles.box__middle__title}>{title}</div>
                <div className={Styles.box__middle__description}>
                    {description}
                </div>
            </div>
            <div className={Styles.box__bottom}>
                <div className={Styles.box__bottom__category}>
                    <CategoryBox main value={category} />
                    {subCategory.map(
                        (c, i) =>
                            c.trim() !== '' && (
                                <CategoryBox value={c} key={i} />
                            ),
                    )}
                </div>
            </div>
        </div>
    )
}

const PageBtn = ({ value, pageIndex, setPageIndex }) => {
    const isFocus = value === pageIndex ? true : false
    const onPageBtnClick = (e) => {
        if (isFocus) return
        setPageIndex(value)
    }
    return (
        <div
            value={value}
            onClick={onPageBtnClick}
            className={`${Styles.pagebar__button}`}
            key={value}
            style={{ border: isFocus ? '#885ffe 1px solid' : '' }}
        >
            <span> {value}</span>
        </div>
    )
}

export default function RoomList({ title, roomData }) {
    const MAX_PAGE = Math.ceil(roomData.length / 3) || 1 // pageIndex - 철수 장기
    const pages = []
    for (let i = 0; i < MAX_PAGE; i++) pages.push(i + 1)

    const [pageIndex, setPageIndex] = useState(1)
    useEffect(() => {
        setPageIndex(1)
    },[title])
    // onArrowBtnClick
    const onArrowBtnClick = (e) => {
        const direction = e.currentTarget.dataset.direction

        switch (direction) {
            case 'left':
                if (pageIndex > 1) setPageIndex((v) => v - 1)
                break
            case 'right':
                if (pageIndex < MAX_PAGE) setPageIndex((v) => v + 1)
                break
            default:
                throw new Error('홀리싯')
        }
    }

    return (
        <div className={Styles.room__container}>
            <div className={Styles.room__title}>{title}</div>
            <div className={Styles.rooms}>
                {roomData.length === 0 ? (
                    <div className={Styles.empty__box}>No Room</div>
                ) : (
                    <>
                        <RoomBox {...roomData[`${0 + (pageIndex - 1) * 3}`]} />
                        {roomData.length >= 2 + (pageIndex - 1) * 3 && (
                            <RoomBox
                                {...roomData[`${1 + (pageIndex - 1) * 3}`]}
                            />
                        )}
                        {roomData.length >= 3 + (pageIndex - 1) * 3 && (
                            <RoomBox
                                {...roomData[`${2 + (pageIndex - 1) * 3}`]}
                            />
                        )}
                    </>
                )}
            </div>
            <div className={Styles.room__pagebar}>
                <div
                    className={`${Styles.pagebar__button} ${Styles.arrowbtn} ${
                        pageIndex === 1 ? Styles.arrowbtn__inactive : ''
                    }`}
                    data-direction="left"
                    onClick={onArrowBtnClick}
                >
                    <span>&lt;</span>
                </div>
                {/* 홀리싯 어떵하지 - 철수 장기 바로 Array 이식 해버리기*/}
                {pages.map((ind) => (
                    <PageBtn
                        value={ind}
                        key={ind}
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                    />
                ))}
                <div
                    className={`${Styles.pagebar__button} ${Styles.arrowbtn} ${
                        pageIndex === MAX_PAGE ? Styles.arrowbtn__inactive : ''
                    }`}
                    data-direction="right"
                    onClick={onArrowBtnClick}
                >
                    <span>&gt;</span>
                </div>
            </div>
        </div>
    )
}
