const postReducer = (state = { a: [], b: [] }, action) => {
  switch (action.type) {
    case 'SET_A_POST':
      state['a'] = [...state.a, ...action.payload];
      return state;
    case 'SET_B_POST':
      state['b'] = [...state.b, ...action.payload];
      return state;
    default:
      return state;
  }
};

export default postReducer;
