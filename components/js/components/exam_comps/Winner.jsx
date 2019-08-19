import './winner.css'
const Avatar = antd.Avatar;
const Tooltip = antd.Tooltip;

class WinnerContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount(){

  }
  render() {
    var type = this.props.type||"silver";
    var info = this.props.winnerInfo.baseInfo ||{}
    return (
      <div>

          {/* bronze silver  golden */}
        <div className="achievement">
          <div className="achievement-inner">
            {/* <header className="achievement-header">
              <h1 className="achievement-title">Depot Agent</h1>
            </header> */}
            <div className="achievement-content">
              <label className={"badge main "+type}>
                {/* <div className="badge-img"> */}
                  <Tooltip

                    placement="top"
                    title={info.name+'（'+ info.email +'）'}>
                    {info.avatar?
                      <span className="badge-img">
                        <Avatar  src={info.avatar} />
                      </span>

                      :
                      <span className="badge-img">
                        <Avatar  style={{ color: '#fff', backgroundColor: info.avatar_color }}>
                          {info.name.substr(0, 1).toLocaleUpperCase()}
                        </Avatar>

                      </span>
                    }
                  </Tooltip>

                {/* </div> */}
                {/* <img className="badge-img"
                  src="https://images.weserv.nl/?url=i.imgur.com/HwK85ID.png&amp;il')}"/> */}
              </label>
              <div className="rewards">
                <div className={"ribbon "+type}>
                  {
                    type=="bronze"?"冠军":"淘汰"
                  }
              </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}



export default WinnerContainer
