package com.coredumped.skyroof_constructions.dao;

import com.coredumped.skyroof_constructions.model.Issue;
import com.coredumped.skyroof_constructions.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IssueDao extends JpaRepository <Issue,Integer> {
    List<Issue> findIssuesByProjectID(Integer projectID);
    Issue findIssueByTitle(String title);
    List<Issue> findIssuesByAssignor(int id);
    List<Issue> findIssuesByStatusID(int id);
}