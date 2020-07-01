import React from 'react';
import styles from "./SendMessage.module.css";
/* styles for another component (needed for 1 function) */
import style from '../Messages/Messages.module.css'
import { Field, reduxForm } from 'redux-form'

const SendMessageForm = props => {

    return (
        <div className={styles.SendMessage}>
            <form onSubmit={props.handleSubmit}>
                <div> <Field component='textarea' name='message' placeholder='Write text for your message' /> </div>
                <div className={styles.btnWrapper}>
                    <button> send</button>
                </div>
            </form>
        </div>
    )
}

let ReduxFormWrapper = reduxForm({ form: 'login' })(SendMessageForm)

const SendMessage = (props) => {

    let onSubmit = data => {
        if (data.message !== undefined) {
            props.addMessage(data.message)
        }
        scroll()
    }

    let scroll = () => {
        let msgBox = document.querySelector(`.${style.MessagesBlock}`)
        msgBox.scrollTo(0, msgBox.scrollHeight)
    }

    return (
        <ReduxFormWrapper onSubmit={onSubmit} />
    );
}

export default SendMessage