import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ContainerCard from "./ContainerCard";

interface Collection {
  name: string;
  short_code: string;
  owner: string;
  owner_type: string;
  description: string;
  url: string;
}

interface Props {
  collections: Collection[];
  title: string;
}

const ContainerCards: React.FC<Props> = ({ collections, title }) => {
  return (
    <Grid item xs={12} container spacing={2} justify='center'>
      {collections.length === 0 ? (
        <Typography component='span' variant='h6'>
          No {title}
        </Typography>
      ) : (
        ""
      )}
      {collections.map(
        (
          {
            name,
            short_code: shortCode,
            owner,
            owner_type: ownerType,
            description,
            url,
          },
          index
        ) => (
          <ContainerCard
            key={index}
            name={name}
            short_code={shortCode}
            owner={owner}
            owner_type={ownerType}
            description={description}
            url={url}
          />
        )
      )}
      ;
    </Grid>
  );
};

export default ContainerCards;
