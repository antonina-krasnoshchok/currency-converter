import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { getRatesList, setAmount, setCurrency, switchCurrency } from '../../../modules/converter/actions';
import * as constants  from '../../../constants';

const ratesObj =  {
    "CAD": 1.4466,
    "HKD": 8.5449,
    "ISK": 135.3,
    "PHP": 56.61,
    "DKK": 7.4655,
    "HUF": 334.79,
    "CZK": 25.74,
    "AUD": 1.6274,
    "RON": 4.7511,
    "SEK": 10.8043,
    "IDR": 15505.67,
    "INR": 77.492,
    "BRL": 4.5384,
    "RUB": 71.0815,
    "HRK": 7.4111,
    "JPY": 118.0,
    "THB": 33.43,
    "CHF": 1.0906,
    "SGD": 1.5108,
    "PLN": 4.3774,
    "BGN": 1.9558,
    "TRY": 6.1979,
    "CNY": 7.7903,
    "NOK": 9.9463,
    "NZD": 1.7528,
    "ZAR": 16.67,
    "USD": 1.0898,
    "MXN": 21.5587,
    "ILS": 3.7907,
    "GBP": 0.88955,
    "KRW": 1310.56,
    "MYR": 4.5712
}

describe('Converter actions', () => {
    it('should set "form amount" for converter', () => {
        const amount = 50;
		const expectedAction = {
			type: constants.SET_AMOUNT,
            amount
		};
		expect(setAmount(amount)).toEqual(expectedAction);
    });

    it('should set currency for converter', () => {
        const currency = {
            name: 'fromCurrency',
            value: 'USD'
        };
		const expectedAction = {
			type: constants.SET_CURRENCY,
            currency
		};
		expect(setCurrency(currency)).toEqual(expectedAction);
    });

    it('should switch currency for converter', () => {
		const expectedAction = {
			type: constants.SWITCH_CURRENCY
		};
		expect(switchCurrency()).toEqual(expectedAction);
    });

    it('should get rates from API', () => {
		const url =  `${constants.BASE_URL}/latest`;

		const mockStore = configureMockStore([thunk]);
        const store = mockStore({ 
            fromAmount: null,
            fromCurrency: '',
            toCurrency: '',
            rates: {}
        });
        
		const ratesData = {
            base: 'EUR',
            date: '2019-10-01',
			rates: ratesObj
        };
        
        fetchMock.get(url, {
			body: ratesData
        });
        
        const rates = {
            "EUR": 1,
            ...ratesObj
        }

		const expectedActions = [{
            type: 'SET_RATES', 
            rates
        }];

		return store.dispatch(getRatesList()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
    });
});