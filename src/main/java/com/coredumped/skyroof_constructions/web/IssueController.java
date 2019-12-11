package com.coredumped.skyroof_constructions.web;

import com.coredumped.skyroof_constructions.dao.IssueDao;
import com.coredumped.skyroof_constructions.dao.ProjectDao;
import com.coredumped.skyroof_constructions.dao.StatusDao;
import com.coredumped.skyroof_constructions.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    /////////////////////////////////////////////////////////////////////////////////

    @ResponseBody
    @PostMapping("api/issues/search")
    public ArrayList<Issue> searchIssue(@RequestBody SearchRequest myRequest) {

        System.out.print("Search:" + myRequest);
        return issue_dao.searchQuery(myRequest.getProject_id(),
                myRequest.getIssue_title(),
                myRequest.getAssignee_id(),
                myRequest.getAssignor_id(),
                myRequest.getStatus_id(),
                myRequest.getCategory());

    }
    /////////////////////////////////////////////////////////////////////////////////

    /*Return all issues*/
    @ResponseBody
    @GetMapping("/api/issues")
    public Iterable<Issue> show() {
        System.out.println(issue_dao.findAll());
        return issue_dao.findAll();
    }
    /*Return all issues*/

    /////////////////////////////////////////////////////////////////////////////////

    /*return issue by id*/
    @ResponseBody
    @GetMapping("/api/issues/{id}")
    public Optional<Issue> find(@PathVariable Long id) {
        return issue_dao.findById(id);
    }
    /*return issue by id*/

    /////////////////////////////////////////////////////////////////////////////////

    /*create an issue*/
    @ResponseBody
    @PostMapping(value = "/api/issues/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Issue create(@RequestBody CreateIssueRequest issueRequest) {

        System.out.println(issueRequest);

        Issue newIssue = new Issue();
        newIssue.setIssueID(issueRequest.getIssueID());
        newIssue.setTitle(issueRequest.getTitle());
        newIssue.setDescription_(issueRequest.getDescription_());
        newIssue.setAssignor(issueRequest.getAssignor());
        newIssue.setAssignee(issueRequest.getAssignee());
        newIssue.setType_(issueRequest.getType_());
        newIssue.setOtherDetails(issueRequest.getOtherDetails());

        Project temp_project;
        temp_project = projectDao.findById(issueRequest.getProjectID()).orElse(null);
        newIssue.setProject(temp_project);

        Status newStatus = new Status();
        newStatus.setDescription("open");
        newStatus.setIssue(newIssue);
        newIssue.setStatus(newStatus);

        issue_dao.save(newIssue);
        return newIssue;
    }
    /*create an issue*/
    /////////////////////////////////////////////////////////////////////////////////

    /*update an issue*/
    @PutMapping("/api/issues/update")
    public Issue update(@RequestBody Issue issue) {
        issue_dao.save(issue);
        return issue_dao.save(issue);
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
