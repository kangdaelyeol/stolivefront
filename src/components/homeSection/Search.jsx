import React from 'react'
import Styles from './search.module.css'

const searchIconURL =
    'https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo'
const tagList = ['스터디', '운동', '혼밥', '고민상담']

export default function SearchSection() {
    return (
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
}
