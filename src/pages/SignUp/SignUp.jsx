import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "../../../node_modules/@material-ui/core";

import LoginContext from "./../../contexts/LoginContext";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

const postData = (url = ``, data = {}) => {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
    .then(response => response.json()) // parses response to JSON
    .catch(error => console.error(`Fetch Error =\n`, error));
};

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    passwordConfirm: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = toggleLogin => {
    if (this.state.password === this.state.passwordConfirm) {
      const newUser = {
        username: this.state.username,
        password: this.state.password
      };
      postData(`https://kettlecat-graphql.herokuapp.com/register`, newUser)
        .then(data => toggleLogin(data)) // JSON from `response.json()` call
        .catch(error => console.error(error));
    } else {
      // TODO improve and maybe display a notification
      console.log("passwords dont match");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <form>
        <TextField
          id="name"
          label="Username"
          className={classes.textField}
          value={this.state.username}
          onChange={this.handleChange("username")}
          margin="normal"
        />
        <TextField
          id="password-input"
          label="Password"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange("password")}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <TextField
          id="password-confirmation"
          label="Password Confirmation"
          className={classes.textField}
          value={this.state.passwordConfirm}
          onChange={this.handleChange("passwordConfirm")}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <LoginContext.Consumer>
          {({ toggleLogin }) => (
            <Button
              onClick={() => {
                this.handleSubmit(toggleLogin);
              }}
            >
              Sign Up
            </Button>
          )}
        </LoginContext.Consumer>
      </form>
    );
  }
}

export default withStyles(styles)(SignUp);
