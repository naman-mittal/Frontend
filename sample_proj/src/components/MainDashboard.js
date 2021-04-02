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


    useEffect(()=>{

        let user = JSON.parse(localStorage.getItem('user'))
        dispatch(actions.fetchClaimsByEmployee(user.id))

    },[])

    useEffect(()=>{

      if(claims!=null)
      {
          let sum = 0;

         

          console.log(claims)
          setTotal(claims.length)

          let list = claims.filter(claim => claim.status.toLowerCase()==='pending')

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
        <Grid item xs={4}>
        <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <ErrorIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Claims</p>
              <h3 className={classes.cardTitle}>
               {pending}/{total} <small>Pending</small>
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

        <Grid item xs={4}>
        <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <AttachMoneyIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
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

        

        {/* <Grid item xs={12}>
          <DataTable />
        </Grid> */}
      </Grid>
    );
  
}
