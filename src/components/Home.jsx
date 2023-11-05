import React from 'react'
import Styles from './home.module.css'

const searchIconURL = "https://lh3.googleusercontent.com/a/ACg8ocI-3LrdNOhDIFId5_WXJHabTsFijFLobWNYrYEwLucb=s83-c-mo"

export default function Home() {
    const tagList = ['스터디', '운동', '혼밥', '고민상담']
    return (
        <div className={Styles.container}>
            <div className={Styles.background}>
                <div className={Styles.main__padding}>
                    <div className={Styles.main}>
                        <div className={Styles.search}>
                            <div className={Styles.search__title}>
                                방 검색하기
                            </div>
                            <div className={Styles.search__bar}>
                                <img
                                    src={searchIconURL}
                                    alt="ghffltlt"
                                    className={Styles.bar__icon}
                                />
                                <input
                                    type="text"
                                    className={Styles.bar__input}
                                />
                            </div>
                            <div className={Styles.search__tags}>
                                {tagList.map((tag) => {
                                    return (
                                        <div
                                            className={Styles.search__tag}
                                            key={tag}
                                        >
                                            {tag}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
