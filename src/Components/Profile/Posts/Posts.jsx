import React from 'react'
import styles from './Posts.module.css'
import NoPhotoImg from '../../../assets/Pictures/NoPhotoImg.jpg'
import { connect } from 'react-redux';

const Posts = props => {

    let posts = props.posts.map(p =>
        <div className={styles.post} key={p.id}>
            <div className={styles.avatar} >
                <img src={props.avatar === null ? NoPhotoImg : props.avatar} alt='' />
            </div>

            <div className={styles.post}>
                <div className={styles.posttext}>
                    {p.text}
                </div>
                <div className={styles.likes}>
                    <img src='https://img2.freepng.ru/20180328/vuw/kisspng-blue-drawing-pin-computer-icons-bulletin-board-cli-like-5abc3127c992d3.5802419715222827918257.jpg' alt='' />
                    <b> {p.likes} </b>
                </div>
            </div>
        </div>
    )

    /* logic for making his own post for each user based on theit aboutMe value */
    /*  let post = null
     if (props.text !== null) {
         post = <div className={styles.post} >
             <div className={styles.avatar} >
                 <img src={props.avatar === null ? NoPhotoImg : props.avatar} alt='' />
             </div>
 
             <div className={styles.post}>
                 <div className={styles.posttext}>
                     {props.text}
                 </div>
                 <div className={styles.likes}>
                     <img src='https://img2.freepng.ru/20180328/vuw/kisspng-blue-drawing-pin-computer-icons-bulletin-board-cli-like-5abc3127c992d3.5802419715222827918257.jpg' alt='' />
                     <b> {0} </b>
                 </div>
             </div>
         </div>
     } */

    return (
        <div >
            <div className={styles.title}>  <b> Posts </b> </div>
            <div className={styles.PostsBlock}>
                <div className={styles.posts}>
                    {/*  {post} */}
                    {posts}
                </div>
            </div>
        </div>
    );
}

let mapStateToProps = state => ({
    avatar: state.profile.avatar
})

export default connect(mapStateToProps, {})(Posts)