import React from "react";
import { APISource } from "../types";
import GridComponentView from "../../../components/GridComponentView";
import GridPagination from "../../../components/GridPagination";
import GridSearch from "../../../components/GridSearch";

const PER_PAGE = 20;

interface Props {
  sources: APISource[];
  numFound: number;
  onPageChange: Function;
  onSearch: Function;
  page: number;
  initialQ: string;
}

const ViewSources: React.FC<Props> = ({
  sources,
  numFound,
  onPageChange,
  onSearch,
  page,
  initialQ,
}) => {
  return (
    <>
      <GridSearch title='Sources' onSearch={onSearch} initialQ={initialQ} />
      <GridComponentView collections={sources} title='Sources' />
      <GridPagination
        num_found={Number(numFound)}
        per_page={PER_PAGE}
        page={page}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default ViewSources;
