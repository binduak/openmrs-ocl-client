import React, {useEffect} from "react";
import {Fab, Grid, Menu, MenuItem, Paper, Tooltip} from "@material-ui/core";
import {connect} from "react-redux";
import {Link, Redirect, useLocation} from "react-router-dom";
import {
    editSourceDispatchAction,
    editSourceErrorsSelector,
    editSourceLoadingSelector,
    makeRetrieveSourceAction
} from "../redux";
import {APISource, apiSourceToSource} from "../types";
import {orgsSelector, profileSelector} from "../../authentication/redux/reducer";
import {APIOrg, APIProfile} from "../../authentication";
import {CONTEXT, ProgressOverlay, useAnchor, usePrevious} from "../../../utils";
import SourceForm from "../components/SourceForm";
import Header from "../../../components/Header";
import {MoreVert as MenuIcon} from "@material-ui/icons";


export interface StateProps {
    errors?: {};
    profile?: APIProfile;
    usersOrgs?: APIOrg[];
    loading: boolean;
    source: APISource;
    editedSource?: APISource
}

export interface ActionProps {
    editSourceAction: (
        ...args: Parameters<typeof editSourceDispatchAction>
    ) => void;
    retrieveSourceAction: (
        ...args: Parameters<ReturnType<typeof makeRetrieveSourceAction>>
    ) => void;
}

type Props = StateProps & ActionProps;

const EditSourcePage: React.FC<Props> = ({
                                             profile,
                                             usersOrgs,
                                             errors,
                                             loading,
                                             source,
                                             editedSource,
                                             editSourceAction,
                                             retrieveSourceAction
                                         }: Props) => {
    const previouslyLoading = usePrevious(loading);
    const {pathname: url} = useLocation();
    const sourceUrl = url.replace("edit/", "");
    const [menuAnchor, handleMenuClick, handleMenuClose] = useAnchor();

    useEffect(() => {
        retrieveSourceAction(sourceUrl);
    }, [sourceUrl, retrieveSourceAction]);

    if (!loading && previouslyLoading && editedSource) {
        return <Redirect to={editedSource.url}/>;
    }

    return (
        <Header
            title="Edit Source"
            backUrl={sourceUrl}
            backText="Back to Source"
        >
            <ProgressOverlay
                delayRender
                loading={loading}
            >
                <Grid id="edit-source-page" item xs={6} component="div">
                    <Paper>
                        <SourceForm
                            context={CONTEXT.edit}
                            errors={errors}
                            profile={profile}
                            usersOrgs={usersOrgs ? usersOrgs : []}
                            loading={loading}
                            savedValues={apiSourceToSource(source)}
                            onSubmit={(values: APISource) => editSourceAction(values, source.url)}
                        />
                    </Paper>
                </Grid>
                <>
                    <Tooltip title="Menu">
                        <Fab onClick={handleMenuClick} color="primary" className="fab">
                            <MenuIcon />
                        </Fab>
                    </Tooltip>
                    <Menu
                        anchorEl={menuAnchor}
                        keepMounted
                        open={Boolean(menuAnchor)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem>
                            <Link replace className="link" to={sourceUrl}>
                                Discard changes and view
                            </Link>
                        </MenuItem>
                    </Menu>
                </>
            </ProgressOverlay>
        </Header>
    );
};

export const mapStateToProps = (state: any) => ({
    profile: profileSelector(state),
    usersOrgs: orgsSelector(state),
    loading: editSourceLoadingSelector(state),
    editedSource: state.sources.editedSource,
    source: state.sources.source,
    errors: editSourceErrorsSelector(state)
});
export const mapActionsToProps = {
    editSourceAction: editSourceDispatchAction,
    retrieveSourceAction: makeRetrieveSourceAction(false)
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(EditSourcePage);
