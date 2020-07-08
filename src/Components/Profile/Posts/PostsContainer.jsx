import {connect} from 'react-redux';
import Posts from './Posts';

let mapStateToProps = state =>  ({ posts: state.profile.posts });

let  mapDispatchToProps = dispatch => ({});

let PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;