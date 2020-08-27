import React from "react";
import SourceForm from "../../components/SourceForm";
import {APIOrg, APIProfile} from "../../../authentication";
import {Source} from "../../types";
import {render, fireEvent, act, wait, waitFor} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import {CONTEXT} from "../../constants";

type sourcesFormProps = React.ComponentProps<typeof SourceForm>;
let onSubmit = jest.fn();
const apiProfile :APIProfile = {
    email: "", organizations_url: "", url: "", username: ""
};
const apiOrg :APIOrg = {
    id: "", name: "", url: ""
};
const testSource : Source = {
    default_locale: "en",
    description: "Testing Description",
    name: "Test",
    public_access: "View",
    short_code: "12",
    source_type: "Dictionary",
    supported_locales: ["fr","es"],
    website: "website"
};
const baseProps: sourcesFormProps = {
    onSubmit: onSubmit,
    loading: true,
    status: "",
    profile: apiProfile,
    usersOrgs: [apiOrg],
    errors: [],
    savedValues: testSource,
    context: CONTEXT.view
};

function renderUI(props: Partial<sourcesFormProps> = {}) {
    return render(
        <Router>
            <SourceForm {...baseProps} {...props} />
        </Router>
    );
}

describe('View SourceForm ', () => {
   it('snapshot test', () => {
       const {container} = renderUI();
       expect(container).toMatchSnapshot();
   });
   it('should populate mandatory field values', () => {
       const {getByLabelText} = renderUI();
       // @ts-ignore
       expect(getByLabelText('Short Code').value).toBe('12');
       // @ts-ignore
       expect(getByLabelText('Source Name').value).toBe('Test');

   });
    it('should populate non mandatory field values', () => {
       const {getByLabelText} = renderUI();
       // @ts-ignore
       expect(getByLabelText('Description').value).toBe('Testing Description');
   });
});

describe('Create SourceForm', () => {

    it('should show Source name is required if we dont enter', async () => {
        const {container, getByLabelText, getByText, debug} = renderUI({
            context: CONTEXT.create
        });
        let shortCode: HTMLInputElement = getByLabelText(/Short Code/) as HTMLInputElement;
        let sourceName: HTMLInputElement = getByLabelText(/Source Name/) as HTMLInputElement;
        let submitButton: HTMLInputElement = getByText('Submit') as HTMLInputElement;
        await act(async () => {
            fireEvent.change(shortCode, {target: {value: '10'}});
            fireEvent.change(sourceName, {target: {value: 'Tustin'}});
            fireEvent.click(submitButton);
        });
        expect(shortCode.value).toBe('10');
        expect(sourceName.value).toBe('Tustin');
    });

});
