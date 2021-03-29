import React,{useEffect} from "react";
import clsx from "clsx";
import { useDispatch } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from '@material-ui/icons/Group';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {  Link, Switch , useRouteMatch,Route, useLocation, useHistory } from "react-router-dom";
import MainDashboard from "./MainDashboard";
import Profile from "./Profile";
import Tabs from "@material-ui/core/Tabs";
import * as actions from '../actions/user'
import PrivateRoute from './PrivateRoute'
import NoMatch from './NoMatch'
import EditUser from "./EditUser";
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ViewEmployees from './ViewEmployees'
import {history} from '../helpers/history'

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down("xs")]: {
      width: drawerWidth - 130,
    },
  },
  drawertabs: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down("xs")]: {
      width: drawerWidth - 130,
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor : '#f5f5f5',
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    [theme.breakpoints.down("xs")]: {
      marginLeft: -(drawerWidth - 120),
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    [theme.breakpoints.down("xs")]: {
      width: drawerWidth - 130,
    },
  },

  itemText: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  logoutBtn: {
    position:'fixed',
    color : 'white',
    fontWeight:'bold',
    right:10,
    top : 15,
  },
  paper: {
    position: 'absolute',
    width: 400,
    color : 'white',
    backgroundColor: 'black',
    //border: '2px solid #000',
   // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  },
 default:{
    color : 'grey',
  
  },
}));

export default function MainDrawer() {


  let history = useHistory()

  let { path, url } = useRouteMatch();
  let location = useLocation()

  //const history = useHistory()

  console.log("path = " + path)
  console.log("url = "+url)

  const classes = useStyles();
  //const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const [openM, setOpenM] = React.useState(false);

  useEffect(() => {

    console.log("inside effect")

    if(location.pathname==="/home")
    {
      console.log('"setting value to home')
      setValue(0)
    }
    
    else if(location.pathname==="/home/profile")
    {
      console.log('"setting value to profile')
      setValue(1)
    }
    else if(location.pathname==="/home/employees")
    {
      console.log('"setting value to employees')
      setValue(2)
    }
    else
    {
      console.log(url)
    }
  
    console.log("outside effect")

    },[]);


  
  

  const dispatch = useDispatch()

  const handleChange = (newValue,navUrl) => {
    console.log(newValue)
    if(newValue===undefined)
    setValue(0);
    else
    setValue(newValue);

    // console.log("shifting to = " + navUrl)
    // history.push(navUrl)

  };

  const openModal = () =>{
    setOpenM(true)
  }

  const handleLogout = () =>{

        

    dispatch(actions.logout())

    history.push('/signin')


}

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleClose = ()=>{
    console.log("closing modal...")
    setOpenM(false)
  }

  const body = (
    <div  className={classes.paper}>
      <h2 id="simple-modal-title">Logout</h2>
      <p id="simple-modal-description">
       Are you sure you want to logout?
      </p>
      <Button variant="contained"  onClick={handleLogout}><strong>Okay</strong></Button>
      <Button className={classes.default} onClick={handleClose}>Cancel</Button>
    </div>
  );

  

  return (
    
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          // className={clsx(classes.appBar, {
          //   [classes.appBarShift]: open,
          // })}
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              // className={clsx(classes.menuButton, open && classes.hide)}
              className={classes.menuButton}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" >
              Expense Manager
            </Typography>
           <Button color="inherit" className={classes.logoutBtn} onClick={openModal}>Logout</Button>
          <Dialog
        open={openM}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Logout?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           <strong>Cancel</strong>
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            <strong>Logout</strong>
          </Button>
        </DialogActions>
      </Dialog>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {/* <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div> */}
          {/* <Divider /> */}
          <div className={classes.drawerHeader} />

          {/* <Link to="/" className='router-lnk'>

        <ListItem button className={`drawertabs ${classes.active}`} onClick={handleClick}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText className={classes.itemText} primary={'Dashboard'} />
            </ListItem>

        </Link>

        <Link to="/profile" className='router-lnk'>

        <ListItem button className='drawertabs'>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText className={classes.itemText} primary={'View Profile'} />
            </ListItem>

        </Link> */}

          <Tabs
            value={value}
            orientation="vertical"
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon label tabs example"
          >
            <Link to={`${url}`} className="router-lnk">
            <ListItem
              button
              className={`drawertabs ${classes.active}`}
              onClick={()=> handleChange(0,`${url}`)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.itemText}
                primary={"Dashboard"}
              />
            </ListItem>
          </Link>
            
          <Link to={`${url}/profile`} className="router-lnk">
            <ListItem button className="drawertabs"
            onClick={()=> handleChange(1,`${url}/profile`)}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.itemText}
                primary={"View Profile"}
              />
            </ListItem>
          </Link>

          <Link to={`${url}/employees`} className="router-lnk">
            <ListItem button className="drawertabs"
            onClick={()=> handleChange(2)}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.itemText}
                primary={"Employees"}
              />
            </ListItem>
          </Link>


          </Tabs>

         

          

          {/* <List> 
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text} className='drawertabs'>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          <Switch>
            {/* <Route path="/profile">
              <Profile></Profile>
            </Route> */}
            
            <PrivateRoute component={ViewEmployees} path={`${path}/employees`} exact/>

            <PrivateRoute component={Profile} path={`${path}/profile`} exact/>
            

            <PrivateRoute component={EditUser} path={`${path}/profile/edit`} exact/>

            {/* <Route path="/dashboard">
              <MainDashboard></MainDashboard>
            </Route> */}
            <PrivateRoute component={MainDashboard} path={path} exact />
            
            <Route path="*">
            <NoMatch/>
          </Route>

          </Switch>
        </main>
      </div>
   
  );
}
