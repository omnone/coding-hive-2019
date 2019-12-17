package com.coredumped.skyroof_constructions.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Status")
@Table(name = "Status_", schema = "skyroof_constructions", catalog = "")
public class Status {
    private Long statusId;
    private String description;
    private Issue issue;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "statusID")
    public Long getStatusId() {
        return statusId;
    }

    public void setStatusId(Long statusId) {
        this.statusId = statusId;
    }

    /////////////////////////////////////////////////////////////////////////////////

    @OneToOne(mappedBy = "status", optional = false)
    @JsonBackReference
    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }
    /////////////////////////////////////////////////////////////////////////////////

    public Status() {
    }
    /////////////////////////////////////////////////////////////////////////////////


    @Basic
    @Column(name = "description_")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        Status status = (Status) o;
//        return statusId == status.statusId &&
//                Objects.equals(description, status.description);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(statusId, description);
//    }


}
