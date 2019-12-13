package com.coredumped.skyroof_constructions.model;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Permission")
public class Permission {
    private int permissionTableId;
    private int userId;
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

    @Basic
    @Column(name = "userID", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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
        return userId == that.userId &&
                permissionId == that.permissionId &&
                Objects.equals(projectId, that.projectId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, projectId, permissionId);
    }
}
