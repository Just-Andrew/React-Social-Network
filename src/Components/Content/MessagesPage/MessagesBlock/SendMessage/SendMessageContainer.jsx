import { connect } from "react-redux";
import { addMessage, changeCurrentMessageText } from '../../../../../Redux/messagesPageReducer';
import SendMessage from './SendMessage';


let mapStateToProps = state => {
    return {
        CurrentMessageText: state.messagesPage.CurrentMessageText
    }
}

let SendMessageContainer = connect(mapStateToProps,
    { addMessage, changeCurrentMessageText })(SendMessage);

export default SendMessageContainer;