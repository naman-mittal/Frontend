import React, { useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from './AppBar'
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import DataTable from '../ClaimsModule/DataTable'
import AddClaim from '../ClaimsModule/AddClaim'

import {
  Switch,
  useRouteMatch,
  Route,
  useHistory,
  NavLink,
} from "react-router-dom";
import MainDashboard from "./MainDashboard";
import Profile from "./Profile";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import * as actions from "../../actions/user";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import NoMatch from "./NoMatch";
import EditUser from "./EditUser";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ViewEmployees from "./ViewEmployees";

const drawerWidth = 180;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
   // display: "flex",
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
   // flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
   
   
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
    position: "fixed",
    color: "white",
    fontWeight: "bold",
    right: 10,
    top: 15,
  },
  paper: {
    position: "absolute",
    width: 400,
    color: "white",
    backgroundColor: "black",
    //border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  default: {
    color: "grey",
  },
  active: {
    color: "blue",
    borderRight: "2px solid blue",
  },
}));

export default function MainDrawer() {
  let history = useHistory();

  const user = JSON.parse(localStorage.getItem("user"));

  let { path, url } = useRouteMatch();

  //const history = useHistory()

  console.log("path = " + path);
  console.log("url = " + url);

  const classes = useStyles();
  //const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [openM, setOpenM] = React.useState(false);

  const [openSnack, setOpenSnack] = React.useState(false);

  const alert = useSelector((state) => state.reducer.alert);

  useEffect(() => {
    if (alert) setOpenSnack(true);
  }, [alert]);

  const dispatch = useDispatch();

  const openModal = () => {
    setOpenM(true);
  };

  const handleLogout = () => {
    dispatch(actions.logout());

    history.push("/signin");
  };

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    console.log("closing modal...");
    setOpenM(false);
  };

  const handleCloseSnack = () => {
    console.log("closing snackbar...");
    setOpenSnack(false);
  };

  return (
    <div className={classes.root}>
      {/* <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={alert ? alert.type : "success"}
        >
          {alert ? alert.message : "sample"}
        </Alert>
      </Snackbar> */}

      <CssBaseline />

      <AppBar/>
     
      <main
        className={classes.content}
      >
        <div className={classes.drawerHeader} />

        <Switch>
          {/* <Route path="/profile">
              <Profile></Profile>
            </Route> */}

          <AdminRoute
            component={ViewEmployees}
            path={`${path}/employees`}
            exact
          />

          <AdminRoute
            component={Profile}
            path={`${path}/employees/view/:id`}
            exact
          />

          <AdminRoute
            component={EditUser}
            path={`${path}/employees/view/:id/edit/:id`}
            exact
          />

          <PrivateRoute component={Profile} path={`${path}/profile`} exact />

          <PrivateRoute component={DataTable} path={`${path}/claims`} exact />

          <PrivateRoute component={AddClaim} path={`${path}/claims/add`} exact />

          <PrivateRoute
            component={EditUser}
            path={`${path}/profile/edit/:id`}
            exact
          />

          {/* <Route path="/dashboard">
              <MainDashboard></MainDashboard>
            </Route> */}
          <PrivateRoute component={MainDashboard} path={path} exact />

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
