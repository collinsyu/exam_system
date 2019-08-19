
import moment from 'moment'


class PieChart extends React.Component {
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
    var data = this.props.data||[];
    var Stat = G2.Stat;
    var chart = new G2.Chart({
      id: this.props.id,
      forceFit: true,
      height: this.props.height,
    });
    chart.source(data);
    // 重要：绘制饼图时，必须声明 theta 坐标系
    chart.coord('theta', {
      radius: 0.8 // 设置饼图的大小
    });
    chart.legend('name', {
      position: 'bottom',
      itemWrap: true,
      formatter: function(val) {
        for(var i = 0, len = data.length; i < len; i++) {
          var obj = data[i];
          if (obj.name === val) {
            return val + ': ' + obj.value + _self.props.unit;
          }
        }
      }
    });
    chart.tooltip({
      title: null,

      map: {
        value: 'title' // 为数据字段名时则显示该字段名对应的数值
      }
    });
    chart.intervalStack()
      .position(Stat.summary.percent('value'))
      .color('name')
      .label('name*value*title*..percent',function(name, value,title,percent){

      percent = (percent * 100).toFixed(2) + '%';
      return name + ' ' + percent ;
    });
    chart.render();
    // 设置默认选中
    var geom = chart.getGeoms()[0]; // 获取所有的图形
    var items = geom.getData(); // 获取图形对应的数据
    geom.setSelected(items[1]); // 设置选中
  }



  render() {
    return (
      <div>
        <div id={this.props.id}></div>
      </div>
    );
  }
}


export default PieChart
