import { connect } from "react-redux";
import { addMessage,} from '../../../../../Redux/messagesPageReducer';
import SendMessage from './SendMessage';


let mapStateToProps = state => {
    return {
    }
}

let SendMessageContainer = connect(mapStateToProps,{ addMessage})(SendMessage);

export default SendMessageContainer;