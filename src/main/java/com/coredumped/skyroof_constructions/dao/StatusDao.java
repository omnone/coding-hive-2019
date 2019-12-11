package com.coredumped.skyroof_constructions.dao;

import com.coredumped.skyroof_constructions.model.Project;
import com.coredumped.skyroof_constructions.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusDao extends JpaRepository <Status,Integer> {
}
