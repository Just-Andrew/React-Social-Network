import AddPost from './AddPost';
import { addPost } from '../../../../Redux/profileReducer'
import { connect } from 'react-redux';

let mapStateToProps = state => {
    return {
        CurrentPostText: state.profile.CurrentPostText
    }
}

let AddPostContainer = connect(mapStateToProps,
    { addPost })(AddPost);

export default AddPostContainer;