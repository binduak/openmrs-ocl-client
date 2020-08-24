import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    createSourceAction,
    createSourceErrorsSelector,
    createSourceLoadingSelector,
    createSourceProgressSelector
} from "../redux";
import {APISource, NewAPISource} from "../types";
import {
    orgsSelector,
    profileSelector
} from "../../authentication/redux/reducer";
import { APIOrg, APIProfile } from "../../authentication";
import { usePrevious } from "../../../utils";
import { CONTEXT } from "../constants";
import SourceForm from "../components/SourceForm";

interface Props {
    errors?: {};
    profile?: APIProfile;
    usersOrgs?: APIOrg[];
    createSourceAction: (
        ...args: Parameters<typeof createSourceAction>
    ) => void;
    loading: boolean;
    newSource?: APISource;
}

const CreateSourcePage: React.FC<Props> = ({
                                                   profile,
                                                   usersOrgs,
                                                   errors,
                                                   createSourceAction,
                                                   loading,
                                                   newSource
                                               }: Props) => {
    const previouslyLoading = usePrevious(loading);
    return (
        <Grid id="create-dictionary-page" item xs={6} component="div">
            <Paper>
                <SourceForm
                    context={CONTEXT.create}
                    errors={errors}
                    profile={profile}
                    usersOrgs={usersOrgs ? usersOrgs : []}
                    loading={loading}
                    onSubmit={(values: NewAPISource ) => createSourceAction(values.owner_url, values)}
                />
            </Paper>
        </Grid>
    );
};

const mapStateToProps = (state: any) => ({
    profile: profileSelector(state),
    usersOrgs: orgsSelector(state),
    loading: createSourceLoadingSelector(state),
    progress: createSourceProgressSelector(state),
    newSource: state.sources.newSource,
    errors: createSourceErrorsSelector(state)
});
const mapActionsToProps = {
    createSourceAction: createSourceAction
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(CreateSourcePage);
