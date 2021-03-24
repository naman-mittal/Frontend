import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root:{
        top:50,
       right:0,
        position : 'fixed',
    },
  fab: {
    margin: theme.spacing(2),
    color:'#fff',
    backgroundColor : 'green',
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default function EditBtn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Edit" aria-label="edit">
        <Fab color="secondary" className={classes.fab}>
          <EditIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}
