
// import React from 'React';
import { connect } from 'react-redux';
import { returnUserInfoState} from '../actions/app';
import Home from  './Home.jsx'

class OutLine extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    var userinfo = document.getElementById("userinfo").innerHTML;
    userinfo = JSON.parse(userinfo);
    dispatch(returnUserInfoState(userinfo))
  }

  render() {
    return (
      <div>
        {this.props.children?this.props.children:<Home/>}
      </div>
    );
  }
}


// export default OutLine
const mapStateToProps = state => {
  const { app } = state
  return {

  }
}
export default connect(mapStateToProps)(OutLine)
