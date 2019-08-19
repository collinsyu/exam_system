import tools from '../utils/tools'
const message = antd.message;


export const returnPaperList = list => ({
  type: 'return_paper_list',
  list
})

export const returnSelectedPaper = selected => ({
  type: 'return_paper_selected',
  selected
})

export const fetchList = (obj) => (dispatch, getState) => {
  tools.ajax({
      url: '/api/paper/fetch',
      data:JSON.stringify(obj),
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      async: true,
      dataType:'json'
   })
  .then(function (xhr) {
    // console.log(xhr);
    if(xhr.response.success){
      return dispatch(returnPaperList(xhr.response.result))
    }
  },
  function (e) {
    message.error('请求出错')
    console.log(JSON.stringify(e))
  })
}
