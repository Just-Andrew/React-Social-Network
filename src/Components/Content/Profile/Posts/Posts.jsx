import React from 'react';
import styles from "./Posts.module.css";

const Posts = (props) => {
    /* Creating posts from received data */
    let posts = props.posts.map(p => {
        return (
            <div className={styles.post} key={p.id}>

                <div className={styles.avatar} >
                    <img src='https://avatars.mds.yandex.net/get-zen_doc/1538903/pub_5de7ba698d5b5f00b251d2e7_5de8721cfe289100b0b4a9f5/scale_1200' />
                </div>

                <div className={styles.post}>
                    <div className={styles.posttext}>
                        {p.text}
                    </div>
                    <div className={styles.likes}>
                        <img src='https://img2.freepng.ru/20180328/vuw/kisspng-blue-drawing-pin-computer-icons-bulletin-board-cli-like-5abc3127c992d3.5802419715222827918257.jpg' />
                        <b> {p.likes} </b>
                    </div>
                </div>
            </div>
        );
    });



    /* component itself */
    return (
        <div >
            <div className={styles.tittle}>  <b> My posts </b> </div>
            <div className={styles.PostsBlock}>

                <div className={styles.posts}>
                    {posts}
                </div>
            </div>
        </div>
    );
}

export default Posts;