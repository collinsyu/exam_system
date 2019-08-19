import moment from 'moment'
import variables from '../../utils/variables'
const Table = antd.Table;
const Input = antd.Input;
const Icon = antd.Icon;
const Badge = antd.Badge;
const Button = antd.Button;
const Tooltip = antd.Tooltip;
class ExamineesInfoTable extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      now_date:new Date(),
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
      examinees:this.props.examinees,
    }
  }

  componentDidMount(){

  }
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      examinees: this.props.examinees.map((record) => {
        const match = record.baseInfo.name.match(reg);
        if (!match) {
          return null;
        }
        console.log(match[0]);
        return {
          ...record,
          "baseInfo.name": (
            <span>
              {record.baseInfo.name.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }
  render() {
    var examinees = this.state.examinees;
    var examInfo = this.props.examInfo;
    var _self = this;
    return (
      <Table dataSource={examinees} columns={[
        {
          title: '姓名',
          dataIndex: 'baseInfo.name',
          key: 'baseInfo.name',
          filterDropdown: (
            <div className="custom-filter-dropdown">
              <Input
                ref={ele => this.searchInput = ele}
                placeholder="搜索姓名"
                value={this.state.searchText}
                onChange={this.onInputChange}
                onPressEnter={this.onSearch}
              />
              <Button type="primary" onClick={this.onSearch}>查询</Button>
            </div>
          ),
          filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
          filterDropdownVisible: this.state.filterDropdownVisible,
          onFilterDropdownVisibleChange: (visible) => {
            this.setState({
              filterDropdownVisible: visible,
            }, () => this.searchInput.focus());
          },
        },{
          title: '邮箱',
          dataIndex: 'baseInfo.email',
          key: 'baseInfo.email',
        },{
          title: '工种',
          dataIndex: 'baseInfo.job',
          key: 'baseInfo.job',
          filters: variables.jobs_filter(),
          onFilter: (value, record) => record.baseInfo.job.indexOf(value) === 0,
        },{
          title: '部门',
          dataIndex: 'baseInfo.apartment',
          key: 'baseInfo.apartment',
        },{
          title: '地区',
          dataIndex: 'baseInfo.location',
          key: 'baseInfo.location',
          filters: variables.residences_filter(),
          onFilter: (value, record) => record.baseInfo.location.indexOf(value) === 0,
        },{
          title: '分数',
          dataIndex: 'score',
          key: 'score',

        },{
          title: '状态',
          dataIndex: 'quiz_start_time',
          key: 'quiz_start_time',
          filters: [{
            text: '已参加',
            value: 'done',
          }, {
            text: '未参加',
            value: 'undone',
          }, {
            text: '考试中',
            value: 'doing',
          }, {
            text: '超时',
            value: 'overtime',
          }],
          onFilter: function(value, record){
            if(record.quiz_start_time){
              var overTime = false;
              var start = (new Date(record.quiz_start_time)).getTime(); //毫秒;
              var limit = examInfo.limit_min?examInfo.limit_min*60*1000:0;
              var count = Math.floor((start + limit - _self.state.now_date.getTime())/1000);
              if(count<-1){
                overTime = true;
              }
            }

            if(value == "done"){
              if(!record.quiz_start_time){
                return false
              }
              else{
                if(record.score != -1){
                  return true
                }
                else{
                  return false
                }
              }
            }
            else if(value == "undone"){
              if(!record.quiz_start_time){
                return true
              }
              else{
                if(record.score != -1){
                  return false
                }
                else{
                  if(overTime){
                    return true
                  }
                  else{
                    return false
                  }
                }
              }
            }
            else if(value == "doing"){
              if(!record.quiz_start_time){
                return false
              }
              else{
                if(record.score != -1){
                  return false
                }
                else{
                  if(overTime){
                    return false
                  }
                  else{
                    return true
                  }
                }
              }
            }
            else if(value == "overtime"){
              if(!record.quiz_start_time){
                return false
              }
              else{
                if(record.score != -1){
                  return false
                }
                else{
                  if(overTime){
                    return true
                  }
                  else{
                    return false
                  }
                }
              }
            }
          },
          render: (text, record, index) => {
            if(!record.quiz_start_time){
              return <Badge status="error" text="未参加" />
            }
            else{
              if(record.score != -1){
                return (
                  <Tooltip placement="top"
                    title={"开考时间："+moment(record.quiz_start_time).format("YYYY-MM-DD HH:mm:ss")}>
                    <span>
                      <Badge status="success" text="已参加" />
                    </span>
                  </Tooltip>
                )
              }
              else{
                var overTime = false;
                var start = (new Date(record.quiz_start_time)).getTime(); //毫秒;
                var limit = examInfo.limit_min?examInfo.limit_min*60*1000:0;
                var count = Math.floor((start + limit - this.state.now_date.getTime())/1000);
                if(count<-1){
                  overTime = true;
                }
                if(overTime){
                  return (
                    <Badge status="default" text={
                      <span>考试超时，手动
                        <a href="javascript:;" onClick={this.props.shudownByAdmin.bind(record)}>终止</a>
                      </span>}
                    />

                  )
                }
                else{
                  return (
                    <Tooltip placement="top"
                      title={"开考时间："+moment(record.quiz_start_time).format("YYYY-MM-DD HH:mm:ss")}>
                      <span>
                          <Badge status="processing" text="考试中..." />
                      </span>
                    </Tooltip>
                  )
                }

              }

            }
          },

        },
      ]} />
    )
  }
}



export default ExamineesInfoTable
