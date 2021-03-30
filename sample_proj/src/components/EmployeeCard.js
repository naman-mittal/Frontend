import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserImg from './UserImg';
import { deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme)=>({
    root: {
     // minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      marginLeft : theme.spacing(2),
      marginTop : theme.spacing(1)
    },
    subTitle: {
      fontSize: 14,
      marginLeft : theme.spacing(2),
    },
    pos: {
      marginBottom: 12,
    },
    avatar : {
        fontSize : '10px',
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  }));

export default function EmployeeCard(props) {

    const classes = useStyles();
    //const bull = <span className={classes.bullet}>•</span>;

    const user = props.employee

    return (
        <Card className={classes.root}>
        <CardContent>
        <Grid container spacing={3}>
          
          <Grid item xs={2}>
          <UserImg initials={user.empName.split(" ")[0][0]+user.empName.split(" ")[1][0]} color={classes.orange}></UserImg>
          </Grid>

          <Grid item xs={10}>
          <Typography className={classes.title} color="textSecondary" >
           <strong>{user.empName}</strong>
          </Typography>
          <Typography className={classes.subTitle} color="textSecondary" >
           {user.empDomain?user.empDomain:'Not Assigned'}
          </Typography>
          </Grid>

          <Grid item xs={12}>
          <Typography className={classes.title} color="textSecondary" >
           {user.empName}
          </Typography>
          </Grid>

          </Grid>
           
         
          
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
}
