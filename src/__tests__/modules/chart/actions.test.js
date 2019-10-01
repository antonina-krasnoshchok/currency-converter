import { setFilter } from '../../../modules/chart/actions';
import * as constants  from '../../../constants';

describe('Chart actions', () => {
    it('should set filter for chart', () => {
        const filter = 6;
		const expectedAction = {
			type: constants.SET_FILTER,
            filter
		};
		expect(setFilter(filter)).toEqual(expectedAction);
    });
});