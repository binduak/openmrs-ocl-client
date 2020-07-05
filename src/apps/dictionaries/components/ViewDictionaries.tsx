import React from "react";
import { APIDictionary } from "../types";
import GridPagination from "../../../components/GridPagination";
import GridSearch from "../../../components/GridSearch";
import GridComponentView from "../../../components/GridComponentView";

const PER_PAGE = 20;

interface Props {
  dictionaries: APIDictionary[];
  numFound: number;
  onPageChange: Function;
  onSearch: Function;
  page: number;
  initialQ: string;
}

const ViewDictionaries: React.FC<Props> = ({
  dictionaries,
  numFound,
  onPageChange,
  onSearch,
  page,
  initialQ,
}) => {
  return (
    <>
      <GridSearch
        title='Dictionaries'
        onSearch={onSearch}
        initialQ={initialQ}
      />
      <GridComponentView collections={dictionaries} title='Dictionaries' />
      <GridPagination
        num_found={Number(numFound)}
        per_page={PER_PAGE}
        page={page}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default ViewDictionaries;
