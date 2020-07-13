import React, { useEffect, useState } from 'react'
import styles from './LoginPage.module.css'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { logIn, authMe, setCaptchaUrl, setError } from '../../Redux/authReducer'
import { Redirect } from 'react-router-dom'

const LoginForm = props => {
    let [captcha, setCaptcha] = useState(props.captchaImg)
    let [error, setError] = useState(props.error)
    const { register, handleSubmit, errors } = useForm();
    const logIn = data => {
        props.logIn({ email: data.email, password: data.password, captcha: data.captcha })
    }

    useEffect(() => {
        props.setCaptchaUrl(null)
        props.setError(null)
    }, [])

    useEffect(() => {
        setCaptcha(props.captchaImg)
        setError(props.error)
    }, [props.captchaImg, props.error])


    return (
        <div className={styles.main}>
            <p className={styles.sign} align="center"> Sign in </p>
            {error && <div className={styles.errorMsg}> {props.error}</div>}
            <form onSubmit={handleSubmit(logIn)} className={styles.form1}>
                <input
                    name='email'
                    className={`${styles.un} ${errors.email && styles.error} ${styles.inp}`}
                    type="email"
                    align="center"
                    placeholder="Email"
                    ref={register({ required: true, minLength: 8 })}
                />
                <input
                    name='password'
                    className={`${styles.pass}  ${errors.password && styles.error} ${styles.inp}`}
                    type="password"
                    align="center"
                    placeholder="Password"
                    ref={register({ required: true, minLength: 8 })}
                />
                {captcha &&
                    <div className={styles.captchaBlock}>
                        <div className={styles.captcha}>
                            <img src={props.captchaImg} alt="" />
                        </div>
                        <input
                            name='captcha'
                            className={`${styles.pass}  ${errors.password && styles.error} ${styles.inp}`}
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
            : <div className={styles.LoginPage}>
                <LoginForm logIn={props.logIn} authMe={props.authMe}
                    error={props.error} captchaImg={props.captchaImg}
                    setCaptchaUrl={props.setCaptchaUrl}
                    setError={props.setError} />
            </div>

    )
}

let mapStateToProps = state => ({
    myId: state.authorization.myId,
    isAuth: state.authorization.isAuth,
    error: state.authorization.error,
    captchaImg: state.authorization.captchaImg
})

export default connect(mapStateToProps, { logIn, authMe, setCaptchaUrl, setError })(LoginPage)