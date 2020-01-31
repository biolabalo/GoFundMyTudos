import { connect } from "react-redux";
import TuduPage from "..";
import { getTudos, updateTudoVisibility } from "../../../redux/tudo/tudoAction";

const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = dispatch => ({
  getTudos: () => {
    dispatch(getTudos());
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
