import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  Button,
  ButtonGroup,
  Dialog,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import { Menu, MenuItem } from "@material-ui/core";
import {
  MoreVert as MoreVertIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { DictionaryVersion, APIDictionaryVersion } from "../types";
import { BASE_URL } from "../../../utils";
import DictionaryVersionForm from "./DictionaryVersionForm";
import ConfirmDialog from "./ConfirmDialog";

interface Props {
  versions: APIDictionaryVersion[];
  subscriptionUrl: string;
  showCreateVersionButton: boolean;
  createDictionaryVersion: Function;
  editDictionaryVersion: Function;
  createVersionLoading: boolean;
  createVersionError?: { detail: string };
  dictionaryUrl: string;
  linkedSource: string;
}

const ReleasedVersions: React.FC<Props> = ({
  versions,
  subscriptionUrl,
  showCreateVersionButton,
  createDictionaryVersion,
  editDictionaryVersion,
  createVersionLoading,
  createVersionError,
  dictionaryUrl,
  linkedSource
}) => {
  const versionsToDisplay = versions.filter(row => row.id !== "HEAD");
  const [version, setVersion] = React.useState<DictionaryVersion>(
    {
    id: "",
    released: false,
    description: "",
    external_id: ""
  });
  const [open, setOpen,] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const changeStatus = (version: DictionaryVersion) => {
    console.log(version);
    setVersion(version);
    setConfirmOpen(true);
  }
  const getDescription = ():string => {
    if (document.getElementById('version-description') !== null){
      return (document.getElementById('version-description') as HTMLInputElement).value
    }
    return "";
  }

  const handleEditVersion = (version: DictionaryVersion) => {
    console.log(version);
      editDictionaryVersion(`${dictionaryUrl}${version.id}/`, {
      "released": !version.released,
      "description": getDescription() || version.description
    })
    setConfirmOpen(false);
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>, version: DictionaryVersion) => {
    setAnchorEl(event.currentTarget);
    setVersion(version);
  };


  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Paper className="fieldsetParent">
      <fieldset>
        <Typography component="legend" variant="h5" gutterBottom>
          Releases
        </Typography>
        {versionsToDisplay.length > 0 ? (
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Version</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Release Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {versionsToDisplay.map((row: APIDictionaryVersion) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Tooltip title="View Concepts" enterDelay={700}>
                        <Link
                          onClick={e => e.stopPropagation()}
                          to={`${dictionaryUrl}${row.id}/concepts/?linkedSource=${linkedSource}`}>
                          {row.id}
                        </Link>
                      </Tooltip>
                    </TableCell>
                    <TableCell style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}>{row.description || "None"}
                    </TableCell>
                    <TableCell>
                      <Tooltip title={`${row.released?"Released" : "Unreleased"} Version`} enterDelay={700}>
                        <Switch
                          checked={row.released}
                          onChange={() => changeStatus(row)}
                          name="releaseStatus"
                          color="primary"
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                        <Tooltip title="More actions" enterDelay={700}>
                          <IconButton
                            aria-label="more"
                            aria-controls="menu"
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e,row)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleCloseMenu}>
                          <MenuItem onClick={handleCloseMenu}>
                            <CopyToClipboard text={`${version.released ? `${BASE_URL}${subscriptionUrl}${version.id}/` : null}`}>
                              <Tooltip title={`${version.released ? `Copy ${BASE_URL}${subscriptionUrl}${version.id}/` : "This is NOT a Released Version"}`} enterDelay={700}>
                                <span>
                                  <Button disabled={!version.released}>
                                    Copy subscription URL
                                  </Button>
                                </span>
                              </Tooltip>
                            </CopyToClipboard>
                          </MenuItem>
                        </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <Typography align="center">No released versions</Typography>
        )}
        <br />
        <ButtonGroup fullWidth variant="text" color="primary">
          <CopyToClipboard text={`${BASE_URL}${subscriptionUrl}`}>
            <Tooltip title={`Copy ${BASE_URL}${subscriptionUrl}`}>
              <Button disabled={!versionsToDisplay.length}>
                Copy subscription URL
              </Button>
            </Tooltip>
          </CopyToClipboard>
          {!showCreateVersionButton ? null : (
            <Button onClick={handleClickOpen}>Release new version</Button>
          )}
        </ButtonGroup>
      </fieldset>

      <Dialog onClose={handleClose} open={open}>
        <DictionaryVersionForm
          onSubmit={createDictionaryVersion}
          loading={createVersionLoading}
          handleClose={handleClose}
          error={createVersionError}
        />
      </Dialog>
      <ConfirmDialog
        title="Please Confirm!"
        message={`Do you want to ${version.released ? "unrelease" : "release"} the version ${version.id}?`}
        description={`${version.description}`}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => handleEditVersion(version)}>
    </ConfirmDialog>

    </Paper>
  );
};


export default ReleasedVersions;
