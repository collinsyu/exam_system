
var inititialState={
  submited:false,
}

const quiz = (state = inititialState, action) => {
  // console.log(action);
  switch (action.type) {
    case 'isSubmit':
      return Object.assign({}, state, {
        submited: action.submited
      });
    default:
      return state
  }
}


export default quiz
