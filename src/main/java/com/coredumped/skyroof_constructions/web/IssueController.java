package com.coredumped.skyroof_constructions.web;

import com.coredumped.skyroof_constructions.dao.IssueDao;
import com.coredumped.skyroof_constructions.dao.ProjectDao;
import com.coredumped.skyroof_constructions.model.Issue;
import com.coredumped.skyroof_constructions.model.Project;
import com.coredumped.skyroof_constructions.model.SearchRequest;
import com.coredumped.skyroof_constructions.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import javax.validation.constraints.Null;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class IssueController {

    @Autowired
    private IssueDao issue_dao;


    @ResponseBody
    @PostMapping("api/issues/search")
    public ArrayList<Issue> searchIssue(@RequestBody SearchRequest myRequest) {
        return issue_dao.executeSearchQuerry(myRequest);

    }


}
