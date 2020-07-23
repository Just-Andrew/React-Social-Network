import AddPost from './AddPost'
import { createPost } from '../../../Redux/profileReducer'
import { connect } from 'react-redux'

let mapStateToProps = state => {
    return {
        CurrentPostText: state.profile.CurrentPostText,
        currentUserId: state.profile.currentUserId
    }
}

let AddPostContainer = connect(mapStateToProps,
    { createPost })(AddPost)

export default AddPostContainer