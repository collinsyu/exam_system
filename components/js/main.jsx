// import React from 'react'
// import ReactDOM from 'react-dom';
// import {Router, Route,browserHistory,Redirect} from 'react-router';
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const browserHistory = ReactRouter.browserHistory;
const Redirect = ReactRouter.Redirect;

import '../style/index.css'

import OutLine from './containers/OutLine.jsx';
import QuestionList from './containers/QuestionList.jsx';
import PaperList from './containers/PaperList.jsx';
import ExamList from './containers/ExamList.jsx';
import ExamDetail from './containers/ExamDetail.jsx';
import PaperManage from './containers/PaperManage.jsx';
import Quiz from './containers/Quiz.jsx';
import UserManage from './containers/UserManage.jsx';
import SettingUser from './containers/SettingUser.jsx';

import { createStore, applyMiddleware , combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
const middleware = [ thunk ]


const store = createStore(
  combineReducers({
    ...reducer,
    routing: routerReducer,
  }),
  applyMiddleware(...middleware)
)


class ErrorPage extends React.Component {
  componentDidMount(){
    // alert('asd')
    window.location.reload()
  }
  render(){
    return(
      <p>page not foundd</p>

    )
  }
}
const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render((
  <Provider store={store}>
    <Router history={history} >
    <Route path="/" component={OutLine}>
      <Route path="/question" component={QuestionList}/>
      <Route path="/paper" component={PaperList}/>
      <Route path="/paper/manage" component={PaperManage}/>
      <Route path="/paper/manage/:id" component={PaperManage}/>
      <Route path="/exam" component={ExamList}/>
      <Route path="/exam/:id" component={ExamDetail}/>
      <Route path="/user" component={UserManage}/>
      <Route path="/settings" component={SettingUser}/>
      <Route path="/quiz/:id" component={Quiz}/>

    </Route>

    <Route path="*" component={ErrorPage}/>
    </Router>
  </Provider>

),document.getElementById('react')
);
