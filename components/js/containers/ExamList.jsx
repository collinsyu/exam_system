
// import React from 'React';
// import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';

const Form = antd.Form;
const Row = antd.Row;
const Col = antd.Col;
const Input = antd.Input;
const Badge = antd.Badge;
const Button = antd.Button;
const Icon = antd.Icon;
const Select = antd.Select;
const DatePicker = antd.DatePicker;
const Popconfirm = antd.Popconfirm;
const Table = antd.Table;

import { connect } from 'react-redux';
import { returnModalState } from '../actions/modal'
import { updateItem , addItem , deleteItem } from '../actions/app'
import { fetchList } from '../actions/exam'
import ExamModal from '../components/ExamModal.jsx'
import moment from 'moment'


const FormItem = Form.Item;
const Option = Select.Option;
class ExamList extends React.Component {
  constructor(props) {
    super(props);
    const columns = [
      {
     		title: '序列',
        render: (text, record, index) => {
          return index
        }
     	},{
     		title: '考试名称',
     		dataIndex: 'title',
        render: (text, record, index) => {
          return <a href={"/exam/"+record._id}>{record.title}</a>
        }
     	},{
     		title: '试卷名称',
     		dataIndex: 'paper.title',
     	},{
     		title: '考试说明',
     		dataIndex: 'note',
     	},{
     		title: '及格分数',
     		dataIndex: 'standard_score',
     	},{
     		title: '答卷时间（min）',
     		dataIndex: 'limit_min',
     	},{
     		title: '考试时间',
        render: (text, record, index) => {
          // return moment(record.examTime.start).format('YYYY-MM-DD HH:mm:ss') +'~'+moment(record.examTime.end).format('YYYY-MM-DD HH:mm:ss')
          return moment(record.examTime.start).format('YYYY-MM-DD') +'~'+moment(record.examTime.end).format('YYYY-MM-DD')
        }
     	},{
     		title: '状态',
        render: (text, record, index) => {
          if(record.status == 0){
            return <Badge status="warning" text="未发布" />
          }
          else if(record.status == 1){
            return <Badge status="success" text="已发布" />
          }
        }
     	},{
     		title: '作者',
     		dataIndex: 'creator.name',
     	},{
      title: '操作',
      key: 'operation',
      render: (text, record, index) => {
        return (
          <span>
            {record.status?null:
              <a onClick={this.showModal.bind(this,"modify",record)}>编辑</a>
            }
            {record.status?null:
              <span className="ant-divider"></span>
            }

            <Popconfirm title="确定删除本条数据?"
              onConfirm={this.deleteItem.bind(this,record)}
              okText="确定"
              cancelText="取消">
              <a href="javascript:;">删除</a>
            </Popconfirm>
            {record.status?null:
              <span className="ant-divider"></span>
            }
            {record.status?null:
              <a onClick={this.publishExam.bind(this,"modify",record)}>发布</a>
            }
          </span>
        )
      }
    }];
    this.state={
      columns: columns,
      selectedItem:{},
      page: {
        pageSize:10,
        current:1,
      },
    }
  }
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(fetchList(this.state.page))
  }
  deleteItem(obj){
    const { dispatch } = this.props
    dispatch(deleteItem(obj,'exam'))
  }
  handleReset(){
    const { dispatch } = this.props;
    this.props.form.resetFields();
    dispatch(fetchList(this.state.page))

  }
  handleSearch(e){
    e.preventDefault();
    const { dispatch } = this.props
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      var page = this.state.page;
      page.current = 1
      this.setState({page:page});
      if(values.start){values.start = values.start.format('YYYY-MM-DD 00:00:00')}
      if(values.end){values.end = values.end.format('YYYY-MM-DD 23:59:59')}
      dispatch(fetchList(Object.assign(values,page)))

    });
  }
  commonSearch(page){
    const { dispatch } = this.props
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      this.setState({page:page});
      if(values.start){values.start = values.start.format('YYYY-MM-DD 00:00:00')};
      if(values.end){values.end = values.end.format('YYYY-MM-DD 23:59:59')};
      dispatch(fetchList(Object.assign(values,page)))
    });
  }
  showModal(type,data){
    const { dispatch } = this.props
    dispatch(returnModalState(true));
    this.setState({
      selectedItem:data
    });
  }
  handleCancel(){
    const { dispatch } = this.props
    dispatch(returnModalState(false))
  }
  publishExam(type,obj){
    const { dispatch } = this.props
    console.log(obj);
    dispatch(updateItem({
      _id:obj._id,
      status: 1,
    },'exam'))

  }
  handleOk(e){
    console.log(e);
    const { dispatch } = this.props
    if(e._id){
      dispatch(updateItem(e,'exam'))
    }
    else{
      dispatch(addItem(e,'exam'))
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    var _self = this;
    const page = this.state.page;
    const length = this.props.dataSource.length || 0;
    const total = (page.current - 1) * page.pageSize + 1 + length;
    const pagination = {
        total: total,
        current: page.current,
        pageSize: page.pageSize,
        showSizeChanger: true,
        onShowSizeChange: function (current, pageSize) {
            _self.commonSearch({'current': current, 'pageSize': pageSize})
        },
        onChange: function (current) {
            _self.commonSearch( {'current': current, 'pageSize': page.pageSize})
        }
    };
    var dataSource = this.props.dataSource;

    return (
      <div className="l-container">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch.bind(this)}
        >
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'考试名称'}>
                {getFieldDecorator('title')(
                  <Input placeholder="考试名称" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'创建人'}>
                {getFieldDecorator('creator')(
                  <Input placeholder="创建人" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>

              <FormItem {...formItemLayout} label={'状态'}>
                {getFieldDecorator('status')(
                  <Select placeholder="状态">
                    <Option value="">全部</Option>
                    <Option value="disable">正常</Option>
                    <Option value="enable">禁用</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>

            <Col span={8}>
              <FormItem {...formItemLayout} label={'时间上限'}>
                {getFieldDecorator('start')(
                  <DatePicker format="YYYY-MM-DD" placeholder="创建时间上限"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'时间下限'}>
                {getFieldDecorator('end')(
                  <DatePicker format="YYYY-MM-DD" placeholder="创建时间下限"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">搜 索</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset.bind(this)}>
                清 空
              </Button>
              <Button style={{ marginLeft: 8 }} type="primary"
                onClick={this.showModal.bind(this,'add',{})}>创建考试</Button>
            </Col>
          </Row>
        </Form>
        <Table
          style={{marginTop:10}}
          bordered={true}
          rowKey="_id"
          columns={this.state.columns}
          dataSource={dataSource}
          pagination={pagination}
        />


        {this.props.visible?
          <ExamModal
            handleOk={this.handleOk.bind(this)}
            handleCancel ={this.handleCancel.bind(this) }
            selectedItem={this.state.selectedItem}/>
        :null}
      </div>
    );
  }
}


// export default Question
const mapStateToProps = state => {
  const { app , modal ,exam} = state
  return {
    visible:modal.visible,
    dataSource:exam.list,
  }
}
export default connect(mapStateToProps)(Form.create()(ExamList))
