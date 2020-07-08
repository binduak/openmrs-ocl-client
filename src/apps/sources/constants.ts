import { TabType } from "../containers/types";

export const OCL_SOURCE_TYPE = "Dictionary";

export const CONTEXT = {
  view: "view",
};

export const TAB_LIST: TabType[] = [
  {
    labelName: "Your Sources",
    labelURL: "/user/sources/",
  },
  {
    labelName: "Public Sources",
    labelURL: "/sources/",
  },
  {
    labelName: "Your Organizations' Sources",
    labelURL: "/user/orgs/sources/",
  },
];

export const PER_PAGE = 20;
export const TITLE = "Sources";
