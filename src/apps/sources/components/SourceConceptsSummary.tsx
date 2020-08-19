import React from "react";
import { APISource } from "../../sources";
import {
  Button,
  ButtonGroup,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  source?: APISource;
}

const useStyles = makeStyles({
  conceptCountBreakDown: {
    marginLeft: "3vw",
  },
});

const SourceConceptsSummary: React.FC<Props> = ({ source }) => {
  const classes = useStyles();

  return (
    <Paper className='fieldsetParent'>
      <fieldset>
        <Typography component='legend' variant='h5' gutterBottom>
          Concepts
        </Typography>
        <Typography variant='h6' data-testid='active-concepts' gutterBottom>
          <b>{`Total Concepts: ${source?.active_concepts}`}</b>
        </Typography>
        <Typography variant='h6' data-testid='active-mappings' gutterBottom>
          <b>{`Total Mappings: ${source?.active_mappings}`}</b>
        </Typography>
        <ButtonGroup variant='text' fullWidth>
          <Button to={""} component={Link} color='primary'>
            View Concepts
          </Button>
        </ButtonGroup>
      </fieldset>
    </Paper>
  );
};

export default SourceConceptsSummary;
