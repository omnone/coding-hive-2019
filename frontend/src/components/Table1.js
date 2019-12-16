import React, { Component } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

import Alert from "react-bootstrap/Alert";

import Button from "@material-ui/core/Button";
import MUIDataTable from "mui-datatables";

export class Table1 extends Component {
  state = {
    userId: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      userid: ""
    };

    console.log(this.props);
  }

  componentDidMount() {
    console.log("user id " + this.props.id);
    this.setState({
      userId: this.props.id
    });

    this.getIssues();
  }

  updateIssue = issueId => {
    this.props.issue(issueId);
    return this.props.update;
  };

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
        this.setState({
          issues: responseData
        });
      })
      .catch(err => console.error(err));
  };

  delete = (issueId, issueTitle) => {
    const jwtToken = localStorage.getItem("jwt");

    console.log(jwtToken);

    const deleteConfig = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    fetch("/api/issues/" + issueId, deleteConfig).then(response => {
      if (response.status === 200) {
        this.props.mess(
          <Alert
            variant="success"
            style={{
              backgroundColor: "rgb(212, 237, 218)"
            }}
          >
            <CheckCircleIcon /> Το θέμα με τίτλο: "{issueTitle}" διαγράφτηκε
            επιτυχώς!
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
            <ErrorIcon /> Η διαγραφή του θέματος με τίτλο: "{issueTitle}"
            απέτυχε.
          </Alert>
        );
      }
    });
    this.getIssues();
  };

  render() {
    console.log(this.props.permissions);
    const columns = [
      {
        name: "ID",
        options: {
          display: "excluded"
        }
      },
      { name: "Έργο" },
      { name: "Τίτλος" },
      { name: "Εντολέας" },
      { name: "Εντολοδόχος" },
      { name: "Κατάσταση" },
      { name: "Κατηγορία" },
      {
        name: "Actions",
        options: {
          download: false,
          print: false
        }
      }
    ];

    const data = [];

    const options = {
      filterType: "dropdown",
      responsive: "scroll"
    };

    this.state.issues.map((issue, index) => {
      let type;

      if (issue.type_ === 0) {
        type = "Error";
      } else if (issue.type_ === 1) {
        type = "Improvement";
      } else if (issue.type_ === 2) {
        type = "Other";
      }

      let permission_to_apply;

      this.props.permissions.map(perm => {
        if (perm.project.projectId === issue.project.projectId) {
          permission_to_apply = perm.permissionId;
        }
      });

      let buttons;
      // console.log(issue.project.name+perm.permissionId);

      if (permission_to_apply === 0) {
        buttons = (
          <div>
            <Button
              disabled
              id="delete-button"
              onClick={() => this.delete(issue.issueID, issue.title)}
              variant="contained"
              color="secondary"
            >
              ΔΙΑΓΡΑΦΗ{" "}
            </Button>{" "}
            <Button
              disabled
              id="update-button"
              variant="contained"
              color="primary"
              onClick={this.updateIssue(issue.issueID)}
            >
              ΤΡΟΠΟΠΟΙΗΣΗ{" "}
            </Button>{" "}
          </div>
        );
      } else if (permission_to_apply === 1) {
        buttons = (
          <div>
            <Button
              disabled
              id="delete-button"
              onClick={() => this.delete(issue.issueID, issue.title)}
              variant="contained"
              color="secondary"
            >
              ΔΙΑΓΡΑΦΗ{" "}
            </Button>{" "}
            <Button
              id="update-button"
              variant="contained"
              color="primary"
              onClick={this.updateIssue(issue.issueID)}
            >
              ΤΡΟΠΟΠΟΙΗΣΗ{" "}
            </Button>{" "}
          </div>
        );
      } else {
        buttons = (
          <div>
            <Button
              id="delete-button"
              onClick={() => this.delete(issue.issueID, issue.title)}
              variant="contained"
              color="secondary"
            >
              ΔΙΑΓΡΑΦΗ{" "}
            </Button>{" "}
            <Button
              id="update-button"
              variant="contained"
              color="primary"
              onClick={this.updateIssue(issue.issueID)}
            >
              ΤΡΟΠΟΠΟΙΗΣΗ{" "}
            </Button>{" "}
          </div>
        );
      }

      data.push([
        issue.project.projectId,
        issue.project.name,
        issue.title,
        issue.assignor.username,
        issue.assignee.username,
        issue.status.description,
        type,
        buttons
      ]);
    });

    return (
      <MUIDataTable
        title={"Θέματα"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default Table1;
