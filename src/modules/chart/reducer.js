import * as constants from '../../constants';

const initialState = {
    filter: 3
};

const chart = (state = initialState, action) => {
    switch(action.type) { 
        case constants.SET_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        default: 
            return state;     
    } 
};
  
export default chart;