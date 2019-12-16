package com.coredumped.skyroof_constructions.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity(name = "User")
//@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="userId")
public class User {
    private int userId;
    private String username;
    private String email;
    private Set<Permission> permission = new HashSet();
    @JsonIgnore
    private String password;
    private Set<Issue> issues_as_assignee = new HashSet();
    private Set<Issue> issues_as_assignor = new HashSet();


    @Id
    @GeneratedValue
    @Column(name = "userID")
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    public Set<Permission> getPermission() {
        return permission;
    }

    public void setPermission(Set<Permission> permission) {
        this.permission = permission;
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "assignee", cascade = CascadeType.REMOVE)
    @JsonBackReference
    public Set<Issue> getIssues_as_assignee() {
        return issues_as_assignee;
    }

    public void setIssues_as_assignee(Set<Issue> issues_as_assignee) {
        this.issues_as_assignee = issues_as_assignee;
    }

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "assignor", cascade = CascadeType.REMOVE)
    @JsonBackReference
    public Set<Issue> getIssues_as_assignor() {
        return issues_as_assignor;
    }

    public void setIssues_as_assignor(Set<Issue> issues_as_assignor) {
        this.issues_as_assignor = issues_as_assignor;
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////
    @Basic
    @Column(name = "username", unique = true)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "email", unique = true)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "password_")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return userId == user.userId &&
                Objects.equals(username, user.username) &&
                Objects.equals(email, user.email) &&
                Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, username, email, password);
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
