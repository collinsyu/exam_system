import tools from '../utils/tools'

const message = antd.message;
const browserHistory = ReactRouter.browserHistory;


export const returnSubmitStatus = submited => ({
  type: 'isSubmit',
  submited
})


export const submitExam = (obj) => (dispatch, getState) => {
  tools.ajax({
      url: '/api/exam_user/submit',
      data:JSON.stringify(obj),
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      async: true,
      dataType:'json'
   })
  .then(function (xhr) {
    // console.log(xhr);
    if(xhr.response.success){
      dispatch(returnSubmitStatus(true))
      window.location.pathname = "/"
    }
  },
  function (e) {
    message.error('请求出错')
    console.log(JSON.stringify(e))
  })
}
