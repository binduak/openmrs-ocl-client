import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  short_code: string;
  owner: string;
  owner_type: string;
  description: string;
  url: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerName: {
      overflowX: "auto",
    },
  })
);
const ContainerCard: React.FC<Props> = ({
  name,
  short_code,
  owner,
  owner_type,
  description,
  url,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <Typography noWrap variant='body1' color='textSecondary' gutterBottom>
            {short_code}
          </Typography>
          <Typography className={classes.containerName} noWrap variant='h5'>
            {name}
          </Typography>
          <Typography noWrap variant='body2' color='textSecondary'>
            {owner_type}/{owner}
          </Typography>
          <Typography noWrap variant='body1' component='p'>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            to={url}
            component={Link}
            size='small'
            variant='text'
            color='primary'
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ContainerCard;
