import { combineReducers } from 'redux';
import app from './app';
import modal from './modal';
import question from './question';
import paper from './paper';
import user from './user';
import exam from './exam';
import quiz from './quiz';



const rootReducer = {
  app,modal,question,paper,user,exam,quiz
}

export default rootReducer
