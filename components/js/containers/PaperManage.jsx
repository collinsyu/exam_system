
// import React from 'React';
// import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';

const Form = antd.Form;
const Row = antd.Row;
const Col = antd.Col;
const Input = antd.Input;
const Button = antd.Button;
const Icon = antd.Icon;
const Select = antd.Select;
const DatePicker = antd.DatePicker;
const Popconfirm = antd.Popconfirm;
const Table = antd.Table;
const Radio = antd.Radio;
const Checkbox = antd.Checkbox;
const Tooltip  = antd.Tooltip ;
const message  = antd.message ;
const InputNumber = antd.InputNumber;
const BackTop = antd.BackTop;
const Link = ReactRouter.Link;

import { connect } from 'react-redux';
import { returnModalState_1} from '../actions/modal'
import { addItem , updateItem} from '../actions/app'
import { returnSelectedPaper } from '../actions/paper'
import QuestionModal from '../components/QuestionModal.jsx'
import QuestionListModal from '../components/QuestionListModal.jsx'
import tools from '../utils/tools'
import _ from 'underscore'

import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class Paper extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      subjects:[],
      title:"",
      creator:this.props.userInfo.name,
      create_time:moment().format('YYYY-MM-DD'),
    }
  }
  componentDidMount(){
    var selected = this.props.selected;
    var _self = this;
    const { dispatch } = this.props
    if(selected._id){
      return this.setState({
        title:selected.title,
        subjects:selected.subjects,
        creator:selected.creator.name,
        create_time:moment(selected.meta.createAt).format('YYYY-MM-DD')
      })
    }
    else{
      //说明刷新了，不是直接从list页面过来，要重新请求当前id 的信息
      var id = this.props.params.id;
      if(!id){
        return
      }
      tools.ajax({
          url: '/api/paper/fetchById',
          data:JSON.stringify({id:id}),
          method: 'POST',
          headers:{'Content-Type':'application/json'},
          async: true,
          dataType:'json'
       })
      .then(function (xhr) {
        // console.log(xhr);
        if(xhr.response.success){
          var selected = xhr.response.result;
          dispatch(returnSelectedPaper(selected))

          _self.setState({
            title:selected.title,
            subjects:selected.subjects,
            creator:selected.creator.name,
            create_time:moment(selected.meta.createAt).format('YYYY-MM-DD')
          })
        }
      },
      function (e) {
        message.error('请求出错')
        console.log(JSON.stringify(e))
      })
    }
  }
  addQuestionToPaper(obj){
    var subjects = this.state.subjects;
    subjects.push({
      sub:obj,
      score:1,
    });
    this.setState({subjects})
  }
  removeQuestionToPaper(obj){
    var oldSubjects = this.state.subjects;
    var subjects = [];
    oldSubjects.map(function(item){
      if(item.sub._id != obj._id){
        subjects.push(item);
      };
    });
    this.setState({subjects})
  }
  handleCancel(){
    const { dispatch } = this.props
    dispatch(returnModalState_1(false))
  }
  showModal(type){
    const { dispatch } = this.props
    return dispatch(returnModalState_1(true));
  }
  changeIndex(type,index){
    var subjects = this.state.subjects;
    if(type =='up'){
      subjects = tools.upRecord(subjects,index);
    }
    else{
      subjects = tools.downRecord(subjects,index);
    }
    this.setState({subjects})
  }
  changeScore(obj,num){
    var subjects = this.state.subjects;
    subjects.map(function(item){
      if(item.sub._id == obj._id){
        item.score = num
      };
    });
    this.setState({subjects})
  }
  savePaper(){
    var id = this.props.selected?this.props.selected._id:undefined;
    const { dispatch } = this.props
    var title = this.state.title;
    var subjects = this.state.subjects;
    if(!title){
      return message.error("请补充试卷标题")
    }
    if(subjects.length==0){
      return message.error("至少有一道题目")
    }
    subjects.map(function(item){
      item.sub = item.sub._id;
    });
    console.log(subjects);

    var total_score = _.reduce(subjects, function(memo, item){ return memo + item.score; }, 0);

    if(!id){
      dispatch(addItem({
        total_score:total_score,
        subjects:subjects,
        title:title,
      },'paper'))
    }
    else{
      dispatch(updateItem({
        total_score:total_score,
        subjects:subjects,
        title:title,
        _id:id,
      },'paper'))
    }


  }
  changeTitle(e){
    this.setState({title:e.target.value})
  }
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    var _self = this;
    return (
      <div className="l-container" style={{background:'#fff'}}>
        <h1>
          <Input
            value={this.state.title}
            onChange={this.changeTitle.bind(this)}
            placeholder="请输入标题"
            style={{textAlign:'center',fontSize:25,padding:25}}/>
        </h1>
        <p>
          <span>
            创建人：{this.state.creator}
          </span>
          <span style={{float:'right'}}>
            创建时间：{this.state.create_time}
          </span>
        </p>

        <Form layout={'vertical'} style={{padding:'20px 40px'}} id="manage_paper_view">
          {this.state.subjects.map(function(item,index){
            if(item.sub){
              var optionss = [];
              var right_answer = item.sub.type=='mc'?[]:"";
              item.sub.answer.map(function(i_item,i_index){
                if(item.sub.type=='sc'||item.sub.type=='tof'){
                  optionss.push(
                    <Radio style={radioStyle} key={i_index} value={i_item.value}>{i_item.label}</Radio>
                  )
                  if(i_item.isRight){
                    right_answer = i_item.value
                  }
                }
                else if(item.sub.type=='mc'){
                  optionss.push(
                    <Checkbox style={radioStyle} key={i_index} value={i_item.value}>{i_item.label}</Checkbox>
                  );
                  if(i_item.isRight){
                    right_answer.push(i_item.value);
                  }
                }

              });

              return (
                <FormItem
                  label={
                    <span>
                      {index+1}、 {item.sub.describe}
                      <span style={{color:'#efa030'}}>（分值：
                        <InputNumber min={1} max={10}
                          defaultValue={item.score} size="small"
                          onChange={_self.changeScore.bind(_self,item.sub)}
                        />
                        分）</span>
                    </span>
                  }
                >
                  {item.sub.type=='sc'||item.sub.type=='tof'?
                    <RadioGroup value={right_answer}>
                      {optionss}
                    </RadioGroup>
                  :null}
                  {item.sub.type=='mc'?
                    <CheckboxGroup value={right_answer}>
                        {optionss}
                    </CheckboxGroup>
                  :null}
                  <p style={{background: '#949596',color: '#fff',margin:'0 -10px',padding:'0 10px'}}>
                    解析：{item.sub.explain?item.sub.explain:"略"}
                  </p>
                  <p className="tools_icon">
                    <span>
                      <Tooltip placement="top" title="上移">
                        <a href="javascript:;" onClick={_self.changeIndex.bind(_self,'up',index)}><Icon type="arrow-up" /></a>
                      </Tooltip>
                      <Tooltip placement="top" title="下移">
                        <a href="javascript:;" onClick={_self.changeIndex.bind(_self,'down',index)}><Icon type="arrow-down" /></a>
                      </Tooltip>
                      <Tooltip placement="top" title="删除">
                        <a href="javascript:;" onClick={_self.removeQuestionToPaper.bind(_self,item.sub)}><Icon type="delete" /></a>
                      </Tooltip>
                      {/* <Tooltip placement="top" title="修改">
                        <a href="javascript:;"><Icon type="edit" /></a>
                      </Tooltip> */}
                    </span>
                  </p>
                </FormItem>
              )

            }
            else {
              return ''
            }

          })}
        </Form>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={this.savePaper.bind(this)}>保存 </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.showModal.bind(this,'pi')}>
              批量导入
            </Button>
            <Button style={{ marginLeft: 8 }} type="primary">
              <Link to={"/paper"}>返回</Link>
            </Button>
          </Col>
        </Row>
        <Row>
          总题数：{this.state.subjects.length}题

          当前总分：{_.reduce(this.state.subjects, function(memo, item){ return memo + item.score; }, 0)}分
        </Row>
        <BackTop />
        {this.props.pi_visible?
          <QuestionListModal
            addQuestionToPaper={this.addQuestionToPaper.bind(this)}
            removeQuestionToPaper={this.removeQuestionToPaper.bind(this)}
            handleCancel={this.handleCancel.bind(this) }
            subjects={this.state.subjects.map(item=>item.sub._id)}
            selectedItem={{}}/>
        :null}
        <style>
          {`
            #manage_paper_view .ant-form-item {
              padding:10px;
              border: #5d9cec dashed 1px;
            }
            #manage_paper_view .ant-form-item:hover {
              border: #5d9cec solid 1px;
            }
            #manage_paper_view .tools_icon {
              height: 32px;
            }
            #manage_paper_view .ant-form-item:hover .tools_icon span {
              display:block;
            }
            #manage_paper_view .tools_icon span {
              float:right;
              display:none;
            }
            #manage_paper_view .tools_icon span a{
              margin-left:5px;
            }
            #manage_paper_view .tools_icon span i{
              font-size:20px;
            }
            #manage_paper_view .ant-form-item-label{
              border-bottom: 1px solid #ebebeb;
            }
          `}
        </style>
      </div>
    );
  }
}


// export default Question
const mapStateToProps = state => {
  const { app , modal ,paper} = state
  return {
    pi_visible:modal.visible_1,
    selected:paper.selected,
    userInfo:app.userInfo,
  }
}
export default connect(mapStateToProps)(Form.create()(Paper))
