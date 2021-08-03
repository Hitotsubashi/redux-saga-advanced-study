import React from "react";
import { connect } from "react-redux";
import { INCREASE_DELAY } from "../store/action/index";

const App = (props) => {
  const { num } = props;
  return (
    <div>
      <button onClick={props.increaseDelay}>增加1</button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
