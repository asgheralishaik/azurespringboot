import React from "react";
import {Modal, Button, Form, Col, InputGroup} from "react-bootstrap";
import * as yup from 'yup';
import {Formik} from "formik";

const schema = yup.object({
	name: yup.string().required(),
	lastname: yup.string().required(),
	email: yup.string().email().required(),
	profesion: yup.string().required()
});

const CreateOrUpdateUserModal = (props) => {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					User Form
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					validationSchema={schema}
					onSubmit={(values) => {
						values.nombre = values.name;
						values.apellido = values.lastname;
						const URL = "http://arsene.azurewebsites.net/User/";
						fetch(props.currentUser.id ? URL + props.currentUser.id : URL, {
							method: !props.currentUser.id ? "POST" : (props.currentUser.action === "update" ? "PUT" : "DELETE"),
							body: JSON.stringify(values),
							headers: {
								'Content-Type': 'application/json'
								// 'Content-Type': 'application/x-www-form-urlencoded',
							}
						}).then(function (response) {
							return response.json();
						}).then(function (data) {
							const actionType = !props.currentUser.id ? "create" : props.currentUser.action;
							props.onHide(data, actionType, props.currentUser);
						});
					}}
					initialValues={{
						...props.currentUser
					}}
				>
					{({
							handleSubmit,
							handleChange,
							handleBlur,
							values,
							touched,
							isValid,
							errors,
						}) => (
						<Form noValidate onSubmit={handleSubmit}>
							<Form.Row>
								<Form.Group as={Col} md="6" controlId="validationFormik01">
									<Form.Label>First name</Form.Label>
									<Form.Control
										type="text"
										name="name"
										value={values.name}
										onChange={handleChange}
										isInvalid={!!errors.name}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.name}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="6" controlId="validationFormik02">
									<Form.Label>Last name</Form.Label>
									<Form.Control
										type="text"
										name="lastname"
										value={values.lastname}
										onChange={handleChange}
										isInvalid={!!errors.lastname}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.lastname}
									</Form.Control.Feedback>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} md="6" controlId="validationFormik01">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="text"
										name="email"
										value={values.email}
										onChange={handleChange}
										isInvalid={!!errors.email}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.email}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="6" controlId="validationFormik01">
									<Form.Label>Profession</Form.Label>
									<Form.Control
										type="text"
										name="profesion"
										value={values.profesion}
										onChange={handleChange}
										isInvalid={!!errors.profesion}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.profesion}
									</Form.Control.Feedback>
								</Form.Group>
							</Form.Row>
							<Button type="submit"
											variant={props.currentUser.action === "delete" ? "danger" : "primary"}>
								{props.currentUser.action === "delete" ? "Delete" : (props.currentUser.action === "update" ? "Update" : "Create")}
							</Button>
						</Form>
					)}
				</Formik>
			</Modal.Body>
			{/*<Modal.Footer>*/}
			{/*	<Button onClick={props.onHide}>Close</Button>*/}
			{/*</Modal.Footer>*/}
		</Modal>
	);
}

export default CreateOrUpdateUserModal;
