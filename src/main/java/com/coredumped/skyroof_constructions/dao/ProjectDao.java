package com.coredumped.skyroof_constructions.dao;

import com.coredumped.skyroof_constructions.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectDao extends JpaRepository <Project,Long> {
}
