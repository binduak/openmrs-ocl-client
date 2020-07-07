import React, { useEffect } from "react";
import { APISource } from "../types";
import { ProgressOverlay } from "../../../utils/components";
import { useQueryParams } from "../../../utils";
import { useHistory, useLocation } from "react-router";
import qs from "qs";
import { retrievePublicSourcesAction } from "../redux";
import { Fab, Tooltip } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ViewSources from "./ViewSources";
import { SourceOwnerTabs } from "./SourceOwnerTabs";
import { Header } from "../../../components";

const PER_PAGE = 20;

interface Props {
  loading: boolean;
  sources?: APISource[];
  meta?: { num_found?: number };
  // not nice, but better than not typing it
  retrieveSources: (
    ...args: Parameters<typeof retrievePublicSourcesAction>
  ) => void;
}

const ViewPublicSourcesPage: React.FC<Props> = ({
  sources = [],
  loading,
  meta = {},
  retrieveSources,
}) => {
  const { push: goTo } = useHistory();
  const { pathname: url } = useLocation();
  const { num_found: numFound = sources.length } = meta;

  const queryParams: { page?: number; q?: string } = useQueryParams();
  const { page = 1, q: initialQ = "" } = queryParams;

  useEffect(() => {
    retrieveSources(url, initialQ, PER_PAGE, page);
  }, [retrieveSources, url, initialQ, page]);

  const gimmeAUrl = (params: { page?: number; q?: string }) => {
    const newParams: { page?: number; q?: string } = {
      ...queryParams,
      ...params,
    };
    return `${url}?${qs.stringify(newParams)}`;
  };

  return (
    <Header title='Sources'>
      <SourceOwnerTabs currentPageUrl={url} />
      <ProgressOverlay loading={loading}>
        <ViewSources
          initialQ={initialQ}
          page={page}
          onSearch={(q: string) => goTo(gimmeAUrl({ q }))}
          onPageChange={(page: number) => goTo(gimmeAUrl({ page }))}
          sources={sources}
          numFound={numFound}
        />
        <Link to={`/sources/new/`}>
          <Tooltip title='Create new source'>
            <Fab color='primary' className='fab'>
              <AddIcon />
            </Fab>
          </Tooltip>
        </Link>
      </ProgressOverlay>
    </Header>
  );
};

export default ViewPublicSourcesPage;
