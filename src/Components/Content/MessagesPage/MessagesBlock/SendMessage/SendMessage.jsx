import React from 'react';
import styles from "./SendMessage.module.css";
/* styles for another component (needed for 1 function) */
import style from '../Messages/Messages.module.css';

const SendMessage = (props) => {
    /* logic */
    let txtArea = React.createRef();

    let scroll = () => {
        let msgBox = document.querySelector(`.${style.MessagesBlock}`);
        msgBox.scrollTo(0, msgBox.scrollHeight);
    } 

    let changeCurrentMessageText = () => {
        let text = txtArea.current.value;
        props.changeCurrentMessageText(text);
    }

    let sendMessage = () => {
        setTimeout(scroll, 1);
        let text = txtArea.current.value;     
        if (text !== '') {
            props.addMessage(text);                    
        }
    }
    /* HTML */
    return (
        <div className={styles.SendMessage}>
            <textarea
                onChange={changeCurrentMessageText}
                ref={txtArea}
                value={props.CurrentMessageText}
                placeholder='Write text for your message'>
            </textarea>
            <div className={styles.btnWrapper}>
                <button onClick={sendMessage} > send</button>
            </div>
        </div>
    );
}

export default SendMessage;