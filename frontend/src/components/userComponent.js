import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {Button} from "reactstrap";

class User extends Component {
    _isMounted = false;

    constructor(props){
        super(props)

        this.state={
            isAuthenticated:null
        }
        this.logout=this.logout.bind(this);
    }

    componentDidMount(){
        this._isMounted = true;
        const token=localStorage.getItem("token");
        //alert(token);
        axios
        .get(`https://localhost:3443/users/${this.props.user}`,{ headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            if (this._isMounted){
            this.setState(() => ({
                isAuthenticated:1
              }));
            }
        })
        .catch(err => {
            this.setState(() => ({
                isAuthenticated:0
              }));
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
      }

    logout(){
        localStorage.setItem("token","");
        this.setState(() => ({
            isAuthenticated:2
          }));
    }
    render() {
        if(this.state.isAuthenticated===0 || this.state.isAuthenticated===2) return(<Redirect to={{
            pathname:'/home',
            state: {auth:this.state.isAuthenticated}
        }}/>)
        return(
            <div>
                Hello {this.props.user}<br/>
                <Button outline color="danger" onClick={this.logout}>Log-out</Button>
            </div>
        );
    }
}

export default User;