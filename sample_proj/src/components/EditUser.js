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
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
  cancel: {
    margin: theme.spacing(3, 4,2, 4),
  },
  update:{
    margin: theme.spacing(3, 0, 2,1),
  }
}));

export default function EditUser({match}) {

    const classes = useStyles()

    const user = useSelector(state => state.reducer.user)

    const loginUser = JSON.parse(localStorage.getItem('user'))

    const updated = useSelector(state => state.reducer.updated)

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [pan, setPan] = React.useState('')
    const [doj, setDoj] = React.useState(Date.now())
    const [dob, setDob] = React.useState(Date.now())
    const [domain, setDomain] = React.useState(null)


    const history = useHistory()

    const dispatch = useDispatch();  

   

    useEffect(() => {

        let loginUser = JSON.parse(localStorage.getItem('user'));


        let id = match.params.id 

        console.log(loginUser)
        console.log("id" + id)

       // console.log(loginUser.id === id)

         if(loginUser.roles[0]==='ROLE_ADMIN' || loginUser.id === parseInt(id))
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
          setEmail(user.empEmailId)
          setUsername(user.loginDetails.userName)
          setDob(user.empDOB)
          setDomain(user.empDomain)
          }
          
        
          },[user]);

          const handleDateChange = (date) => {
            setDob(date);
            console.log("date = "+ date)
            console.log(typeof(date))
          };

        const handleChange = (e) =>{

          console.log(e.target)

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
          else if(name==='domain')
          {
            setDomain(value)
          }
      
      
        }


        const getDateFormat = (date) =>{
          console.log("month = " + date.getMonth())
          console.log("year = " + date.getFullYear())
          console.log("day = " + date.getDate())

          let year = date.getFullYear()
          let month = date.getMonth()>9?date.getMonth()+1:"0"+(date.getMonth()+1)
          let day = date.getDate()>9?date.getDate():"0"+date.getDate()

          return month+"/"+day+"/"+year

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
           dob: getDateFormat(new Date(dob)),
           name:firstName+" "+lastName,
           email : email,
           username : username,
           loginId : user.loginDetails.id,
           domain : domain
           // empSalary: null
          }
        
         dispatch(actions.editUser(updateRequest))
      
        
      }

    if(user==null || user===undefined || user.empName===undefined)
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
                value={email}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value = {username}
                onChange={handleChange}
              />
            </Grid> */}
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
            <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
          fullWidth
          id="date-picker-dialog"
          label="Date of Birth"
          format="MM/dd/yyyy"
          value={dob}
          name='doj'
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
            </Grid>

            {loginUser.roles.includes('ROLE_ADMIN') &&

            (
              <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                
                label="Domain"
                name="domain"
                value={domain}
                onChange={handleChange}
              />
            </Grid>
            )


            }
            
          </Grid>
          <Button
            
            // fullWidth
            variant="contained"
            color="primary"
            className={classes.cancel}
            onClick={handleCancel}
          >
           Cancel
          </Button>
          <Button
            type="submit"
            // fullWidth
            variant="contained"
            color="primary"
            className={classes.update}
            
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
