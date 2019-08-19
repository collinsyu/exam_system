
var inititialState={
  list:[],
  selected:{},
}

const paper = (state = inititialState, action) => {
  // console.log(action);
  switch (action.type) {
    case 'return_paper_list':
      return Object.assign({}, state, {
        list: action.list
      });
    case 'return_paper_selected':
      return Object.assign({}, state, {
        selected: action.selected
      });
    default:
      return state
  }
}


export default paper
