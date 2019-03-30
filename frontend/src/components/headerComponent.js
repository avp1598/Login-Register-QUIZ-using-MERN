import React, { Component } from 'react';
import { Navbar,Jumbotron } from 'reactstrap';


class Header extends Component {
    render() {
        return(
            <div>
                <Navbar dark expand="md">
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>A la Authenticate </h1>
                                <p>We Authenticate your credentials!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default Header;