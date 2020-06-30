import React from 'react'
import styles from './LoginPage.module.css'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { authMe } from '../../Redux/authReducer'
import { logIn } from '../../Redux/authReducer'
import { Redirect } from 'react-router-dom'

const LoginForm = props => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        props.logIn(data.email, data.password)
    }

    return (
        <div className={styles.main}>
            <p className={styles.sign} align="center"> Sign in </p>
            {props.error !== false && <div className={styles.errorMsg}> {props.error}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form1}>
                <input
                    name='email'
                    className={`${styles.un} ${errors.email && styles.error}`}
                    type="email"
                    align="center"
                    placeholder="Email"
                    ref={register({ required: true, minLength: 8 })}
                />
                <input
                    name='password'
                    className={`${styles.pass}  ${errors.password && styles.error}`}
                    type="password"
                    align="center"
                    placeholder="Password"
                    ref={register({ required: true, minLength: 8 })}
                />
                <button className={styles.submit}
                    align="center" disabled={errors === undefined ? true : false}
                    onClick={authMe}>Sign in</button>

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
                <LoginForm logIn={props.logIn} error={props.error} />
            </div>

    )
}

let mapStateToProps = state => ({
    myId: state.authorization.myId,
    isAuth: state.authorization.isAuth,
    error: state.authorization.error
})

export default connect(mapStateToProps, { logIn })(LoginPage)