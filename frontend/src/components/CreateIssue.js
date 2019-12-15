import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Alert from "react-bootstrap/Alert";
import ErrorIcon from "@material-ui/icons/Error";

//////////////////////////////////////////////////////////////////////////////////////

export class CreateIssue extends Component {
  state = {
    issueID: "0",
    projectID: "",
    statusDescription: "",
    title: "",
    description_: "",
    assignor: "",
    assignee: "",
    type_: "",
    otherDetails: "",
    isCreated: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      tags: [],
      users: [],
      searchTextProjects: "",
      searchTextAssignor: "",
      searchTextAssignee: "",
      type_: "",
      isCreated: ""
    };
    this.onProjectChange = this.onProjectChange.bind(this);
  }
  //////////////////////////////////////////////////////////////////////////////////////
  //fetch all users and projects on mount
  componentDidMount() {
    this.props.mess("");

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

  //Create new issue request
  CreateIssue = () => {
    const jwtToken = localStorage.getItem("jwt");

    const fetchConfig = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectID: this.state.projectID,
        title: this.state.title,
        description_: this.state.description_,
        assignor: this.state.assignor,
        assignee: this.state.assignee,
        type_: this.state.type_,
        otherDetails: this.state.otherDetails,
        statusDescription: this.state.statusDescription
      })
    };

    fetch("/api/issues/create", fetchConfig).then(response => {
      console.log(response.status);

      if (response.status === 201) {
        this.props.mess(
          <Alert
            variant="success"
            style={{
              backgroundColor: "rgb(212, 237, 218)"
            }}
          >
            <CheckCircleIcon /> Το θέμα με τίτλο: "{this.state.title}"
            δημιουργήθηκε επιτυχώς!
          </Alert>
        );
      } else {
        this.props.mess(
          <Alert
            variant="danger"
            style={{
              backgroundColor: "rgb(248, 215, 218)"
            }}
          >
            <ErrorIcon /> Η δημιουργία του θέματος με τίτλο: "{this.state.title}
            " απέτυχε.
          </Alert>
        );
      }
    });

    this.props.search();
  };

  //////////////////////////////////////////////////////////////////////////////////////
  handleChange = e =>
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
            statusDescription:this.state.statusDescription
          })
        );
      }
    );

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

  handleChangeSelect = e => {
    console.log("value" + e.target.value);
    this.setState({
      type_: e.target.value
    });
  };

  handleChangeStatus = e => {
    console.log("value" + e.target.value);
    this.setState({
      statusDescription: e.target.value
    });
  };

  clearFields = () => {
    this.setState({
      issueID: "0",
      projectID: "",
      statusDescription: "",
      title: "",
      description_: "",
      assignor: "",
      assignee: "",
      type_: "",
      otherDetails: "",
      searchTextProjects: "",
      searchTextAssignor: "",
      searchTextAssignee: ""
    });

    document.getElementById("myForm").reset();
  };
  //////////////////////////////////////////////////////////////////////////////////////

  render() {
    const projects = [];
    const users = [];

    const options = {
      filterType: "dropdown",
      responsive: "scroll"
    };

    this.state.issues.map((issue, index) => {
      projects.push(issue);
    });

    this.state.users.map((user, index) => {
      users.push(user);
    });

    return (
      <div>
        <form id="myForm">
          <Typography variant="h6" gutterBottom>
            Δημιουργία νέου θέματος
          </Typography>
          <hr></hr>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="project"
                clearText="Clear"
                options={projects}
                required
                inputValue={this.state.searchTextProjects}
                onChange={this.onProjectChange}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Έργο"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="title"
                name="title"
                label="Τίτλος"
                fullWidth
                autoComplete="lname"
                variant="outlined"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description_"
                name="description_"
                label="Περιγραφή"
                variant="outlined"
                fullWidth
                autoComplete="billing address-line1"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="otherDetails"
                name="otherDetails"
                variant="outlined"
                label="Άλλες πληροφορίες"
                fullWidth
                autoComplete="billing address-line2"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="assignor"
                options={users}
                inputValue={this.state.searchTextAssignor}
                onChange={this.onAssignorChange}
                getOptionLabel={option => option.username}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Εντολέας"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="assignee"
                options={users}
                inputValue={this.state.searchTextAssignee}
                onChange={this.onAssigneeChange}
                getOptionLabel={option => option.username}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Εντολοδόχος"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                style={{
                  margin: "spacing(1)",
                  minWidth: "120",
                  width: "100%"
                }}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Κατάσταση
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="type"
                  value={this.state.statusDescription}
                  onChange={this.handleChangeStatus}
                >
                  <MenuItem value=""> Επιλέξτε κατάσταση... </MenuItem>
                  <MenuItem value={'Open'}> Open </MenuItem>
                  <MenuItem value={'Closed'}> Closed</MenuItem>
                  <MenuItem value={'Reopen'}> Reopen</MenuItem>
                 <MenuItem value={'Resolved'}> Resolved</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                style={{ margin: "spacing(1)", minWidth: "120", width: "100%" }}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Κατηγορία
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="type"
                  value={this.state.type_}
                  onChange={this.handleChangeSelect}
                >
                  <MenuItem value="">Επιλέξτε κατηγορία...</MenuItem>
                  <MenuItem value={0}>Improvement</MenuItem>
                  <MenuItem value={1}>Error</MenuItem>
                  <MenuItem value={2}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={this.CreateIssue}
                startIcon={<PlaylistAddIcon />}
              >
                Δημιουργία
              </Button>
              <Button
                style={{ marginLeft: "5px" }}
                onClick={this.clearFields}
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
              >
                Καθαρισμός
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default CreateIssue;
