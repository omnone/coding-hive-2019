package com.coredumped.skyroof_constructions.web;

import com.coredumped.skyroof_constructions.dao.ProjectDao;
import com.coredumped.skyroof_constructions.model.Project;
import com.coredumped.skyroof_constructions.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProjectController {

    @Autowired
    ProjectDao project_dao;

    //Return all projects
//    @GetMapping("/api/projects")
//    public List<Project> show() {
//    }

    //Return project by id
//    @GetMapping("/api/projects/{id}")
//    public Optional<Project> find(@PathVariable int id) {
//    }

    //Save new project
//    @PostMapping(value = "/api/projects/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
//    public Project create(@RequestBody Project user) {
//
//        Project newProject = new Project();
//
//
//    }

}
