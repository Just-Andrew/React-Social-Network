import React, { useEffect, Suspense } from 'react'
import { Route } from 'react-router-dom'
import Navbar from './Components/common/Navbar/Navbar'
import './App.css'
import UsersPageContainer from './Components/UsersPage/UsersPageContainer'
import ProfileContainer from './Components/Profile/ProfileContainer'
import HeaderContainer from './Components/common/Header/HeaderContainer'
import { initialize } from './Redux/appReducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Preloader from './Components/common/Preloader/Preloader'
import EditProfile from './Components/EditProfile/EditProfile'
//import MessagesPage from './Components/Content/MessagesPage/MessagesPage'
//import LoginPage from './Components/LoginPage/LoginPage'
const MessagesPage = React.lazy(() => import('./Components/MessagesPage/MessagesPage'))
const LoginPage = React.lazy(() => import('./Components/LoginPage/LoginPage'))

const App = props => {
  useEffect(() => {
    if (props.initialization === false) {
      props.initialize()
    }
  })

  return (
    <div className="App-wrapper" >
      <HeaderContainer />
      <Navbar />
      {props.initialization
        ? <>
          <Route path="/profile/:id?"
            render={() => <ProfileContainer />} />

          <Route path="/friends"
            render={() => <UsersPageContainer friend={true} title='People You added' />} />

          <Suspense fallback={<Preloader />}>
            <Route path="/dialogs"
              render={() => <MessagesPage />} />
            <Route path="/login"
              render={() => <LoginPage />} />
            <Route path="/editProfile"
              render={() => <EditProfile />} />
          </Suspense >

          <Route path="/users"
            render={() => <UsersPageContainer friend={false} title='All registered users' />} />

        </>
        : <Preloader />}
    </div>
  )
}

let mapStateToProps = state => ({
  initialization: state.app.finishedInitialization
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initialize })
)(App)
