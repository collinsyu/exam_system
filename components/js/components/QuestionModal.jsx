
const Form = antd.Form;
const Modal = antd.Modal;
const Input = antd.Input;
const Cascader = antd.Cascader;
const Select = antd.Select;
const InputNumber = antd.InputNumber;
const Radio = antd.Radio;
const message = antd.message;

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

import SingleChoice from './SingleChoice.jsx';
import MultiChoice from './MultiChoice.jsx';
class Contents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleOk(e){
    this.props.form.validateFields((err, fieldsValue) => {

      if (err) {
        return console.log(err);
      }
      // debugger
      fieldsValue._id = this.props.selectedItem._id;

      if(fieldsValue.type == 'sc'||fieldsValue.type == 'mc'){
        if(!fieldsValue.keys.length){
          return message.error('至少有一个选项');
        }
      }
      console.log(fieldsValue);
      //这里处理选项的数据
      if(fieldsValue.type == 'sc'){
        debugger
        var answer = [];
        // answer.push({label:fieldsValue.answer_atleast,isRight:fieldsValue.right_key==='atleast'?true:false})
        if(fieldsValue.right_key == undefined ||fieldsValue.right_key == null){
          return message.error('请选择一项正确的');
        }
        fieldsValue.keys.map(function(item){
          if(item.value == fieldsValue.right_key){
            answer.push({
              label:fieldsValue['answer_'+item.value],
              isRight:true
            })
          }
          else{
            answer.push({
              label:fieldsValue['answer_'+item.value],
              isRight:false
            })
          }
          delete fieldsValue['answer_'+item.value]
        });

        delete fieldsValue.keys;
        delete fieldsValue.right_key;
        fieldsValue.answer = answer


      }
      else if(fieldsValue.type == 'mc'){
        var answer = [];
        // debugger
        var mc_none_true = false;
        // answer.push({label:fieldsValue.names_atleast,isRight:fieldsValue.prefix_atleast})
        delete fieldsValue.right_key;
        fieldsValue.keys.map(function(item){
          answer.push({
            label:fieldsValue['names_'+item.value],
            isRight:fieldsValue['prefix_'+item.value]||false,
          })
          if(fieldsValue['prefix_'+item.value]){
            mc_none_true = fieldsValue['prefix_'+item.value];
          }
          delete fieldsValue['names_'+item.value]
          delete fieldsValue['prefix_'+item.value]
        });
        delete fieldsValue.keys;
        if(!mc_none_true){
          return message.error('请选择一项正确的');
        }
        fieldsValue.answer = answer;
      }
      else if(fieldsValue.type == 'tof'){
        //判断题
        var answer = [];
        answer.push({label:"正确",isRight:fieldsValue.answer_tof == true})
        answer.push({label:"错误",isRight:fieldsValue.answer_tof == false});
        delete fieldsValue.keys;
        delete fieldsValue.answer_tof;
        fieldsValue.answer = answer

      }
      console.log('处理后',fieldsValue);
      this.props.handleOk(fieldsValue)
    });
  }
  handleCancel(e){
    this.props.handleCancel()
  }
  componentDidMount(){

    var _self = this;
    var selected = this.props.selectedItem;
    if(selected._id){
      if(selected.type == 'tof'){
        selected.answer.map(function(item){
          if(item.isRight){
            if(item.label =="正确"){
              _self.props.form.setFieldsValue({answer_tof:true})
            }
            else{
              _self.props.form.setFieldsValue({answer_tof:false})

            }
          }
        })
      }
    }
  }
  render() {
    var _self = this;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    return (
      <Modal title={this.props.selectedItem._id?"编辑题目":"新增题目" }
        visible={true}
        width="80%"
        okText="提交"
        onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
      >
      <Form layout="horizontal">
        <FormItem
        {...formItemLayout}
          label="类型"
        >
          {getFieldDecorator('type', {
            initialValue: this.props.selectedItem.type || 'sc',
            rules: [{
              required: true, message: '类型必填!',
            }],
          })(
            <Select placeholder="请输入类型">
              <Option value="sc">单选题</Option>
              <Option value="mc">多选题</Option>
              <Option value="tof">判断题</Option>
            </Select>
          )}
        </FormItem>
          <FormItem
          {...formItemLayout}
            label="题干"
          >
            {getFieldDecorator('describe', {
              initialValue: this.props.selectedItem.describe,
              rules: [{
                required: true, message: '题干必填!',
              }],
            })(
              <TextArea  autosize={{ minRows: 2, maxRows: 6 }} placeholder="这里填写题目描述"/>
            )}
          </FormItem>
          <FormItem
          {...formItemLayout}
          required
            label="选项"
          >
            {this.props.form.getFieldValue('type')=='sc'?
            <SingleChoice
              getFieldDecorator={getFieldDecorator}
              form={this.props.form}
              answer={this.props.selectedItem.answer}
            />
            :null}
            {this.props.form.getFieldValue('type')=='mc'?

            <MultiChoice
              getFieldDecorator={getFieldDecorator}
              answer={this.props.selectedItem.answer}
              form={this.props.form}
            />
            :null}
            {this.props.form.getFieldValue('type')=='tof'?
            getFieldDecorator('answer_tof', {
              initialValue: true,
              rules: [{
                required: true, message: '必填!',
              }],
            })(
              <RadioGroup  size="large">
                <RadioButton value={true}>正 确</RadioButton>
                <RadioButton value={false}>错 误</RadioButton>
              </RadioGroup>
            )
            :null}
          </FormItem>
          <FormItem
          {...formItemLayout}
            label="解析"
          >
            {getFieldDecorator('explain', {
              initialValue: this.props.selectedItem.explain,
            })(
              <TextArea  autosize={{ minRows: 2, maxRows: 6 }} placeholder='这里填写该问题对应的答案解释'/>
            )}
          </FormItem>
          <FormItem
          {...formItemLayout}
            label="标签"
          >
            {getFieldDecorator('label', {
              initialValue: this.props.selectedItem.label ||[],
            })(
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="题目所属范围，例如java，c#"
              >
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const ContentsForm = Form.create()(Contents);
export default ContentsForm
