package com.coredumped.skyroof_constructions.web;


import com.coredumped.skyroof_constructions.dao.PermissionDao;
import com.coredumped.skyroof_constructions.model.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class PermissionController {
    @Autowired
    PermissionDao permission_dao;


    //Return all permissions
    @ResponseBody
    @GetMapping("api/permissions")
    public List<Permission> findAll() {return permission_dao.findAll(); }

    //testing
    @ResponseBody
    @GetMapping("api/permissions/{userId}")
    public Optional<Permission> findByUserId(@PathVariable int userId) {
        //return permission_dao.permissionSearch(userId); TODO
        return null;
    }
}
