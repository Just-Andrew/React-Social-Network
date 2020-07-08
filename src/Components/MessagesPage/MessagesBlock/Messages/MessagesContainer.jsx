import { connect } from "react-redux";
import Messages from "./Messages";

let mapStateToProps = state => {
    return {
        messages: state.messagesPage.messages
    }
}


let MessagesContainer = connect(mapStateToProps, {})(Messages);

export default MessagesContainer;