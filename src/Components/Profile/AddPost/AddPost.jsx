import React from 'react'
import styles from "./AddPost.module.css"
import { Field, reduxForm } from 'redux-form'

let AddPost = (props) => {
    let onSubmit = data => {
        if (data.postMessage !== undefined) {
            props.createPost(data.postMessage)
        }
    }

    return (
        <ReduxFormWrapper onSubmit={onSubmit} />
    )
}

const AddPostForm = props => {
    return (
        <div className={styles.AddPostBlock}>
            <form onSubmit={props.handleSubmit}>
                <Field component='textarea' name='postMessage' placeholder='Type sth and post it' />
                <br />
                <button >Create Post</button>
            </form>
        </div>
    )
}

let ReduxFormWrapper = reduxForm({ form: 'login' })(AddPostForm)

export default AddPost