///<reference path="../../../../../node_modules/@types/testing-library__dom/queries.d.ts"/>
import React from 'react';
import '@testing-library/jest-dom'
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {ViewSourcesPage} from "../index";
import {render} from "@testing-library/react";
type viewSourcesPageProps = React.ComponentProps<typeof ViewSourcesPage>;

const baseProps: viewSourcesPageProps = {
    sources : [],
    loading : false,
    meta : {},
    retrieveSources : function retrieveSources() {
    }
};

function renderUI(props: Partial<viewSourcesPageProps> = {}) {
    return render(
        <Router>
            <ViewSourcesPage {...baseProps} {...props} />
        </Router>
    );
}

describe('ViewSourcesPage', () => {
    it('should show "Loading" message when loading is true', () => {
        const {container} = renderUI({
            loading: true
        });

        const overLay = container.querySelector("[data-testid='loader-message']");

        expect(overLay).toHaveTextContent("Loading...");
        expect(overLay).not.toBeNull();

    });

    it('should not show "Loading" message when loading is false', () => {
        const {container} = renderUI({
            loading: false
        });

        const overLay = container.querySelector("[data-testid='loader-message']");

        expect(overLay).toBeNull();
    });

    it('should ', () => {
        const {container} = renderUI({
            loading: false
        });

        const sourcesSearch: HTMLElement | null = container.querySelector("[data-testid='sourcesSearch']");
        const viewSources: HTMLElement | null = container.querySelector("[data-testid='sources']");
        const pagination: HTMLElement | null = container.querySelector("[data-testid='sourcesPagination']");

        expect(sourcesSearch).not.toBeNull();
        expect(viewSources).toHaveTextContent("No Sources Found");
        expect(pagination).not.toBeNull();
        if (pagination !== null) {
            expect(pagination.children[0]).toHaveTextContent("0-0 of 0");
        }
    });
});