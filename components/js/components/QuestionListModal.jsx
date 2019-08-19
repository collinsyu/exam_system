
const Modal = antd.Modal;
const Form = antd.Form;
const Row = antd.Row;
const Col = antd.Col;
const Input = antd.Input;
const Button = antd.Button;
const Icon = antd.Icon;
const Select = antd.Select;
const DatePicker = antd.DatePicker;
const Popconfirm = antd.Popconfirm;
const Table = antd.Table;

import { connect } from 'react-redux';
import { returnModalState } from '../actions/modal'
import { updateItem , addItem , deleteItem } from '../actions/app'
import { fetchList } from '../actions/question'
import QuestionModal from './QuestionModal.jsx'

const FormItem = Form.Item;
const Option = Select.Option;
class Question extends React.Component {
  constructor(props) {
    super(props);
    const columns = [
      {
     		title: '序列',
        render: (text, record, index) => {
          return index
        }
     	},{
     		title: '类型',
        render: (text, record, index) => {
          if(record.type =='sc'){
            return '单选'
          }
          else if(record.type == 'mc'){
            return '多选'
          }
          else if(record.type == 'tof'){
            return '判断'
          }
        }
     	},{
     		title: '题干',
     		dataIndex: 'describe',
     	},{
     		title: '答案',
        render: (text, record, index) => {
          var answer = record.answer || [];
          return (
            <div>
              {
                answer.map(function(item){
                  return (
                    <p style={{background:item.isRight?"#71c171":""}}>
                      {JSON.stringify(item)}
                    </p>
                  )
                })

              }
            </div>
          )
        }
     	},{
     		title: '解析',
     		dataIndex: 'explain',
     	},{
     		title: '标签',
     		dataIndex: 'label',
        render: (text, record, index) => {
          return (
            record.label.join(',')
          )
        }
     	},{
     		title: '创建者',
        render: (text, record, index) => {
          return (
            record.creator.name
          )
        }
     	},{
      title: '操作',
      key: 'operation',
      render: (text, record, index) => {
        // console.log(this.props.subjects);
        // console.log(record._id);
        var judge = this.props.subjects.join(',').indexOf(record._id) != -1;
        return (
          <span>
            <a onClick={this.showModal.bind(this,"modify",record)}>编辑</a>
            <span className="ant-divider"></span>
            {/* <Popconfirm title="确定删除本条数据?"
              onConfirm={this.deleteItem.bind(this,record)}
              okText="确定"
              cancelText="取消">
              <a href="javascript:;">删除</a>
            </Popconfirm>
            <span className="ant-divider"></span> */}

            {judge?
      			  <a href='javascript:;' style={{color:'red'}} onClick={this.removeQuestionToPaper.bind(this,record)}>取消</a>
      			:
      			  <a onClick={this.addQuestionToPaper.bind(this,record)}>添加</a>

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
  removeQuestionToPaper(obj){
    this.props.removeQuestionToPaper(obj)
  }
  addQuestionToPaper(obj){
    this.props.addQuestionToPaper(obj)
  }
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(fetchList(this.state.page))
  }
  deleteItem(obj){
    const { dispatch } = this.props
    dispatch(deleteItem(obj,'question'))
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
  handleOk(e){
    console.log(e);
    const { dispatch } = this.props
    if(e._id){
      dispatch(updateItem(e,'question'))
    }
    else{
      dispatch(addItem(e,'question'))
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
    return (
      <Modal title={"题库列表" }
        visible={true}
        width="80%"
        style={{ top: 0 }}
        footer={null}
        // okText="提交"
        // onOk={this.handleOk.bind(this)}
        onCancel={this.props.handleCancel.bind(this)}
      >
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch.bind(this)}
        >
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'类型'}>
                {getFieldDecorator('type')(
                  <Select placeholder="请输入类型">
                    <Option value="">全部</Option>
                    <Option value="sc">单选题</Option>
                    <Option value="mc">多选题</Option>
                    <Option value="tof">判断题</Option>
                  </Select>
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
              <FormItem {...formItemLayout} label={'题目'}>
                {getFieldDecorator('describe')(
                  <Input placeholder="题目" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'标签'}>
                {getFieldDecorator('label')(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="输入添加新标签"
                  >

                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'时间上限'}>
                {getFieldDecorator('start')(
                  <DatePicker format="YYYY-MM-DD"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'时间下限'}>
                {getFieldDecorator('end')(
                  <DatePicker format="YYYY-MM-DD"/>
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
                onClick={this.showModal.bind(this,'add',{})}>手动添加</Button>
            </Col>
          </Row>
        </Form>
        <Table
          style={{marginTop:10}}
          bordered={true}
          rowKey="_id"
          columns={this.state.columns}
          dataSource={this.props.dataSource}
          pagination={pagination}
        />


        {this.props.visible?
          <QuestionModal
            handleOk={this.handleOk.bind(this)}
            handleCancel ={this.handleCancel.bind(this) }
            selectedItem={this.state.selectedItem}/>
        :null}
      </Modal>
    );
  }
}


// export default Question
const mapStateToProps = state => {
  const { app , modal , question} = state
  return {
    visible:modal.visible,
    dataSource:question.list,
  }
}
export default connect(mapStateToProps)(Form.create()(Question))
