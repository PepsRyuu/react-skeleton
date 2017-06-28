import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// Global functions for testing.
window.shallow = shallow;
window.expect = expect;
window.mount = mount;
window.sinon = sinon;
