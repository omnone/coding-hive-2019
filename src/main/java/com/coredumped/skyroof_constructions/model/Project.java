package com.coredumped.skyroof_constructions.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Project {
    private long projectId;
    private String name;

    @Id
    @Column(name = "projectID",columnDefinition = "UNSIGNED INT(8)")
    public long getProjectId() {
        return projectId;
    }

    public void setProjectId(long projectId) {
        this.projectId = projectId;
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
