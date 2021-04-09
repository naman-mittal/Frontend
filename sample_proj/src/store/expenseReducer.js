const initialState = {}

const expenseReducer = (state = initialState, { type, payload }) => {
  //console.log(type);
  switch (type) {
   

      case "FIND_EXPENSES":
      
        return { expenses: payload.expenses};

   

    default:
      return state;
  }
};

export default expenseReducer;