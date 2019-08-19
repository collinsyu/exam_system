
// import React from 'React';
// import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';

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
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;

import { connect } from 'react-redux';
import { deleteItem } from '../actions/app'
import { fetchList , returnSelectedPaper} from '../actions/paper'

const FormItem = Form.Item;
const Option = Select.Option;
class Paper extends React.Component {
  constructor(props) {
    super(props);
    const columns = [
      {
     		title: '序列',
        render: (text, record, index) => {
          return index
        }
     	},{
     		title: '试卷标题',
        dataIndex: 'title',
     	},{
     		title: '总分',
     		dataIndex: 'total_score',
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
        return (
          <span>
            {/* <Link to={"/paper/manage?id="+record._id}>编辑</Link> */}
            <a href="javascript:;" onClick={this.paperManage.bind(this,record)}>编辑</a>
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
    }
  }
  paperManage(record){
    const { dispatch } = this.props;
    console.log(record);
    dispatch(returnSelectedPaper(record));
    browserHistory.push('/paper/manage/'+record._id)
  }
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(fetchList(this.state.page))
  }
  deleteItem(obj){
    const { dispatch } = this.props
    dispatch(deleteItem(obj,'paper'))
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

  handleTableChange(pagination, filters, sorter) {
  		//console.log(pagination);
      const pager = this.state.pagination;
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
  		let newobj = this.props.form.getFieldsValue();
  		newobj.page =pagination.current ;
      this.fetch({
        //results: pagination.pageSize,
        //page: pagination.current,
  			...newobj,
        ...filters,
      });
  }
  fetch(obj) {
  	var _self = this;

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
      <div className="l-container">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch.bind(this)}
        >
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label={'试卷标题'}>
                {getFieldDecorator('title')(
                  <Input placeholder="试卷标题" />
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
          </Row>
          <Row>
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
              <Button style={{ marginLeft: 8 }} type="primary">

                <Link to={"/paper/manage"}>添加试卷</Link>
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
          // onChange={this.handleTableChange.bind(this)}
        />

      </div>
    );
  }
}



const mapStateToProps = state => {
  const { app , paper} = state
  return {
    dataSource:paper.list,
  }
}
export default connect(mapStateToProps)(Form.create()(Paper))
