package com.coredumped.skyroof_constructions.model;

public class SearchRequest {
    private Long project_id;
    private String issue_title;
    private Long assignee_id;
    private Long assignor_id;
    private Integer status_id;
    private Integer category; //0 error 1 improvement 2 other

    //Constructor
    //By default all fields null
    SearchRequest() {
        this.project_id = null;
        this.issue_title = null;
        this.assignee_id = null;
        this.assignor_id = null;
        this.status_id = null;
        this.category = null;
    }


    public Long getProject_id() {
        return project_id;
    }

    public String getIssue_title() {
        return issue_title;
    }

    public Long getAssignee_id() {
        return assignee_id;
    }

    public Long getAssignor_id() {
        return assignor_id;
    }

    public Integer getStatus_id() {
        return status_id;
    }

    public Integer getCategory() {
        return category;
    }


    public void setProject_id(Long project_id) {
        this.project_id = project_id;
    }

    public void setIssue_title(String issue_title) {
        this.issue_title = issue_title;
    }

    public void setAssignee_id(Long assignee_id) {
        this.assignee_id = assignee_id;
    }

    public void setAssignor_id(Long assignor_id) {
        this.assignor_id = assignor_id;
    }

    public void setStatus_id(Integer status_id) {
        this.status_id = status_id;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "SearchRequest{" +
                ", project_id=" + project_id +
                ", issue_title='" + issue_title + '\'' +
                ", assignee_id=" + assignee_id +
                ", assignor_id=" + assignor_id +
                ", status_id=" + status_id +
                ", category=" + category +
                '}';
    }
}
