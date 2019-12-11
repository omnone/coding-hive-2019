package com.coredumped.skyroof_constructions.security;


import com.coredumped.skyroof_constructions.model.User;

import java.io.Serializable;
import java.util.Optional;

public class AuthenticationResponse implements Serializable {

    private final String jwt;
    private final Optional<User> user;

    public AuthenticationResponse(String jwt, Optional<User> user) {
        this.jwt = jwt;
        this.user = user;
    }

    public String getJwt() {
        return jwt;
    }

    public Optional<User> getUser() {
        return this.user;
    }
}

