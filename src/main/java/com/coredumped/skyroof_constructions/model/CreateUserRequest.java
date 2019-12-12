package com.coredumped.skyroof_constructions.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class CreateUserRequest {

    private int userId;
    private String username;
    private String email;
    private String password;

    public CreateUserRequest() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
