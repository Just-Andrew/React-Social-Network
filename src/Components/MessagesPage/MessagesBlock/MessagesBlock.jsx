import React from 'react'
import styles from "./MessagesBlock.module.css"
import MessagesContainer from './Messages/MessagesContainer'
import SendMessageContainer from './SendMessage/SendMessageContainer'

const MessagesBlock = (props) => {
    return (
        <div className={styles.MsgWrapper}>
            <MessagesContainer />
            <SendMessageContainer />
        </div>
    )
}


export default MessagesBlock