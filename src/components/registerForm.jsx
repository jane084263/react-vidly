import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "./../services/userService";
import auth from "./../services/authService";
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    // Call the server
    const inputParams = this.state.data;
    register(inputParams)
      .then((res) => {
        let token = res.headers["x-auth-token"];
        auth.loginWithJwt(token);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
