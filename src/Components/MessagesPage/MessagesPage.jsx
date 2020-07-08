import React from 'react';
import styles from "./MessagesPage.module.css";
import MessagesBlock from './MessagesBlock/MessagesBlock';
import ContactsContainer from './Contacts/ContactsContainer'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const MessagesPage = (props) => {
    return (
        !props.isAuth
            ? <Redirect to='/login' />
            : <div className={styles.Dialogs}>
                <MessagesBlock />
                <ContactsContainer />
            </div>
    )
}

let mapStateToProps = state => ({
    isAuth: state.authorization.isAuth
})

export default connect(mapStateToProps, {})(MessagesPage)