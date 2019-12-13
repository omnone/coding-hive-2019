import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

export class CreateIssue extends Component {
  state = {
    issueID: "0",
    projectID: "",
    statusID: "0",
    title: "",
    description_: "",
    assignor: "",
    assignee: "",
    type_: "0",
    otherDetails: ""
  };

  constructor(props) {
    super(props);
    this.state = { issues: [], tags: [], users: [],        searchText: '' };
    this.onProjectChange = this.onProjectChange.bind(this);
  }

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
            type_: this.state.type__,
            otherDetails: this.state.otherDetails
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
        this.setState({ projectID: this.state.tags.projectId });
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
        this.setState({ assignor: this.state.tags.userId });
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
        this.setState({ assignee: this.state.tags.userId });
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

  clearFields = () =>{
    this.setState({
      issueID: "0",
      projectID: "",
      statusID: "0",
      title: "",
      description_: "",
      assignor: "",
      assignee: "",
      type_: "0",
      otherDetails: "",
      searchText: ''
    });

    document.getElementById("project").value ="";
    console.log(document.getElementById("project").value);
    document.getElementById("project").value ="";

    // document.getElementById("myForm").reset();
  }

  

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
        otherDetails: this.state.otherDetails
      })
    };

    fetch("/api/issues/create", fetchConfig);
    
    this.props.search();
  };

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
              clearText='Clear'
              options={projects}
              required
              searchText={this.state.searchText}
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
            <TextField
              required
              id="status"
              name=""
              variant="outlined"
              label="Κατάσταση"
              fullWidth
              autoComplete="billing postal-code"
            />
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
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
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
