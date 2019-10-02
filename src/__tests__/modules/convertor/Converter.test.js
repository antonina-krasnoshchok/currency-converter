import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import Converter from '../../../modules/converter/components/Converter/index';
import configureMockStore from 'redux-mock-store';

import NumberFormat from 'react-number-format';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';

const storeObj = {
  converter:{
    fromAmount: 100,
    fromCurrency: 'USD',
    toCurrency: '',
    rates: {}
  },
  chart: {
    filter: 3
  }
}
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Converter component', () => {
    const store = mockStore(storeObj);
    const container = mount(<Provider store={store}><Converter /></Provider>);

    it('should have NumberFormat component', () => {
      expect(container.find(NumberFormat)).toHaveLength(1);
    });

    it('should set the fromAmount value on change event', () => {
      container.find(NumberFormat).simulate('change', {
        target: {
          value: storeObj.converter.fromAmount,
        },
      });
      expect(container.find(NumberFormat).prop('value')).toEqual(storeObj.converter.fromAmount);
    });

    it('should have Select components', () => {
      expect(container.find(Select)).toHaveLength(2);
    });

    it('should set the fromCurrency value on change event', () => {
      container.find('input#fromCurrency').simulate('change', {
        target: {
          name: 'fromCurrency',
          value: storeObj.converter.fromCurrency,
        },
      });
      expect(container.find('input#fromCurrency').prop('value')).toEqual(storeObj.converter.fromCurrency);
    });

    it('should set the toCurrency value on change event', () => {
      container.find('input#toCurrency').simulate('change', {
        target: {
          name: 'toCurrency',
          value: storeObj.converter.toCurrency,
        },
      });
      expect(container.find('input#toCurrency').prop('value')).toEqual(storeObj.converter.toCurrency);
    });

    it('should have Button component', () => {
      expect(container.find(IconButton)).toHaveLength(1);
    });

   
});