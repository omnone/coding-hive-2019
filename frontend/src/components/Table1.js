import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import MUIDataTable from "mui-datatables";

export class Table1 extends Component {
  constructor(props) {
    super(props);
    this.state = { issues: [] };
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

    fetch("/api/issues", fetchConfig)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          issues: responseData
        });
      })
      .catch(err => console.error(err));
  }

  delete = (issueId) => {
    const deleteConfig = {
      method: "DELETE",
      headers: {
        Accept: "*/*"
      }
    };
    fetch("/api/issues/" + issueId, deleteConfig)
      .then(function(response) {
        if(response.ok) {
          alert(issueId + " : deleted successfully ");
        }
      })
      .then(function() {
        window.location.reload();
      });
    }

  render() {
    const columns = [
      "Έργο",
      "Τίτλος",
      "Εντολέας",
      "Εντολοδόχος",
      "Κατάσταση",
      "Κατηγορία",
      "Actions"
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

      data.push([
        issue.project.name,
        issue.title,
        issue.assignor.username,
        issue.assignee.username,
        issue.status.description,
        type,
        <div>
          <Button onClick={() => this.delete(issue.issueID)} variant="contained" color="secondary">
            ΔΙΑΓΡΑΦΗ
          </Button>
          -
          <Button variant="contained" color="primary">
            ΤΡΟΠΟΠΟΙΗΣΗ
          </Button>
        </div>
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

    // const tableRows = this.state.issues.map((issue, index) => {
    //   let type;
    //   if (issue.type_ === 0) {
    //     type = "Error";
    //   } else if (issue.type_ === 1) {
    //     type = "Improvement";
    //   } else if (issue.type_ === 3) {
    //     type = "Other";
    //   }

    //   return (
    //     <TableRow key={index}>
    //       <TableCell>{issue.project.name}</TableCell>
    //       <TableCell>{issue.title}</TableCell>
    //       <TableCell>{issue.assignor.username}</TableCell>
    //       <TableCell>{issue.assignee.username}</TableCell>
    //       <TableCell>{issue.status.description}</TableCell>
    //       <TableCell>{type}</TableCell>

    //       <TableCell>
    //         <Button variant="contained" color="primary">
    //           ΤΡΟΠΟΠΟΙΗΣΗ
    //         </Button>
    //       </TableCell>
    //       <TableCell>
    //         <Button variant="contained" color="secondary">
    //           ΔΙΑΓΡΑΦΗ
    //         </Button>
    //       </TableCell>
    //     </TableRow>
    //   );
    // });

    // return (
    //   <Table size="small">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Έργο</TableCell>
    //         <TableCell>Τίτλος</TableCell>
    //         <TableCell>Εντολέας</TableCell>
    //         <TableCell>Εντολοδόχος</TableCell>
    //         <TableCell>Κατάσταση</TableCell>
    //         <TableCell>Κατηγορία</TableCell>
    //         <TableCell>Actions</TableCell>
    //       </TableRow>
    //     </TableHead>

    //     <TableBody>{tableRows}</TableBody>
    //   </Table>
    // );
  }
}

export default Table1;
