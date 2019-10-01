import chart from '../../../modules/chart/reducer';
import * as constants  from '../../../constants';

describe('Chart reducer', () => {
    it ('should handle SET_FILTER', () => {
        const filter = 6;
        const action = { 
            type: constants.SET_FILTER,
            filter
        };
        const chartState = {
            filter: 12
        };
        const expectedAction = {
            filter
        };
        expect(chart(chartState, action)).toEqual(expectedAction);
    });

});