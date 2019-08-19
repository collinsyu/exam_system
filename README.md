# 企业内部问卷/考试系统

一个用于企业内部考核评测系统，管理员可以创建题库，从题库选择题目创建考试，并且通知考生及时参加考试；或用于问卷调查

技术栈：

前端：react + redux + antd

后端：express + mongodb + ejs




文件树

```
.
├── README.md
├── components
│   ├── img
│   ├── index.js
│   ├── js
│   │   ├── actions
│   │   │   ├── app.js
│   │   │   ├── exam.js
│   │   │   ├── modal.js
│   │   │   ├── paper.js
│   │   │   ├── question.js
│   │   │   ├── quiz.js
│   │   │   └── user.js
│   │   ├── common
│   │   ├── components
│   │   │   ├── CountDownClock.jsx
│   │   │   ├── ExamModal.jsx
│   │   │   ├── MultiChoice.jsx
│   │   │   ├── QuestionListModal.jsx
│   │   │   ├── QuestionModal.jsx
│   │   │   ├── SingleChoice.jsx
│   │   │   ├── UserListModal.jsx
│   │   │   ├── UserManageModal.jsx
│   │   │   ├── charts
│   │   │   │   ├── Line.jsx
│   │   │   │   ├── Pie.jsx
│   │   │   │   └── Scatter.jsx
│   │   │   ├── exam_comps
│   │   │   │   ├── ExamineesInfoTable.jsx
│   │   │   │   ├── ExamineesPieChartBox.jsx
│   │   │   │   ├── ExamineesScatterChartBox.jsx
│   │   │   │   ├── Winner.jsx
│   │   │   │   └── winner.css
│   │   │   └── home_comps
│   │   │       ├── ExamInfoTable.jsx
│   │   │       └── UserExamScoreLine.jsx
│   │   ├── containers
│   │   │   ├── ExamDetail.jsx
│   │   │   ├── ExamList.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── OutLine.jsx
│   │   │   ├── PaperList.jsx
│   │   │   ├── PaperManage.jsx
│   │   │   ├── QuestionList.jsx
│   │   │   ├── Quiz.jsx
│   │   │   ├── SettingUser.jsx
│   │   │   ├── UserManage.jsx
│   │   │   ├── home.less
│   │   │   └── quiz.less
│   │   ├── main.jsx
│   │   ├── reducers
│   │   │   ├── app.js
│   │   │   ├── exam.js
│   │   │   ├── index.js
│   │   │   ├── modal.js
│   │   │   ├── paper.js
│   │   │   ├── question.js
│   │   │   ├── quiz.js
│   │   │   └── user.js
│   │   └── utils
│   │       ├── tools.js
│   │       └── variables.js
│   └── style
│       └── index.css
├── package.json
├── public
│   ├── favicon.ico
│   ├── js
│   │   ├── bundle.js
│   │   ├── components
│   │   │   └── alert.js
│   │   ├── gt.js
│   │   ├── login.js
│   │   └── styles.css
│   ├── upload
│   │   └── avatar
│   └── views
│       ├── 404
│       │   ├── cubic.html
│       │   ├── default.html
│       │   ├── game404.html
│       │   ├── light.html
│       │   ├── monkey.html
│       │   ├── shake.html
│       │   └── tv.html
│       ├── common
│       │   ├── layout.html
│       │   └── sider.html
│       ├── containers
│       │   ├── exam.html
│       │   ├── exam_detaill.html
│       │   ├── home.bak.html
│       │   ├── home.html
│       │   ├── paper.html
│       │   ├── person.html
│       │   ├── question.html
│       │   ├── quiz.html
│       │   └── user.html
│       ├── favicon.ico
│       ├── index.html
│       ├── loading
│       │   └── loading3.html
│       ├── login
│       │   ├── login.html
│       │   ├── password_find.html
│       │   ├── password_reset.html
│       │   └── register.html
│       └── specials
│           └── thillthelion.html
├── server
│   ├── controllers
│   │   ├── exam.js
│   │   ├── paper.js
│   │   ├── question.js
│   │   └── user.js
│   ├── models
│   │   ├── exam.js
│   │   ├── paper.js
│   │   ├── question.js
│   │   └── user.js
│   ├── routes.js
│   ├── schemas
│   │   ├── exam.js
│   │   ├── paper.js
│   │   ├── question.js
│   │   └── user.js
│   ├── server.js
│   └── utils
│       ├── gt-sdk.js
│       ├── gt.js
│       └── utils.js
└── webpack.config.js
```



# TODO 

* 自动评分系统
* 优秀套题全网播放
* seo
* 考试通知，邮件、短信、微信、钉钉
* 。。。




