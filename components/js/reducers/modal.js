
var inititialState={
  visible:false,
  visible_1:false,
}

const modal = (state = inititialState, action) => {
  // console.log(action);
  switch (action.type) {
    case 'request_Modal':
      return Object.assign({}, state, {
        visible: action.visible
      });
    case 'request_Modal_1':
      return Object.assign({}, state, {
        visible_1: action.visible_1
      });
    default:
      return state
  }
}


export default modal
