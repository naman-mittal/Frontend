import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../actions/user";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validNameRegex = RegExp(/^[A-Z][a-z]{3,}$/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    firstName: "",
    lastName: "",
  });

  const alert = useSelector(state => state.reducer.alert)

  const signedUp = useSelector(state => state.reducer.signedUp)

  const history = useHistory();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    var err = errors;

    if (name === "firstName") {
      setFirstName(value);
      err.firstName = validNameRegex.test(value)
        ? ""
        : "Basic English rule.... Duh!";
    } else if (name === "lastName") {
      setLastName(value);
      err.lastName = validNameRegex.test(value)
        ? ""
        : "Basic English rule.... Duh!";
    } else if (name === "email") {
      setEmail(value);
      err.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
    } else if (name === "username") {
      setUsername(value);

      err.username =
        value.length >= 5 ? "" : "Username must be 5 character long";
    } else if (name === "password") {
      setPassword(value);

    

      err.password =
        value.length >= 8 ? "" : "Password must be 8 character long";
    }
    else if (name === "confirmPassword") {
      
      setConfirmPassword(value)

      

        err.confirmPassword = value.localeCompare(password)===0 ? "" : "Password doesn't match"

      

     
    }

    setErrors(err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // let err = errors

    // err.confirmPassword = confirmPassword!==password ? "Password doesn't match" : ""
    
    // setErrors(err)

    if (validateForm(errors)) {
      console.log("signing up....");

      if(firstName&&lastName&&username&&email&&password)
      {


        setOpen(true)
        const signupRequest = {
          name: firstName + " " + lastName,
          email: email,
          username: username,
          password: password,
        };
        dispatch(actions.signUp(signupRequest));
      }
      else
      {
        window.alert('Fields cannot be null')
      }

      
    } else {
      console.error("Invalid Form");
    }
  };

  useEffect(() => {
    
    if(signedUp)
    {
      history.push("/signin");
    }

  },[signedUp,history]);

  useEffect(() => {

    if(alert)
    {
      setOpen(false)
      setOpenSnack(true)
    }
  
    },[alert]);

    const handleCloseSnack = () =>{
      setOpenSnack(false)
    }

  return (
    <Container component="main" maxWidth="xs">
       <Snackbar
              open={openSnack}
              autoHideDuration={6000}
              onClose={handleCloseSnack}
            >
              <Alert onClose={handleCloseSnack} severity={alert?alert.type:'success'}>
                {alert ? alert.message : 'sample'}
              </Alert>
            </Snackbar>
            <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {errors.firstName.length > 0 ? (
                <TextField
                  autoComplete="fname"
                  error
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  helperText={errors.firstName}
                />
              ) : (
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {errors.lastName.length > 0 ? (
                <TextField
                  variant="outlined"
                  error
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={handleChange}
                  helperText={errors.lastName}
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={handleChange}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              {errors.email.length > 0 ? (
                <TextField
                  variant="outlined"
                  required
                  error
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  helperText={errors.email}
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {errors.username.length > 0 ? (
                <TextField
                  variant="outlined"
                  required
                  error
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  //autoComplete="username"
                  onChange={handleChange}
                  helperText={errors.username}
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  //autoComplete="username"
                  onChange={handleChange}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {errors.password.length > 0 ? (
                <TextField
                  variant="outlined"
                  required
                  error
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  helperText={errors.password}
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {errors.confirmPassword.length > 0 ? (
                <TextField
                  variant="outlined"
                  required
                  error
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  onChange={handleChange}
                  helperText={errors.confirmPassword}
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  onChange={handleChange}
                />
              )}
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/signin" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
