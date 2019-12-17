package com.coredumped.skyroof_constructions.model;

public class SearchRequest {
    private Long project_id;
    private String issue_title;
    private Integer assignee_id;
    private Integer assignor_id;
    private String status_desc;
    private Long category; //0 error 1 improvement 2 other

    //Constructor
    //By default all fields null
    SearchRequest() {
        this.project_id = null;
        this.issue_title = null;
        this.assignee_id = null;
        this.assignor_id = null;
        this.status_desc = null;
        this.category = null;
    }


    public Long getProject_id() {
        return project_id;
    }

    public String getIssue_title() {
        return issue_title;
    }

    public Integer getAssignee_id() {
        return assignee_id;
    }

    public Integer getAssignor_id() {
        return assignor_id;
    }

    public String getStatus_desc() {
        return status_desc;
    }


    public Long getCategory() {
        return category;
    }

    public void setProject_id(Long project_id) {
        this.project_id = project_id;
    }

    public void setIssue_title(String issue_title) {
        this.issue_title = issue_title;
    }

    public void setAssignee_id(Integer assignee_id) {
        this.assignee_id = assignee_id;
    }

    public void setAssignor_id(Integer assignor_id) {
        this.assignor_id = assignor_id;
    }

    public void setStatus_desc(String status_desc) {
        this.status_desc = status_desc;
    }

    public void setCategory(Long category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "SearchRequest{" +
                ", project_id=" + project_id +
                ", issue_title='" + issue_title + '\'' +
                ", assignee_id=" + assignee_id +
                ", assignor_id=" + assignor_id +
                ", status_desc=" + status_desc +
                ", category=" + category +
                '}';
    }
}
