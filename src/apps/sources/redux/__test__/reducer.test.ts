import {reducer} from "../reducer";
import {APISource, SourceState} from "../../types";
import {RETRIEVE_SOURCE_ACTION} from "../actionTypes";

describe('sources reducer', () => {

    const testSource: APISource = {
        id: "MSF-SOURCE",
        short_code: "MSF-SRC",
        name: "MSF Source",
        full_name: "MSF Source",
        source_type: "Dictionary",
        public_access: "View",
        default_locale: "en",
        website: "http://msf.org/",
        description: "A universal code system for identifying laboratory and clinical observations.",
        extras: {"msf_extra_field": "msf_extra_value"},
        url: "/users/root/sources/MSF-SRC/",
        owner: "root",
        owner_type: "User",
        owner_url: "/users/root/",
        external_id: "123",
        supported_locales: ["en", "fr"],
        custom_validation_schema: "Dictionary",
        active_concepts: 2,
        concepts_url: "",
    };

    const initialState: SourceState = {
        sources: [{items: [], responseMeta: undefined}]
    };

    describe("RETRIEVE_SOURCE_ACTION", () => {
        it('should return initial state when empty payload is passed', () => {
            const startAction = {
                type: RETRIEVE_SOURCE_ACTION,
                action: {
                    payload: []
                }
            };
            expect(reducer(initialState, startAction)).toEqual(initialState);
        });

        it('should return updated state with given payload', () => {
            const startAction = {
                    type: RETRIEVE_SOURCE_ACTION,
                    payload: [testSource]
                }
            ;
            const expectedState = {
                sources: [
                    {
                        items: [],
                        responseMeta: undefined
                    }
                ],
                source: [
                    testSource
                ]
            };
            expect(reducer(initialState, startAction)).toEqual(expectedState);
        });
    });

});
