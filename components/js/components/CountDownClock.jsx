import moment from 'moment';
import { submitExam } from '../actions/quiz';
const Icon = antd.Icon;

class CountDownClock extends React.Component {

  constructor(props) {
    super(props);
    var start = (new Date(this.props.start_time)).getTime(); //毫秒;
    var limit = this.props.limit*60*1000;
    var count = Math.floor((start + limit - (new Date()).getTime())/1000)
    this.state = {
      limit:this.props.limit,//限时 分钟单位
      start_time:this.props.start_time, // 开始考试时间；
      count:count,
      count_label:"59:59:59",
    };
  }

  componentDidMount(){
    this.start();
  }
  componentWillUnmount(){
    this.stop();
  }
  stop() {
    clearInterval(this.interval);
  }
  start() {
    this.stop();
    this.interval = setInterval(()=> {
        var count = this.state.count - 1;

        if (count == -1) {
            alert('考试时间结束，禁止答题');
            // debugger //这里还有问题，报错找不到，待测试
            console.log(this.props);
            this.stop();
            if(this.props.from === "quiz"){
              this.props.countDownToLimitSubmit()
            }
            else{
              const { dispatch } = this.props;
              var exam_id = this.props.exam_id;
              dispatch(submitExam({exam_id:exam_id,answers:JSON.stringify({})}));
            }
        }else{
          var count_label = this.state.count_label;
          // debugger
          var days = parseInt(count / 60 / 60 / 24 , 10); //计算剩余的天数
          days = days<10?"0"+days:days
          var hours = parseInt(count / 60 / 60 % 24 , 10); //计算剩余的小时
          hours = hours<10?"0"+hours:hours
          var minutes = parseInt(count / 60 % 60, 10);//计算剩余的分钟
          minutes = minutes<10?"0"+minutes:minutes
          var seconds = parseInt(count % 60, 10);//计算剩余的秒数 ;
          seconds = seconds<10?"0"+seconds:seconds
          count_label = hours+":"+minutes+":"+seconds;
          this.setState({count,count_label});
        }

    }, 1000);
  }


  render() {

    return (
        <span style={{    "color": "#ff5800"}}>
          {this.state.count_label}
        </span>
    );
  }
}



export default CountDownClock
