import Login from "./loginComponent";
import Header from "./headerComponent";
import User from "./userComponent"
import React, { Component } from 'react';
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';
import TakeTest from "./takeTestComponent";

class Main extends Component{
    render(){

        const Userwithid=({match})=>{
            return(
                <User user={match.params.userid}/>
            )
        }
        const TakeTestId=({match})=>{
            return(
                <TakeTest testid={match.params.testid}/>
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
                    <Route exact path='/users/:userid' component={Userwithid} />
                    <Route exact path='/users/:userid/:testid' component={TakeTestId} />
                    <Redirect to="/home" />
                </Switch>
                <p className="text-danger lg">{msg}</p>
            </div>
        );
        
    }
}
export default withRouter((Main));