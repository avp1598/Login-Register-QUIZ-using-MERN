// frontend/src/components/Modal.js

import React, { Component } from "react";
import {Button,Form,FormGroup,Input,Label} from "reactstrap";
import {Redirect} from 'react-router-dom';
import axios from "axios";

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state={
            redirect:false,
            isauthenticated: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
      }

    handleLogin(event) {
        event.preventDefault();

        var message={
            "username":this.l_username.value,
            "password":this.l_password.value
        }
        axios
        .post("https://localhost:3443/users/login",message)
        .then(res => {
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",this.l_username.value);
            this.setState(() => ({
                isauthenticated: true
              }));
        })
        .catch(err => alert("Wrong username/password"));

    }
    handleRegister(event){
        event.preventDefault();
        var message={
            "username":this.username.value,
            "password":this.password.value,
            "mail":this.mail.value
        }
        axios
        .post("https://localhost:3443/users/signup",message)
        .then(res => alert(res.data.status))
        .catch(err => alert(err.response.data.err.message));

        this.setState(() => ({
            redirect: true
          }));

    }
    

    render() {
        if (this.state.redirect) {
            return(<Redirect to="/home" />)
        }
        if(this.state.isauthenticated){
            return(<Redirect to = {`/users/${this.l_username.value}`} />)
        }
        return (
            <div className ="row">
                <div className="col-sm-5">
                    < p className="text-white bg-dark">Registered users login here</p>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                        <Label for="Username">Username</Label>
                        <Input type="text" name="username" placeholder="Enter username" innerRef={(input) => this.l_username = input}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" placeholder="Enter password" innerRef={(input) => this.l_password = input}/>
                        </FormGroup>
                        <Button variant="primary" type="submit">
                        Submit
                        </Button>
                    </Form>
                </div>
                <div className="col-sm-5 ml-auto">
                    <p className="text-white bg-dark">New users register here</p>
                    <Form onSubmit={this.handleRegister}> 
                        <FormGroup>
                        <Label for="Username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="Enter username" innerRef={(input) => this.username = input}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="Username">Email-ID</Label>
                        <Input type="text" name="mail" id="mail" placeholder="Enter Email-ID" innerRef={(input) => this.mail = input}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="password">password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter password"  innerRef={(input) => this.password = input}/>
                        </FormGroup>
                        <Button variant="primary" type="submit">
                        Register
                        </Button>
                    </Form>
                </div>
            </div>
    );
  }
}