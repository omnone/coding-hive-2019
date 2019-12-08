package com.coredumped.skyroof_constructions.model;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Status")
@Table(name = "Status_", schema = "skyroof_constructions", catalog = "")
public class Status {
    private byte statusId;
    private String description;

    @Id
    @Column(name = "statusID")
    public byte getStatusId() {
        return statusId;
    }

    public void setStatusId(byte statusId) {
        this.statusId = statusId;
    }

    @Basic
    @Column(name = "description_")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Status status = (Status) o;
        return statusId == status.statusId &&
                Objects.equals(description, status.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(statusId, description);
    }
}
