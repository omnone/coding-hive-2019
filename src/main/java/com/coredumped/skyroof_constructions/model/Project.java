package com.coredumped.skyroof_constructions.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity(name = "Project")
public class Project {
    private long projectId;
    private String name;
    private Set<Issue> issue = new HashSet();
    private Set<Permission> permission = new HashSet();


    @Id
    @Column(name = "projectID", columnDefinition = "UNSIGNED INT(8)")
    public long getProjectId() {
        return projectId;
    }

    public void setProjectId(long projectId) {
        this.projectId = projectId;
    }

    /////////////////////////////////////////////////////////////////////////////////
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "project", cascade = CascadeType.REMOVE)
    @JsonBackReference
    public Set<Issue> getIssue() {
        return issue;
    }

    public void setIssue(Set<Issue> issue) {
        this.issue = issue;
    }

    /////////////////////////////////////////////////////////////////////////////////

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "project", cascade = CascadeType.REMOVE)
    @JsonBackReference
    public Set<Permission> getPermission() {
        return permission;
    }

    public void setPermission(Set<Permission> permission) {
        this.permission = permission;
    }

    public Project() {
    }

    @Basic
    @Column(name = "name_")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return Objects.equals(projectId, project.projectId) &&
                Objects.equals(name, project.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(projectId, name);
    }
}
