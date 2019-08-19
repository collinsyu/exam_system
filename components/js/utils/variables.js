
const variables = {
  residences(){
    return [{
        value: '浙江',
        label: '浙江',
        children: [{
          value: '杭州',
          label: '杭州',
          children: [{
            value: '德力西',
            label: '德力西',
          }],
        }],
      }, {
        value: '北京',
        label: '北京',
        children: [{
          value: '朝阳区',
          label: '朝阳区',
          children: [{
            value: '招商大厦',
            label: '招商大厦',
          }],
        }],
      }, {
        value: '上海',
        label: '上海',
        children: [{
          value: '静安区',
          label: '静安区',
          children: [{
            value: '恒隆广场',
            label: '恒隆广场',
          }],
        }],
      }];
  },
  apartments(){
    return [{
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
  },
  jobs(){
    return [
      {value: 'JAVA工程师',label: 'JAVA工程师'},
      {value: '前端工程师',label: '前端工程师'},
      {value: '会计',label: '会计'},
      {value: '助理',label: '助理'},
      {value: '架构师',label: '架构师'},
    ]
  },
  residences_filter(){
    return [{
      text: '浙江,杭州,德力西',
      value: '浙江,杭州,德力西',
    }, {
      text: '北京,朝阳区,招商大厦',
      value: '北京,朝阳区,招商大厦',
    }, {
      text: '上海,静安区,恒隆广场',
      value: '上海,静安区,恒隆广场',
    }];
  },
  jobs_filter(){
    return [
      {value: 'JAVA工程师',text: 'JAVA工程师'},
      {value: '前端工程师',text: '前端工程师'},
      {value: '会计',text: '会计'},
      {value: '助理',text: '助理'},
      {value: '架构师',text: '架构师'},
    ]
  },
}

export default variables;
