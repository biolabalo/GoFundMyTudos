import { connect } from "react-redux";
import NewTudu from "../NewTudu";
import { createTudo } from "../../../redux/tudo/tudoAction";

const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = dispatch => ({
  createTudo: tudos => {
    dispatch(createTudo(tudos));
  }
});

const createNewTudo = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTudu);

export default createNewTudo;
