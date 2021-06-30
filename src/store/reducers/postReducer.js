const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_A_POST':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default postReducer;
