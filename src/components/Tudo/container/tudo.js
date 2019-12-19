import { connect } from "react-redux";
import TuduPage from "..";
import { getTudos } from "../../../redux/tudo/tudoAction";

const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = dispatch => ({
  getTudos: () => {
    dispatch(getTudos());
  }
});

const Tudo = connect(
  mapStateToProps,
  mapDispatchToProps
)(TuduPage);

export default Tudo;
