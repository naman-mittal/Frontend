import React,{useEffect} from 'react';
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
import { useSelector , useDispatch } from 'react-redux';
import * as actions from '../actions/user'
import UserImg from './UserImg'

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
  icon:{
        height : 30,
        width : 30,
  },
  heading:{
      fontSize:18,
      color : theme.palette.primary.dark,
  }
}));

export default function DataGrid(props) {
 
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();  
  
    const classes = useStyles();

    useEffect(() => {

        dispatch(actions.fetchUser(7))
    
      },[]);

    if(user.loginDetails===undefined)
    {
        return(
            <h1>No data</h1>
        )
    }

    
  

 // dispatch(actions.fetchUser(1))


  
  
  return (
      

    

    <div className={classes.root}>
        <UserImg initials={user.empName.split(" ")[0][0]+user.empName.split(" ")[1][0]}></UserImg>
                <br/>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={classes.paper}>
             <span className={classes.heading}> Personal Details </span> <PersonIcon className={classes.right}/>
              <List className={classes.list}>
              <DataItem icon={<AccountCircleIcon/>} title='Name' value={user.empName}></DataItem>
              <DataItem icon={<MailOutlineIcon/>} title='Email' value={user.empEmailId}></DataItem>
              <DataItem icon={<AssignmentIndIcon/>} title='PAN' value={user.empPAN}></DataItem>
              <DataItem icon={<TodayIcon/>} title='DOB' value={user.empDOB}></DataItem>
              </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={classes.paper}>
          <span className={classes.heading}> Work Details </span> <WorkIcon className={classes.right}/>
              <List className={classes.list}>
              <DataItem icon={<AssignmentIndIcon/>} title='Designation' value={user.empDesignation}></DataItem>
              <DataItem icon={<DomainIcon/>} title='Domain' value={user.empDomain}></DataItem>
              <DataItem icon={<AssignmentIndIcon/>} title='Role' value={user.loginDetails.role}></DataItem>
              <DataItem icon={<TodayIcon/>} title='DOJ' value={user.empDOJ}></DataItem>
              <DataItem icon={<img className={classes.icon} alt='R' src='img_ruppee.png'/>} title='Salary' value={user.empSalary}></DataItem>
              </List>
              </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={classes.paper}>
          <span className={classes.heading}> Login Details </span> <VpnKeyIcon className={classes.right}/>
              <List className={classes.list}>
              <DataItem icon={<FaceIcon/>} title='Username' value={user.loginDetails.userName}></DataItem>
              </List>
              </Paper>
        </Grid>
        
      </Grid>
    </div>
  );
}




