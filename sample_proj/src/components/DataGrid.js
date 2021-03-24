import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import TodayIcon from '@material-ui/icons/Today';
import DomainIcon from '@material-ui/icons/Domain';
import FaceIcon from '@material-ui/icons/Face';
import DataItem from './DataItem'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
      flexGrow : 2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },
  right:{
      float : 'right',
  },
  list:{
      marginBottom : 0,
  },
}));

export default function DataGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={classes.paper}>
              Personal Details <PersonIcon className={classes.right}/>
              <List className={classes.list}>
              <DataItem icon={<AccountCircleIcon/>} title='Name' value='Naman Mittal'></DataItem>
              <DataItem icon={<MailOutlineIcon/>} title='Email' value='namanmittal@gmail.com'></DataItem>
              <DataItem icon={<AssignmentIndIcon/>} title='PAN' value='RETYU5674R'></DataItem>
              <DataItem icon={<TodayIcon/>} title='DOB' value='20/05/2000'></DataItem>
              </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={classes.paper}>
              Work Details <WorkIcon className={classes.right}/>
              <List className={classes.list}>
              <DataItem icon={<AssignmentIndIcon/>} title='Designation' value='Manager'></DataItem>
              <DataItem icon={<DomainIcon/>} title='Domain' value='Domain'></DataItem>
              <DataItem icon={<AssignmentIndIcon/>} title='Role' value='Analyst'></DataItem>
              <DataItem icon={<TodayIcon/>} title='DOJ' value='20/05/2000'></DataItem>
              <DataItem icon={<AttachMoneyIcon/>} title='Salary' value='45624.0'></DataItem>
              </List>
              </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={classes.paper}>
              Login Details <VpnKeyIcon className={classes.right}/>
              <List className={classes.list}>
              <DataItem icon={<FaceIcon/>} title='Username' value='naman123'></DataItem>
              </List>
              </Paper>
        </Grid>
        
      </Grid>
    </div>
  );
}
