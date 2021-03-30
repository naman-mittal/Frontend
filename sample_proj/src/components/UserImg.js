import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  
  
}));

export default function UserImg(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Avatar>H</Avatar>
      <Avatar className={classes.orange}>N</Avatar> */}
      <Avatar className={`${props.color} ${props.size} ${props.align}` } >{props.initials}</Avatar>
    </div>
  );
}
