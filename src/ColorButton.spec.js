import React from 'react';
import ColorButton from './ColorButton';
import Enzyme, { shallow } from 'enzyme';



describe('ColorButton', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ColorButton />)
    });

    it('renders without crashing', () => {
        expect(wrapper).toMatchSnapshot();
    });




})