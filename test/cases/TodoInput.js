import React from 'react';
import TodoInput from '../../src/components/todo-input/TodoInput';

describe('TodoInput', () => {
    it ('should trigger onAdd passing input data when submit occurs', () => {
        let callback = sinon.spy();
        let component = mount(<TodoInput onAdd={callback}/>);
        component.find('input').node.value = 'hello';
        component.find('form').simulate('submit');
        expect(callback.callCount).to.equal(1);
        expect(callback.calledWith({
            message: 'hello'
        })).to.be.true;
    });

    it ('should not trigger onAdd if input is empty', () => {
        let callback = sinon.spy();
        let component = mount(<TodoInput onAdd={callback}/>);
        component.find('form').simulate('submit');
        expect(callback.callCount).to.equal(0);
    });

    it ('should reset input field after a submit', () => {
        let component = mount(<TodoInput onAdd={sinon.spy()}/>);
        component.find('input').node.value = 'world';
        component.find('form').simulate('submit');
        expect(component.find('input').node.value).to.equal('');
    });
});