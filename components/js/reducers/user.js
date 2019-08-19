
var inititialState={
  list:[],
}

const user = (state = inititialState, action) => {
  // console.log(action);
  switch (action.type) {
    case 'return_user_list':
      return Object.assign({}, state, {
        list: action.list
      });
    default:
      return state
  }
}


export default user
