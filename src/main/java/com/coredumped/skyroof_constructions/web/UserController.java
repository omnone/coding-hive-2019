package com.coredumped.skyroof_constructions.web;

import com.coredumped.skyroof_constructions.dao.UserDao;
import com.coredumped.skyroof_constructions.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    //Sign up user
    @ResponseBody
    @PostMapping(value = "/api/users/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user) {

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());

        //add exception handling
        user_dao.save(user);

        return newUser;
    }


}
