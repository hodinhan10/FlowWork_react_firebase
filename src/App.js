import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { changeBackground, changePhoto, getPhotosList } from './actions';
import Board from './components/Board/Board';
import BoardCollection from './components/BoardCollection/BoardCollection';
import TrelloNav from './components/Navbar/TrelloNav';
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword'
import LandingHeader from './components/LandingHeader'
import Profile from './components/Navbar/profile'
function App(props) {

  const { isAuthenticated, isLoading } = props.auth;

  useEffect(() => {
    document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.width = '100vl';
    document.body.style.height = '100vh';

    props.getPhotosList("ocean");
  }, []);
  if (isAuthenticated)
        return (
          <Router>
          <TrelloNav isAuthenticated={isAuthenticated} isLoading={isLoading} />
          <Switch>
            <ProtectedRoute
              exact path="/"
              component={BoardCollection}
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
            <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
            
            <Route path="/profile" component={Profile}isAuthenticated={isAuthenticated} isLoading={isLoading}/>
            <Route path="/board/:id" component={Board} isAuthenticated={isAuthenticated} isLoading={isLoading} />
          </Switch>
        </Router>
        );
        else
        return (
            <Router>
                <Route
                    path="/"
                    render={(props) => {
                        const { pathname } = props.location;
                        if (pathname === "/signin" || pathname === "/signup")
                            return <TrelloNav isAuthenticated={isAuthenticated} isLoading={isLoading} />;
                        return <LandingHeader />;
                    }}
                />
                <Switch>
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/reset-password" component={ResetPassword}/>
                </Switch>
                
            </Router>
        );
}

const mapStateToProps = state => ({
  theme: state.theme,
  auth: state.auth,
});

export default connect(mapStateToProps, { changeBackground, changePhoto, getPhotosList })(App);
