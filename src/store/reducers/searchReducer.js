const searchReducer = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_A_POST':
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
