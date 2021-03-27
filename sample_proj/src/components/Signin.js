// import React from 'react'
 import { useDispatch , useSelector } from 'react-redux'
 import { useHistory } from 'react-router-dom';
 import * as actions from '../actions/user'
// import Button from '@material-ui/core/Button';

// export default function Signin() {

//     const user = JSON.parse(localStorage.getItem('user'));
    
//     const dispatch = useDispatch()

//     const handleLogin = () =>{

//         const username = document.getElementById('username').value
//         const password = document.getElementById('password').value

//         console.log(username)
//         console.log(password)

//         dispatch(actions.login(username,password))

//     }

   
    
//     return (
//         <div>
//             <input id="username" type="text" placeholder="username"></input>
//             <input id="password" type="text" placeholder="password"></input>
//             <Link to='/home' onClick={handleLogin}>Login</Link>
//             <div>{user ? user.accessToken+" "+user.id : 'Not logged in'}</div>
//         </div>
//     )
// }




import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
   
    const history = useHistory();
   
    const dispatch = useDispatch()

        // const handleLogin = (event) =>{
    
            
        //     const username = document.getElementById('username').value
        //     const password = document.getElementById('password').value
    
        //     console.log(username)
        //     console.log(password)
    
        //     dispatch(actions.login(username,password))

        //     // render={<Redirect to='/home'/>}
    
        //     event.preventDefault()


        // }

        const handleChange = (e) => {
            const { name, value } = e.target;
            if(name==='username')
            setUsername(value)
            else if(name==='password')
            setPassword(value)
        }

        const handleSubmit= (e) => {
            e.preventDefault();
    
          
            if(username&&password)
            {
              localStorage.setItem('user',JSON.stringify({id:100}))
            // dispatch(actions.signin({id:'temp'}))
             dispatch(actions.login(username,password))
           
            history.push('/')
            }
            else
            alert('Username & Password cannot be blank')
            

           // window.location.assign("/home")
        }

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            
            <Button
            type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
           
            </form>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/signup' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
         
        </div>
      </Grid>
    </Grid>
  );
}

