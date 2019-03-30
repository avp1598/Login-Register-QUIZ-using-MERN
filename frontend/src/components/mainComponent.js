import Login from "./loginComponent";
import Header from "./headerComponent";
import User from "./userComponent"
import React, { Component } from 'react';
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';

class Main extends Component{
    render(){

        const Userwithid=({match})=>{
            return(
                <User user={match.params.userid}/>
            )
        }
        var msg="";
        if(this.props.location.state && this.props.location.state.auth===0) msg="UnAuthorized please login";
        else if(this.props.location.state && this.props.location.state.auth===2) msg="Logged out";
        return(
            <div>
                <Header />
                <Switch location={this.props.location}>
                    <Route exact path='/home' component={() => <Login />} />
                    <Route path='/:userid' component={Userwithid} />
                    <Redirect to="/home" />
                </Switch>
                <p className="text-danger lg">{msg}</p>
            </div>
        );
        
    }
}
export default withRouter((Main));