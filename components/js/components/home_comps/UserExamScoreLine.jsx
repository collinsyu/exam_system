
import moment from 'moment';
import Line from '../charts/Line.jsx';
import _ from 'underscore';

class UserExamScoreLine extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  componentDidMount(){
  }


  render() {
    var data = [];
    this.props.data.map(function(item,index){
      var time = moment(item.quiz.quiz_start_time).format("YYYY-MM-DD HH:mm:ss");
      data.push({
        score: item.quiz.score,
        time: time,
        type:"我的分数",
        index
      },{
        score: item.average_score,
        time: time,
        type:"平均分",
        index
      })
    });
    // console.log(JSON.stringify(data));
    return (
      <div>
        {/* <h1 style={{textAlign:"center"}}>历史成绩</h1> */}
        <Line
          data={data}
          unit="分"
          id="user_score_line"
          axis={{
            score: {
              alias: '分数',
            },
            time: {
              alias: '日期'
            },
            index: {
              alias: '序数',
              range:[0,1],
            },
            type:{
              alias: '分类',
              type:'cat'
            }
          }}
          lines={
            {
              position:"index*score*time",
              color:['#ff7f0e','#2ca02c'],
              params:"type",
              tooltip:"score*time"
            }

          }
          height={250}/>
      </div>
    );
  }
}


export default UserExamScoreLine
