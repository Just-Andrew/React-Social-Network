import React, { useEffect, useState } from "react"
import styles from "./Posts.module.css"
import NoPhotoImg from "../../../assets/Pictures/NoPhotoImg.jpg"
import like from "../../../assets/Pictures/like.png"
import { connect } from "react-redux"

const Post = (props) => {
  return (
    <div className={styles.post} key={props.id}>
      <div className={styles.avatar}>
        <img src={props.avatar === null ? NoPhotoImg : props.avatar} alt="" />
      </div>

      <div className={styles.postTextContainer}>
        <div className={styles.posttext}>{props.text}</div>
      </div>
      <hr />
      <div className={styles.likes}>
        <img src={like} alt="" />
        <b> {props.likes} </b>
      </div>
    </div>
  )
}

const Posts = (props) => {
  let [posts, setPosts] = useState(props.posts)

  useEffect(() => {
    setPosts(props.posts)
  }, props.posts)

  let Posts =  posts.map((p) => (
    <Post id={p._id} avatar={props.avatar} likes={p.likes} text={p.text} key={p._id} />
  ))

  return (
    <div>
      <div className={styles.title}>
        {posts.length !== 0 ? <b> Posts </b> : <i>This user hasn't posted anything yet</i>}

      </div>
      <div className={styles.PostsBlock}>
        <div className={styles.posts}>{Posts}</div>
      </div>
    </div>
  )
}

let mapStateToProps = (state) => ({
  avatar: state.profile.avatar,
})

export default connect(mapStateToProps, {})(Posts)
