import moment from 'moment'

import { returnUserRankInfoState } from '../../actions/app';

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
      data:this.props.data,
    }
  }
  chooseRank(record){
    const { dispatch } = this.props;
    dispatch(returnUserRankInfoState(record))
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
      data: this.props.data.map((record) => {
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
    var data = this.state.data;
    var _self = this;
    var selectedItemId = this.props.rankInfo._id||""
    return (
      <Table dataSource={data}
        pagination={{
          pageSize:4
        }}
        columns={[
        {
          title: '考试名称',
          dataIndex: 'title',
          key: 'title',
          // filterDropdown: (
          //   <div className="custom-filter-dropdown">
          //     <Input
          //       ref={ele => this.searchInput = ele}
          //       placeholder="搜索姓名"
          //       value={this.state.searchText}
          //       onChange={this.onInputChange}
          //       onPressEnter={this.onSearch}
          //     />
          //     <Button type="primary" onClick={this.onSearch}>查询</Button>
          //   </div>
          // ),
          // filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
          // filterDropdownVisible: this.state.filterDropdownVisible,
          // onFilterDropdownVisibleChange: (visible) => {
          //   this.setState({
          //     filterDropdownVisible: visible,
          //   }, () => this.searchInput.focus());
          // },
        },{
          title: '考试时间',
          dataIndex: 'quiz.quiz_start_time',
          key: 'quiz.quiz_start_time',
          render: (text, record, index) => {
              return moment(record.quiz.quiz_start_time).format("YYYY-MM-DD HH:mm:ss")
          },
        },{
          title: '得分',
          dataIndex: 'quiz.score',
          key: 'quiz.score',
        },{
          title: '名次',
          dataIndex: 'quiz.rank',
          key: 'quiz.rank',
          render: (text, record, index) => {
            return (
              <Tooltip
                placement="top"
                title={"你打败了"+record.quiz.defeat+"% 的考生"}>
                <a href="javascript:;">第 {record.quiz.rank} 名</a>
              </Tooltip>

            )
          },
        },{
          title: '状态',
          render: (text, record, index) => {
            if(record.quiz.score>record.standard_score){
              if(record.quiz.score*0.8>record.standard_score){
                return <Badge status="success" text="优异" />
              }
              else{
                return <Badge status="warning" text="及格" />

              }
            }
            else{
              if(record.quiz.score>=0){
                return <Badge status="error" text="不及格" />
              }
              else{
                return <Badge status="default" text="缺考" />
              }
            }
          },
        },{
          title: '操作',
          render: (text, record, index) => {
            if(record._id != selectedItemId){
              return <a href="javascript:;" onClick={this.chooseRank.bind(this,record)}>点我排序</a>
            }
            else{
              return <span style={{color:'#afafaf'}}>当前排序</span>
            }
          },
        },
      ]} />
    )
  }
}



export default ExamineesInfoTable
