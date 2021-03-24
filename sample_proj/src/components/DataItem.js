import React from 'react';
import { makeStyles , createMuiTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  icon:{
      fontSize : 'large',
  },
  item:{
    padding : 0,
  },
  
}));

// const theme = createMuiTheme({
//     overrides: {
//       // Style sheet name ⚛️ MuiListItemText-primary
//       MuiListItem: {
//         // Name of the rule
//         text: {
//           // Some CSS
//           color: 'black',
//         },
//       },
//     },
//   });

export default function FolderList(props) {
  const classes = useStyles();

  return (
   
      <ListItem className={classes.item}>
        <ListItemAvatar className={classes.icon}>
          
            {props.icon}
         
        </ListItemAvatar>
        <ListItemText primary={props.title} secondary={props.value} />
      </ListItem>
      
  );
}
