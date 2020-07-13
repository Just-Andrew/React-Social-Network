import React from 'react'
import styles from './Page404.module.css'
import ReactIcon from '../../assets/Pictures/react_icon.png'

const Page404 = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.icon}>
                <b>4</b>
                <img src={ReactIcon} alt='0' />
                <b>4</b>
            </div>
            <div className={styles.text}>
                Page is not found
            </div>
        </div>
    )
}

export default Page404