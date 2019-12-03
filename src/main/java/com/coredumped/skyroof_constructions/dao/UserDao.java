package com.coredumped.skyroof_constructions.dao;

import com.coredumped.skyroof_constructions.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao  extends JpaRepository <User, Integer> {
    //Add custom methods to interact with the database
}
