import React from "react";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

//////////////////////////////////////////////////////////////////////////////////////

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

//////////////////////////////////////////////////////////////////////////////////////

export default function SideMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Καλωσήρθατε, {props.username}
        </ListSubheader>
      }
      className={classes.root}
    >
      <hr></hr>

      <ListItem button onClick={handleClick} style={{ whiteSpace: "normal" }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Διαχείριση Θεμάτων" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            id="create-button"
            button
            className={classes.nested}
            onClick={props.create}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Δημιουργία" />
          </ListItem>
          <ListItem
            id="search-button"
            button
            className={classes.nested}
            onClick={props.search}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Αναζήτηση" />
          </ListItem>
        </List>
      </Collapse>

      <hr></hr>

      <ListItem button id="signout-button">
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Αποσύνδεση" onClick={props.value} />
      </ListItem>
    </List>
  );
}

// export const mainListItems = (
//   <div>
//     <ListItem button>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Διαχείριση Θεμάτων" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <ExitToAppIcon />
//       </ListItemIcon>
//       <ListItemText primary="Αποσύνδεση Χρήστη" />
//     </ListItem>

//   </div>
// );
