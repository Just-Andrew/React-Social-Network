import React from 'react';
import styles from "./AddPost.module.css";


let txtArea = React.createRef();

let AddPost = (props) => {
    /* logic */
    let addPost = () => {
        let text = txtArea.current.value;
        if (text != '') {
            props.addPost(text);
        }
    }

    let onTxtAreaChange = () => {
        let text = txtArea.current.value;
        props.changeCurrentPostText(text);
    };

    /* HTML */
    return (
        <div className={styles.AddPostBlock}>
            <textarea ref={txtArea}
                onChange={onTxtAreaChange}
                value={props.CurrentPostText}
                placeholder='Write text of your post'>
            </textarea>
            <br />
            <button onClick={addPost}>Create Post</button>
        </div>
    );
};



export default AddPost;