
const Form = antd.Form;
const Row = antd.Row;
const Col = antd.Col;
const Input = antd.Input;
const Button = antd.Button;
const Card = antd.Card;
const Icon = antd.Icon;
const Avatar = antd.Avatar;
const Badge = antd.Badge;
const Tooltip = antd.Tooltip;
const Progress = antd.Progress;
const Select = antd.Select;
const DatePicker = antd.DatePicker;
const Popconfirm = antd.Popconfirm;
const Table = antd.Table;

import { connect } from 'react-redux';
import { fetchById , shudownByAdmin } from '../actions/exam'
import moment from 'moment'
import _ from 'underscore'

import ExamineesPieChartBox from '../components/exam_comps/ExamineesPieChartBox.jsx'
import ExamineesScatterChartBox from '../components/exam_comps/ExamineesScatterChartBox.jsx'
import Winner from '../components/exam_comps/Winner.jsx'
import ExamineesInfoTable from '../components/exam_comps/ExamineesInfoTable.jsx'


const FormItem = Form.Item;
const Option = Select.Option;
class ExamDetail extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(fetchById(this.props.params.id))
    this.state={

    }
  }
  componentDidMount(){
    // console.log('this.props.examInfo',this.props.examInfo);

  }
  shudownByAdmin(record){
    var user_id = record.baseInfo._id;
    var exam_id = this.props.examInfo._id;
    const { dispatch } = this.props;
    dispatch(shudownByAdmin({user_id:user_id,exam_id:exam_id}))

  }

  render() {
    var examInfo = this.props.examInfo ||{};
    var examinees = examInfo.examinees||[];
    var gold_winner = _.max(examinees, function(item){ return item.score; });
    var silver_winner = _.min(examinees, function(item){ return item.score; });


    // 计算参考率  和及格率
    var unfinish = _.filter(examinees, function(item){ return !item.answers });
    var finish = _.filter(examinees, function(item){ return item.answers });
    var pass = _.filter(examinees, function(item){ return item.score>=examInfo.standard_score });
    return (
      <div className="l-container">
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Card title="基本信息" style={{marginBottom:15}}>
              <p>考试名称：{examInfo.title}</p>
              <p>及格分数：{examInfo.standard_score}</p>
              <p>考试时间：{examInfo.limit_min} min</p>
              <p>备注：{examInfo.note}</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={{marginBottom:15}}>
              {gold_winner._id?
                <Winner winnerInfo={gold_winner} type="bronze"/>
              :null}
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={{marginBottom:15}}>
              {silver_winner._id?
                <Winner winnerInfo={silver_winner} type="silver"/>
              :null}
            </Card>
          </Col>


          <Col className="gutter-row" span={12}>
            <Card>
              {examInfo._id?
                <ExamineesPieChartBox examinees={examinees} paper={examInfo.paper}/>
              :null}
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Card>
              {examInfo._id?
                <ExamineesScatterChartBox examinees={examinees}/>
              :null}
            </Card>
          </Col>

          <Col className="gutter-row" span={24}>
            <Card style={{marginTop:15}}>
              <Row gutter={16}>
                <Col xs={6} sm={4} md={3} lg={2} xl={2} style={{textAlign:"right"}}>参考率：</Col>
                <Col xs={18} sm={20} md={20} lg={20} xl={20}>
                  <Progress percent={parseInt(finish.length/examinees.length*100 ||0)} />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={6} sm={4} md={3} lg={2} xl={2} style={{textAlign:"right"}}>及格率：</Col>
                <Col xs={18} sm={20} md={20} lg={20} xl={20}>
                  <Progress percent={parseInt(pass.length/examinees.length*100 ||0)} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col className="gutter-row" span={24}>
            <Card style={{marginTop:15}}>
              {examinees.length?
                <ExamineesInfoTable
                  examinees={examinees}
                  examInfo={examInfo}
                  shudownByAdmin={this.shudownByAdmin.bind(this)}/>
              :null}

            </Card>
          </Col>
        </Row>


        <style>
          {`
            .custom-filter-dropdown {
              padding: 8px;
              border-radius: 6px;
              background: #fff;
              box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
            }

            .custom-filter-dropdown input {
              width: 130px;
              margin-right: 8px;
            }

            .highlight {
              color: #f50;
            }
          `}
        </style>
      </div>
    );
  }
}


// export default Question
const mapStateToProps = state => {
  const { app , modal ,exam} = state
  return {
    examInfo:exam.item,
  }
}
export default connect(mapStateToProps)(ExamDetail)
