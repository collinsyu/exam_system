
const Modal = antd.Modal;
const Form = antd.Form;
const Row = antd.Row;
const Col = antd.Col;
const Input = antd.Input;
const Button = antd.Button;
const Icon = antd.Icon;
const message = antd.message;
const Upload = antd.Upload;
const Select = antd.Select;
const DatePicker = antd.DatePicker;
const Popconfirm = antd.Popconfirm;
const Cascader = antd.Cascader;
const Table = antd.Table;

import moment from 'moment'
import { connect } from 'react-redux';
import { returnModalState } from '../actions/modal'
import { updateItem , addItem , deleteItem } from '../actions/app'
import { fetchList } from '../actions/user'
import UserManageModal from '../components/UserManageModal.jsx'
import variables from '../utils/variables'

const FormItem = Form.Item;
const Option = Select.Option;
class UserManage extends React.Component {
  constructor(props) {
    super(props);
    var now_year = moment(new Date()).format('YYYY');
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
     		title: '性别',
     		dataIndex: 'gender',
     	},{
     		title: '年龄',
        render: (text, record, index) => {
          var birth_year = record.birth?moment(record.birth).format('YYYY'):0;
          // var now_year = moment(new Date()).format('YYYY');
          var age = now_year - birth_year + 1
          return (
            age
          )
        }
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
        return (
          <span>
      			  <a href='javascript:;' onClick={this.showModal.bind(this,"modify",record)}>编辑</a>
              <span className="ant-divider"></span>
              <Popconfirm title="确定删除本条数据?"
                onConfirm={this.deleteItem.bind(this,record)}
                okText="确定"
                cancelText="取消">
                <a href="javascript:;">删除</a>
              </Popconfirm>
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
      selectedItem:{},

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

  showModal(type,data){
    const { dispatch } = this.props
    dispatch(returnModalState(true));
    this.setState({
      selectedItem:data
    });
  }
  handleCancel(){
    const { dispatch } = this.props
    dispatch(returnModalState(false));
    this.setState({
      selectedItem:{}
    });
  }
  handleOk(e){
    console.log(e);
    const { dispatch } = this.props
    if(e._id){
      dispatch(updateItem(e,'user'))
    }
    else{
      dispatch(addItem(e,'user'))
    }
  }
  deleteItem(obj){
    const { dispatch } = this.props
    dispatch(deleteItem(obj,'user'))
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
    const uploadUserListProps = {
      name: 'name_list',
      action: '/api/user/name_list',
      headers: {
        authorization: 'authorization-text',
      },
      showUploadList:false,

      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const residences = variables.residences()||[];
    const apartments = variables.apartments()||[];
    const jobs = variables.jobs()||[];
    return (
      <div className="l-container">
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
                  <Cascader
                    displayRender={label => label.join(',')}
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
                    {jobs.map(function(job,index){
                      return(
                        <Option key={index} value={job.value}>{job.label}</Option>
                      )
                    })}
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
              <Button style={{ marginLeft: 8 }} onClick={this.showModal.bind(this,'add',{})}>
                添加
              </Button>
              <Upload {...uploadUserListProps}>
                <Button style={{ marginLeft: 8 }}>
                  批量添加
                </Button>
              </Upload>

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
          <UserManageModal
          handleOk={this.handleOk.bind(this)}
          handleCancel ={this.handleCancel.bind(this)}
          selectedItem={this.state.selectedItem}
          />
        :null}
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { modal ,user} = state
  return {
    dataSource:user.list,
    visible:modal.visible,
  }
}
export default connect(mapStateToProps)(Form.create()(UserManage))
