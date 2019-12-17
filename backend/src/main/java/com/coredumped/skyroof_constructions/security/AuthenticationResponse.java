package com.coredumped.skyroof_constructions.security;


import com.coredumped.skyroof_constructions.model.Permission;
import com.coredumped.skyroof_constructions.model.User;

import java.io.Serializable;
import java.util.Optional;
import java.util.Set;

public class AuthenticationResponse implements Serializable {

    private final String jwt;
    private final User user;
    private final Set<Permission> permissions;

    public AuthenticationResponse(String jwt, User user,Set<Permission> permissions) {
        this.jwt = jwt;
        this.user = user;
        this.permissions = permissions;
    }

    public String getJwt() {
        return jwt;
    }

    public User getUser() {
        return this.user;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }
}

