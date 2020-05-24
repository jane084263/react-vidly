import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import auth from "./services/authService";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import Profile from "./components/profile";
import Game from "./components/sudoku/game";
import ProtectedRoute from "./components/common/protectedRoutes";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    let user = auth.getCurrentUser();
    if (user)
      this.setState({
        user,
      });
  }
  render() {
    const user = this.state.user;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => (
                <Movies {...props} user={this.state.user}></Movies>
              )}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/profile" component={Profile} />
            <Route path="/logout" component={Logout} />
            <Route path="/sudoku" component={Game} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
