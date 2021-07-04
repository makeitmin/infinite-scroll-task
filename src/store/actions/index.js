export const setAPost = (item) => {
  return {
    type: 'SET_A_POST',
    payload: item
  };
};

export const setBPost = (item) => {
  return {
    type: 'SET_B_POST',
    payload: item
  };
};

export const searchAPost = (item) => {
  return {
    type: 'SEARCH_A_POST',
    payload: item
  };
};
