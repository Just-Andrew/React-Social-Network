import React from 'react'
import styles from './Preloader.module.css'
import preloader from '../../../assets/Pictures/preloader.gif'
const Preloader = props => {
    return (
        <div className={styles.mainBlock}>
            <img src={preloader} alt="Loading..."/>
        </div>
    );
}

export default Preloader;