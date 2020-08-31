import * as React from "react";
import CreateSourcePage, {mapActionsToProps, mapStateToProps} from "../../pages/CreateSourcePage";
import {APIOrg, APIProfile} from "../../../authentication";
import {APISource, Source} from "../../types";
import {createSourceAction, createSourceDispatchAction} from "../../redux";
import {act, fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "../../../../redux";
import {BrowserRouter as Router} from "react-router-dom";
import {ViewSourcePage} from "../../pages";
import {CONTEXT} from "../../constants";
import {currentState, personalSources, testSource} from "../test_data";

type createSourcePageProps = React.ComponentProps<typeof CreateSourcePage>;
const apiProfile: APIProfile = {
    email: "", organizations_url: "", url: "", username: ""
};
const apiOrg: APIOrg = {
    id: "", name: "", url: ""
};
const source: APISource = {
    active_concepts: 0,
    concepts_url: "",
    custom_validation_schema: "",
    default_locale: "",
    description: "",
    external_id: "",
    full_name: "test",
    id: "",
    name: "test",
    owner: "",
    owner_type: "",
    owner_url: "",
    public_access: "",
    short_code: "MSF01",
    source_type: "MSF",
    supported_locales: [],
    url: "url",
    website: ""
};

const baseProps: createSourcePageProps = {
    errors : {},
    profile : apiProfile,
    usersOrgs : [apiOrg],
    createSourceAction: function createSourceAction() {
    },
    loading: true,
    newSource : source
};

function renderUI(props: Partial<createSourcePageProps> = {}) {
    return render(<Provider store={store}>
            <Router>
                <CreateSourcePage {...baseProps} {...props}  />
            </Router>
        </Provider>
    );
}
const state = currentState(personalSources);
describe('CreateSourcePage', () => {
    it('createSourcePage snapshot test', () => {
        const {container} = renderUI();
        expect(container).toMatchSnapshot();
    });
    it('should list down all the props of the state', () => {
        expect(mapStateToProps(state).loading).not.toBeNull();
        expect(mapStateToProps(state).profile).not.toBeNull();
        expect(mapStateToProps(state).usersOrgs).not.toBeNull();
        expect(mapStateToProps(state).newSource).not.toBeNull();
        expect(mapStateToProps(state).errors).not.toBeNull();
    });
    it('should update the loading status with current state', () => {
        expect(mapStateToProps(state).loading).toEqual(false);
    });

    it('should point to correct dispatch action', () => {
        expect(mapActionsToProps.createSourceAction).toBe(createSourceDispatchAction);
    });
});

