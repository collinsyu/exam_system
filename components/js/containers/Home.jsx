
import { connect } from 'react-redux';
import { fetchExamForUserList } from '../actions/app';
import CountDownClock from '../components/CountDownClock.jsx'
import UserExamScoreLine from '../components/home_comps/UserExamScoreLine.jsx'
import ExamInfoTable from '../components/home_comps/ExamInfoTable.jsx'
import moment from 'moment';
import _ from 'underscore';
import './home.less';

const Tabs = antd.Tabs;
const Badge = antd.Badge;
const Row = antd.Row;
const Col = antd.Col;
const Avatar = antd.Avatar;
const Tooltip = antd.Tooltip;
const Timeline = antd.Timeline;
const Button = antd.Button;
const Card = antd.Card;
const TabPane = Tabs.TabPane;





class Home extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    var _id = this.props.userInfo._id;
    dispatch(fetchExamForUserList(_id))
  }
  render() {
    var unfinish = this.props.userExamInfoList.unfinish || [];
    var finish = this.props.userExamInfoList.finish || [];

    // var highest_rank = {};
    // var highest_score = {};
    // if(finish.length){
    //   highest_rank = _.min(finish, function(item){ return item.quiz.rank });
    //   highest_score = _.max(finish, function(item){ return item.quiz.score });
    // }
    var _self = this;
    console.log(this.props.rankInfo);
    return (
      <div className="l-container">
        {unfinish.length?
          <Row >
            <Card style={{marginBottom:15,    background: "rebeccapurple"}}>
              <Row gutter={16}>
                {unfinish.map(function(item,index){
                  return (
                    <Col span={8} >
                      <Card
                        className="quzi_list_box"
                        extra={
                          item.quiz.quiz_start_time?
                          <CountDownClock
                            from="home"
                            dispatch={_self.props.dispatch}
                            exam_id={item._id}
                            limit={item.limit_min}
                            start_time={item.quiz.quiz_start_time}
                          />
                          :
                          ""
                        }
                        title={item.title} bordered={false}>
                        <span className="quiz_entry_button">
                          <a href={"/quiz/"+item._id} >
                          <Button type="primary">参加考试</Button>

                        </a>
                      </span>
                      <p>考试时间：{item.limit_min} 分钟</p>
                      <p>截止日期：{moment(item.examTime.end).format('YYYY-MM-DD')}</p>
                      <p>备注：{item.note}</p>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </Card>

        </Row>
        :null}
        <Row gutter={16}>
          <Col className="gutter-row" span={18}>
            <Row>
              <Card>
                {finish.length?
                  <UserExamScoreLine
                    data={finish}
                  />
                :null}
              </Card>
            </Row>
            {finish.length?
              <Row>
                <Card style={{marginTop:15,height:354,overflow:'auto'}}>
                  <ExamInfoTable
                    dispatch={this.props.dispatch}
                    rankInfo={this.props.rankInfo}
                    data={finish}
                  />
                </Card>
              </Row>
            :null}

          </Col>
          <Col className="gutter-row" span={6} >
            <Card style={{minHeight:450}}>
              {this.props.rankInfo._id?
                <Timeline>
                  {_.sortBy(this.props.rankInfo.examinees, 'score').reverse().map(function(info,index){
                    var item = info.baseInfo;
                    return (
                      <Timeline.Item
                        color={_self.props.userInfo._id == item._id?"red":undefined}
                        dot={"第"+(index+1)+"名"}>
                        <Tooltip
                          placement="top"

                          title={function(){
                            if(index == 0){
                              return "我可真牛逼呀"
                            }
                            else if(index == 1){
                              return "我是万年老二"
                            }
                            else if(index+1 == _self.props.rankInfo.examinees.length){
                              return "万年垫底，鳖孙！"
                            }else{
                              return "不想说什么"
                            }
                          }}
                        >
                          <span style={{cursor:"pointer"}}>

                            {item.avatar?
                              <Avatar src={item.avatar} style={{float:"left",marginLeft:10}}/>
                              :
                              <Avatar style={{ color: '#fff',float:"left",marginLeft:10, backgroundColor: item.avatar_color }}>{item.name.substr(0, 1).toLocaleUpperCase()}</Avatar>
                            }
                            <span style={{display:"inline-block",lineHeight:'32px',marginLeft:10}}>
                              {item.name} (得分：{info.score} 分)
                            </span>

                          </span>
                        </Tooltip>
                      </Timeline.Item>
                    )
                  })}
                </Timeline>
              :"啥都没有，我排个卵"}

            </Card>
          </Col>
          {/* <Col className="gutter-row" span={6}>
            <Card style={{height:301}}>
              有史以来最高排名
              {highest_rank.quiz?highest_rank.quiz.rank:""}
            </Card>
          </Col> */}

          {/* <Col className="gutter-row" span={6} >
            <Card style={{height:301,marginTop:15}}>
              有史以来最高得分
              {highest_score.quiz?highest_score.quiz.score:""}
            </Card>
          </Col> */}

        </Row>


      </div>

    );
  }
}


// export default Home
const mapStateToProps = state => {
  const { app } = state
  return {
    userInfo:app.userInfo,
    userExamInfoList:app.userExamInfoList,
    rankInfo:app.userRankInfo,
  }
}
export default connect(mapStateToProps)(Home)
