import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "./../services/authService";
import { toast } from "react-toastify";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    // Call the server
    const { username: email, password } = this.state.data;
    await auth.login(email, password);
    window.location = "/";
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
