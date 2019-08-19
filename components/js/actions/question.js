import tools from '../utils/tools'
const message = antd.message;


export const returnQuestionList = list => ({
  type: 'return_list',
  list
})


export const fetchList = (obj) => (dispatch, getState) => {
  tools.ajax({
      url: '/api/question/fetch',
      data:JSON.stringify(obj),
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      async: true,
      dataType:'json'
   })
  .then(function (xhr) {
    // console.log(xhr);
    if(xhr.response.success){
      return dispatch(returnQuestionList(xhr.response.result))
    }
  },
  function (e) {
    message.error('请求出错')
    console.log(JSON.stringify(e))
  })
}
