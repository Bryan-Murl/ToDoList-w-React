import React, { useState } from "react";
import PropTypes from "prop-types";

Form.propTypes = {
	inputValue: PropTypes.string,
	setInputValue: PropTypes.func,
	setTodos: PropTypes.func,
	todos: PropTypes.array
};

function Form(props) {
	const inputTextValue = e => {
		props.setInputValue(e.target.value);
	};

	const submitTodo = e => {
		if (props.inputValue === "") {
			alert("write down a task");
		} else {
			e.preventDefault();
			props.setTodos([
				...props.todos,
				{
					text: props.inputValue,
					id: props.todos.length
					// id: Math.floor(Math.random() * 1000)
				}
			]);
			props.setInputValue("");
		}
	};
	return (
		<div className="input-group">
			<input
				className="form-control"
				type="text"
				onChange={inputTextValue}
				value={props.inputValue}
			/>
			<button className="btn btn-secondary" onClick={submitTodo}>
				<i className="fas fa-plus-circle"></i>
			</button>
		</div>
	);
}
TodoList.propTypes = {
	todos: PropTypes.array,
	setTodos: PropTypes.func
};

function TodoList(props) {
	return (
		<ul className="list-group">
			{props.todos.map(todo => (
				<ListItem
					text={todo.text}
					key={todo.id}
					setTodos={props.setTodos}
					todos={props.todos}
					todo={todo}
				/>
			))}
		</ul>
	);
}
ListItem.propTypes = {
	text: PropTypes.string,
	id: PropTypes.number,
	setTodos: PropTypes.func,
	todos: PropTypes.array,
	todo: PropTypes.object
};

function ListItem(props) {
	const deleteTask = () => {
		props.setTodos(
			props.todos.filter(element => element.id !== props.todo.id)
		);
	};
	return (
		<li
			key={props.id}
			className="form-control d-flex justify-content-between align-items-center">
			{props.text}
			<button
				onClick={deleteTask}
				type="button"
				className="btn btn-outline-danger btn-sm float right delete"
				aria-label="Close">
				<i className="fas fa-times"></i>
			</button>
		</li>
	);
}

//create your first component
export function Home() {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="d-flex justify-content-center">
						<h1>To Do's List</h1>
					</div>
					<Form
						todos={todos}
						setTodos={setTodos}
						inputValue={inputValue}
						setInputValue={setInputValue}
					/>
					<TodoList setTodos={setTodos} todos={todos} />
				</div>
			</div>
		</div>
	);
}
