import React from "react";
import { connect } from "react-redux";
import { INCREASE_DELAY, INCREASE_DELAY2 } from "../store/action/index";

const App = (props) => {
  const { num } = props;
  return (
    <div>
      <button onClick={props.increaseDelay}>增加1</button>
      <button onClick={props.increaseDelay2}>增加1方式二</button>
      <br />
      {num}
    </div>
  );
};

const mapStateToProps = (state) => ({
  num: state,
});

const mapDispatchToProps = (dispatch) => ({
  increaseDelay: () => dispatch(INCREASE_DELAY()),
  increaseDelay2: () => dispatch(INCREASE_DELAY2()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
