import React, {useState, useEffect} from 'react';
import {Table, Alert, Button, Container} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

import CreateOrUpdateUserModal from "./CreateOrUpdateUser";

export default () => {
	const [data, setData] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [hasErrors, setHasErrors] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [modalShow, setModalShow] = React.useState(false);

	const onModalHide = (newUser, action, currentUser) => {
		if (action === "create") {
			data.push(newUser);
		}
		if (action === "update") {
			const index = data.findIndex((obj) => obj.id === currentUser.id);
			if (index > -1) {
				data[index] = newUser;
			}
		}
		if (action === "delete") {
			const index = data.findIndex((obj) => obj.id === currentUser.id);
			if (index > -1) {
				data.splice(index, 1);
			}
		}
		setModalShow(false);
	}
	useEffect(() => {
		const fetchData = async () => {
			fetch("http://arsene.azurewebsites.net/User")
				.then(res => res.json())
				.then(res => {
					if (res && Array.isArray(res)) {
						setData(res);
					}
					setIsLoading(false);
					setHasErrors(false);
				})
				.catch(() => {
					setHasErrors(true);
					setIsLoading(false);
				});
		}

		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className="loader"/>
		);
	}

	if (hasErrors) {
		return (
			<Alert variant="danger" className="Error">
				Oops, something went wrong, please try again later
			</Alert>
		)
	}

	return (
		<Container>
			<div className="UsersListHeading">
				<h4>Users List</h4>
				<Button type="success" onClick={() => {
					setModalShow(true);
					setCurrentUser({});
				}}>Add user</Button>
			</div>
			<Table striped bordered hover className="UsersListTable">
				<thead>
				<tr>
					<th>#Id</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Profesion</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{
					data.map((user, index) => (
						<tr key={index}>
							<td>{user.id}</td>
							<td>{user.nombre}</td>
							<td>{user.apellido}</td>
							<td>{user.email}</td>
							<td>{user.profesion}</td>
							<td>
								<div className="UserActions">
									<FontAwesomeIcon style={{
										cursor: "pointer"
									}} icon={faUserEdit} onClick={() => {
										setModalShow(true);
										setCurrentUser({
											...user,
											action: "update"
										});
									}}/>
									<FontAwesomeIcon icon={faTrash} onClick={() => {
										setModalShow(true);
										setCurrentUser({
											...user,
											action: "delete"
										});
									}}/>
								</div>
							</td>
						</tr>
					))
				}
				</tbody>
			</Table>
			<CreateOrUpdateUserModal
				show={modalShow}
				onHide={onModalHide}
				currentUser={currentUser}
			/>
		</Container>
	)
}

