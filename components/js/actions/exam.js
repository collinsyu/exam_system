import tools from '../utils/tools'
const message = antd.message;


export const returnExamList = list => ({
  type: 'return_exam_list',
  list
})

// export const returnExamItem = item => ({
//   type: 'return_exam_item',
//   item
// })
export const returnExamItem = item => {
  item.paper = JSON.parse(item.paper);
  return {
    type: 'return_exam_item',
    item
  }

}

export const fetchList = (obj) => (dispatch, getState) => {
  tools.ajax({
      url: '/api/exam/fetch',
      data:JSON.stringify(obj),
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      async: true,
      dataType:'json'
   })
  .then(function (xhr) {
    // console.log(xhr);
    if(xhr.response.success){
      return dispatch(returnExamList(xhr.response.result))
    }
  },
  function (e) {
    message.error('请求出错')
    console.log(JSON.stringify(e))
  })
}
export const fetchById = (id) => (dispatch, getState) => {
  tools.ajax({
      url: '/api/exam_admin/exam',
      data:JSON.stringify({id:id}),
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      async: true,
      dataType:'json'
   })
  .then(function (xhr) {
    // console.log(xhr);
    if(xhr.response.success){
      return dispatch(returnExamItem(xhr.response.result))
    }
  },
  function (e) {
    message.error('请求出错')
    console.log(JSON.stringify(e))
  })
}
export const shudownByAdmin = (obj) => (dispatch, getState) => {
  tools.ajax({
      url: '/api/exam_admin/shutdown',
      data:JSON.stringify(obj),
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      async: true,
      dataType:'json'
   })
  .then(function (xhr) {
    // console.log(xhr);
    if(xhr.response.success){
      return dispatch(returnExamItem(xhr.response.result))
    }
  },
  function (e) {
    message.error('请求出错')
    console.log(JSON.stringify(e))
  })
}
