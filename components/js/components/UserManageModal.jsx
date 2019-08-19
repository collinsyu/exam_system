
const Form = antd.Form;
const Modal = antd.Modal;
const Input = antd.Input;
const Cascader = antd.Cascader;
const Select = antd.Select;
const DatePicker = antd.DatePicker;
const InputNumber = antd.InputNumber;
const FormItem = Form.Item;
const Option = Select.Option;

import moment from 'moment'
import variables from '../utils/variables'
class UserManageModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleOk(e){
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // debugger
      fieldsValue._id = this.props.selectedItem._id;
      if(fieldsValue.birth){
        fieldsValue.birth = moment(fieldsValue.birth).format('YYYY-MM-DD')
      }
      this.props.handleOk(fieldsValue)
    });
  }
  render() {
    var _self = this;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
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
      <Modal title={this.props.selectedItem._id?"编辑用户":"新增用户" }
        visible={true}
        onOk={this.handleOk.bind(this)} onCancel={this.props.handleCancel}
      >
      <Form layout="horizontal">
          <FormItem
          {...formItemLayout}
            label="姓名"
          >
            {getFieldDecorator('name', {
              initialValue: this.props.selectedItem.name,
              rules: [{
                required: true, message: '姓名必填!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
          {...formItemLayout}
            label="生日"
          >
            {getFieldDecorator('birth', {
              initialValue: this.props.selectedItem.birth?moment(this.props.selectedItem.birth):undefined,
            })(
              <DatePicker />
            )}
          </FormItem>
          <FormItem
          {...formItemLayout}
            label="性别"
          >
            {getFieldDecorator('gender', {
              initialValue: this.props.selectedItem.gender,
            })(
              <Select >
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
          {...formItemLayout}
            label="职位"
          >
            {getFieldDecorator('job', {
              initialValue: this.props.selectedItem.job,
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
          label="邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            initialValue: this.props.selectedItem.email,
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: '邮箱必填!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
        {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            initialValue: "",
          })(
            <Input type="password"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="权限"
        >
          {getFieldDecorator('role', {
            initialValue: this.props.selectedItem.role||0,
            rules: [{ required: true, message: '权限必填!' }],
          })(
            <InputNumber min={0} max={100} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话"
        >
          {getFieldDecorator('phone', {
            initialValue: this.props.selectedItem.phone,
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="所在地区"
        >
          {getFieldDecorator('location', {
            // initialValue: ['浙江', '杭州', '德力西'],
            initialValue: this.props.selectedItem.location?this.props.selectedItem.location.split(","):['浙江', '杭州', '德力西'],
            rules: [{ type: 'array', required: true, message: '所在地区必填' }],
          })(
            <Cascader
              displayRender={label => label.join(',')}
              options={residences} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="所在部门"
        >
          {getFieldDecorator('apartment', {
            // initialValue: ['仁聚汇通', '杭州事业部', '技术部'],
            initialValue: this.props.selectedItem.apartment?this.props.selectedItem.apartment.split(","):['仁聚汇通', '杭州事业部', '技术部'],
            rules: [{ type: 'array', required: true, message: '所在部门必填' }],
          })(
            <Cascader
              displayRender={label => label.join(',')}
              options={apartments} />
          )}
        </FormItem>
        </Form>
      </Modal>
    );
  }
}

const UserManageModalForm = Form.create()(UserManageModal);
export default UserManageModalForm
