
import moment from 'moment'


class ScatterChart extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  componentDidUpdate(prevProps){
    if (this.props.data != prevProps.data) {
      this.refreshchart();
    }
  }
  componentDidMount(){
    if(this.props.data){
      this.refreshchart();
    }
  }
  refreshchart(){
    var _self = this;
    var data = this.props.data
    var frame = new G2.Frame(data);
    var hAvg = G2.Frame.mean(frame,'score'); // 计算体重的均值
    var wAvg = G2.Frame.mean(frame,'age'); // 计算身高均值
    var lineCfg = { // 线的配置信息
      stroke: '#94E08A'
    };
    var chart = new G2.Chart({
      id: _self.props.id,
      forceFit: true,
      height: _self.props.height
    });
    chart.source(data, {
      score: {
        alias: '得分'
      },
      age: {
        alias: '年龄'
      },
      name: {
        alias: '姓名'
      },
      gender: {
        alias: '性别'
      }
    });
    chart.tooltip({
      title: null,
      crosshairs: {
        type: 'cross'
      }
    });
    chart.point().position('age*score').color('gender', ['rgba(223, 83, 83, 0.7)', 'rgba(119, 152, 191, 0.7)']).shape('gender', ['circle', 'diamond']).size(4).tooltip('name*gender*age*score');
    chart.guide().tag([hAvg, 'min'], [hAvg, 'max'], '得分平均值: ' + hAvg.toFixed(2), {line:lineCfg});
    chart.guide().tag(['min', wAvg], ['max', wAvg], '年龄平均值: ' + wAvg.toFixed(2), {line:lineCfg});
    chart.render();
  }


  render() {
    return (
      <div>
        <div id={this.props.id}></div>
      </div>
    );
  }
}


export default ScatterChart
