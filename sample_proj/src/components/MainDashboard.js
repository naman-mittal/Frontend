import React, { Component, useEffect } from "react";

import DataTable from "./DataTable";
import Grid from "@material-ui/core/Grid";
import Card from './Card/Card'
import CardHeader from './Card/CardHeader'
import CardIcon from './Card/CardIcon'
import CardFooter from './Card/CardFooter'
import { useDispatch,useSelector } from 'react-redux'
import ErrorIcon from '@material-ui/icons/Error';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { fade, makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import * as actions from '../actions/claim'

const useStyles = makeStyles(styles);


export default function MainDashboard(){
  
    const classes = useStyles()

    const dispatch = useDispatch()

    const claims = useSelector(state => state.claimReducer.claims)

    const[pending,setPending] = React.useState(0)
    const[total,setTotal] = React.useState(0)

    const[claimedAmount,setClaimedAmount] = React.useState(0)

    const[projects,setProjects] = React.useState(0)


    useEffect(()=>{

        let user = JSON.parse(localStorage.getItem('user'))
        if(user.roles[0]==='ROLE_USER')
        dispatch(actions.fetchClaimsByEmployee(user.id))
        else
        dispatch(actions.fetchClaims())

    },[])

    useEffect(()=>{

      if(claims!=null)
      {
          let sum = 0;

         

          console.log(claims)
          setTotal(claims.length)

          let list = claims.map(claim=>claim.project.title)

          list = list.filter((x, i, a) => a.indexOf(x) === i)

          // console.log(list)

          setProjects(list.length)

           list = claims.filter(claim => claim.status.toLowerCase()==='pending')

          setPending(list.length)

          list = claims.filter(claim => claim.status.toLowerCase()==='approved')

          for(var i=0;i<list.length;i++)
          {
              sum+=list[i].expenseAmount;
          }

         
          setClaimedAmount(sum)
      }

    },[claims])

    return (
      <Grid container spacing={3}>
        <Grid item xs={8} sm={6} md={4}>
        <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="info">
                <ErrorIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Claims</p>
              <h3 className={classes.cardTitle}>
               {pending} <small>Pending</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger>
                  <Warning />
                </Danger> */}
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </Grid>

        <Grid item xs={8} sm={6} md={4}>
        <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <AttachMoneyIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Amount</p>
              <h3 className={classes.cardTitle}>
               {claimedAmount} <small>Claimed</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger>
                  <Warning />
                </Danger> */}
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </Grid>

        <Grid item xs={8} sm={6} md={4}>
        <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="rose">
                <AssignmentIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Worked On</p>
              <h3 className={classes.cardTitle}>
               {projects} <small>{projects>1?'Projects':'Project'}</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger>
                  <Warning />
                </Danger> */}
                {/* <a href="#pablo" onClick={e => e.preventDefault()}> */}
                  Keep it up!
                {/* </a> */}
              </div>
            </CardFooter>
          </Card>
        </Grid>
        

       { claims && <Grid item xs={12}>
          <DataTable claims={claims}/>
        </Grid> }
      </Grid>
    );
  
}
