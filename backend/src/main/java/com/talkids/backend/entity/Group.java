package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Groups")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="groupId")
    private int groupId;

    @Column(name="groupName", nullable = false, length = 45)
    private String groupName;

    @Column(name="groupImage", columnDefinition = "LONGTEXT")
    private String groupImage;

    /* ---------------------------------- */

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "group")
    private List<GroupJoinMember> groupJoinMember = new ArrayList<>();

    /* ---------------------------------- */

    @Column(name="createdAt", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

}
