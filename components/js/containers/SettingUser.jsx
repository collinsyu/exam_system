
const Row = antd.Row;
const Col = antd.Col;
const Menu = antd.Menu;
const Icon = antd.Icon;
const Card = antd.Card;
const Form = antd.Form;
const Input = antd.Input;
const Upload = antd.Upload;
const Button = antd.Button;
const DatePicker = antd.DatePicker;
const Avatar = antd.Avatar;
const Select = antd.Select;
const Cascader = antd.Cascader;
const message = antd.message;

import { connect } from 'react-redux'
import tools from '../utils/tools'
import { returnUserInfoState } from '../actions/app'
import variables from '../utils/variables'
import moment from 'moment';
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const FormItem = Form.Item;
const Option = Select.Option;
class SettingUser extends React.Component {


  constructor(props) {
    super(props);
    this.state={
      avatar:this.props.userInfo.avatar
    }
  }
  componentDidMount(){
    tools.fixDocumentName('个人设置')
  }

  handleSubmit(){
    var _self = this;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.avatar = _self.state.avatar;
        if(values.birth){
          values.birth = moment(values.birth).format('YYYY-MM-DD')
        }


        console.log('Received values of form: ', values);
        tools.ajax({
             url: '/api/user/setuser',
             method: 'POST',
             data:JSON.stringify({values:values,id:_self.props.userInfo._id}),
             headers:{'Content-Type':'application/json'},
             async: true,
             dataType:'json'
         })
        .then(function (xhr) {
           if(xhr.response.success){
             //第一步更新当前用户信息，后台也要修改sessions中的用户
             const {dispatch} = _self.props;
             dispatch(returnUserInfoState(xhr.response.result));
             message.success("更新成功")
             window.location.pathname = "/settings"
           }

        },
        function (e) {
          console.log(JSON.stringify(e))
        })
      }
    });
  }
  render() {
    var _self = this;
    let uploadProps = {
      name: 'avatar_file',
      action: '/api/avatar',
      // data:{abc:123},//不知道啥原因，这样提交参数，后台没法解析到！！可能是插件问题
      showUploadList:false,
      onChange(info) {
        if (info.file.status === 'done') {
          message.success('上传成功，请保存')
          _self.setState({
            avatar:info.file.response.avatar
          })
        }
      },
    }
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 10 },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );
    const residences = variables.residences()||[];
    const apartments = variables.apartments()||[];
    const jobs = variables.jobs()||[];
    return (
      <Row>
        <Col span={3}></Col>
        <Col span={18} >
          <Row gutter={16} style={{paddingTop:15}}>
            <Card>
              <h1>个人设置</h1>
              <p>一些你可以自定义的信息</p>
              <Form style={{marginTop:20}}>

                <FormItem
                  label={<span style={{    fontWeight: 700,    fontSize: 14}}>简介</span>}
                  labelCol={{span:24}}
                  wrapperCol={{span:16}}
                  hasFeedback
                >
                <div>
                  <span style={{display:'inline-block',float:'left'}}>
                    <Upload {...uploadProps}
                    style={{display:'inline-block'}}>
                    {this.props.userInfo.avatar?
                      <span>
                        {this.state.avatar?
                          <Avatar style={{width:60,height:60,cursor:"pointer"}} src={this.state.avatar} />
                        :
                          <Avatar style={{width:60,height:60,cursor:"pointer"}} src={this.props.userInfo.avatar} />
                        }
                      </span>

                      :
                      <span>
                        {this.state.avatar?
                          <Avatar style={{width:60,height:60,cursor:"pointer"}} src={this.state.avatar} />
                        :
                          <Avatar style={{backgroundColor: this.props.userInfo.avatar_color,width:60,height:60,cursor:"pointer" }}>
                            <span style={{fontSize:36,marginLeft:-18,display:"block",marginTop:14}}>
                              {this.props.userInfo.name?this.props.userInfo.name.substr(0, 1).toLocaleUpperCase():""}
                            </span>

                          </Avatar>
                        }
                      </span>

                    }

                    </Upload>

                  </span>
                  <span style={{lineHeight:'70px',paddingLeft:15,}}>上传头像</span>

                </div>
                </FormItem>
                <FormItem
                {...formItemLayout}
                  label={<span style={{    fontWeight: 700,    fontSize: 14}}>姓名</span>}
                >
                  {getFieldDecorator('name', {
                    initialValue: this.props.userInfo.name,
                    rules: [{
                      required: true, message: '姓名必填!',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                  label={<span style={{    fontWeight: 700,    fontSize: 14}}>生日</span>}
                >
                  {getFieldDecorator('birth', {
                    initialValue: this.props.userInfo.birth?moment(this.props.userInfo.birth):undefined,
                  })(
                    <DatePicker />
                  )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                  label={<span style={{    fontWeight: 700,    fontSize: 14}}>性别</span>}
                >
                  {getFieldDecorator('gender', {
                    initialValue: this.props.userInfo.gender,
                  })(
                    <Select >
                      <Option value="男">男</Option>
                      <Option value="女">女</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                  label={<span style={{    fontWeight: 700,    fontSize: 14}}>密码</span>}
                >
                  {getFieldDecorator('password', {
                    initialValue: "",
                  })(
                    <Input type="password"/>
                  )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                  label={<span style={{    fontWeight: 700,    fontSize: 14}}>职位</span>}
                >
                  {getFieldDecorator('job', {
                    initialValue: this.props.userInfo.job,
                    rules: [{
                      required: true, message: '职位必填!',
                    }],
                  })(
                    <Select >
                      {jobs.map(function(job,index){
                        return(
                          <Option key={index} value={job.value}>{job.label}</Option>
                        )
                      })}
                    </Select>
                  )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label={<span style={{    fontWeight: 700,    fontSize: 14}}>邮箱</span>}
                hasFeedback
              >
                {this.props.userInfo.email}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<span style={{    fontWeight: 700,    fontSize: 14}}>电话</span>}
              >
                {getFieldDecorator('phone', {
                  initialValue: this.props.userInfo.phone,
                  rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                  <Input addonBefore={prefixSelector} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<span style={{    fontWeight: 700,    fontSize: 14}}>所在地区</span>}
              >
                {getFieldDecorator('location', {
                  // initialValue: ['浙江', '杭州', '德力西'],
                  initialValue: this.props.userInfo.location?this.props.userInfo.location.split(","):['浙江', '杭州', '德力西'],
                  rules: [{ type: 'array', required: true, message: '所在地区必填' }],
                })(
                  <Cascader displayRender={label => label.join(',')}
                    options={residences} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<span style={{    fontWeight: 700,    fontSize: 14}}>所在部门</span>}
              >
                {getFieldDecorator('apartment', {
                  // initialValue: ['仁聚汇通', '杭州事业部', '技术部'],
                  initialValue: this.props.userInfo.apartment?this.props.userInfo.apartment.split(","):['仁聚汇通', '杭州事业部', '技术部'],
                  rules: [{ type: 'array', required: true, message: '所在部门必填' }],
                })(
                  <Cascader displayRender={label => label.join(',')}
                    options={apartments} />
                )}
              </FormItem>
                <FormItem>
                  <Button style={{width:100}} type="primary"  size="large" onClick={this.handleSubmit.bind(this)}>更新</Button>
                </FormItem>
              </Form>
            </Card>
          </Row>


        </Col>
      </Row>

    );
  }
}

const mapStateToProps = state => {
  const { app } = state
  return {
    userInfo:app.userInfo,
  }
}


export default connect(mapStateToProps)(Form.create()(SettingUser))
