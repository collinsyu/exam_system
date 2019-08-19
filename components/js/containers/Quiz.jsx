
import { connect } from 'react-redux';
import { fetchExamForUser } from '../actions/app';
import { submitExam } from '../actions/quiz';
import CountDownClock from '../components/CountDownClock.jsx'
import moment from 'moment';
import _ from 'underscore'
import './quiz.less'
const Tabs = antd.Tabs;
const Badge = antd.Badge;
const Form = antd.Form;
const Row = antd.Row;
const Radio = antd.Radio;
const Checkbox = antd.Checkbox;
const Col = antd.Col;
const Button = antd.Button;
const Icon = antd.Icon;
const Avatar = antd.Avatar;
const Modal = antd.Modal;
const Card = antd.Card;
const Select = antd.Select;
const Link = ReactRouter.Link;


const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class Quiz extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    var _id = this.props.params.id;
    dispatch(fetchExamForUser(_id));
    this.state={
      visible:false,
    }
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  hideModal(){
    this.setState({
      visible: false,
    });
  }
  componentDidMount(){
    var _self = this;
    document.body.onselectstart=document.body.oncontextmenu=function(){
      // alert("鼠标右键 被禁用")

      return false;
    }
    document.onkeydown =document.onkeyup = document.onkeypress=function(){
      if(window.event.keyCode == 123) {
        alert("f12 被禁用")
        window.event.returnValue=false;
        return(false);
      }
    }
    window.onbeforeunload = function() {
      if(!_self.props.isSubmited){
        return ""
      }
    };
  }
  handleSubmit(){
    this.props.form.validateFields((err, fieldsValue) => {
      const { dispatch } = this.props;
      var exam_id = this.props.userExamInfo._id;
      if (err) {
        // console.log(err);
        return Modal.confirm({
          title: '有试题尚未答题，是否现在交卷？',
          content: 'Bla bla ...',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            dispatch(submitExam({exam_id:exam_id,answers:JSON.stringify(fieldsValue)}));
          },
        });
      }
      Modal.confirm({
        title: '仍有剩余时间，是否现在交卷？',
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          dispatch(submitExam({exam_id:exam_id,answers:JSON.stringify(fieldsValue)}));
        },
      });
    });
  }
  countDownToLimitSubmit(){
    this.props.form.validateFields((err, fieldsValue) => {
      const { dispatch } = this.props;
      var exam_id = this.props.userExamInfo._id;
      dispatch(submitExam({exam_id:exam_id,answers:JSON.stringify(fieldsValue)}));
    });
  }

  render() {
    // console.log(this.props.userExamInfo);
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { getFieldDecorator } = this.props.form;
    var userExamInfo = this.props.userExamInfo||{};
    var questions = userExamInfo.paper?userExamInfo.paper.subjects:[];
    return (
      <Row>
        {userExamInfo._id?
          <Col span={20} offset={2}>
            <h3 className="quiz_title_h3" >
              <Col span={20} style={{background:"#fff"}}>

                <div className="l">
                  <span className="time">
                    <Icon type="clock-circle-o" style={{fontSize:20,marginRight:10}}/>
                    <CountDownClock
                      from="quiz"

                      limit={userExamInfo.limit_min}
                      start_time={userExamInfo.quiz.quiz_start_time}
                      countDownToLimitSubmit={this.countDownToLimitSubmit.bind(this)}
                    />
                  </span>
                  <span>
                    <a href="javascript:;" onClick={this.showModal.bind(this)}>
                      <Icon type="calendar" /> 答题卡

                    </a>
                  </span>
                </div>
                <div className="r">
                  <Button style={{marginRight:10}} type="primary" onClick={this.handleSubmit.bind(this)}>交卷</Button>
                </div>
              </Col>
            </h3>
            <div className="quiz_box">
              <div className="quiz_header">
                <h1>
                  {userExamInfo.title}
                </h1>
                <p>
                  {userExamInfo.note}
                </p>
              </div>
              <div className="quiz_body">
                <Form layout={'vertical'} style={{padding:'20px 40px'}} id="user_paper_view">
                  {questions.map(function(item,index){
                    if(item.sub){
                      var optionss = [];

                      item.sub.answer.map(function(i_item,i_index){
                        if(item.sub.type=='sc'||item.sub.type=='tof'){
                          optionss.push(
                            <Radio style={radioStyle} key={i_index} value={i_item.value}>{i_item.label}</Radio>
                          )
                        }
                        else if(item.sub.type=='mc'){
                          optionss.push(
                            <Checkbox style={radioStyle} key={i_index} value={i_item.value}>{i_item.label}</Checkbox>
                          );
                        }

                      });

                      return (
                        <FormItem
                          label={
                            <span>
                              <span className="quiz_body_index">{index+1}</span>
                              、 {item.sub.describe}
                              <span style={{color:'#efa030'}}>（分值：{item.score}分）</span>
                              </span>
                          }
                        >
                          {item.sub.type=='sc'||item.sub.type=='tof'?
                            getFieldDecorator(item._id, {
                               rules: [{ required: true, message: '必选题目' }],
                            })(
                              <RadioGroup>
                                {optionss}
                              </RadioGroup>
                            )

                          :null}
                          {item.sub.type=='mc'?
                          getFieldDecorator(item._id, {
                             rules: [{ required: true, message: '必选题目' }],
                          })(
                            <CheckboxGroup>
                              {optionss}
                            </CheckboxGroup>
                          )

                          :null}
                        </FormItem>
                      )

                    }
                    else {
                      return ''
                    }

                  })}

                </Form>
              </div>
            </div>
          </Col>
        :null}
        <Modal
          title="答题卡"
          visible={this.state.visible}
          onCancel={this.hideModal.bind(this)}
          footer={null}
        >
          <Row>
            <Avatar shape="square" style={{ backgroundColor: "green",marginRight:5 }} >已填</Avatar>
            <Avatar shape="square" style={{ backgroundColor: "red",marginRight:5 }} >未填</Avatar>

          </Row>
          <Row style={{marginTop:15}}>
            {_.toArray(this.props.form.getFieldsValue()).map(function(item,index){
                if(item != undefined){
                  if(item.toString()){
                    return <Avatar shape="square" style={{ backgroundColor: "green",marginRight:5 }} >{index+1}</Avatar>
                  }
                  else{
                    return <Avatar shape="square" style={{ backgroundColor: "red" ,marginRight:5}} >{index+1}</Avatar>
                  }
                }
                else{
                  return <Avatar shape="square" style={{ backgroundColor: "red" ,marginRight:5}} >{index+1}</Avatar>
                }
              })}
          </Row>
          <Button style={{width:"100%"}} type="primary" onClick={this.handleSubmit.bind(this)}>傲娇的我，无论如何都要倔强地交卷</Button>

        </Modal>
      </Row>
    );
  }
}


// export default Quiz
const mapStateToProps = state => {
  const { app , quiz} = state
  return {
    userInfo:app.userInfo,
    userExamInfo:app.userExamInfo,
    isSubmited:quiz.submited,
  }
}
export default connect(mapStateToProps)(Form.create()(Quiz))
