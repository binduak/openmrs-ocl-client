import { AppState } from "../../../redux";
import {
    retrieveOrgSourcesAction,
    retrieveOrgSourcesLoadingSelector
} from "../redux";
import { connect } from "react-redux";
import { ORG_SOURCES_ACTION_INDEX } from "../redux/constants";
import SourcesLayout from '../components/SourcesLayout';

export const mapStateToProps = (state: AppState) => ({
    loading: retrieveOrgSourcesLoadingSelector(state),
    sources:
    state.sources.sources[ORG_SOURCES_ACTION_INDEX]?.items,
    meta:
    state.sources.sources[ORG_SOURCES_ACTION_INDEX]?.responseMeta
});

export const mapDispatchToProps = {
    retrieveSources: retrieveOrgSourcesAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SourcesLayout);
