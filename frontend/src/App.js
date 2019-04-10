// frontend/src/App.js

import React, { Component } from "react";
//import axios from "axios";
import {BrowserRouter} from 'react-router-dom'
import Main from "./components/mainComponent"
import './App.css'

class App extends Component {
  	render(){
		return(
			<div>
			<BrowserRouter>
				<div className="App">
				<Main />
				</div>
			</BrowserRouter>
			</div>
    	)
  }
}

export default App;