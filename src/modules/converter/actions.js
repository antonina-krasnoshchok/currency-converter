import * as constants from '../../constants';
import axios from 'axios';

export const getRatesList = () => {
    return (dispatch) => {
      const url =  `${constants.BASE_URL}/latest`;
      return axios.get(url)
          .then(({data}) => {
            const { rates, base} = data;
            dispatch(setRates({[base]: 1, ...rates}))
          });        
    };
  };

const setRates = (rates) => {
    return {
        type: constants.SET_RATES,
        rates
    };
}

export const setAmount = (amount) => {
  return {
    type: constants.SET_AMOUNT,
    amount
  };
}

export const setCurrency = (currency) => {
  return {
    type: constants.SET_CURRENCY,
    currency
  };
}

export const switchCurrency = () => {
  return {
    type: constants.SWITCH_CURRENCY
  };
}
