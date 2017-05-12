import React from 'react';
import MyApp from '../../src/MyApp';
import TodoInput from '../../src/components/todo-input/TodoInput';
import TodoList from '../../src/components/todo-list/TodoList';

describe('MyApp', () => {
    it ('should render child components', () => {
        let component = shallow(<MyApp/>);
        expect(component.find(TodoInput).prop('onAdd')).to.equal(component.instance().onAdd);
        expect(component.find(TodoList).prop('items')).to.deep.equal([]);
    });

    it ('should add todo to list when onAdd is triggered', () => {
        let component = shallow(<MyApp/>);
        component.instance().onAdd({
            message: 'hello'
        });
        component.instance().onAdd({
            message: 'world'
        });

        expect(component.find(TodoList).prop('items')).to.deep.equal([{
            message: 'hello'
        }, {
            message: 'world'
        }]);
    });
});