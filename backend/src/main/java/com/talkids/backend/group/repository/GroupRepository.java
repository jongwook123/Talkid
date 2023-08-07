package com.talkids.backend.group.repository;

import com.talkids.backend.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.talkids.backend.member.entity.Exp;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, String> {

    List<Group> findAll();
    Optional<Group> findByGroupId(int groupId);

    List<Group> findByGroupJoinMember_Member_MemberIdOrderByCreatedAtDesc(int memberId);

//    @Query("SELECT m, SUM(e.expPoint) AS totalExp, " +
//            "SUM(CASE WHEN YEAR(e.createdAt) = :year AND MONTH(e.createdAt) = :month THEN e.expPoint ELSE 0 END) AS monthExp " +
//            "FROM GroupJoinMember gm JOIN gm.group grp JOIN gm.member m LEFT JOIN m.exp e " +
//            "WHERE grp.groupId = :groupId " +
//            "GROUP BY m")
//    List<Object[]> findMembersAndExpByMonth(@Param("groupId") int groupId, @Param("year") int year, @Param("month") int month);

//    @Query("SELECT m, SUM(e.expPoint) AS totalExp, " +
//            "SUM(CASE WHEN CONCAT(YEAR(e.createdAt), '-', LPAD(MONTH(e.createdAt), 2, '0')) = :yearAndMonth THEN e.expPoint ELSE 0 END) AS monthExp " +
//            "FROM GroupJoinMember gm JOIN gm.group grp JOIN gm.member m LEFT JOIN m.exp e " +
//            "WHERE grp.groupId = :groupId " +
//            "GROUP BY m")
//    List<Object[]> findMembersAndExpByMonth(@Param("groupId") int groupId, @Param("yearAndMonth") String yearAndMonth);




}
