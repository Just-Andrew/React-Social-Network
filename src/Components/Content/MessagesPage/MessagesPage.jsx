import React from 'react';
import styles from "./MessagesPage.module.css";
import MessagesBlock from './MessagesBlock/MessagesBlock';
import ContactsContainer from './Contacts/ContactsContainer';
import withRedirect from '../../../HOCs/redirect'

const MessagesPage = (props) => {
    return (
        <div className={styles.Dialogs}>       
             <MessagesBlock  />                         
            <ContactsContainer/>                     
        </div>
    );
}

//let MessagesPageContainer = withRedirect(MessagesPage)

export default MessagesPage;
/* export default MessagesPageContainer; */