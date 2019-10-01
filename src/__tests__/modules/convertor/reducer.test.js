import converter from '../../../modules/converter/reducer';
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

describe('Chart reducer', () => {
    it ('should handle SET_RATES', () => {
        const action = { 
            type: constants.SET_RATES,
            rates: ratesObj
        };
        const converterState = {
            fromAmount: null,
            fromCurrency: '',
            toCurrency: '',
            rates: {}
        };
        const expectedAction = {
            fromAmount: null,
            fromCurrency: '',
            toCurrency: '',
            rates: ratesObj
        };
        expect(converter(converterState, action)).toEqual(expectedAction);
    });

    it ('should handle SET_AMOUNT', () => {
        const amount = 100;
        const action = { 
            type: constants.SET_AMOUNT,
            amount
        };
        const converterState = {
            fromAmount: null,
            fromCurrency: '',
            toCurrency: '',
            rates: ratesObj
        };
        const expectedAction = {
            fromAmount: amount,
            fromCurrency: '',
            toCurrency: '',
            rates: ratesObj
        };
        expect(converter(converterState, action)).toEqual(expectedAction);
    });

    it ('should handle SET_CURRENCY', () => {
        const currency = {
            name: 'fromCurrency',
            value: 'USD'
        };
        const action = { 
            type: constants.SET_CURRENCY,
            currency
        };
        const converterState = {
            fromAmount: null,
            fromCurrency: '',
            toCurrency: '',
            rates: ratesObj
        };
        const expectedAction = {
            fromAmount: null,
            fromCurrency: currency.value,
            toCurrency: '',
            rates: ratesObj
        };
        expect(converter(converterState, action)).toEqual(expectedAction);
    });

    it ('should handle SWITCH_CURRENCY', () => {
        const action = { 
            type: constants.SWITCH_CURRENCY
        };
        const converterState = {
            fromAmount: null,
            fromCurrency: 'EUR',
            toCurrency: 'USD',
            rates: ratesObj
        };
        const expectedAction = {
            fromAmount: null,
            fromCurrency: 'USD',
            toCurrency: 'EUR',
            rates: ratesObj
        };
        expect(converter(converterState, action)).toEqual(expectedAction);
    });

});