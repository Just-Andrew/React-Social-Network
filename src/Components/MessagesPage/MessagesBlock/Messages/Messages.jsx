import React from 'react'
import styles from './Messages.module.css'

const Messages = props => {

    let messages = props.messages.map(m => {
        /* logic */
        if (m.mine) {
            return (
                <div className={styles.message} key={m.id}>
                    <div className={styles.mine}>
                        <div className={styles.msgContainer}> {m.message} </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={styles.message} key={m.id}>
                    <div className={styles.notmine}>
                        <div className={styles.msgContainer}> {m.message} </div>
                    </div>
                </div>
            )
        }
    })

    /* component itself */
    document.addEventListener('DOMContentLoaded', () => {
        let msgBox = document.querySelector(`.${styles.MessagesBlock}`)
        msgBox.scrollTo(0, msgBox.scrollHeight)
    })

    return (
        <div className={styles.MessagesBlock}>
            <div className={styles.messages}>
                {messages}
            </div>

        </div>
    )
}

export default Messages