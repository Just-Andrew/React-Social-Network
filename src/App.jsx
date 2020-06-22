import React from 'react';
import { Route, BrowserRouter } from "react-router-dom"
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Content/Profile/Profile';
import MessagesPage from './Components/Content/MessagesPage/MessagesPage';
import './App.css';
import UsersPageContainer from './Components/Content/UsersPage/UsersPageContainer';


function App(props) {

  return (
    <BrowserRouter >
      <div className="App-wrapper">
        <Header />

        <Navbar />

        <Route exact path="/"
          render={() => 
          <Profile />} />
          

        <Route  path="/profile/id"
          render={() => 
          <div> ff
          <Profile />
          </div>} />

        <Route path="/dialogs"
          render={() => <MessagesPage />} />

        <Route path="/users"
          render={() => <UsersPageContainer />} />

      </div>
    </BrowserRouter>
  );
}

export default App;
