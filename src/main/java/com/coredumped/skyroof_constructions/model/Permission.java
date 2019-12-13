package com.coredumped.skyroof_constructions.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Permission")
public class Permission {
    private int permissionTableId;
    private User user;
    private long projectId;
    private byte permissionId;


    @GeneratedValue
    @Id
    @Column(name = "permissionTableId",nullable = false)
    public int getPermissionTableId() {
        return permissionTableId;
    }
    public void setPermissionTableId(int permissionTableId) {
        this.permissionTableId = permissionTableId;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID", nullable = false)
    @JsonManagedReference
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Basic
    @Column(name = "projectID",nullable = false)
    public long getProjectId() {
        return projectId;
    }

    public void setProjectId(long projectId) {
        this.projectId = projectId;
    }

    @Basic
    @Column(name = "permissionID",nullable = false)
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
                Objects.equals(projectId, that.projectId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, projectId, permissionId);
    }
}
