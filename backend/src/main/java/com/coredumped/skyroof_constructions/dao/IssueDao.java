package com.coredumped.skyroof_constructions.dao;

import com.coredumped.skyroof_constructions.model.Issue;
import com.coredumped.skyroof_constructions.model.SearchRequest;
import com.coredumped.skyroof_constructions.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface IssueDao extends JpaRepository<Issue, Long> {

    @Query("SELECT issue FROM Issue issue WHERE (issue.assignee.userId = ?1 OR issue.assignor.userId = ?1) AND (issue.status.description='Open')")
    List<Issue> findByUser(Integer userID);

    @Query("SELECT issue FROM Issue issue WHERE (issue.project.projectId = ?1 OR ?1 is null ) " +
            "AND (issue.title = ?2 OR ?2 is null) " +
            "AND (issue.assignee.userId = ?3 OR ?3 is null )" +
            "AND (issue.assignor.userId = ?4 OR ?4 is null)" +
            "AND (issue.status.description = ?5 OR ?5 is null)" +
            "AND (issue.type_ = ?6 OR ?6 is null)")
    public ArrayList<Issue> searchQuery(Long project_id,
                                        String issue_title,
                                        Integer assignee_id,
                                        Integer assignor_id,
                                        String status_desc,
                                        Long category);
}