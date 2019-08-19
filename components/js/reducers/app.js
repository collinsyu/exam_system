
var inititialState={
  userInfo:{},
  userExamInfoList:{},
  userExamInfo:{},
  userRankInfo:{},
}

const app = (state = inititialState, action) => {
  // console.log(action);
  switch (action.type) {
    case 'request_UserInfo':
      return Object.assign({}, state, {
        userInfo: action.UserInfo
      });
    case 'request_User_Exam_Info_list':
      return Object.assign({}, state, {
        userExamInfoList: action.UserExamInfoList
      });
    case 'request_User_Exam_Info':
      return Object.assign({}, state, {
        userExamInfo: action.UserExamInfo
      });
    case 'return_rank_info_item':
      return Object.assign({}, state, {
        userRankInfo: action.rankItem
      });
    default:
      return state
  }
}


export default app
