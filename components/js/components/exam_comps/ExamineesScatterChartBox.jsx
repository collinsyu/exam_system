
import moment from 'moment';
import Scatter from '../charts/Scatter.jsx';
import _ from 'underscore';

class PieChartBox extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      now_year:moment(new Date()).format('YYYY'),
    }
  }
  componentDidMount(){

  }


  render() {
    // var finish_nameList = finish.map(item => item.baseInfo.name+'：'+item.score+'分');

    var data = [];
    var _self = this;
    this.props.examinees.map(function(item){
      data.push({
        age:_self.state.now_year - moment(item.baseInfo.birth).format("YYYY")+1,
        score:item.score,
        gender:item.baseInfo.gender,
        name:item.baseInfo.name,
      })
    });
    // console.log(data);
    return (
      <div>
        <Scatter
          data={data}
          unit="人"
          id="score_age_gender_scatter"
          height={250}/>
      </div>
    );
  }
}


export default PieChartBox
