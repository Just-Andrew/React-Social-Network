import { connect } from 'react-redux';
import Contacts from './Contacts';

let mapStateToProps = state => ({ contacts: state.messagesPage.contacts });

let ContactsContainer = connect(mapStateToProps, {})(Contacts);


export default ContactsContainer;