import React, { useEffect, useState, useRef } from 'react'
import styles from './EditProfile.module.css'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { getUserProfile } from '../../Redux/profileReducer'
import Preloader from '../common/Preloader/Preloader'
import { NavLink, Redirect } from 'react-router-dom'

const EditProfile = props => {
    const LookingForAJob = useRef()
    const [formIsSent, setFormIsSentValue] = useState(false)
    const [checked, setCheckedStatus] = useState(props.lookingForAJob)
    const { register, handleSubmit } = useForm()


    useEffect(() => {
        LookingForAJob.current = props.lookingForAJob

        if (props.fullName === null) {
            props.getUserProfile(props.myId)
        }

        if (prev !== LookingForAJob.current) {
            debugger
            setCheckedStatus(props.lookingForAJob)
        }
    })

    const prev = LookingForAJob.current

    const applyChanges = data => {
        let keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            if (data[keys[i]] === '') {
                data[keys[i]] = props[[keys[i]]]
            }
            props.getUserProfile(props.myId, true, data)
        }
        setFormIsSentValue(true)
    }

    let toggleCheckedStatus = (e) => {
        setCheckedStatus(e.currentTarget.checked)
    }

    return (
        <>
            {!props.loading
                ? <div className={styles.EditProfile}>
                    <div className={styles.mainBlock}>
                        <NavLink to={`/profile/${props.myId}`}>
                            <div className={styles.User}>
                                <div className={styles.avatar}>
                                    <img src={props.avatar} alt="" />
                                </div>
                                <div className={styles.username}>{props.fullName}</div>
                            </div>
                        </NavLink >
                        <div className={styles.formWrapper}>
                            <h2> Edit your profile</h2>

                            <form onSubmit={handleSubmit(applyChanges)}>
                                <div className={styles.formItem}>
                                    <input ref={register({ minLength: 4 })}
                                        name="fullName"
                                        type="text"
                                        className={styles.inp}
                                        placeholder="Full Name"
                                        align="center" />
                                </div>

                                <div className={styles.formItem}>
                                    <textarea ref={register}
                                        name="aboutMe"
                                        className={styles.txtarea}
                                        placeholder="Tell sth about yourself"
                                    />
                                </div>

                                <div className={styles.formItem}>
                                    <label className={styles.lbl}
                                        htmlFor="job">Looking for a job</label>
                                    <input ref={register}
                                        id="job"
                                        name="lookingForAJob"
                                        type="checkbox"
                                        className=""
                                        placeholder=""
                                        checked={checked}
                                        onChange={toggleCheckedStatus}
                                    />
                                </div>

                                <div className={styles.formItem}>
                                    <textarea ref={register}
                                        name="lookingForAJobDescription"
                                        className={styles.txtarea}
                                        placeholder="Describe your dream job conditions"
                                    />
                                </div>
                                <button className={styles.applyBtn}>Apply changes</button>
                            </form>

                        </div>
                    </div>
                </div>
                : <Preloader />}
            {formIsSent ? <Redirect to={`profile/${props.myId}`} /> : ''}
        </>
    )
}
const mapStateToProps = state => ({
    avatar: state.authorization.avatar,
    fullName: state.profile.fullName,
    aboutMe: state.profile.aboutMe,
    lookingForAJob: state.profile.lookingForAJob,
    lookingForAJobDescription: state.profile.lookingForAJobDescription,
    myId: state.authorization.myId,
    loading: state.profile.loading
})

export default connect(mapStateToProps, { getUserProfile })(EditProfile)