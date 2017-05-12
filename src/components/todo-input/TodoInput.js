import React from 'react';
import './TodoInput.scss';

export default class TodoInput extends React.Component {
    
    constructor () {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit (e) {
        e.preventDefault();

        if (this.input.value !== '') {
            this.props.onAdd({
                message: this.input.value
            });

            this.input.value = '';
        }
    }

    render () {
        return (
            <div className="MyApp-TodoInput">
                <form onSubmit={this.onSubmit}>
                    <input type="text" ref={(e) => this.input = e}/>
                    <button>Add</button>
                </form>
            </div>
        );

    }

}