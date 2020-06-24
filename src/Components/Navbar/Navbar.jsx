import React from 'react';
import styles from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
           
            <div className={styles.navItem}>
               <NavLink to="/profile" className={styles.td}>Profile</NavLink>
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

    );
}
export default Navbar;