
const Form = antd.Form;
const Row = antd.Row;
const Col = antd.Col;
const Input = antd.Input;
const Button = antd.Button;
const Icon = antd.Icon;
const Select = antd.Select;
const DatePicker = antd.DatePicker;
const Radio = antd.Radio;

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let uuid = 0;
class SingleChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }

  }
  remove(k){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(value => value.value !== k),
    });
  }
  componentDidMount(){
    const { form } = this.props;
    const {getFieldDecorator} = this.props;
    getFieldDecorator('right_key', { initialValue: null });
    
    var answers = this.props.answer;
    if(answers){
      form.setFieldsValue({
        keys: answers
      });
      answers.map(function(item,index){
        if(item.isRight){
          getFieldDecorator('right_key', { initialValue: index });
        }
      })
    }
  }
  add(){
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    keys.push({value:uuid});
    form.setFieldsValue({
      keys: keys,
    });
  }
  rightRadio(right_key){
    console.log('点击了radio',right_key);
    const { form } = this.props;
    form.setFieldsValue({
      right_key: right_key,
    });
  }
  render() {
    const {getFieldDecorator} = this.props;
    const {getFieldValue} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 0 },
      },
    };
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((item, index) => {

      const prefixSelector = <input name="Fruit"
        type="radio"
        defaultChecked={item.isRight}
        // defaultChecked={item.isRight?item.isRight:(!index?true:false)}
        value={item.value}
        onClick={this.rightRadio.bind(this,item.value)}/>
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          // label={index === 0 ? 'Passengers' : ''}
          required={false}
          key={item.value}
        >
          {/* <Radio style={radioStyle} value={k}></Radio> */}
          {getFieldDecorator(`answer_${item.value}`, {
            initialValue:item.label,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "必填",
            }],
          })(
            <Input
              addonBefore={prefixSelector}
              placeholder="选项描述"
              style={{ width: '60%', marginRight: 8 }} />
          )}
          {keys.length > 0 ? (
            <Icon
              sty
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={this.remove.bind(this,item.value)}
            />
          ) : null}
        </FormItem>
      );
    });

    return (
      <div className="ant-form ant-form-horizontal">

        {formItems}
        <FormItem {...formItemLayout}>
          {keys.length>6?null:
            <Button type="dashed" onClick={this.add.bind(this)} style={{ width: '60%' }}>
              <Icon type="plus" /> 添加一个选项
            </Button>
          }
        </FormItem>


        <style>
          {`
            .dynamic-delete-button {
              cursor: pointer;
              position: relative;
              top: 4px;
              font-size: 24px;
              color: #999;
              transition: all .3s;
            }
            .dynamic-delete-button:hover {
              color: #777;
            }
            .dynamic-delete-button[disabled] {
              cursor: not-allowed;
              opacity: 0.5;
            }
          `}
        </style>
      </div>
    );
  }
}


export default SingleChoice
