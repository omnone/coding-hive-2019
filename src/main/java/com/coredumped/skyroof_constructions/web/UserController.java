package com.coredumped.skyroof_constructions.web;

import com.coredumped.skyroof_constructions.dao.UserDao;
import com.coredumped.skyroof_constructions.model.User;
import com.coredumped.skyroof_constructions.security.AuthenticationRequest;
import com.coredumped.skyroof_constructions.security.AuthenticationResponse;
import com.coredumped.skyroof_constructions.security.Util;
import com.coredumped.skyroof_constructions.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//Routes controller of User
@RestController
public class UserController {

    @Autowired
    UserDao user_dao;

    //Return all users
    @ResponseBody
    @GetMapping("/api/users")
    public List<User> show() {
        return user_dao.findAll();
    }

    //Return user by id
    @ResponseBody
    @GetMapping("/api/users/{id}")
    public Optional<User> find(@PathVariable int id) {

        return user_dao.findById(id);
    }

    //Return user by email
    @ResponseBody
    @GetMapping("/api/users/email/{email}")
    public List<User> find_email(@PathVariable String email) {

        return user_dao.findByEmail(email);
    }

    @Autowired
    PasswordEncoder bCryptEncoder;

    //Sign up user
    @ResponseBody
    @PostMapping(value = "/api/users/create")
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user) {

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bCryptEncoder.encode(user.getPassword()));

        user_dao.save(newUser);

        return newUser;
    }

    //User Authentication route
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private Util util;

    @PostMapping(value = "/api/auth")
    public ResponseEntity createAuthToken(@RequestBody AuthenticationRequest authReq) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authReq.getUsername(), authReq.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Wrong username or password", e);
        }

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authReq.getUsername());

        final String jsonwebtoken = util.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse((jsonwebtoken)));
    }


}
