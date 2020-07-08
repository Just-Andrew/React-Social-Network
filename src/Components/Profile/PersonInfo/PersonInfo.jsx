import React, { useState, useEffect } from 'react'
import styles from "./PersonInfo.module.css"
import NoPhotoImg from '../../../assets/Pictures/NoPhotoImg.jpg'
import tick from '../../../assets/Pictures/tick.png'
import cross from '../../../assets/Pictures/cross.png'

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
                    : <>
                        <input type='text'
                            onChange={onStatusPrint}
                            value={postInputValue}
                            onFocus={() => console.log('focus')} />
                        <button onClick={changeStatus}>save</button>
                        <button onClick={DisableEditMode} >X</button>
                    </>
                : <div className={styles.status} onDoubleClick={ActivateEditMode}>
                    Status: {status !== null
                        ? status
                        : <b>This user doesn't have any status</b>}
                </div>}
        </>
    )
}

const PersonInfo = props => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.background}></div>

            <div className={styles.aboutPerson}>
                <div className={styles.avatar}>

                    <img src={props.avatar === null ? NoPhotoImg : props.avatar}
                        alt="" />
                </div>
                <div className={styles.info}>
                    <div className={styles.username}><b> {props.fullName} </b></div>

                    <div className={styles.job}>Avaliable for a hire
                        <img src={props.job ? tick : cross} alt="" />
                    </div>

                    <div className={styles.statusBlock}>
                        <Status status={props.status}
                            setNewStatus={props.setNewStatus}
                            isAuth={props.isAuth}
                            myProfile={props.myProfile}
                        />
                    </div>

                </div>
            </div>
        </div>

    )
}



export default PersonInfo;