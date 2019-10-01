import * as constants from '../../constants';

export const setFilter = (filter) => {
  return {
    type: constants.SET_FILTER,
    filter
  };
}

