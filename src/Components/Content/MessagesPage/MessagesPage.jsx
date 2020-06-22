import React from 'react';
import styles from "./MessagesPage.module.css";
import MessagesBlock from './MessagesBlock/MessagesBlock';
import ContactsContainer from './Contacts/ContactsContainer';


const MessagesPage = (props) => {
    return (
        <div className={styles.Dialogs}>       
             <MessagesBlock  />                         
            <ContactsContainer/>                     
        </div>
    );
}


export default MessagesPage;