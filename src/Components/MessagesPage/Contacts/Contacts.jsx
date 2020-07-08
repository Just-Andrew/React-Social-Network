import React from 'react';
import styles from "./Contacts.module.css";


const Contacts = (props) => {
    let contacts = props.contacts.map(c => {
        return (
            <div className={styles.contact} key={c.id}>
                <div className={styles.avatar} >
                    <img src={c.avatar} alt=''/>
                </div>
                <b> {c.user} </b>
                
            </div>
        );
    });

    return (
        <div className={styles.ContactsBlock}>
            {contacts}
        </div>
    );
}




export default Contacts;