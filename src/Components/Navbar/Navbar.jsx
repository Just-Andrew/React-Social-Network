import React from 'react';
import styles from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = props => {
    return (
        <nav className={styles.nav}>
            <div className={styles.navItem}>
               <NavLink to={`/profile/${props.myId}`} className={styles.td}>Profile</NavLink>
            </div>
            <div className={styles.navItem}>
              <NavLink to='/friends' className={styles.td}>Friends</NavLink> 
            </div>
            <div className={styles.navItem}>
               <NavLink to='/dialogs' className={styles.td}>Messages</NavLink>
            </div>
            <div className={styles.navItem}>
            <NavLink to='/users' className={styles.td}>Users</NavLink>
            </div>
            <div className={styles.navItem}>
               Exit
            </div>
        </nav>
    )
}

let mapStateToProps = state => ({
    myId: state.header.myId
})

export default connect(mapStateToProps, {})(Navbar)
