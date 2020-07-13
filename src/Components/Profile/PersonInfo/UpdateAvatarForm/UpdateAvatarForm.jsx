import React, {useState} from 'react'
import styles from './UpdateAvatarForm.module.css'

const UpdateAvatarForm = props => {
    let [btnText, setBtnText] = useState(`Choose file`)

    let input = React.createRef()

    const onFileGot = e => {
        setBtnText(`Choose file ✓`)
    }

    const setAvatar = () => {
        let file = input.current.files[0]
        props.toggleAvatarEditMode()
        props.updateAvatar(file)
    }

    return (
        <div className={styles.avatarInput}>
            <label htmlFor='fileForm' className={styles.lbl}>{btnText}</label>
            <input id='fileForm' type='file' onChange={onFileGot} ref={input} />
            <div className={styles.controlPanel}>
                <button onClick={setAvatar}
                    className={styles.saveButton} >✓</button>

                <button className={styles.closeButton}
                    onClick={() => {
                        props.toggleAvatarEditMode(false)
                    }}>X</button>
            </div>
        </div>
    )
}

export default UpdateAvatarForm