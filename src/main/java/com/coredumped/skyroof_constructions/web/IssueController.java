package com.coredumped.skyroof_constructions.web;

import com.coredumped.skyroof_constructions.dao.IssueDao;
import com.coredumped.skyroof_constructions.model.Issue;
import com.coredumped.skyroof_constructions.model.SearchRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class IssueController {

    @Autowired
    private IssueDao issue_dao;


    @ResponseBody
    @PostMapping("api/issues/search")
    public ArrayList<Issue> searchIssue(@RequestBody SearchRequest myRequest) {
        return issue_dao.searchQuery(myRequest.getProject_id(),
                                     myRequest.getIssue_title(),
                                     myRequest.getAssignee_id(),
                                     myRequest.getAssignor_id(),
                                     myRequest.getStatus_id(),
                                     myRequest.getCategory());

    }
    //Return all issues
    @ResponseBody
    @GetMapping("/api/issues")
    public Iterable<Issue> show() {
        return issue_dao.findAll();
    }
    //Sign up issue
    @ResponseBody
    @PostMapping(value = "/api/issues/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Issue create(@RequestBody Issue issue) {
        Issue newIssue = new Issue();
        newIssue.setIssueID(issue.getIssueID());
        newIssue.setProjectID(issue.getProjectID());
        newIssue.setStatusID(issue.getStatusID());
        newIssue.setTitle(issue.getTitle());
        newIssue.setDescription_(issue.getDescription_());
        newIssue.setAssignor(issue.getAssignor());
        newIssue.setAssignee(issue.getAssignee());
        newIssue.setType_(issue.getType_());
        newIssue.setOtherDetails(issue.getOtherDetails());
        issue_dao.save(newIssue);
        return newIssue;
    }

    @PutMapping("/api/issues/update")
    public Issue update(@RequestBody Issue issue){
        issue_dao.save(issue);
        return issue_dao.save(issue);
    }
}
