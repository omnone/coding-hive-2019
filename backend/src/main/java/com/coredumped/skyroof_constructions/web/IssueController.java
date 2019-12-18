package com.coredumped.skyroof_constructions.web;

import com.coredumped.skyroof_constructions.dao.IssueDao;
import com.coredumped.skyroof_constructions.dao.ProjectDao;
import com.coredumped.skyroof_constructions.dao.StatusDao;
import com.coredumped.skyroof_constructions.dao.UserDao;
import com.coredumped.skyroof_constructions.model.*;
import com.coredumped.skyroof_constructions.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class IssueController {
    /////////////////////////////////////////////////////////////////////////////////

    @Autowired
    private IssueDao issue_dao;

    @Autowired
    private StatusDao status_dao;

    @Autowired
    private ProjectDao projectDao;

    @Autowired
    private UserDao userDao;

    /////////////////////////////////////////////////////////////////////////////////
    //Custom search - request from search bar
    @ResponseBody
    @PostMapping(value = "/api/issues/search")
    public ArrayList<Issue> searchIssue(@RequestBody SearchRequest myRequest) {

        System.out.print("Search:" + myRequest);

        return issue_dao.searchQuery(myRequest.getProject_id(),
                myRequest.getIssue_title(),
                myRequest.getAssignee_id(),
                myRequest.getAssignor_id(),
                myRequest.getStatus_desc(),
                myRequest.getCategory());

    }
    /////////////////////////////////////////////////////////////////////////////////

    //Return all issues
    @ResponseBody
    @GetMapping("/api/issues")
    public Iterable<Issue> show() {
        System.out.println(issue_dao.findAll());
        return issue_dao.findAll();
    }


    /////////////////////////////////////////////////////////////////////////////////

    //Return issues by assignee or assignor id
    @ResponseBody
    @GetMapping("/api/issues/{id}")
    public List<Issue> findByUser(@PathVariable Integer id) {
        return issue_dao.findByUser(id);
    }

    //Return issues by id
    @ResponseBody
    @GetMapping("/api/issues/find/{id}")
    public Issue find(@PathVariable Long id) {
        return issue_dao.findById(id).orElse(null);
    }

    /////////////////////////////////////////////////////////////////////////////////

    //Create a new issue
    @ResponseBody
    @PostMapping(value = "/api/issues/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Issue create(@RequestBody CreateIssueRequest issueRequest) {

        System.out.println(issueRequest);

        Issue issueTemp = new Issue();
        issueTemp.setIssueID(issueRequest.getIssueID());
        issueTemp.setTitle(issueRequest.getTitle());
        issueTemp.setDescription_(issueRequest.getDescription_());
        issueTemp.setType_(issueRequest.getType_());
        issueTemp.setOtherDetails(issueRequest.getOtherDetails());

//        find requested project by its id
        Project temp_project;
        temp_project = projectDao.findById(issueRequest.getProjectID()).orElse(null);
        issueTemp.setProject(temp_project);

//        find assignor and assignee users from their ids
        User assignor, assignee;
        assignee = userDao.findDistinctByUserId(issueRequest.getAssignee());
        assignor = userDao.findDistinctByUserId(issueRequest.getAssignor());

        issueTemp.setAssignee(assignee);
        issueTemp.setAssignor(assignor);

        //create a new status for issue
        Status newStatus = new Status();
        newStatus.setDescription(issueRequest.getStatusDescription());
        newStatus.setIssue(issueTemp);
        issueTemp.setStatus(newStatus);

        issue_dao.save(issueTemp);
        return issueTemp;
    }

    /////////////////////////////////////////////////////////////////////////////////

    /*update an issue*/
    @PutMapping("/api/issues/update")
    public ResponseEntity update(@RequestBody CreateIssueRequest issueRequest) {


        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((CustomUserDetails) principal).getUsername();


//        Example of update issue request:
//        {
//            "issueID" : "7",
//                "projectID" : "2" ,
//                "statusID" : "1" ,
//                "title" : "updatedissue2" ,
//                "description_" : "oskjdijdojsdpoijsoidj" ,
//                "assignor" : "1" ,
//                "assignee" : "5633" ,
//                "type_" : "2" ,
//                "otherDetails" : "sd" ,
//                "statusDescription" : "closed"
//        }

        User loggedUser = userDao.findByusername(username).orElse(null);

        //if the user isnt the user who opened the issue and tries to close it return without update
        if (issueRequest.getDescription_().equals("Closed") && loggedUser.getUserId() != issueRequest.getAssignor()) {
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        }

        Issue issue_to_update = issue_dao.getOne(issueRequest.getIssueID());

        issue_to_update.setIssueID(issueRequest.getIssueID());
        issue_to_update.setTitle(issueRequest.getTitle());
        issue_to_update.setDescription_(issueRequest.getDescription_());
        issue_to_update.setType_(issueRequest.getType_());
        issue_to_update.setOtherDetails(issueRequest.getOtherDetails());

        Project temp_project;
        temp_project = projectDao.findById(issueRequest.getProjectID()).orElse(null);
        issue_to_update.setProject(temp_project);

        User assignor, assignee;

        assignee = userDao.findDistinctByUserId(issueRequest.getAssignee());
        assignor = userDao.findDistinctByUserId(issueRequest.getAssignor());

        issue_to_update.setAssignee(assignee);
        issue_to_update.setAssignor(assignor);

        Status newStatus = issue_to_update.getStatus();
        newStatus.setDescription(issueRequest.getStatusDescription());
        newStatus.setIssue(issue_to_update);
        issue_to_update.setStatus(newStatus);


        issue_dao.save(issue_to_update);

        return new ResponseEntity(HttpStatus.ACCEPTED);


    }
    /*update an issue*/
    /////////////////////////////////////////////////////////////////////////////////

    /*delete an issue*/
    @DeleteMapping("/api/issues/{id}")
    public String delete(@PathVariable Long id) {
        Optional<Issue> issue_to_delete = issue_dao.findById(id);
        if (issue_to_delete.isPresent()) {
            issue_dao.delete(issue_to_delete.get());
            return "issue  deleted with id" + id;
        } else {
            throw new RuntimeException("Issue  not found for the id" + id);
        }
    }
    /*delete an issue*/

}
