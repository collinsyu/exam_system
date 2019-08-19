
const Form = antd.Form;
const Modal = antd.Modal;
const Input = antd.Input;
const Cascader = antd.Cascader;
const Select = antd.Select;
const InputNumber = antd.InputNumber;
const Radio = antd.Radio;
const Table = antd.Table;
const message = antd.message;
const Button = antd.Button;
const Row = antd.Row;
const Avatar  = antd.Avatar ;
const Tooltip  = antd.Tooltip ;
const Col = antd.Col;
const DatePicker = antd.DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;


import tools from '../utils/tools'
import { connect } from 'react-redux';
import UserListModal from './UserListModal.jsx'
import { returnModalState_1} from '../actions/modal'
import _ from 'underscore'
import moment from 'moment';


let timeout;
function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  function fake() {
    tools.ajax({
         url: '/api/paper/fuzzy',
         method: 'POST',
         data:JSON.stringify({keyword:value}),
         headers:{'Content-Type':'application/json'},
         async: true,
         dataType:'json'
     })
    .then(function (xhr) {
       if(xhr.response.success){
         callback(xhr.response.results);
       }
       else{

       }
    },
    function (e) {
      console.log(JSON.stringify(e))
    })
  }

  timeout = setTimeout(fake, 300);
}

class Contents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      paperList:[],
      paperDataSource:[],
      standard_score_limit:null,
      examinees:[],
    };
  }
  handleCancel(){
    const { dispatch } = this.props
    dispatch(returnModalState_1(false))
  }
  showModal(type){
    const { dispatch } = this.props
    return dispatch(returnModalState_1(true));
  }
  packageFrom(){
    var obj;
    this.props.form.validateFields((err, fieldsValue) => {

      if (err) {
        return console.log(err);
      }
      if(!this.state.examinees.length){
        return message.error("请选择参考人员");
      }
      fieldsValue._id = this.props.selectedItem._id;

      fieldsValue.start = fieldsValue["range-picker"][0].format('YYYY-MM-DD 00:00:00');
      fieldsValue.end = fieldsValue["range-picker"][1].format('YYYY-MM-DD 23:59:59');
      delete fieldsValue["range-picker"];
      fieldsValue.examinees = [];
      this.state.examinees.map(function(item){
        fieldsValue.examinees.push({baseInfo:item._id})
      })
      console.log(fieldsValue);
      obj = fieldsValue
      return;
    });
    return obj;
  }
  saveExam(){
    var obj = this.packageFrom();
    if(obj){
      this.props.handleOk(obj)
    }
  }
  publishExam(){
    var obj = this.packageFrom();
    var _self = this;
    if(obj){
      Modal.confirm({
        title: '确定发布？',
        content: '考试一经发布，禁止再次编辑修改，请慎重选择。',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          obj.status = 1
          _self.props.handleOk(obj)
        },
      });

    }
  }
  componentDidMount(){

    var _self = this;
    var selected = this.props.selectedItem;
    var examinees = selected.examinees;
    var paperDataSource = [];
    paperDataSource.push(selected.paper)
    // console.log(paperDataSource);
    if(examinees){
      this.setState({examinees:examinees.map(item=>item.baseInfo),paperDataSource})
    }

  }
  updatePaperId(id,option){
    var paperDataSource = [];
    var standard_score_limit = option.props.paper_obj.total_score
    paperDataSource.push(option.props.paper_obj);
    console.log(paperDataSource);
    this.props.form.setFieldsValue({
      paper: id,
    });
    this.setState({paperDataSource,standard_score_limit})
  }
  searchPaper(value){
    if(value){
      if(value.trim()){
        fetch(value, paperList  => this.setState({ paperList }));
      }
    }
  }
  addUserToExam(obj){
    var examinees = this.state.examinees;
    examinees.push(obj);
    this.setState({examinees})
  }
  addAll(array){
    console.log('点击了',array);
    var examinees = this.state.examinees;
    examinees = examinees.concat(array);
    examinees = _.uniq(examinees,"_id");
    this.setState({examinees})

  }
  removeUserToExam(obj){
    var oldexaminees = this.state.examinees;
    var examinees = [];
    oldexaminees.map(function(item){
      if(item._id != obj._id){
        examinees.push(item);
      };
    });
    this.setState({examinees})
  }
  render() {
    var _self = this;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    // console.log(this.props.selectedItem);
    const selectedItem = this.props.selectedItem;
    getFieldDecorator('paper', { initialValue: this.state.paperDataSource[0]?this.state.paperDataSource[0]._id:"",rules: [{ required: true }]});
    const options = this.state.paperList.map(d => <Option value={d._id} key={d._id} paper_obj={d}>

                                              {/* <span className="selectOptionsTitle" > */}
                                                {d.title +'（'+ (d.creator?d.creator.name:"") +'）'}
                                                {/* {d.title}({d.creator?d.creator.name:""}) */}
                                              {/* </span> */}
                                            </Option>);
    if(this.state.paperDataSource[0]){
      var dd = this.state.paperDataSource[0];
      options.push(
        <Option value={dd._id} key={dd._id} paper_obj={dd}>
            {dd.title +'（'+ (dd.creator?dd.creator.name:"") +'）'}
        </Option>
      )
    }
                                            console.log(this.state.paperDataSource);
    return (
      <Modal title={this.props.selectedItem._id?"编辑考试":"新增考试" }
        visible={true}
        width="80%"
        onCancel={this.props.handleCancel.bind(this)}
        footer={
          <div>
            <Button onClick={this.props.handleCancel.bind(this)}>取消</Button>
            <Button type="primary" onClick={this.publishExam.bind(this)}>发布</Button>
            <Button onClick={this.saveExam.bind(this)}>保存</Button>
          </div>
        }

      >
        <Form layout="horizontal">
          <FormItem
          {...formItemLayout}
            label="选择试卷"
          >
            <Select
              style={{width:280}}
              mode="combobox"
              allowClear
              optionLabelProp="children"
              placeholder="搜索试卷标题或创建人"
              notFoundContent="未找到"
              onSelect={this.updatePaperId.bind(this)}
              defaultActiveFirstOption={false}
              value={this.state.paperDataSource[0]?this.state.paperDataSource[0]._id:""}
              showArrow={false}
              filterOption={false}
              onSearch={this.searchPaper.bind(this)}
            >
              {options}
            </Select>
          </FormItem>
          {this.state.paperDataSource.length?
            <Row>
              <Col span={12} offset={3}>
                <Table
                  dataSource={this.state.paperDataSource}
                  pagination={false}
                  bordered
                  size="small"
                  columns={[{
                    title: '试卷标题',
                    dataIndex: 'title',
                    key: 'title',
                  }, {
                    title: '总分',
                    dataIndex: 'total_score',
                    key: 'total_score',
                  }, {
                    title: '创建者',
                    render: (text, record, index) => {
                      return (
                        record.creator.name
                      )
                    }
                  },]} />
              </Col>
            </Row>
          :null}

          <FormItem
            label="考试名称"
            {...formItemLayout}
          >
            {getFieldDecorator('title', {
              initialValue:selectedItem.title,
              rules: [{ required: true, message: '考试名称必填！' }],
            })(
              <Input placeholder='考试名称'/>
            )}
          </FormItem>
          <FormItem
          {...formItemLayout}
            label="考试说明"
          >
            {getFieldDecorator('note', {
              initialValue:selectedItem.note,
            })(
              <TextArea  autosize={{ minRows: 2, maxRows: 6 }} placeholder='考试说明'/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="考试时间"
          >
            {getFieldDecorator('range-picker', {
              initialValue:selectedItem._id?[moment(selectedItem.examTime.start),moment(selectedItem.examTime.end) ]:"",
              rules: [{ type: 'array', required: true, message: '考试时间必填！' }],
            })(
              <RangePicker />
            )}
          </FormItem>
          <FormItem
          {...formItemLayout}
            label="及格分数"
          >
            {getFieldDecorator('standard_score', {
              initialValue:selectedItem.standard_score?selectedItem.standard_score:(this.state.standard_score_limit?this.state.standard_score_limit/2:0),
              rules: [{ required: true, message: '及格分数必填！' }],
            })(
              <InputNumber  min={0} max={this.state.standard_score_limit}/>
            )}

          </FormItem>
          <FormItem
          {...formItemLayout}
            label="答卷时间"
          >
            {getFieldDecorator('limit_min', {
              initialValue:selectedItem.limit_min?selectedItem.limit_min:60,
              rules: [{ required: true, message: '答卷时间必填！' }],
            })(
              <InputNumber  min={0}/>
            )}
            min
          </FormItem>
          <FormItem
          {...formItemLayout}
            label="参考人员"
          >
            {/* <Button>选择部门</Button> */}
            <Button onClick={this.showModal.bind(this)}>选择人员</Button>
            {/* <Button style={{ marginLeft: 8 }}>选择人员</Button> */}
          </FormItem>
        </Form>

        {this.state.examinees.length?
          <Row>
            <Col span={12} offset={3}>
              {this.state.examinees.map(function(item){
                return (
                  <a href="javascript:;" style={{marginLeft:8}}>
                  <Tooltip placement="top" title={item.name+'（'+ item.email +'）'}>
                      {item.avatar?
                        <Avatar src={item.avatar} />
                      :
                        <Avatar style={{ color: '#fff', backgroundColor: item.avatar_color }}>{item.name.substr(0, 1).toLocaleUpperCase()}</Avatar>
                      }
                  </Tooltip>
                </a>
                )
              })}
            </Col>
          </Row>

        :null}
        {this.props.pi_visible?
          <UserListModal
            addUserToExam={this.addUserToExam.bind(this)}
            addAll={this.addAll.bind(this)}
            removeUserToExam={this.removeUserToExam.bind(this)}
            handleCancel={this.handleCancel.bind(this) }
            examinees={this.state.examinees.map(item=>item._id)}
          />
        :null}
      </Modal>
    );
  }
}


const mapStateToProps = state => {
  const { app , modal ,paper} = state
  return {
    pi_visible:modal.visible_1
  }
}
export default connect(mapStateToProps)(Form.create()(Contents))
