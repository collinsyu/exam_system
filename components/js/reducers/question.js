
var inititialState={
  list:[],
}

const question = (state = inititialState, action) => {
  // console.log(action);
  switch (action.type) {
    case 'return_list':
      return Object.assign({}, state, {
        list: action.list
      });
    default:
      return state
  }
}


export default question
