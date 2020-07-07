import { AppState } from "../../../redux";
import {
  retrievePublicSourcesAction,
  retrievePublicSourcesLoadingSelector,
} from "../redux";
import { connect } from "react-redux";

import { PUBLIC_SOURCES_ACTION_INDEX } from "../redux/constants";
import { ViewSourcesPage } from "../components";

const mapStateToProps = (state: AppState) => ({
  loading: retrievePublicSourcesLoadingSelector(state),
  sources: state.sources.sources[PUBLIC_SOURCES_ACTION_INDEX]?.items,
  meta: state.sources.sources[PUBLIC_SOURCES_ACTION_INDEX]?.responseMeta,
});

const mapDispatchToProps = {
  retrieveSources: retrievePublicSourcesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSourcesPage);
