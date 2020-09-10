import React from "react";
import {Button, Paper, Tooltip, Typography} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import {makeStyles} from "@material-ui/core/styles";

interface Props {
    token?: string;
}

const useStyles = makeStyles({
    token: {
        wordBreak: "break-all",
        color: "black"
    },
    container: {
        minWidth: "0"
    }
});

const UserTokenDetails: React.FC<Props> = ({
                                               token
                                           }) => {
    const classes = useStyles();

    return (
        <Paper className='fieldsetParent'>
            <fieldset className={classes.container}>
                <Typography component='legend' variant='h5' gutterBottom>
                    API Token Details
                </Typography>
                <Typography variant='subtitle1' gutterBottom>
                    <b>API Token: </b>
                </Typography>
                <Typography gutterBottom className={classes.token}>
                    {token}
                </Typography>
                <CopyToClipboard
                    text={token ? token : ""}
                >
                    <Tooltip title="Copy API Token">
                        <Button size="small" variant="text" color="primary" fullWidth>
                            Copy API Token
                        </Button>
                    </Tooltip>
                </CopyToClipboard>
            </fieldset>
        </Paper>
    );
};

export default UserTokenDetails;
