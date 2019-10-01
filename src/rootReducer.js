import { combineReducers } from 'redux';

import converter from './modules/converter/reducer';

const rootReducer = combineReducers({
    converter
});

export default rootReducer;