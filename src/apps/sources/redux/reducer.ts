import {createReducer} from "@reduxjs/toolkit";
import {Action} from "../../../redux";
import {SourceState} from "../types";
import {RETRIEVE_SOURCE_ACTION, RETRIEVE_SOURCES_ACTION} from "./actionTypes";

const initialState: SourceState = {
    sources: []
};

export const reducer = createReducer(initialState, {
    [RETRIEVE_SOURCES_ACTION]: (
        state,
        {actionIndex, payload, responseMeta}: Action
    ) => {
        state.sources[actionIndex] = {items: payload, responseMeta};
    },
    [RETRIEVE_SOURCE_ACTION]: (state, action) => ({
        ...state,
        source: action.payload
    }),
});
export {reducer as default};