package com.coredumped.skyroof_constructions.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Generated;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Issue")
public class Issue {

    private Long issueID;
    //    private Long projectID;
    //    private Long statusID;
    private String title;
    private String description_;
    private User assignor;
    private User assignee;
    private Long type_;
    private String otherDetails;
    private Status status;
    private Project project;

    public Issue() {
    }

    @Id
    @GeneratedValue
    @Column(name = "issueID", nullable = false)
    public Long getIssueID() {
        return issueID;
    }

    public void setIssueID(Long issueID) {
        this.issueID = issueID;
    }

    /////////////////////////////////////////////////////////////////////////////////

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "statusID", nullable = false)
    @JsonManagedReference
    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    /////////////////////////////////////////////////////////////////////////////////
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "projectID", nullable = false)
    @JsonManagedReference
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    /////////////////////////////////////////////////////////////////////////////////
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assignee", nullable = false)
    @JsonManagedReference
    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assignor", nullable = false)
    @JsonManagedReference
    public User getAssignor() {
        return assignor;
    }

    public void setAssignor(User assignor) {
        this.assignor = assignor;
    }


//
//    @Basic
//    @Column(name = "projectID", nullable = false)
//    public Long getProjectID() {
//        return projectID;
//    }
//
//    public void setProjectID(Long projectID) {
//        this.projectID = projectID;
//    }

//    @Basic
//    @Column(name = "statusID", nullable = false)
//    public Long getStatusID() {
//        return statusID;
//    }
//
//    public void setStatusID(Long statusID) {
//        this.statusID = statusID;
//    }

    @Basic
    @Column(name = "title", nullable = false)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "description_", nullable = false)
    public String getDescription_() {
        return description_;
    }

    public void setDescription_(String description_) {
        this.description_ = description_;
    }

//    @Basic
//    @Column(name = "assignor", nullable = false)
//    public Long getAssignor() {
//        return assignor;
//    }
//
//    public void setAssignor(Long assignor) {
//        this.assignor = assignor;
//    }

//    @Basic
//    @Column(name = "assignee", nullable = false)
//    public Long getAssignee() {
//        return assignee;
//    }
//
//    public void setAssignee(Long assignee) {
//        this.assignee = assignee;
//    }


    @Basic
    @Column(name = "type_", nullable = false)

    public Long getType_() {
        return type_;
    }

    public void setType_(Long type_) {
        this.type_ = type_;
    }


    @Column(name = "other_details", nullable = true)
    public String getOtherDetails() {
        return otherDetails;
    }

    public void setOtherDetails(String otherDetails) {
        this.otherDetails = otherDetails;
    }


    @Override
    public int hashCode() {
        return Objects.hash(issueID,
//                projectID,
//                statusID,
                title,
                description_,
                assignor,
                assignee,
                type_);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Issue issue = (Issue) o;
        return issueID == issue.issueID &&
//                Objects.equals(projectID, issue.projectID) &&
//                Objects.equals(statusID, issue.statusID) &&
                Objects.equals(title, issue.title) &&
                Objects.equals(description_, issue.description_) &&
                Objects.equals(assignor, issue.assignor) &&
                Objects.equals(assignee, issue.assignee) &&
                Objects.equals(type_, issue.type_);

    }

    @Override
    public String toString() {
        return "Issue{" +
                "issueID=" + issueID +
//                ", projectID=" + projectID +
//                ", statusID=" + statusID +
                ", title='" + title + '\'' +
                ", description_='" + description_ + '\'' +
                ", assignor=" + assignor +
                ", assignee=" + assignee +
                ", type_=" + type_ +
                ", otherDetails=" + otherDetails +
                '}';
    }


}
