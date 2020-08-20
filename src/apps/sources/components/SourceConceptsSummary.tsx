import React from "react";
import { APISource } from "../../sources";
import {
  Button,
  ButtonGroup,
  makeStyles,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { retrieveConceptsAction } from "../../concepts/redux";
import { StarBorder, DeleteForever } from "@material-ui/icons";

interface Props {
  source?: APISource;
  count: number;
}

const useStyles = makeStyles({
  conceptCountBreakDown: {
    marginLeft: "3vw",
  },
});

const SourceConceptsSummary: React.FC<Props> = ({ source, count }) => {
  const classes = useStyles();

  const total_concepts: number = count;
  const active_concepts: number = source?.active_concepts || 0;
  const retire_concepts: number = count - active_concepts;

  return (
    <Paper className='fieldsetParent'>
      <fieldset>
        <Typography component='legend' variant='h5' gutterBottom>
          Concepts
        </Typography>
        <Typography variant='h6' data-testid='active-mappings' gutterBottom>
          <b>{`Total Concepts: ${total_concepts}`}</b>
          <List component='div' disablePadding>
            <ListItem>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={`Active Concepts: ${active_concepts}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DeleteForever />
              </ListItemIcon>
              <ListItemText primary={`Retired Concepts: ${retire_concepts}`} />
            </ListItem>
          </List>
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
