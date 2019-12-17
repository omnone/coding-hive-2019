package com.coredumped.skyroof_constructions.model;

public class CreateIssueRequest {
    private Long issueID;
    private Long projectID;
    private String title;
    private String description_;
    private int assignor;
    private int assignee;
    private Long type_;
    private String otherDetails;
    private String statusDescription;

    public CreateIssueRequest(Long issueID, Long projectID, String title, String description_, int assignor, int assignee, Long type_, String otherDetails, String statusDescription) {
        this.issueID = issueID;
        this.projectID = projectID;
        this.title = title;
        this.description_ = description_;
        this.assignor = assignor;
        this.assignee = assignee;
        this.type_ = type_;
        this.otherDetails = otherDetails;
        this.statusDescription = statusDescription;
    }

    public String getStatusDescription() {
        return statusDescription;
    }

    public void setStatusDescription(String statusDescription) {
        this.statusDescription = statusDescription;
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

    public Integer getAssignor() {
        return assignor;
    }

    public void setAssignor(int assignor) {
        this.assignor = assignor;
    }

    public Integer getAssignee() {
        return assignee;
    }

    public void setAssignee(int assignee) {
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


