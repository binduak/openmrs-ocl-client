import React from "react";
import {render} from "../../../../test-utils";
import {UserTokenDetails} from "../../components";

type userTokenDetailsProps = React.ComponentProps<typeof UserTokenDetails>;

const baseProps: userTokenDetailsProps = {
    token: "TestToken"
};

function renderUI(props: Partial<userTokenDetailsProps> = {}) {
    return render(<UserTokenDetails {...baseProps} {...props} />);
}

describe("UserTokenDetails", () => {
    it("should match snapshot", () => {
        const {container} = renderUI(baseProps);

        expect(container).toMatchSnapshot();
    });
});