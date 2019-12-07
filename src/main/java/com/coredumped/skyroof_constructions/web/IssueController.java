package com.coredumped.skyroof_constructions.web;

import com.coredumped.skyroof_constructions.dao.IssueDao;
import com.coredumped.skyroof_constructions.dao.ProjectDao;
import com.coredumped.skyroof_constructions.model.Issue;
import com.coredumped.skyroof_constructions.model.Project;
import com.coredumped.skyroof_constructions.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import javax.validation.constraints.Null;
import java.util.List;
import java.util.Optional;

@RestController
public class IssueController {

    @Autowired
    private IssueDao issue_dao;


    //Get issue with a specific id
    @ResponseBody
    @GetMapping("api/issues/{issue_id}")
    public Issue getIssueFromId(@PathVariable("issue_id") Long issue_id){
        Issue myIssue = issue_dao.findByIssueID(issue_id); //TODO catch NoSuchElementException
        return myIssue;
    }

    //Return all issues for a project
    @ResponseBody
    @GetMapping("api/issues/{project_id}")
    public List<Issue> getAllIssuesForProject(@PathVariable("project_id") Long project_id) {
        List<Issue> issues_for_project = (List<Issue>) issue_dao.findIssuesByProjectID(project_id);
        return issues_for_project;
    }

    //Return issue based on the title
    @ResponseBody
    @GetMapping("api/issues/{issue_title}")
    public Issue getIssueFromTitle(@PathVariable("issue_title") String issue_title) {
        Issue issue = (Issue) issue_dao.findIssueByTitle(issue_title);
        return issue;
    }

    //Return all issues from an assigner
    @ResponseBody
    @GetMapping("api/issues/{assigner}")
    public List<Issue> getAllIssuesFromAssigner(@PathVariable("assigner") Long assigner ) {
        List<Issue> issues_from_assigner = (List<Issue>) issue_dao.findIssuesByAssignor(assigner);
        return issues_from_assigner;
    }

    //Return all issues from an assignee
    @ResponseBody
    @GetMapping("api/issues/{assignee}")
    public List<Issue> getAllIssuesFromAssignee(@PathVariable("assignee") Long assignee ) {
        List<Issue> issues_from_assignee = (List<Issue>) issue_dao.findIssuesByAssignor(assignee);
        return issues_from_assignee;
    }

    //Return all issues that have a specific status
    @ResponseBody
    @GetMapping("api/issues/{status_id}")
    public List<Issue> getAllIssuesFromStatus(@PathVariable("status_id") Long status_id) {
        List<Issue> issues_from_status = (List<Issue>) issue_dao.findIssuesByStatusID(status_id);
        return issues_from_status;
    }
    //To get all open issues call api/issues/open
    //To get all my open issues combine api/issues/open and api/issues/assignee=myId

    //Create an issue --only field otherDetails can be null
    @ResponseBody
    @PostMapping("api/issues/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Issue addIssue(@RequestBody Issue issue) {
        System.out.println(issue.toString()); //for testing
        //TODO catch exception and send it to react
        Issue save = issue_dao.save(issue);
        return save;
    }

    //Update an issue
//    @PutMapping("api/issues/update")
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    public void updateIssue(@RequestBody Issue issue){
//        issue_dao.updateIssue(issue);
//    }

    //Delete an issue
    @DeleteMapping("api/issues/delete/{issue_id}")
    public void removeIssueFromId(@PathVariable("issue_id") int issue_id){
        issue_dao.deleteById(issue_id);
    }




}
