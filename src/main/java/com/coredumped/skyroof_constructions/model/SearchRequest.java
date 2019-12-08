package com.coredumped.skyroof_constructions.model;

public class SearchRequest {
    private Long my_user_id;
    private Long project_id;
    private String issue_title;
    private Long assignee_id;
    private Long assignor_id;
    private int status_id;
    private enum Category { error, improvement, other};
    private Category category;


    public Long getMy_user_id() {
        return my_user_id;
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

    public int getStatus_id() {
        return status_id;
    }

    public Category getCategory() {
        return category;
    }

    public void setMy_user_id(Long my_user_id) {
        this.my_user_id = my_user_id;
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

    public void setStatus_id(int status_id) {
        this.status_id = status_id;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "SearchRequest{" +
                "my_user_id=" + my_user_id +
                ", project_id=" + project_id +
                ", issue_title='" + issue_title + '\'' +
                ", assignee_id=" + assignee_id +
                ", assignor_id=" + assignor_id +
                ", status_id=" + status_id +
                ", category=" + category +
                '}';
    }
}
