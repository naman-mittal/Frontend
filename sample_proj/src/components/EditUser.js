import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import * as actions from '../actions/user'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  paper: {
    //marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditUser({match}) {

    const classes = useStyles()

    const user = useSelector(state => state.reducer.user)

    const updated = useSelector(state => state.reducer.updated)

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [pan, setPan] = React.useState('')

    const history = useHistory()

    const dispatch = useDispatch();  

   

    useEffect(() => {

        let loginUser = JSON.parse(localStorage.getItem('user'));
        let id = match.params.id 

         if(loginUser.roles[0]==='ROLE_ADMIN' || loginUser.id === id)
          dispatch(actions.fetchUser(id))
      
        },[]);

        useEffect(() => {

          if(updated)
  {
    console.log(history)
    history.goBack()
  }
        
          },[updated,history]);

        useEffect(() => {

          console.log('inside user effect....')

          if(user!=null)
          {
            console.log('setting PAN to ' + user.empPAN)
          setPan(user.empPAN)
          setFirstName(user.empName.split(" ")[0])
          setLastName(user.empName.split(" ")[1])
          }
          
        
          },[user]);

        const handleChange = (e) =>{

          const {name,value} = e.target
      
          if(name==='firstName')
          setFirstName(value)
          else if(name==='lastName')
          setLastName(value)
          else if(name==='email')
          setEmail(value)
          else if(name==='username')
          setUsername(value)
          else if(name==='password')
          setPassword(value)
          else if(name==='pan')
          setPan(value)
      
      
        }

        const handleSubmit= (e) => {
          e.preventDefault();
      
          console.log("signing up....")
      
          const updateRequest = {
            // empDOB: null,
            // empDOJ: null,
            // empDesignation: null,
            // empDomain: null,
            // empEmailId: "naman@gmail.com",
            id: user.empId,
            //empName: "Naman Mittal",
           pan: pan,
           // empSalary: null
          }
        
         dispatch(actions.editUser(updateRequest))
      
        
      }

    if(user===undefined || user.empName===undefined)
    {
      console.log('checking for user....')
      return(
        <h1>
        Loading....
        </h1>
      )
    }


  const handleCancel = ()=>{
    console.log(history)
    history.goBack()
  }

 
    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Edit profile 
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
              />
              
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="pan"
                label="PAN"
                type="pan"
                id="pan"
                autoComplete="pan"
                value={pan}
                onChange={handleChange}
              />
              </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            
            // fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCancel}
          >
           Cancel
          </Button>
          <Button
            type="submit"
            // fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
           Update
          </Button>
          </form>
          {/* <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
    )
}
