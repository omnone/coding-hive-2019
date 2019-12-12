package com.coredumped.skyroof_constructions.dao;

import com.coredumped.skyroof_constructions.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {

    User findDistinctByUserId(Integer userID);

    Optional<User> findByusername(String username);

    @Query("FROM User WHERE email = ?1")
    List<User> findByEmail(String email);


}
