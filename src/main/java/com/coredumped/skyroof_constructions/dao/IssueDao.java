package com.coredumped.skyroof_constructions.dao;

import com.coredumped.skyroof_constructions.model.Issue;
import com.coredumped.skyroof_constructions.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IssueDao extends JpaRepository <Issue,Integer> {
    Issue findByIssueID(Long issue_id);
    List<Issue> findIssuesByProjectID(Long projectID);
    Issue findIssueByTitle(String title);
    List<Issue> findIssuesByAssignor(Long id);
    List<Issue> findIssuesByStatusID(Long id);
    //void updateIssue(Issue issue); //TODO implement
}