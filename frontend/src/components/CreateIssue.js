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

//////////////////////////////////////////////////////////////////////////////////////

export class CreateIssue extends Component {
  //State and constructor
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
      searchTextAssignee: "",
      type_: "",
      statusDescription: "Open",
      isCreated: "",
      title: "",
      description_: "",
      assignee: "",
      otherDetails: "",
      projectID: "",
      searchTextAssignor: this.props.user,
      assignor: this.props.id
    };
    this.onProjectChange = this.onProjectChange.bind(this);
  }
  //////////////////////////////////////////////////////////////////////////////////////
  //FUNCTIONS
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

    this.setState({
      searchTextAssignor: this.props.user,
      assignor: this.props.id
    });
  }
  // -------------------------------------------------------------------------
  //Create new issue request
  CreateIssue = () => {
    const errors = [];
    let error_message = "";

    let permission_to_apply = -1;

    //Check if user has the proper permission in order to create an issue for the specific project
    this.props.permissions.map(perm => {
      if (perm.project.projectId === this.state.projectID) {
        permission_to_apply = perm.permissionId;
      }
    });

    //add to error message the permission error
    if (permission_to_apply === 0) {
      error_message +=
        "Δεν έχετε τα κατάλληλα δικαιώματα για να δημιουργήσετε θέμα στο έργο: " +
        this.state.searchTextProjects +
        "\n";
    }

    //Create the proper error message for the missing fields
    if (this.state.projectID === "") {
      console.log("error");
      errors.push("Έργο");
    }
    if (this.state.statusDescription === "") {
      console.log("error");
      errors.push("Κατάσταση");
    }
    if (this.state.title === "") {
      console.log("error");
      errors.push("Τίτλος");
    }
    if (this.state.description_ === "") {
      console.log("error");
      errors.push("Περιγραφή");
    }
    if (this.state.assignor === "") {
      console.log("error");
      errors.push("Εντολέας");
    }
    if (this.state.assignee === "") {
      console.log("error");
      errors.push("Εντολοδόχος");
    }
    if (this.state.type_ === "") {
      console.log("error");
      errors.push("Κατηγορία");
    }

    if (errors.length) {
      error_message += "Συμπληρώστε τα πεδία : " + errors.toString();
    }

    //if the creation form did not have any errors procced to the request
    if (error_message === "") {
      //no errors found on the form
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
        //Check if the create of new issue was successful
        if (response.status === 201) {
          //success
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

          //refresh issues for the table
          this.getIssues();
          this.props.search();
        } else {
          //failed
          this.props.mess(
            <Alert
              variant="danger"
              style={{
                backgroundColor: "rgb(248, 215, 218)"
              }}
            >
              <ErrorIcon /> Η δημιουργία του θέματος με τίτλο: "
              {this.state.title}" απέτυχε.
            </Alert>
          );

          //refresh issues for the table
          this.getIssues();
          this.props.search();
        }
      });
    } else {
      //user had error when completed the form
      this.props.mess(
        <Alert
          variant="danger"
          style={{
            backgroundColor: "rgb(248, 215, 218)"
          }}
        >
          <ErrorIcon />
          {error_message}
        </Alert>
      );
    }
  };

  //Get all open  issues for the user as assignee or assignor
  // -------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------

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
  //Stae handlers
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
            statusDescription: this.state.statusDescription
          })
        );
      }
    );
  // -------------------------------------------------------------------------

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
  // -------------------------------------------------------------------------

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
  // -------------------------------------------------------------------------

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
  // -------------------------------------------------------------------------

  handleChangeSelect = e => {
    console.log("value" + e.target.value);
    this.setState({
      type_: e.target.value
    });
  };
  // -------------------------------------------------------------------------

  handleChangeStatus = e => {
    console.log("value" + e.target.value);
    this.setState({
      statusDescription: e.target.value
    });
  };

  clearAssignor = () => {
    this.setState({
      assignor: "",
      searchTextAssignor: ""
    });
  };

  //////////////////////////////////////////////////////////////////////////////////////

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
                required
                inputValue={this.state.searchTextAssignor}
                onChange={this.onAssignorChange}
                getOptionLabel={option => option.username}
                onClick={this.clearAssignor}
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
                required
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
                id="statusdesc"
                required
                style={{
                  margin: "spacing(1)",
                  minWidth: "120",
                  width: "100%"
                }}
              >
                <InputLabel id="statuslabel">Κατάσταση</InputLabel>
                <Select
                  labelId="statuslabel"
                  value={this.state.statusDescription}
                  // labelWidth={labelWidth}
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
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                id="type"
                required
                style={{ margin: "spacing(1)", minWidth: "120", width: "100%" }}
              >
                <InputLabel id="typelabel">Κατηγορία</InputLabel>
                <Select
                  labelId="typelabel"
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
            <Grid>
              <Button
                variant="contained"
                color="primary"
                id="create-issue-btn"
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
                id="clear-btn"
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
///////////////////////////////////////////////////////////////////////////////////
export default CreateIssue;
