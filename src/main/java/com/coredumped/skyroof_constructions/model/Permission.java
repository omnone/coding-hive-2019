package com.coredumped.skyroof_constructions.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "permission")
public class Permission {
    private int permissionTableId;
    private User user;
    private Project project;
    private byte permissionId;


    @GeneratedValue
    @Id
    @Column(name = "permission_tableid",nullable = false)
    @JsonIgnore
    public int getPermissionTableId() {
        return permissionTableId;
    }
    public void setPermissionTableId(int permissionTableId) {
        this.permissionTableId = permissionTableId;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID", nullable = false)
    @JsonBackReference
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "projectID",nullable = false)
    @JsonManagedReference
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @Basic
    @Column(name = "permissionID")
    public byte getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(byte permissionId) {
        this.permissionId = permissionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Permission that = (Permission) o;
        return user == that.user &&
                permissionId == that.permissionId &&
                Objects.equals(project, that.project);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, project, permissionId);
    }
}
