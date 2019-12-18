import React, { Component } from "react";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import CustomSearchRender from "../custom/CustomSearchRender";
import Alert from "react-bootstrap/Alert";
import Button from "@material-ui/core/Button";
import MUIDataTable from "mui-datatables";

export class Table1 extends Component {
  ////////////////////////////////////////////////////////////////////
  state = {
    issues: [],
    userId: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      userid: ""
    };

  }
  // -------------------------------------------------------------------------
  //When the component is mounted , set user id based on passed props and get all open issues for the user
  componentDidMount() {
    console.log("user id " + this.props.id);
    this.setState({
      userId: this.props.id
    });

    this.getIssues();
  }
  // -------------------------------------------------------------------------
  //When update button is pressed , get the id of the issue you wish to update
  // and the frame state to update in order to return update page
  updateIssue = issueId => {
    this.props.issue(issueId);
    return this.props.update();
  };
  // -------------------------------------------------------------------------
  //Get all open issues of the user
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

        this.props.setIssues(responseData);
      })
      .catch(err => console.error(err));
  };
  // -------------------------------------------------------------------------
  //Delete specific issue
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
      //issue was deleted succesfuly by api
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

        //get all the updated issues
        this.getIssues();
      } else {
        //api failed to delete issue
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
      this.getIssues();
    });
  };

  // -------------------------------------------------------------------------

  getAllIssues = () => {
    const getConfig = {
      method: "GET",
      headers: {
        Accept: "*/*"
      }
    };
    fetch("/api/issues", getConfig)
      .then(response => response.json())
      .then(response => {
        this.setState({
          issues: response
        });
      })
      .catch(err => console.error(err));
  };

  getDataBySearch = searchText => {
    const postConfig = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ issue_title: searchText })
    };
    fetch("/api/issues/search", postConfig)
      .then(response => response.json())
      .then(response => {
        this.setState({
          issues: response
        });
      })
      .catch(err => console.error(err));
  };

  handleSearch = searchText => {
    searchText == "" ? this.getAllIssues() : this.getDataBySearch(searchText);

    this.setState({
      searchValue: searchText
    });
  };
  // -------------------------------------------------------------------------

  //update issues when search returns new props.issues
  componentDidUpdate(prevProps) {
    if (prevProps.issues !== this.props.issues) {
      console.log("update props");

      if (this.props.issues) {
        this.setState({
          issues: this.props.issues
        });
      }
      this.forceUpdate();
    }
  }
  // -------------------------------------------------------------------------

  render() {
    console.log("Table rendered");
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
      responsive: "scroll",
      customSearchRender: (searchText, handleSearch, hideSearch, options) => {
        //custom search kalw to function
        return (
          <CustomSearchRender
            searchText={this.state.searchValue}
            onSearch={this.handleSearch.bind(this)}
            onHide={hideSearch}
            options={options}
          />
        );
      }
    };

    //for every issue create a row for the table
    this.state.issues.map((issue, index) => {
      let type;
      
      //set the proper text for the status desc
      if (issue.type_ === 0) {
        type = "Error";
      } else if (issue.type_ === 1) {
        type = "Improvement";
      } else if (issue.type_ === 2) {
        type = "Other";
      }

      let permission_to_apply;

      //check user permissions for the specific project
      this.props.permissions.map(perm => {
        if (perm.project.projectId === issue.project.projectId) {
          permission_to_apply = perm.permissionId;
        }
      });

      let buttons;
      // console.log(issue.project.name+perm.permissionId);

      //Read-only permission
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
              <DeleteForeverIcon /> διαγραφή{" "}
            </Button>{" "}
            <Button
              disabled
              id="update-button"
              variant="contained"
              color="primary"
              onClick={() => {
                this.updateIssue(issue.issueID);
              }}
            >
              <EditIcon /> τροποποίηση{" "}
            </Button>{" "}
          </div>
        );
      } else if (permission_to_apply === 1) {
        //Read Create Update permission
        buttons = (
          <div>
            <Button
              disabled
              id="delete-button"
              onClick={() => this.delete(issue.issueID, issue.title)}
              variant="contained"
              color="secondary"
            >
              <DeleteForeverIcon /> διαγραφή{" "}
            </Button>{" "}
            <Button
              id="update-button"
              variant="contained"
              color="primary"
              onClick={() => {
                this.updateIssue(issue.issueID);
              }}
            >
              <EditIcon /> τροποποίηση{" "}
            </Button>{" "}
          </div>
        );
      } else {
        //Read Create Update Delete
        buttons = (
          <div>
            <Button
              id="delete-button"
              onClick={() => this.delete(issue.issueID, issue.title)}
              variant="contained"
              color="secondary"
            >
              <DeleteForeverIcon /> διαγραφή{" "}
            </Button>{" "}
            <Button
              id="update-button"
              variant="contained"
              color="primary"
              onClick={() => {
                this.updateIssue(issue.issueID);
              }}
            >
              <EditIcon /> τροποποίηση{" "}
            </Button>{" "}
          </div>
        );
      }
     
      //push row to the table's data
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
    
    //return table of issues
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

///////////////////////////////////////////////////////////////////////////////////////
export default Table1;
