import React, {useEffect} from "react";
import SourceForm from "../components/SourceForm";
import {Grid, Paper, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {APISource, apiSourceToSource} from "../types";
import {orgsSelector, profileSelector,} from "../../authentication/redux/reducer";
import {APIOrg, APIProfile, canModifyContainer} from "../../authentication";
import {
  retrieveSourceAndDetailsAction,
  retrieveSourceErrorSelector,
  retrieveSourceLoadingSelector,
  sourceSelector
} from "../redux";
import {AppState} from "../../../redux";
import {useLocation, useParams} from "react-router-dom";
import {ProgressOverlay} from "../../../utils/components";
import Header from "../../../components/Header";
import {getSourceTypeFromPreviousPath} from "../utils";
import {SourceConceptDetails} from "../components";
import {retrieveConceptsAction} from "../../concepts/redux";
import {EditButton} from "../../containers/components/EditButton";
import {EDIT_BUTTON_TITLE} from "../redux/constants";

interface Props {
  profile?: APIProfile;
  usersOrgs?: APIOrg[];
  sourceLoading: boolean;
  source?: APISource;
  retrieveSourceAndDetails: (
    ...args: Parameters<typeof retrieveSourceAndDetailsAction>
  ) => void;
  retrieveSourceErrors?: {};
  retrieveConceptsSummary: (
    ...args: Parameters<typeof retrieveConceptsAction>
  ) => void;
  metaConceptsCount?: { num_found?: number };
}
interface UseLocation {
  prevPath: string;
}
export const ViewSourcePage: React.FC<Props> = ({
  profile,
  usersOrgs = [],
  sourceLoading,
  source,
  retrieveSourceAndDetails,
  retrieveSourceErrors,
  retrieveConceptsSummary,
  metaConceptsCount = {},
}: Props) => {
  const { pathname: url, state } = useLocation<UseLocation>();
  const previousPath = state ? state.prevPath : "";
  const { ownerType, owner } = useParams<{
    ownerType: string;
    owner: string;
  }>();

  useEffect(() => {
    retrieveSourceAndDetails(url);
  }, [url, retrieveSourceAndDetails]);
  useEffect(() => {
    retrieveConceptsSummary(url + "concepts/");
  }, [url, retrieveConceptsSummary]);

  const canEditSource = canModifyContainer(
      ownerType,
      owner,
      profile,
      usersOrgs
  );
  const showEditButton = canEditSource;

  return (
    <Header
      title={`${getSourceTypeFromPreviousPath(previousPath)} > ${source?.name ||
        ""}`}
      justifyChildren='space-around'
    >
      <ProgressOverlay
        delayRender
        loading={sourceLoading}
        error={
          retrieveSourceErrors
            ? "Could not load source. Refresh the page to retry"
            : undefined
        }
      >
        <Grid id='viewSourcePage' item xs={5} component='div'>
          <Paper className='fieldsetParent'>
            <fieldset>
              <Typography component='legend' variant='h5' gutterBottom>
                General Details
              </Typography>
              <SourceForm
                savedValues={apiSourceToSource(source)}
                profile={profile}
                usersOrgs={usersOrgs}
                loading={true}
              />
            </fieldset>
          </Paper>
        </Grid>
        <Grid item xs={5} container spacing={2}>
          <Grid item xs={12} component='div'>
            <SourceConceptDetails
              source={source}
              totalConceptCount={metaConceptsCount.num_found || 0}
            />
          </Grid>
        </Grid>
        {!showEditButton ? null : (
            <EditButton url={`${url}edit/`} title={EDIT_BUTTON_TITLE}/>
        )}
      </ProgressOverlay>
    </Header>
  );
};

const mapStateToProps = (state: AppState) => ({
  profile: profileSelector(state),
  usersOrgs: orgsSelector(state),
  sourceLoading: retrieveSourceLoadingSelector(state),
  source: sourceSelector(state),
  metaConceptsCount: state.concepts.concepts
    ? state.concepts.concepts.responseMeta
    : undefined,
  retrieveSourceErrors: retrieveSourceErrorSelector(state),
});
const mapDispatchToProps = {
  retrieveSourceAndDetails: retrieveSourceAndDetailsAction,
  retrieveConceptsSummary: retrieveConceptsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSourcePage);
