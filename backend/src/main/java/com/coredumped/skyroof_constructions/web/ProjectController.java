package com.coredumped.skyroof_constructions.web;

import com.coredumped.skyroof_constructions.dao.ProjectDao;
import com.coredumped.skyroof_constructions.model.Project;
import com.coredumped.skyroof_constructions.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
public class ProjectController {

    @Autowired
    private ProjectDao project_dao;

    /////////////////////////////////////////////////////////////////////////////////

    //Return all projects
    @ResponseBody
    @GetMapping("/api/projects")
    public List<Project> getAllProjects() {
        return project_dao.findAll();
    }

    /////////////////////////////////////////////////////////////////////////////////

    //Return project by id
    @ResponseBody
    @GetMapping("/api/projects/{id}")
    public Project getById(@PathVariable("id") Long projectId) {
        Optional<Project> oneProject = project_dao.findById(projectId);

        return oneProject.get();
    }

    /////////////////////////////////////////////////////////////////////////////////

    //Save new project
    @ResponseBody
    @PostMapping(value = "/api/projects/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Project addProject(@RequestBody Project project) {
        Project save = project_dao.save(project);
        return save;
    }


}
