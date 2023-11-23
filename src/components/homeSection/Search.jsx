import React from 'react'
import Styles from './search.module.css'

const searchIconURL = process.env.REACT_APP_BASE_PROFILE
const tagList = ['스터디', '운동', '혼밥', '고민상담']

export default function SearchSection({ category, setCategory }) {
    const onTagClick = (e) => {
        const name = e.currentTarget.dataset.name
        setCategory(name)
    }
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
                        <div
                            className={`${Styles.search__tag} ${
                                tag === category && Styles.tag__focus
                            }`}
                            onClick={onTagClick}
                            key={tag}
                            data-name={tag}
                        >
                            {tag}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
