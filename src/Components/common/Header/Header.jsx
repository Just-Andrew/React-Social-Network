import React from 'react'
import styles from "./Header.module.css"
import { NavLink } from 'react-router-dom'
import NoPhotoImg from '../../../assets/Pictures/NoPhotoImg.jpg'

const Header = props => {
    return (
        <header className={styles.header}>
            <div className={styles.title}>HeyBook</div>
            <div className={styles.auth}>
                {props.isAuth ? <div>
                    <div className={styles.login}> {props.login} </div>
                    <div className={styles.avatar}> <img src={props.avatar === null ? NoPhotoImg : props.avatar} alt="" />
                    </div>
                </div> :
                    <NavLink to='/login'> Log In </NavLink>}
            </div>
        </header>
    );
}
export default Header

