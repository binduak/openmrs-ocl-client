import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  title: string;
  message: string;
  description: string;
  open: boolean;
  setOpen: Function;
  onConfirm: Function;
}

const ConfirmDialog: React.FC<Props> = ({
title,
message,
description,
open,
setOpen,
onConfirm
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="version-description"
            label="Description"
            type="Description"
            placeholder={description}
            fullWidth
          />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpen(false)}
          color="primary"
        >
          No
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="secondary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
