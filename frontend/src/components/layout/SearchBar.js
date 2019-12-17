import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Alert from "react-bootstrap/Alert";
import ErrorIcon from "@material-ui/icons/Error";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

export class SearchBar extends Component {
  state = {
    issueID: "0",
    projectID: "",
    statusDescription: "",
    title: "",
    assignor: "",
    assignee: "",
    type_: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      tags: [],
      users: [],
      searchTextProjects: "",
      searchTextAssignee: "",
      type_: null,
      statusDescription: null,
      title: null,
      otherDetails: "",
      projectID: null,
      searchTextAssignor: this.props.user,
      assignor: null,
      assignee: null
    };
    this.onProjectChange = this.onProjectChange.bind(this);
  }
  //////////////////////////////////////////////////////////////////////////////////////
  //fetch all users and projects on mount
  componentDidMount() {
    const jwtToken = localStorage.getItem("jwt");

    console.log(jwtToken);

    const fetchConfig = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    fetch("/api/projects", fetchConfig)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          issues: responseData
        });
      })
      .catch(err => console.error(err));

    fetch("/api/users", fetchConfig)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          users: responseData
        });
      })
      .catch(err => console.error(err));
  }

  //   Search issue function
  // ------------------------------------------------------------------
  searchIssue = () => {
    const jwtToken = localStorage.getItem("jwt");

    const fetchConfig = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        project_id: this.state.projectID,
        issue_title: this.state.title,
        assignor_id: this.state.assignor,
        assignee_id: this.state.assignee,
        category: this.state.type_,
        status_desc: this.state.statusDescription
      })
    };

    fetch("/api/issues/search", fetchConfig)
      .then(response => response.json())
      .then(responseData => {
        this.props.setIssues(responseData);
      });
  };

  //Get all issues
  // ------------------------------------------------------------------
  getIssues = () => {
    const jwtToken = localStorage.getItem("jwt");

    console.log(jwtToken);

    const fetchConfig = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    fetch("/api/issues/" + this.props.id, fetchConfig)
      .then(response => response.json())
      .then(responseData => {
        this.props.setIssues(responseData);
      })
      .catch(err => console.error(err));
  };

  //////////////////////////////////////////////////////////////////////////////////////
  //   Handlers

  handleChange = e => {

    if(e.target.value !==""){
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      function() {
        console.log(
          JSON.stringify({
            projectID: this.state.projectID,
            title: this.state.title,
            description_: this.state.description_,
            assignor: this.state.assignor,
            assignee: this.state.assignee,
            type_: this.state.type_,
            otherDetails: this.state.otherDetails,
            statusDescription: this.state.statusDescription
          })
        );
      }
    );
    }else{
        this.setState(
            {
              [e.target.name]: null
            }
        );
    }
  }
  // ------------------------------------------------------------------

  onProjectChange = (event, values) => {
    this.setState(
      {
        tags: values
      },
      () => {
        this.setState({
          projectID: this.state.tags.projectId,
          searchTextProjects: this.state.tags.name
        });
        console.log(this.state.tags.name);
      }
    );
  };
  // ------------------------------------------------------------------

  onAssignorChange = (event, values) => {
    this.setState(
      {
        tags: values
      },
      () => {
        this.setState({
          assignor: this.state.tags.userId,
          searchTextAssignor: this.state.tags.username
        });
        console.log(this.state.tags);
      }
    );
  };
  // ------------------------------------------------------------------

  onAssigneeChange = (event, values) => {
    this.setState(
      {
        tags: values
      },
      () => {
        this.setState({
          assignee: this.state.tags.userId,
          searchTextAssignee: this.state.tags.username
        });
        console.log(this.state.tags.name);
      }
    );
  };
  // ------------------------------------------------------------------

  handleChangeSelect = e => {
    console.log("value" + e.target.value);
    this.setState({
      type_: e.target.value
    });
  };
  // ------------------------------------------------------------------

  handleChangeStatus = e => {
    console.log("value" + e.target.value);
    this.setState({
      statusDescription: e.target.value
    });
  };
  // ------------------------------------------------------------------

  hangleChangeFilterAll = e => {
    if (e.target.value === "all") {
      this.setState({
        searchTextProjects: "",
        searchTextAssignee: "",
        type_: null,
        statusDescription: null,
        title: null,
        otherDetails: "",
        projectID: null,
        searchTextAssignor: null,
        assignor: null,
        assignee: null
      });

      this.searchIssue();
    } else {
      this.getIssues();
    }
  };
  // ------------------------------------------------------------------

  clearFields = () => {
    this.setState({
      searchTextProjects: "",
      searchTextAssignee: "",
      type_: null,
      statusDescription: null,
      title: null,
      otherDetails: "",
      projectID: null,
      searchTextAssignor: null,
      assignor: null,
      assignee: null
    });

    // this.searchIssue();
    document.getElementById("myForm").reset();
  };
  /////////////////////////////////////////////////////////////////
  //Render component

  render() {
    const projects = [];
    const users = [];

    this.state.issues.map((issue, index) => {
      projects.push(issue);
    });

    this.state.users.map((user, index) => {
      users.push(user);
    });

    return (
      <div>
        <form id="myForm">
          <Grid container spacing={3} alignItems="center" direction="row">
            <Grid item xs={3}>
              <Autocomplete
                id="project"
                clearText="Clear"
                options={projects}
                inputValue={this.state.searchTextProjects}
                onChange={this.onProjectChange}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField {...params} label="Έργο" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="title"
                name="title"
                label="Τίτλος"
                fullWidth
                autoComplete="lname"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                id="assignee"
                options={users}
                inputValue={this.state.searchTextAssignee}
                onChange={this.onAssigneeChange}
                getOptionLabel={option => option.username}
                renderInput={params => (
                  <TextField {...params} label="Εντολοδόχος" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="typelabel">Κατηγορία</InputLabel>
                <Select
                  labelId="typelabel"
                  id="type"
                  value={this.state.type_}
                  onChange={this.handleChangeSelect}
                >
                  <MenuItem value="">Επιλέξτε κατηγορία...</MenuItem>
                  <MenuItem value={0}>Error</MenuItem>
                  <MenuItem value={1}>Improvement</MenuItem>
                  <MenuItem value={2}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl style={{ width: "60%" }}>
                <InputLabel id="demo-simple-select-label">Κατάσταση</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="statusDesc"
                  value={this.state.statusDescription}
                  onChange={this.handleChangeStatus}
                >
                  <MenuItem value=""> Επιλέξτε κατάσταση... </MenuItem>
                  <MenuItem value={"Open"}> Open </MenuItem>
                  <MenuItem value={"Closed"}> Closed</MenuItem>
                  <MenuItem value={"Reopen"}> Reopen</MenuItem>
                  <MenuItem value={"Resolved"}> Resolved</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Εντολέας</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="assignor"
                  row
                  onClick={this.handleChange}
                >
                  <FormControlLabel
                    value={this.props.id}
                    control={<Radio />}
                    label="Εγώ"
                    id="radio-me"
                  />
                  <FormControlLabel
                    value={"null"}
                    control={<Radio />}
                    label="Άλλος"
                    id="radio-other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Θέματα</FormLabel>
                <RadioGroup
                  defaultValue=""
                  row
                  onClick={this.hangleChangeFilterAll}
                >
                  <FormControlLabel
                    value="mine"
                    control={<Radio />}
                    label="Όλα τα ανοιχτά μου θέματα"
                    id="all-issues-mine"
                  />
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="Όλα τα ανοιχτά θέματα"
                    id="all-issues"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  id="search-btn-s"
                  style={{ marginRight: "5px" }}
                  onClick={this.searchIssue}
                >
                  Αναζήτηση
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  id="clear-btn-s"
                  onClick={this.clearFields}
                >
                  Καθαρισμός
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default SearchBar;
