import React from 'react';
import {
	Container,
	Row,
	Col
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import UsersList from "./UsersList";

function App() {
	return (
		<React.Fragment>
			<Header/>
			<UsersList/>
		</React.Fragment>
	);
}

export default App;
