import React, { useState } from 'react'
import Styles from './home.module.css'

const searchIconURL =
    'https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo'
const tagList = ['스터디', '운동', '혼밥', '고민상담']
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

const SearchSection = () => (
    <div className={Styles.search}>
        <div className={Styles.search__title}>방 검색하기</div>
        <div className={Styles.search__bar}>
            <img
                src={searchIconURL}
                alt="ghffltlt"
                className={Styles.bar__icon}
            />
            <input type="text" className={Styles.bar__input} />
        </div>
        <div className={Styles.search__tags}>
            {tagList.map((tag) => {
                return (
                    <div className={Styles.search__tag} key={tag}>
                        {tag}
                    </div>
                )
            })}
        </div>
    </div>
)

const RoomSection = () => {
    const MAX_PAGE = 10 // pageIndex - 철수 장기
    const pages = []
    for (let i = 0; i < MAX_PAGE; i++) pages.push(i + 1)

    const [pageIndex, setPageIndex] = useState(1)
    const Rooms = ({
        title,
        description,
        people,
        mainCategory,
        subCategory,
    }) => {
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
        return (
            <div className={Styles.room__box}>
                <div className={Styles.box__top}>
                    <div className={Styles.box__top__people}>
                        {people}명 참여중
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
                        <CategoryBox main value={mainCategory} />
                        {subCategory.map((c, i) => (
                            <CategoryBox value={c} key={i} />
                        ))}
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
                console.log('홀리싯')
        }
    }

    return (
        <div className={Styles.room__container}>
            <div className={Styles.room__title}>전체 카테고리</div>
            <div className={Styles.rooms}>
                {roomData.map((r, i) => (
                    <Rooms {...r} key={i} />
                ))}
            </div>
            <div className={Styles.room__pagebar}>
                <div
                    className={`${Styles.pagebar__button} ${Styles.arrowbtn} ${
                        pageIndex === 1 ? Styles.arrowbtn__inactive : ''
                    }`}
                    data-direction="left"
                    onClick={onArrowBtnClick}
                >
                    &lt;
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
                    className={`${Styles.pagebar__button} ${
                        pageIndex === MAX_PAGE ? Styles.arrowbtn__inactive : ''
                    }`}
                    data-direction="right"
                    onClick={onArrowBtnClick}
                >
                    &gt;
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <div className={Styles.container}>
            <div className={Styles.background}>
                <div className={Styles.main__padding}>
                    <div className={Styles.main}>
                        <SearchSection />
                        <RoomSection />
                    </div>
                </div>
            </div>
        </div>
    )
}
