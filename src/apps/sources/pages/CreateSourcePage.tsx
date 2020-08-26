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
import {CUSTOM_VALIDATION_SCHEMA, usePrevious} from "../../../utils";
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

    if (!loading && previouslyLoading && newSource) {
        return <Redirect to={newSource.url} />;
    }


    const onSubmitButton = (values: NewAPISource ) => {
        // Both ID and short_code are required fields for create source API.
        // short_code field gets overriden by ID from backend. So hardcoding the same from UI.
        // This needs to be handled if API accepts different values for short_code and ID
        values.id = values.short_code;
        values.custom_validation_schema = CUSTOM_VALIDATION_SCHEMA;
        createSourceAction(values.owner_url, values);
    };

    return (
        <Grid id="create-source-page" item xs={6} component="div">
            <Paper>
                <SourceForm
                    context={CONTEXT.create}
                    errors={errors}
                    profile={profile}
                    usersOrgs={usersOrgs ? usersOrgs : []}
                    loading={loading}
                    onSubmit={onSubmitButton}
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
