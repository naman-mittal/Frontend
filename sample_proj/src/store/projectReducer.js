const initialState = {}

const projectReducer = (state = initialState, { type, payload }) => {
  //console.log(type);
  switch (type) {
   

      case "FIND_PROJECTS":
      
        return { projects: payload.projects};

   

    default:
      return state;
  }
};

export default projectReducer;