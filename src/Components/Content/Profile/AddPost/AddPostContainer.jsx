import AddPost from './AddPost';
import { addPost, changeCurrentPostText } from '../../../../Redux/profileReducer'
import { connect } from 'react-redux';

let mapStateToProps = state => {
    return {
        CurrentPostText: state.profile.CurrentPostText
    }
}

let AddPostContainer = connect(mapStateToProps,
    { addPost, changeCurrentPostText })(AddPost);

export default AddPostContainer;