import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Components/common/Navbar/Navbar'
import 'antd/dist/antd.css'
import './App.css'
import UsersPageContainer from './Components/UsersPage/UsersPageContainer'
import ProfileContainer from './Components/Profile/ProfileContainer'
import HeaderContainer from './Components/common/Header/HeaderContainer'
import MessagesPage from './Components/MessagesPage/MessagesPage'
import LoginPage from './Components/LoginPage/LoginPage'
import { initialize } from './Redux/appReducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Preloader from './Components/common/Preloader/Preloader'
import EditProfile from './Components/EditProfile/EditProfile'
import Page404 from './Components/Page404/Page404'
import NewsPage from './Components/NewsPage/NewsPage'

const App = props => {
  useEffect(() => {
    if (props.initialization === false) {
      props.initialize()
    }
  }, [props.initialization])

  return (
    <div className="App-wrapper" >
      <HeaderContainer />
      <Navbar />
      {props.initialization
        ? <>
          <Switch>
            <Route exact path="/"
              render={() => <Redirect to={props.isAuth ? `/profile/${props.myId}` : `/login`} />} />
            <Route path="/profile/:id?"
              render={() => <ProfileContainer />} />
            <Route path="/news"
              render={() => <NewsPage/>} />
            <Route path="/dialogs"
              render={() => <MessagesPage />} />
            <Route path="/login"
              render={() => <LoginPage />} />
            <Route path="/editProfile"
              render={() => <EditProfile />} />
            <Route path="/friends"
              render={() => <UsersPageContainer friend={true} title='People You added' />} />
            <Route path="/users"
              render={() => <UsersPageContainer friend={false} title='All registered users' />} />
            <Route
              render={() => <Page404 />} />
          </Switch>
        </>
        : <Preloader />}
    </div>
  )
}

let mapStateToProps = state => ({
  initialization: state.app.finishedInitialization,
  isAuth: state.authorization.isAuth,
  myId: state.authorization.myId
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initialize })
)(App)
