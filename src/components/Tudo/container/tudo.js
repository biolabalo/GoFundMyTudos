import { connect } from "react-redux";
import TuduPage from "..";
import {
  getRunningTudos,
  updateTudoVisibility
} from "../../../redux/tudo/tudoAction";

const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = dispatch => ({
  getRunningTudos: () => {
    dispatch(getRunningTudos());
  },
  updateTudoVisibility: (id, bool) => {
    dispatch(updateTudoVisibility(id, bool));
  }
});

const Tudo = connect(
  mapStateToProps,
  mapDispatchToProps
)(TuduPage);

export default Tudo;
