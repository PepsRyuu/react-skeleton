import React from 'react';
import TodoList from '../../src/components/todo-list/TodoList';

describe('TodoList', () => {
    it ('should render the items passed in', () => {
        let items = [{
            message: 'item 1'
        }, {
            message: 'item 2'
        }];

        let component = mount(<TodoList items={items} />);
        let els = component.find('.item');
        expect(els.length).to.equal(2);
        expect(els.at(0).text()).to.equal(items[0].message);
        expect(els.at(1).text()).to.equal(items[1].message);
    });
});