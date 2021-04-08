import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
//import AppBar from "@material-ui/core/AppBar";

import Button from "@material-ui/core/Button";

import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
import * as actions from "../actions/user";
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

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    //display:'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  icon : {

    color  :'white',
    margin : 10,
    padding : theme.spacing(1),
    
    "&:hover": {
        boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
          transform: 'scale(1.05)',
      },
   

  },
  activeIcon : {

    color : "pink",
    boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
    borderBottom : '2px solid pink',
   

  },
  activeMenu  :{

    border : '2px solid blue',
    color : 'white',

  }
}));

export default function PrimarySearchAppBar() {
  let { path, url } = useRouteMatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const history = useHistory()

  const dispatch = useDispatch()

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogout = () => {
    dispatch(actions.logout());

    history.push("/signin");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {/* <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p> */}
        <NavLink
          to={`${url}`}
          activeClassName={classes.activeMenu}
          exact
          className="router-lnk"
        >
          <ListItem className="drawertabs" onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText className={classes.itemText} primary={"Dashboard"} />
          </ListItem>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink
          to={`${url}/profile`}
          activeClassName={classes.activeMenu}
          className="router-lnk"
        >
          <ListItem className="drawertabs"  onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.itemText}
              primary={"View Profile"}
            />
          </ListItem>
        </NavLink>
      </MenuItem>

      {user.roles[0] === "ROLE_ADMIN" && (
        <MenuItem>
          <NavLink
            to={`${url}/employees`}
            activeClassName={classes.activeMenu}
            className="router-lnk"
          >
            <ListItem className="drawertabs"  onClick={handleMobileMenuClose}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.itemText}
                primary={"Employees"}
              />
            </ListItem>
          </NavLink>
        </MenuItem>
      )}

<MenuItem>
         
            <ListItem className="drawertabs"  onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.itemText}
                primary={"Logout"}
              />
            </ListItem>
        </MenuItem>

    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6" noWrap>
            Expense Manager
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <NavLink
              to={`${url}`}
              activeClassName={classes.activeIcon}
              exact
              className={classes.icon}
            >
              <DashboardIcon  />
            </NavLink>

            <NavLink
              to={`${url}/profile`}
              activeClassName={classes.activeIcon}
              className={classes.icon}
            >
              <AccountCircleIcon />
            </NavLink>

            {user.roles[0] === "ROLE_ADMIN" && (
              <NavLink
                to={`${url}/employees`}
                activeClassName={classes.activeIcon}
                className={classes.icon}
              >
                <GroupIcon/>
              </NavLink>
            )}
            <div className={classes.icon} onClick={handleLogout}>
            <ExitToAppIcon  />
            </div>
</div>
<div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>

          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
