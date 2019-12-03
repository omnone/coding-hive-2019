package com.coredumped.skyroof_constructions.dao;

import com.coredumped.skyroof_constructions.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao  extends JpaRepository <User, Integer> {
    //Add custom methods to interact with the database
    @Override
    <S extends User> S save(S s);
    List<User> findDistinctByUserId(Integer userID);
    List<User> findByUsername(String username);
    List<User> findByEmail(String email);



}
