package com.coredumped.skyroof_constructions.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Issue {

    private Long issueID;
    private Long projectID;
    private Long statusID;
    private String title;
    private String description_;
    private Long assignor;
    private Long assignee;
    private Long type_;

    @Id
    @Column(name = "issueID")
    public Long getIssueID() {
        return issueID;
    }

    public void setIssueID(Long issueID) {
        this.issueID = issueID;
    }

    @Basic
    @Column(name = "projectID")
    public Long getProjectID() {
        return projectID;
    }

    public void setProjectID(Long projectID) {
        this.projectID = projectID;
    }

    @Basic
    @Column(name = "statusID")
    public Long getStatusID() {
        return statusID;
    }

    public void setStatusID(Long statusID) {
        this.statusID = statusID;
    }

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "description_")
    public String getDescription_() {
        return description_;
    }

    public void setDescription_(String description_) {
        this.description_ = description_;
    }

    @Basic
    @Column(name = "assignor")
    public Long getAssignor() {
        return assignor;
    }

    public void setAssignor(Long assignor) {
        this.assignor = assignor;
    }

    @Basic
    @Column(name = "assignee")
    public Long getAssignee() {
        return assignee;
    }

    public void setAssignee(Long assignee) {
        this.assignee = assignee;
    }


    @Basic
    @Column(name = "type_")

    public Long getType_() {
        return type_;
    }

    public void setType_(Long type_) {
        this.type_ = type_;
    }



    @Override
    public int hashCode() {
        return Objects.hash(issueID,
                projectID,
                statusID,
                title,
                description_,
                assignor,
                assignee,
                type_);
    }

    @Override
    public boolean equals(Object o) {
        if(this==o){
            return true;
        }
        if (o == null || getClass() != o.getClass())
        {return false;}
        Issue issue = (Issue) o;
        return issueID == issue.issueID &&
                Objects.equals(projectID,issue.projectID)&&
                Objects.equals(statusID,issue.statusID)&&
                Objects.equals(title,issue.title)&&
                Objects.equals(description_,issue.description_)&&
                Objects.equals(assignor,issue.assignor)&&
                Objects.equals(assignee,issue.assignee)&&
                Objects.equals(type_ ,issue.type_ );

    }

    @Override
    public String toString() {
        return "Issue{" +
                "issueID=" + issueID +
                ", projectID=" + projectID +
                ", statusID=" + statusID +
                ", title='" + title + '\'' +
                ", description_='" + description_ + '\'' +
                ", assignor=" + assignor +
                ", assignee=" + assignee +
                ", type_=" + type_ +
                '}';
    }
}
