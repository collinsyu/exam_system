
var inititialState={
  list:[],
  item:{},
}

const exam = (state = inititialState, action) => {
  // console.log(action);
  switch (action.type) {
    case 'return_exam_list':
      return Object.assign({}, state, {
        list: action.list
      });
    case 'return_exam_item':
      return Object.assign({}, state, {
        item: action.item
      });
    default:
      return state
  }
}


export default exam
