package com.coredumped.skyroof_constructions.dao;

import com.coredumped.skyroof_constructions.model.Issue;
import com.coredumped.skyroof_constructions.model.SearchRequest;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class IssueDao {
    public ArrayList<Issue> executeSearchQuerry(SearchRequest myRequest) {
        return new ArrayList<Issue>();
    }
}