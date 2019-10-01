import { combineReducers } from 'redux';

import converter from './modules/converter/reducer';
import chart from './modules/chart/reducer';

const rootReducer = combineReducers({
    converter,
    chart
});

export default rootReducer;