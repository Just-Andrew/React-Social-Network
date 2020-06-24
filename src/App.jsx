import React from 'react';
import { Route, BrowserRouter } from "react-router-dom"
import Navbar from './Components/Navbar/Navbar';
import MessagesPage from './Components/Content/MessagesPage/MessagesPage';
import './App.css';
import UsersPageContainer from './Components/Content/UsersPage/UsersPageContainer';
import ProfileContainer from './Components/Content/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';

const App = () => {

  return (
    <BrowserRouter >
      <div className="App-wrapper">
        <HeaderContainer />

        <Navbar />

        <Route path="/profile/:id?"
          render={() =>
            <ProfileContainer />} />

        <Route path="/friends"
          render={() => <UsersPageContainer friend={true} title='People You added' />} />

        <Route path="/dialogs"
          render={() => <MessagesPage />} />

        <Route path="/users"
          render={() => <UsersPageContainer friend={false} title='All registered users' />} />

      </div>
    </BrowserRouter>
  );
}

export default App;
