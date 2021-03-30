import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import * as actions from "../actions/user";
import EmployeeCard from "./EmployeeCard";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    
    paper: {
        
        position : 'fixed',
        zIndex: theme.zIndex.drawer + 1,
      padding: theme.spacing(2),
      margin:'auto',
      width : '96.5%',
      textAlign: 'left',
      color: 'white',
      backgroundColor : '#536dfe',
    },
    sticky:{
        position : 'sticky',
        top : 0,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
  }));

export default function ViewEmployees() {

    const classes = useStyles()

  const employees = useSelector((state) => state.employees);

  const [employeeList, setEmployeeList] = React.useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchEmployees());
    console.log(employees);
  }, []);

  useEffect(() => {
    if (employees != null) {
      let list = employees.map((emp, i) => {
        return <Grid item xs={12} sm={6} md={4}><EmployeeCard employee={emp}></EmployeeCard></Grid>;
      });
      setEmployeeList(list);
    }
  }, [employees]);

  if (employees == null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
        
      
        <Paper className={classes.paper}><strong>Employees</strong></Paper>
       
        <div className={classes.drawerHeader} />
        <Grid container spacing={3}>
        {employeeList}
        
        </Grid>
      
    </div>
  );
}
