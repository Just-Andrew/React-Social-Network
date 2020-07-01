import React from 'react'
import { Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import MessagesPage from './Components/Content/MessagesPage/MessagesPage'
import './App.css'
import UsersPageContainer from './Components/Content/UsersPage/UsersPageContainer'
import ProfileContainer from './Components/Content/Profile/ProfileContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import LoginPage from './Components/LoginPage/LoginPage'
import { initialize } from './Redux/appReducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Preloader from './Components/Preloader/Preloader'

class App extends React.Component {
  componentDidMount() {
    this.props.initialize()
  }

  render() {
    return (
      <div className="App-wrapper" >
        <HeaderContainer />
        <Navbar />
        {this.props.initialization
          ? <>
            <Route path="/profile/:id?"
              render={() => <ProfileContainer />} />

            <Route path="/friends"
              render={() => <UsersPageContainer friend={true} title='People You added' />} />

            <Route path="/dialogs"
              render={() => <MessagesPage />} />

            <Route path="/users"
              render={() => <UsersPageContainer friend={false} title='All registered users' />} />

            <Route path="/login"
              render={() => <LoginPage />} />
          </>

          : <Preloader />}
      </div>
    )
  }
}

let mapStateToProps = state => ({
  initialization: state.app.finishedInitialization
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initialize })
)(App)
