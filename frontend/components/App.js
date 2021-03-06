import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';

import AsyncComponent from 'lib/AsyncComponent';

import Header from 'components/modules/Header';
import Footer from 'components/modules/Footer';

import Home   from 'components/Home/Home';
import About  from 'components/Home/About';
import TermsOfService from 'components/Home/TermsOfService';
import Admin  from 'components/Admin/Admin';
import Login  from 'components/Auth/Login';
import Logout from 'components/Auth/Logout';
import Job    from 'components/Job/Job';
import Signup from 'components/Profile/Signup';
import ForgotPassword from 'components/Profile/ForgotPassword';
import ResetPassword from 'components/Profile/ResetPassword';
import EditAccount from 'components/Profile/EditAccount';

import UserModel from 'models/UserModel';


class App extends AsyncComponent {

  state = {
    user: {},
    loading: true
  };

  userModel = new UserModel();

  setUser = (user) => {
    let userLevel = 0;
    if(user && user.userLevelId) {
      userLevel = user.userLevelId;
    }

    return this.setStateAsync({
      user: user,
      userLevel: userLevel,
      loading: false
    });
  }

  refresh = (response) =>  {
    return this.userModel.getCurrent()
    .then( data => {
      return this.setUser(data);
    })
    .catch( error => {
      return this.setUser({});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        {!this.state.loading && <Router>
          <div>
            <Header
              userLevel={this.state.userLevel}
            />
            <main role="main" className="container main">
              <PropsRoute exact path="/" component={Home}
                user={this.state.user}
                refresh={this.refresh}
              />

              <PropsRoute exact path="/about/" component={About}/>

              <PropsRoute exact path="/tos/" component={TermsOfService}/>

              <PublicRoute path="/login/" component={Login}
                authed={this.state.user.userLevelId}
                redirectTo="/"
                refresh={this.refresh}
              />

              <PublicRoute path="/signup/" component={Signup}
                authed={this.state.user.userLevelId}
                redirectTo="/"
                refresh={this.refresh}
              />

              <PublicRoute path="/forgotpassword/" component={ForgotPassword}
                authed={this.state.user.userLevelId}
                redirectTo="/"
                refresh={this.refresh}
              />

              <PublicRoute path="/resetpassword/:token?" component={ResetPassword}
                authed={this.state.user.userLevelId}
                redirectTo="/"
                refresh={this.refresh}
              />

              <PrivateRoute path="/logout/" component={Logout}
                authed={this.state.user.userLevelId}
                redirectTo="/"
                refresh={this.refresh}
              />

              <PrivateRoute path="/account/" component={EditAccount}
                authed={this.state.user.userLevelId}
                user={this.state.user}
                refresh={this.refresh}
              />

              <PrivateRoute path="/job/:id" component={Job}
                authed={this.state.user.userLevelId}
                redirectTo="/login/"
              />

              <PrivateRoute path="/admin/" component={Admin}
                authed={this.state.user.userLevelId >= 2}
                redirectTo="/login/"
              />

            </main>
            <Footer />
          </div>
        </Router>}
        {this.state.loading && <section>Loading...</section>}
      </div>
    );
  }
}

export default App;
