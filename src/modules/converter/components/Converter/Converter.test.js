import React from 'react';
import { shallow } from 'enzyme';
import Converter from './index';

describe('Converter component', () => {
    const container = shallow(<Converter />);

    it('should set the fromAmount value on change', () => {
        container.find('input[name="fromAmount"]').simulate('change', {
          target: {
            value: 100,
          },
        });
        expect(container.find('input[name="fromAmount"]').prop('value')).toEqual(
          100,
        );
      });
    
});