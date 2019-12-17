package com.coredumped.skyroof_constructions.dao;

import com.coredumped.skyroof_constructions.model.Permission;
import com.coredumped.skyroof_constructions.model.SearchRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface PermissionDao extends JpaRepository <Permission,Long> {
    //TODO query to return permission with specific user id
}
