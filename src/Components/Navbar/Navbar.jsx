import React from 'react'
import styles from './Navbar.module.css'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../Redux/authReducer'
import { render } from '@testing-library/react'
import Preloader from '../Preloader/Preloader'

class Navbar extends React.Component {
    render() {
        return (
            <nav className={`${styles.nav}`}>
                <div className={styles.navItem}>
                    <NavLink to={`/profile/${this.props.myId}`} className={styles.td}>Profile</NavLink>
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

                {this.props.isAuth
                    ? <div className={styles.navItem} onClick={this.props.logOut}>
                        <NavLink to='/login' className={styles.td}>Exit</NavLink>
                    </div>
                    : ''}
            </nav>
        )
    }
}

let mapStateToProps = state => ({
    myId: state.authorization.myId,
    isAuth: state.authorization.isAuth
})

export default connect(mapStateToProps, { logOut })(Navbar)
