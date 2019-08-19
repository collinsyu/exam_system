import tools from '../utils/tools'
import { returnModalState } from './modal'
import { returnQuestionList } from './question'
import { returnPaperList } from './paper'
import { returnExamList } from './exam'
import { returnUserList } from './user'
const message = antd.message;
const browserHistory = ReactRouter.browserHistory;

export const returnUserInfoState = UserInfo => ({
  type: 'request_UserInfo',
  UserInfo
})
//首页考试信息
export const returnUserExamInfoListState = UserExamInfoList => ({
  type: 'request_User_Exam_Info_list',
  UserExamInfoList
});
//排名信息
export const returnUserRankInfoState = rankItem => ({
  type: 'return_rank_info_item',
  rankItem
});
export const returnUserExamInfoState = UserExamInfo => ({
  type: 'request_User_Exam_Info',
  UserExamInfo
});
export const fetchExamForUser = (_id) => (dispatch, getState) => {
  tools.ajax({
      url: '/api/exam_user/exam',
      data:JSON.stringify({_id:_id}),
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      async: true,
      dataType:'json'
   })
  .then(function (xhr) {
    // console.log(xhr.response);
    if(xhr.response.success){
      return dispatch(returnUserExamInfoState(xhr.response.result))
    }
    else{
      message.error(xhr.response.msg)
      window.location.pathname = "/"

    }


  },
  function (e) {
    console.log(JSON.stringify(e))
    message.error(xhr.response.msg)
    window.location.pathname = "/";
  })
}
export const fetchExamForUserList = (_id) => (dispatch, getState) => {
  tools.ajax({
      url: '/api/exam_user/list',
      data:JSON.stringify({_id:_id}),
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      async: true,
      dataType:'json'
   })
  .then(function (xhr) {
    // console.log(xhr.response);
    if(xhr.response.success){
      if(xhr.response.result.finish.length){
        dispatch(returnUserRankInfoState(xhr.response.result.finish[0]))
      }
      return dispatch(returnUserExamInfoListState(xhr.response.result))
    }


  },
  function (e) {
    console.log(JSON.stringify(e))
  })
}

export const updateUserInfo = () => (dispatch, getState) => {
  tools.ajax({
       url: '/api/userInfo',
       method: 'GET',
       headers:{'Content-Type':'application/json'},
       async: true,
       dataType:'json'
   })
  .then(function (xhr) {
    // console.log(xhr);
    return dispatch(returnUserInfoState(xhr.response.userInfo))
  },
  function (e) {
    console.log(JSON.stringify(e))
  })
}



export const addItem = (obj,type) => (dispatch, getState) => {
  tools.ajax({
      url: '/api/'+type+'/add',
      data:JSON.stringify(obj),
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      async: true,
      dataType:'json'
   })
  .then(function (xhr) {
    // console.log(xhr);
    if(xhr.response.success){
      message.success(xhr.response.msg)
      dispatch(returnModalState(false))
      if(type == 'question'){
        var list = getState().question.list.reverse();
        list.push(xhr.response.result);
        list = list.reverse();
        return dispatch(returnQuestionList(list.slice(0)))
      }
      else if(type == 'paper'){
        browserHistory.push('/paper')
      }
      else if(type == 'exam'){
        var list = getState().exam.list.reverse();
        list.push(xhr.response.result);
        list = list.reverse();
        return dispatch(returnExamList(list.slice(0)))
      }
      else if(type == 'user'){
        var list = getState().user.list.reverse();
        list.push(xhr.response.result);
        list = list.reverse();
        return dispatch(returnUserList(list.slice(0)))
      }
    }
    else {
      message.error(xhr.response.msg)

    }
    // return dispatch(returnUserInfoState(xhr.response.userInfo))
  },
  function (e) {
    message.error('请求出错')
    console.log(JSON.stringify(e))
  })
}
export const deleteItem = (obj,type) => (dispatch, getState) => {
  var _id = obj._id;
  if(!_id){
    return message.error('缺少必要参数')
  }
  tools.ajax({
      url: '/api/'+type+'/delete',
      data:JSON.stringify({_id:_id}),
      method: 'DELETE',
      headers:{'Content-Type':'application/json'},
      async: true,
      dataType:'json'
   })
  .then(function (xhr) {
    if(xhr.response.success){
      message.success(xhr.response.msg);
      if(type == 'question'){
        var newList = [];
        var list = getState().question.list;
        list.map(function(item){
          if(item._id != _id){
            newList.push(item)
          }
        });
        return dispatch(returnQuestionList(newList))
      }
      else if(type == 'paper'){
        var newList = [];
        var list = getState().paper.list;
        list.map(function(item){
          if(item._id != _id){
            newList.push(item)
          }
        });
        return dispatch(returnPaperList(newList))
      }
      else if(type == 'exam'){
        var newList = [];
        var list = getState().exam.list;
        list.map(function(item){
          if(item._id != _id){
            newList.push(item)
          }
        });
        return dispatch(returnExamList(newList))
      }
      else if(type == 'user'){
        var newList = [];
        var list = getState().user.list;
        list.map(function(item){
          if(item._id != _id){
            newList.push(item)
          }
        });
        return dispatch(returnUserList(newList))
      }
    }
    else {
      message.error(xhr.response.msg)
    }
  },
  function (e) {
    message.error('请求出错')
    console.log(JSON.stringify(e))
  })
}

export const updateItem = (obj,type) => (dispatch, getState) => {
  var _id = obj._id;
  tools.ajax({
      url: '/api/'+type+'/update',
      data:JSON.stringify(obj),
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      async: true,
      dataType:'json'
   })
  .then(function (xhr) {
    if(xhr.response.success){
      message.success(xhr.response.msg);
      dispatch(returnModalState(false))
      if(type == 'question'){
        var newList = [];
        var list = getState().question.list;
        list.map(function(item){
          if(item._id != _id){
            newList.push(item)
          }
          else{
            newList.push(xhr.response.result)
          }
        });
        return dispatch(returnQuestionList(newList.slice(0)))
      }
      else if(type == 'paper'){
        browserHistory.push('/paper')
      }
      else if(type == 'exam'){
        var newList = [];
        var list = getState().exam.list;
        list.map(function(item){
          if(item._id != _id){
            newList.push(item)
          }
          else{
            newList.push(xhr.response.result)
          }
        });
        return dispatch(returnExamList(newList.slice(0)))
      }
      else if(type == 'user'){
        var newList = [];
        var list = getState().user.list;
        list.map(function(item){
          if(item._id != _id){
            newList.push(item)
          }
          else{
            newList.push(xhr.response.result)
          }
        });
        return dispatch(returnUserList(newList.slice(0)))
      }
    }
    else {
      message.error(xhr.response.msg)
    }
  },
  function (e) {
    message.error('请求出错')
    console.log(JSON.stringify(e))
  })
}
