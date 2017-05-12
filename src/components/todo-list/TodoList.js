import React from 'react';
import './TodoList.scss';

export default class TodoList extends React.Component {
    
    render () {
        return (
            <div className="MyApp-TodoList">
                {this.props.items.map((item, index) => {
                    return (<div className="item" key={index}>{item.message}</div>);
                })}
            </div>
        );

    }

}