import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export default class TodoApp extends Component {
  state = {
    todoText: '',
    todos: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [],
  };

  handleChange = (event) => {
    this.setState({ todoText: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { todoText, todos } = this.state;

    if (todoText.trim() === '') {
      return; // Don't add empty to-do items
    }

    const newTodo = {
      id: Date.now(),
      text: todoText,
    };

    const updatedTodos = [...todos, newTodo];
    this.setState({ todos: updatedTodos, todoText: '' });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  handleRemove = (id) => {
    const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: updatedTodos });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  render() {
    return (
      <div className="container">
        <h2>To-Do List</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new to-do item"
              value={this.state.todoText}
              onChange={this.handleChange}
            />
            <div className="input-group-append raj">
              <Button variant="outline-info" size="lg" type="submit">
                Add ToDo
              </Button>
            </div>
          </div>
        </form>
        <ul className="list-group my-5 bg-dark">
          {this.state.todos.map((todo) => (
            <li className="list-group-item" key={todo.id}>
              {todo.text}
              <Button
                variant="danger"
                size="sm"
                className="float-right mx-5"
                onClick={() => this.handleRemove(todo.id)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
