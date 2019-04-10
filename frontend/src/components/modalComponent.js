import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

	toggle() {
		this.setState(prevState => ({
		modal: !prevState.modal
		}));
  }

render() {
    if(!this.props.testover){
		return (
			<div>
			<Modal isOpen={this.state.modal && this.props.view} toggle={this.toggle} className={this.props.className}>
			<ModalHeader toggle={this.toggle}>Test Instructions</ModalHeader>
			<ModalBody>
				These questions can have any number of answers <br/>
				also there can be any number of correct answers<br/>
				Please answer carefully<br/>
				Good luck
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={this.props.loadTest}>Load Test</Button>{' '}
				<Button color="secondary" onClick={this.toggle}>Cancel</Button>
			</ModalFooter>
			</Modal>
		</div>
		);
	}
	else{
		let user=localStorage.getItem("user");
		let url = window.location.pathname;
		return (
			<div>
			<Modal isOpen={this.state.modal && this.props.view} toggle={this.toggle} className={this.props.className}>
			<ModalHeader toggle={this.toggle}>Result</ModalHeader>
			<ModalBody>
				Your Final Score:{this.props.score*100}%<br/>
				Nice try
			</ModalBody>
			<ModalFooter>
				<Link to={`${url}`}>Re take</Link>
				<Link to={`/users/${user}`}>Back</Link>
			</ModalFooter>
			</Modal>
		</div>
		);
	}
	
  }
}

export default ModalExample;