import React, {useState, useEffect} from 'react'
import styles from './Status.module.css'

const Status = props => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    let [postInputValue, setPostInputValue] = useState(status)

    useEffect(() => {
        setStatus(props.status)
    })

    let onStatusPrint = e => {
        setPostInputValue(e.currentTarget.value)
    }

    let ActivateEditMode = () => {
        setEditMode(true)
    }

    let DisableEditMode = () => {
        setEditMode(false)
    }

    let changeStatus = e => {
        props.setNewStatus(postInputValue)
    }

    return (
        <>
            {props.myProfile
                ? !editMode
                    ? <div className={styles.status} onDoubleClick={ActivateEditMode}>
                        Status: {status !== null
                            ? status
                            : <b>Change your status</b>}
                    </div>
                    : <div className={styles.statusBlock}>
                        <input type='text'
                            onChange={onStatusPrint}
                            value={postInputValue}
                            onFocus={() => console.log('focus')} />
                        <button onClick={changeStatus}
                            className={styles.saveButton}>✓</button>
                        <button onClick={DisableEditMode}
                            className={styles.closeButton} >X</button>
                    </div>
                : <div className={styles.status} onDoubleClick={ActivateEditMode}>
                    Status: {status !== null
                        ? status
                        : <b>This user doesn't have any status</b>}
                </div>}
        </>
    )
}

export default Status