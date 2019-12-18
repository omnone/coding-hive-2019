import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Alert from "react-bootstrap/Alert";
import ErrorIcon from "@material-ui/icons/Error";
import UpdateIcon from "@material-ui/icons/Update";
import CancelIcon from "@material-ui/icons/Cancel";

//////////////////////////////////////////////////////////////////////////////////////

export class UpdateIssue extends Component {
  //States and constructor
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
      issue: "",
      users: [],
      searchTextProjects: "",
      searchTextAssignor: "",
      searchTextAssignee: "",
      type_: "",
      statusDescription: "",
      isCreated: ""
    };
    this.onProjectChange = this.onProjectChange.bind(this);
  }
  //////////////////////////////////////////////////////////////////////////////////////
  //fetch all users and projects on mount
  componentDidMount() {
    this.props.mess("");

    const jwtToken = localStorage.getItem("jwt");

    //console.log(jwtToken);

    const fetchConfig = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    fetch("/api/issues/find/" + this.props.issue, fetchConfig)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          issue: responseData
        });

        //console.log(this.state.issue);

        this.setState({
          issueID: this.state.issue.issueID,
          projectID: this.state.issue.project.projectId,
          statusDescription: this.state.issue.status.description,
          title: this.state.issue.title,
          description_: this.state.issue.description_,
          assignor: this.state.issue.assignor.userId,
          assignee: this.state.issue.assignee.userId,
          type_: this.state.issue.type_,
          otherDetails: this.state.issue.otherDetails,
          searchTextProjects: this.state.issue.project.name,
          searchTextAssignor: this.state.issue.assignor.username,
          searchTextAssignee: this.state.issue.assignee.username
        });
      })
      .catch(err => console.error(err));

    // fetch("/api/issues", fetchConfig)
    //   .then(response => response.json())
    //   .then(responseData => {
    //     this.setState({
    //       issues: responseData
    //     });
    //   })
    //   .catch(err => console.error(err));

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
  // -------------------------------------------------------------------------
  //Update issue request
  UpdateIssue = () => {
    const errors = [];

    if (this.state.projectID === "") {
      //console.log("error");
      errors.push("Έργο");
    }
    if (this.state.statusDescription === "") {
      //console.log("error");
      errors.push("Κατάσταση");
    }
    if (this.state.title === "") {
      //console.log("error");
      errors.push("Τίτλος");
    }
    if (this.state.description_ === "") {
      //console.log("error");
      errors.push("Περιγραφή");
    }
    if (this.state.assignor === "") {
      //console.log("error");
      errors.push("Εντολέας");
    }
    if (this.state.assignee === "") {
      //console.log("error");
      errors.push("Εντολοδόχος");
    }
    if (this.state.type_ === "") {
      //console.log("error");
      errors.push("Κατηγορία");
    }

    if (errors.length) {
      //errors found in form
      this.props.mess(
        <Alert
          variant="danger"
          style={{
            backgroundColor: "rgb(248, 215, 218)"
          }}
        >
          <ErrorIcon />
          Συμπληρώστε τα πεδία : {errors.toString()}
        </Alert>
      );
    } else if (
      this.props.userId !== this.state.assignor &&
      this.state.statusDescription === "Closed"
    ) {
      this.props.mess(
        <Alert
          variant="danger"
          style={{
            backgroundColor: "rgb(248, 215, 218)"
          }}
        >
          <ErrorIcon />
          Δεν έχετε δικαίωμα να κλείσετε το συγκεκριμένο θέμα.
        </Alert>
      );
    } else {
      //form is ok , procceed with the update request
      const jwtToken = localStorage.getItem("jwt");

      const fetchConfig = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + jwtToken,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          issueID: this.state.issueID,
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

      fetch("/api/issues/update", fetchConfig).then(response => {
        //console.log(response.status);

        if (response.status === 202) {
          //update was successful
          this.props.mess(
            <Alert
              variant="success"
              style={{
                backgroundColor: "rgb(212, 237, 218)"
              }}
            >
              <CheckCircleIcon /> Το θέμα με τίτλο: "{this.state.title}"
              αναννεώθηκε επιτυχώς!
            </Alert>
          );

          this.getIssues();
          this.props.search();
        } else {
          //update failed
          this.props.mess(
            <Alert
              variant="danger"
              style={{
                backgroundColor: "rgb(248, 215, 218)"
              }}
            >
              <ErrorIcon /> Η αναννέωση του θέματος με τίτλο: "
              {this.state.title}" απέτυχε.
            </Alert>
          );

          // this.getIssues();
          this.props.search();
        }
      });
    }
  };

  // Get all open issues for user
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

  //////////////////////////////////////////////////////////////////////////////////////
  //Handlers
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
    if (values) {
      this.setState(
        {
          tags: values
        },
        () => {
          this.setState({
            projectID: this.state.tags.projectId,
            searchTextProjects: this.state.tags.name
          });
          //console.log(this.state.tags.name);
        }
      );
    }
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
        //console.log(this.state.tags);
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
        //console.log(this.state.tags.name);
      }
    );
  };
  // -------------------------------------------------------------------------

  handleChangeSelect = e => {
    //console.log("value" + e.target.value);
    this.setState({
      type_: e.target.value
    });
  };
  // -------------------------------------------------------------------------

  handleChangeStatus = e => {
    //console.log("value" + e.target.value);
    this.setState({
      statusDescription: e.target.value
    });
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

  clearProject = () => {
    this.setState({
      projectID: "",
      searchTextProjects: ""
    });
  };

  clearAssignee = () => {
    this.setState({
      assignee: "",
      searchTextAssignee: ""
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////
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
          <Typography variant="h6" gutterBottom>
            Τροποποίηση θέματος
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
                onClick={this.clearProject}
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
                variant="outlined"
                value={this.state.title || ""}
                onChange={this.handleChange}
                shrink="true"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description_"
                name="description_"
                label="Περιγραφή"
                variant="outlined"
                value={this.state.description_ || ""}
                fullWidth
                autoComplete="billing address-line1"
                onChange={this.handleChange}
                shrink="true"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="otherDetails"
                name="otherDetails"
                variant="outlined"
                value={this.state.otherDetails || ""}
                label="Άλλες πληροφορίες"
                fullWidth
                autoComplete="billing address-line2"
                onChange={this.handleChange}
                shrink="true"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="assignor"
                disabled
                shrink="true"
                options={users}
                inputValue={this.state.searchTextAssignor}
                // onChange={this.onAssignorChange}
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
                shrink="true"
                inputValue={this.state.searchTextAssignee}
                onChange={this.onAssigneeChange}
                onClick={this.clearAssignee}
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
                <InputLabel id="statuslabel">Κατάσταση</InputLabel>
                <Select
                  labelId="statuslabel"
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
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                style={{ margin: "spacing(1)", minWidth: "120", width: "100%" }}
              >
                <InputLabel id="typelabel">Κατηγορία</InputLabel>
                <Select
                  labelId="typelabel"
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
                id="update-issue-btn"
                onClick={this.UpdateIssue}
                startIcon={<UpdateIcon />}
              >
                Ενημέρωση
              </Button>
              <Button
                style={{ marginLeft: "5px" }}
                onClick={this.props.search}
                id="cancel-btn"
                variant="contained"
                color="secondary"
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default UpdateIssue;
