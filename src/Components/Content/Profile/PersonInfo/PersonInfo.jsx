import React from 'react'
import styles from "./PersonInfo.module.css"
import icon from '../../../../assets/Pictures/gps_icon.png'
import NoPhotoImg from '../../../../assets/Pictures/NoPhotoImg.jpg'
import tick from '../../../../assets/Pictures/tick.png'
import cross from '../../../../assets/Pictures/cross.png'
import { profileAPI } from '../../../../API/api'
import editIcon from '../../../../assets/Pictures/edit_icon.png'

class Status extends React.Component {
    state = {
        status: this.props.status,
        editMode: false,
        statusInputValue: '',
        myId: this.props.myId,
        currentUserId: this.props.currentUserId,
        statusEditability: false
    }

  /*   componentDidMount() {
        this.state.statusEditability = this.props.myProfile
    } */

    componentDidUpdate(pP) {
        this.state.statusEditability = this.props.myProfile
        if(this.props.status !== pP.status) {
            this.state.status = this.props.status
        }
    }

    statusInput = React.createRef()


    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    disableEditMode = () => {
        this.setState({
            editMode: false,
            statusInputValue: ''
        })
    }

    onInputChange = () => {
        this.setState({
            statusInputValue: this.statusInput.current.value
        })
    }

    changeStatus = () => {
        if (this.state.statusInputValue !== '') {
            (async function () {
                return this.setState({
                    status: this.statusInput.current.value,
                })
            }).bind(this)()
                .then(() => {
                    this.props.setNewStatus(this.state.status)
                })
            this.disableEditMode()
        }
    }

    render() {

        return (
            <>
                {this.state.statusEditability
                    ? !this.state.editMode
                        ? <div className={styles.status} onDoubleClick={this.activateEditMode}>
                            Status: {this.state.status !== null
                                ? this.state.status
                                : <b>Change your status</b>}
                        </div>
                        : <>
                            <input type='text'
                                ref={this.statusInput}
                                onChange={this.onInputChange}
                                value={this.state.statusInputValue} />
                            <button onClick={this.changeStatus}>save</button>
                            <button onClick={this.disableEditMode} >X</button>
                        </>
                    : <div className={styles.status} onDoubleClick={this.activateEditMode}>
                        Status: {this.state.status !== null
                                ? this.state.status
                                : <b>This user doesn't have any status</b>}
                    </div>}
            </>
        )
    }
}

class PersonInfo extends React.Component {

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.background}></div>

                <div className={styles.aboutPerson}>
                    <div className={styles.avatar}>

                        <img src={this.props.avatar === null ? NoPhotoImg : this.props.avatar}
                            alt="" />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.username}><b> {this.props.fullName} </b></div>

                        <div className={styles.job}>Avaliable for a hire
                        <img src={this.props.job ? tick : cross} alt="" />
                        </div>

                        <div className={styles.statusBlock}>
                            <Status status={this.props.status}
                                setNewStatus={this.props.setNewStatus}
                                isAuth={this.props.isAuth}
                                myProfile={this.props.myProfile}
                            />
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}



export default PersonInfo;