import React, { useEffect, useState } from 'react'
import styles from './LoginPage.module.css'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { logIn, getCaptcha, setCaptchaUrl, setError } from '../../Redux/authReducer'
import { Redirect } from 'react-router-dom'
import classNames from 'classnames'
const LoginForm = props => {
    let [captcha, setCaptcha] = useState(props.captchaImg)
    let [error, setError] = useState(props.error)
    let [requiresCaptcha, setCaptchaRequirement] = useState(false)

    const { register, handleSubmit, errors } = useForm();
    /* componentDidMount */
    useEffect(() => {
        props.setCaptchaUrl(null)
        props.setError(null)
    }, [])

    /* ComponentDidUpdate */
    useEffect(() => {
        setCaptcha(props.captchaImg)
        setError(props.error)
        if (props.captchaImg !== null) setCaptchaRequirement(true)
    }, [props.captchaImg, props.error])

    const logIn = data => {
        props.logIn({
            email: data.email, password: data.password,
            captcha: data.captcha, requiresCaptcha
        })
    }

    return (
        <div className={styles.main}>
            <p className={styles.sign} align="center"> Sign in </p>
            {error && <div className={styles.errorMsg}> {props.error}</div>}
            <form onSubmit={handleSubmit(logIn)} className={styles.form1}>
                <input
                    name='email'
                    className={classNames(styles.un, styles.inp, { [styles.error]: errors.email !== undefined })}
                    type="email"
                    align="center"
                    placeholder="Email"
                    ref={register({ required: true, minLength: 8 })}
                />
                <input
                    name='password'
                    className={classNames(styles.un, styles.inp, { [styles.error]: errors.password !== undefined })}
                    type="password"
                    align="center"
                    placeholder="Password"
                    ref={register({ required: true, minLength: 8 })}
                />
                {captcha &&
                    <div className={styles.captchaBlock}>
                        <div className={styles.captcha}>
                            <img src={props.captchaImg} alt="" />
                            <p onClick={props.getCaptcha}>Can't see symbols</p>
                        </div>
                        <input
                            name='captcha'
                            className={classNames(styles.pass, styles.inp)}
                            type="text"
                            align="center"
                            placeholder="Enter sybmols from the picture"
                            ref={register({ required: true })} />
                    </div>}
                <button className={styles.submit}
                    align="center" disabled={errors === undefined ? true : false}>
                    Sign in
                </button>

                <p className={styles.forgot} align="center"><a href="#" onClick={() => { alert('Not my problem :P') }}>Forgot Password?</a></p>
            </form>

        </div>
    )
}

const LoginPage = props => {
    return (
        props.isAuth
            ? <Redirect to={`/profile/${props.myId}`} />
            : <div className={styles.ContentWrapper}>
                <LoginForm logIn={props.logIn}
                    error={props.error} captchaImg={props.captchaImg}
                    setCaptchaUrl={props.setCaptchaUrl}
                    setError={props.setError}
                    getCaptcha={props.getCaptcha} />
            </div>

    )
}

let mapStateToProps = state => ({
    myId: state.authorization.myId,
    isAuth: state.authorization.isAuth,
    error: state.authorization.error,
    captchaImg: state.authorization.captchaImg
})

export default connect(mapStateToProps, { logIn, getCaptcha, setCaptchaUrl, setError })(LoginPage)