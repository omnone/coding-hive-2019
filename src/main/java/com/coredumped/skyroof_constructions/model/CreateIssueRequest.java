package com.coredumped.skyroof_constructions.model;

public class CreateIssueRequest {
    private Long issueID;
    private Long projectID;
    private String title;
    private String description_;
    private Long assignor;
    private Long assignee;
    private Long type_;
    private String otherDetails;

    public CreateIssueRequest(Long issueID, Long projectID, String title, String description_, Long assignor, Long assignee, Long type_, String otherDetails) {
        this.issueID = issueID;
        this.projectID = projectID;
        this.title = title;
        this.description_ = description_;
        this.assignor = assignor;
        this.assignee = assignee;
        this.type_ = type_;
        this.otherDetails = otherDetails;
    }

    public Long getIssueID() {
        return issueID;
    }

    public void setIssueID(Long issueID) {
        this.issueID = issueID;
    }

    public Long getProjectID() {
        return projectID;
    }

    public void setProjectID(Long projectID) {
        this.projectID = projectID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription_() {
        return description_;
    }

    public void setDescription_(String description_) {
        this.description_ = description_;
    }

    public Long getAssignor() {
        return assignor;
    }

    public void setAssignor(Long assignor) {
        this.assignor = assignor;
    }

    public Long getAssignee() {
        return assignee;
    }

    public void setAssignee(Long assignee) {
        this.assignee = assignee;
    }

    public Long getType_() {
        return type_;
    }

    public void setType_(Long type_) {
        this.type_ = type_;
    }

    public String getOtherDetails() {
        return otherDetails;
    }

    public void setOtherDetails(String otherDetails) {
        this.otherDetails = otherDetails;
    }
}


