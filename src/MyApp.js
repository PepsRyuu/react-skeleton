import React from 'react';
import TodoInput from './components/todo-input/TodoInput';
import TodoList from './components/todo-list/TodoList';
import './MyApp.scss';

export default class MyApp extends React.Component {
    constructor () {
        super();
        this.state = {
            todos: []
        };

        this.onAdd = this.onAdd.bind(this);
    }

    onAdd (e) {
        this.setState({
            todos: this.state.todos.concat(e)
        });
    }

    render () {
        return (
            <div className="MyApp">
                <h1>To Do List</h1>
                <TodoInput onAdd={this.onAdd}/>
                <TodoList items={this.state.todos}/>
            </div>
        );
    }
}
