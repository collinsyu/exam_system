
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
const Cascader = antd.Cascader;
const Table = antd.Table;

import { connect } from 'react-redux';
import { fetchList } from '../actions/user'

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
     		title: '用户名',
     		dataIndex: 'name',
     	},{
     		title: '职位',
     		dataIndex: 'job',
     	},{
     		title: '邮箱',
     		dataIndex: 'email',
     	},{
     		title: '所属部门',
     		dataIndex: 'apartment',
     	},{
      title: '操作',
      key: 'operation',
      render: (text, record, index) => {
        var judge = this.props.examinees.join(',').indexOf(record._id) != -1;
        return (
          <span>
            {judge?
      			  <a href='javascript:;' style={{color:'red'}} onClick={this.props.removeUserToExam.bind(this,record)}>取消</a>
      			:
      			  <a onClick={this.props.addUserToExam.bind(this,record)}>添加</a>
      			}
          </span>
        )
      }
    }];
    this.state={
      columns: columns,
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
    const apartments = [{
        value: '仁聚汇通',
        label: '仁聚汇通',
        children: [{
          value: '杭州事业部',
          label: '杭州事业部',
          children: [{
            value: '技术部',
            label: '技术部',
          },{
            value: '后勤',
            label: '后勤',
          }],
        },
        {
          value: '北京总部',
          label: '北京总部',
          children: [{
            value: '技术部',
            label: '技术部',
          },{
            value: '后勤',
            label: '后勤',
          }],
        },
        {
          value: '上海部门',
          label: '上海部门',
          children: [{
            value: '技术部',
            label: '技术部',
          },{
            value: '后勤',
            label: '后勤',
          }],
        }
      ],
      }];
    return (
      <Modal title={"用户列表" }
        visible={true}
        width="80%"
        style={{ top: 0 }}
        footer={null}
        onCancel={this.props.handleCancel.bind(this)}
      >
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch.bind(this)}
        >
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'用户名'}>
                {getFieldDecorator('name')(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'邮箱'}>
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: '请输入正确邮箱格式!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'部门'}>
                {getFieldDecorator('apartment')(
                  <Cascader displayRender={label => label.join(',')}
                    options={apartments} placeholder="请选择部门"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'职位'}>
                {getFieldDecorator('job')(
                  <Select >
                    <Option value="JAVA工程师">JAVA工程师</Option>
                    <Option value="前端工程师">前端工程师</Option>
                    <Option value="会计">会计</Option>
                    <Option value="助理">助理</Option>
                  </Select>
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
              <Button style={{ marginLeft: 8 }} onClick={this.props.addAll.bind(this,this.props.dataSource)}>
                添 加 全 部
              </Button>
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
      </Modal>
    );
  }
}


// export default Question
const mapStateToProps = state => {
  const { app ,user} = state
  return {
    dataSource:user.list,
  }
}
export default connect(mapStateToProps)(Form.create()(Question))
