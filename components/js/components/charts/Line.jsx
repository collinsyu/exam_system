
import moment from 'moment'


class ScatterChart extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  componentDidUpdate(prevProps){
    if (JSON.stringify(this.props.data)!= JSON.stringify(prevProps.data)) {
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
    document.getElementById(_self.props.id).innerHTML = "";
    var data = this.props.data
    var chart = new G2.Chart({
      id: _self.props.id,
      forceFit: true,
      height: _self.props.height
    });
    chart.source(data, _self.props.axis);
    chart.tooltip(true,{ // 第一个参数是控制是否显示tooltip，可以设置为false，不显示tooltip
      // title: null,
      map: { // 用于指定 tooltip 内显示内容同原始数据字段的映射关系复制代码
        title: 'time', // 为数据字段名时则显示该字段名对应的数值，常量则显示常量
        // name: 'time', // 为数据字段名时则显示该字段名对应的数值，常量则显示常量复制代码
        // value: '数据字段名' // 为数据字段名时则显示该字段名对应的数值
      },
      // custom: true,
      // html:  '<div class="ac-tooltip" style="position:absolute;visibility: hidden;"><p class="ac-title"></p><table class="ac-list custom-table"></table></div>', // tooltip的外层模板
      // itemTpl: '<tr><td style="color:{color}">{name}</td><td>{value}</td></tr>', // 支持的字段 index,color,name,value
      // offset: 50
    });
    chart
    .line()
    .position(this.props.lines.position)
    .color(this.props.lines.params,this.props.lines.color)
    .size(2)


    chart.render();
  }

  render() {
    return (
      <div>
        <div id={this.props.id}></div>
        <style>
          {`
            .ac-tooltip{
      position:absolute;
      visibility:hidden;
      border : 1px solid #efefef;
      background-color: white;
      opacity: .8;
      padding: 5px 15px;
      transition: top 200ms,left 200ms;
      -moz-transition:  top 200ms,left 200ms;  /* Firefox 4 */
      -webkit-transition:  top 200ms,left 200ms; /* Safari 和 Chrome */
      -o-transition:  top 200ms,left 200ms;
    }
    .custom-table {
      margin: 10px;
    }
    .custom-table td{
      border: 1px solid #cdcdcd;
      padding: 5px 8px;
    }
          `}
        </style>
      </div>
    );
  }
}


export default ScatterChart
