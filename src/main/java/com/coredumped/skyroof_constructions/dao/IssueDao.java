package com.coredumped.skyroof_constructions.dao;

import com.coredumped.skyroof_constructions.model.Issue;
import com.coredumped.skyroof_constructions.model.SearchRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Repository
public class IssueDao  {


    public ArrayList<Issue> executeSearchQuerry(SearchRequest myRequest) {
        ArrayList<String> fields = new ArrayList<String>();
        StringBuilder stringBuilder = new StringBuilder();

        if(myRequest.getProject_id() != null) {
            stringBuilder.append("projectID = ");
            stringBuilder.append(String.valueOf(myRequest.getProject_id()));
            stringBuilder.append(" AND ");
        }

        if(myRequest.getIssue_title() != null) {
            stringBuilder.append("title = ");
            stringBuilder.append('"');
            stringBuilder.append(myRequest.getIssue_title());
            stringBuilder.append('"');
            stringBuilder.append(" AND ");
        }

        if(myRequest.getAssignee_id() != null) {
            stringBuilder.append("assignee = ");
            stringBuilder.append(String.valueOf(myRequest.getAssignee_id()));
            stringBuilder.append(" AND ");
        }

        if(myRequest.getAssignor_id() != null) {
            stringBuilder.append("assignor = ");
            stringBuilder.append(String.valueOf(myRequest.getAssignor_id()));
            stringBuilder.append(" AND ");
        }

        if(myRequest.getStatus_id() != null) {
            stringBuilder.append("statusID = ");
            stringBuilder.append(String.valueOf(myRequest.getStatus_id()));
            stringBuilder.append(" AND ");
        }

        if(myRequest.getCategory() != null) {
            stringBuilder.append("type_ = ");
            stringBuilder.append(String.valueOf(myRequest.getCategory()));
            stringBuilder.append(" AND ");
        }

        String whereClause = stringBuilder.toString();
        // Removing " AND " at the end
        whereClause = whereClause.substring(0,whereClause.length() - 5);

        String query = "SELECT * FROM Issue WHERE " + whereClause + ";";
        System.out.println(query);

        //Executing query














        return new ArrayList<Issue>();
    }
}