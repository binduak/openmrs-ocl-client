import React from "react";
import { render } from "../../../../test-utils";
import "@testing-library/jest-dom";
import AddConceptsIcon from "../../components/AddConceptsIcon";

type addConceptsIconProps = React.ComponentProps<typeof AddConceptsIcon>;

const baseProps: addConceptsIconProps = {
    canModifyDictionary: true,
    canModifySource: false,
    containerUrl: "",
    gimmeAUrl: function(arg1: string , arg2: string) { return arg2;},
    linkedSource: "linkedSource",
    preferredSource: "Public Sources"
};

function renderUI(props: Partial<addConceptsIconProps> = {}) {
    return render(<AddConceptsIcon {...baseProps} {...props} />);
}

describe("AddConceptsIcon", () => {
    it("should match snapshot", () => {
        const { container } = renderUI();

        expect(container).toMatchSnapshot();
    });
});