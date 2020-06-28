import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import styles from './LoginPage.module.css'
import { connect } from 'react-redux'
import { loginAPI } from '../../API/api'
const LoginForm = props => {
    return (
        <div className={styles.formWrapper}>
            <h2>Login form</h2>
            <form onSubmit={props.handleSubmit}>
                <div> <Field component='input' type='email' name='email' /> </div>
                <div> <Field component='input' type='password' name='password' /> </div>
                <div> <Field component='input' type='checkbox' name='rememberMe' /></div>
                <div><button>Login</button></div>
            </form>
        </div>
    )
}



let ReduxFormWrapper = reduxForm({ form: 'login' })(LoginForm)

const LoginPage = props => {
    let auth = false
    const onSubmit = FormData => {
        if (props.formData.values !== undefined) {
            console.log('EMAIL', props.formData.values.email)
            console.log('PASSWORD', props.formData.values.password)
            console.log('REMEMBER-ME', props.formData.values.rememberMe)
            loginAPI.logIn(props.formData.values.email, props.formData.values.password, props.formData.values.rememberMe)
        }
    }
    return (
        <div className={styles.LoginPage}>
            <ReduxFormWrapper onSubmit={onSubmit} auth={auth}/>
        </div>
    )
}

let mapStateToProps = state => ({
    formData: state.form.login
})

export default connect(mapStateToProps, {})(LoginPage)