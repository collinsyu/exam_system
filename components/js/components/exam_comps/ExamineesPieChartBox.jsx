
import moment from 'moment';
import Pie from '../charts/Pie.jsx';
import _ from 'underscore';

class ScoreChartBox extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  componentDidMount(){

  }


  render() {
    // console.log(this.props.examinees);
    // var unfinish = _.filter(this.props.examinees, function(item){ return !item.answers });
    // var finish = _.filter(this.props.examinees, function(item){ return item.answers });
    // var unfinish_nameList = unfinish.map(item => item.baseInfo.name+'：'+item.score+'分');
    // var finish_nameList = finish.map(item => item.baseInfo.name+'：'+item.score+'分');
    // var data = [
    //   {name:"未参加",value:unfinish.length,title:unfinish_nameList.join("\n")},
    //   {name:"已参加",value:finish.length,title:finish_nameList.join("\n")},
    // ]
    var data = [];
    var paper = this.props.paper||{};
    var subjects_num = paper.subjects.length;
    var total_score = paper.total_score;
    var group = 4;

    if(subjects_num<4){
      group = subjects_num+1
    }

    var interval_num = parseInt(total_score/group);
    for (var i = 0; i < group; i++) {
      var down = -1 + i*interval_num+i;
      var up = down+interval_num;
      var value_arr = _.filter(this.props.examinees, function(item){ return item.score>=down&&item.score<=up });
      var value_nameList = value_arr.map(item => item.baseInfo.name+'：'+item.score+'分');

      data.push({
        name:down+"~"+up+"分",
        value:value_arr.length,
        title:value_nameList.join("\n")
      })
    }
    return (
      <div>
        <Pie
          data={data}
          unit="人"
          id="join_vs_unjoin"
          height={250}/>
      </div>
    );
  }
}


export default ScoreChartBox
