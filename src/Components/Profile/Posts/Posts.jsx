import React, { useEffect, useState } from 'react'
import styles from './Posts.module.css'
import NoPhotoImg from '../../../assets/Pictures/NoPhotoImg.jpg'
import deleteIcon from '../../../assets/Pictures/delete_icon.png'
import optionsIcon from '../../../assets/Pictures/options_icon.png'
import like from '../../../assets/Pictures/like.png'
import { connect } from 'react-redux'
import { removePost, updatePost } from '../../../Redux/profileReducer'
import { Button, Menu, Dropdown } from 'antd'
import { useForm } from 'react-hook-form'


const Post = props => {
  const [editMode, setEditMode] = useState(false)
  const [postText, setPostText] = useState(props.text)
  const { register, handleSubmit, errors } = useForm()

  const toggleEditMode = val => {
    setEditMode(val)
  }

  const deletePost = id => {
    props.removePost(id)
  }

  const updatePost = data => {
    toggleEditMode(false)
    props.updatePost(props.id, data.text)
  }

  const onInputChange = e => {
    setPostText(e.currentTarget.value)
  }

  const stopSubmit = e => {
    e.preventDefault()
    toggleEditMode(false)
  }

  const menu = <Menu>
    <Menu.Item>
      <Button onClick={() => toggleEditMode(true)}>‏‏‎ ‏‏‎ ‎‎Edit post‏‏‎ ‏‏‎ ‎‎</Button>
    </Menu.Item>
    <Menu.Item>
      <Button onClick={() => {
        deletePost(props.id)
      }}>Delete post</Button>
    </Menu.Item>
  </Menu>

  return (
    <div className={styles.post} key={props.id}>
      <div className={styles.avatar}>
        <img src={props.avatar === null ? NoPhotoImg : props.avatar} alt="" />
      </div>
      <div className={styles.postTextContainer}>
        {!editMode
          ? <div className={styles.posttext}>{props.text}</div>
          : <>
            <form onSubmit={handleSubmit(updatePost)}>
              <textarea className={styles.postInput}
                value={postText}
                onChange={onInputChange}
                autoFocus
                name="text"
                ref={register({ minLength: 4, required: true })} />
              <button className={styles.formBtn}>Apply Changes</button>
              <button onClick={stopSubmit} className={styles.formBtn}>Cancel</button>
            </form>

          </>
        }
      </div>
      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <div className={styles.optionsBtn} >
          <img src={optionsIcon} alt="" />
        </div>
      </Dropdown>
      <hr />
      <div>
        <div className={styles.likes}>
          <img src={like} alt="" />
          <b> {props.likes} </b>
        </div>
        <div className={styles.postedOn}>
          {props.editedOn === null
            ? <> Posted < i > {props.postedOn}</i> </>
            : <> Edited < i > {props.editedOn}</i> </>
          }
        </div>
      </div>
    </div>
  )
}


const Posts = (props) => {
  let [posts, setPosts] = useState(props.posts)

  useEffect(() => {
    setPosts(props.posts)
  }, [props.posts])

  let Posts = posts.map((p) => (
    <Post id={p._id}
      avatar={props.avatar}
      likes={p.likes} text={p.text}
      key={p._id}
      removePost={props.removePost}
      updatePost={props.updatePost}
      postedOn={p.postedOn}
      editedOn={p.editedOn} />
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
  posts: state.profile.posts
})

export default connect(mapStateToProps, { removePost, updatePost })(Posts)
