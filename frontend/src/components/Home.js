import React, { FC, ChangeEvent, FormEvent, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import SideMenu from "./layout/Side";
import CreatePage from "./CreateIssue";
import UpdatePage from "./UpdateIssue";

import Table from "./Table1";
import SearchBar from "./layout/SearchBar";

//////////////////////////////////////////////////////////////////////////////////////
//template stuff
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Skyroof Constructions
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));
//////////////////////////////////////////////////////////////////////////////////////

export default function Dashboard(props) {
  //state handling for function
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  //message state and setter
  const [mess, setMessage] = useState("");
  //issue state and setter - we use it in for the update and delete functionallity
  const [issue, setIssue] = useState("");
  //issues state and setter - we use it in order to have dynamic update of the table
  const [issues, setIssues] = useState("");

  //template stuff
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //////////////////////////////////////////////////////////////////////////////////////

  //get the state of the main frame in order to view the proper page
  let mainFrame, subtitle, searchbar;

  // In each child component we pass setters functions in order
  // to update home parent component state
  if (props.isCreate) {
    //create state -set main frame to be the create page
    mainFrame = (
      <CreatePage
        search={props.search}
        mess={setMessage}
        user={props.username}
        id={props.id}
        permissions={props.permissions}
        setIssues={setIssues}
      />
    );
    subtitle = "Δημιουργία";
  } else if (props.isSearch) {
    //search state - set main frame to be the search page
    mainFrame = (
      <Table
        mess={setMessage}
        update={props.update}
        issue={setIssue}
        permissions={props.permissions}
        id={props.id}
        issues={issues}
        setIssues={setIssues}
      />
    );

    //search bar component
    searchbar = (
      <Paper className={classes.paper} style={{ marginBottom: "5px" }}>
        {/* searchbar*/}
        <SearchBar id={props.id} setIssues={setIssues} />
      </Paper>
    );
    subtitle = "Αναζήτηση";
  } else if (props.isUpdate) {
    //update state - set main frame to be the  update page
    mainFrame = (
      <UpdatePage
        search={props.search}
        mess={setMessage}
        issue={issue}
        id={props.id}
        setIssues={setIssues}
      />
    );
    subtitle = "Τροποποίηση";
  }

  //////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Διαχείριση Θεμάτων - {subtitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        {/* Side menu component------------------------------------------------------------ */}
        <Divider />
        <SideMenu
          value={props.value}
          username={props.username}
          create={props.create}
          search={props.search}
        />
        <Divider />
      </Drawer>
      {/* ---------------------------------------------------------------------------------------- */}
      <main
        className={classes.content}
        style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
      >
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Main page------------------------------------------------------------------------------- */}
            <Grid item xs={12}>
              <div class="mess">{mess}</div>
              {searchbar}
              <Paper className={classes.paper}>
                {/* render the main frame */}
                {mainFrame}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
