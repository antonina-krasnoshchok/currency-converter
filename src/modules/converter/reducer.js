import * as constants from '../../constants';

const initialState = {
    fromAmount: null,
    fromCurrency: '',
    toCurrency: '',
    rates: {}
};

const converter = (state = initialState, action) => {
    switch(action.type) { 
        case constants.SET_RATES:
            return {
                ...state,
                rates: action.rates
            }
        case constants.SET_AMOUNT:
            return {
                ...state,
                fromAmount: action.amount
            }
        case constants.SET_CURRENCY:
            const { name, value } = action.currency;
            return {
                ...state,
                [name]: value
            }
        case constants.SWITCH_CURRENCY:
            const { fromCurrency, toCurrency } = state;
            return {
                ...state,
                fromCurrency: toCurrency,
                toCurrency: fromCurrency
            }
        default: 
            return state;     
    } 
};
  
export default converter;